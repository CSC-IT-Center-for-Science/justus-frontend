'use strict';

// from config uses: ?

justusApp.service('JustusService',['$http','$rootScope', function ($http, $rootScope) {

  // VARIABLES

  // in justus we keep data to be stored in database
  this.justus = {};

  // Returns true if the provided field is configured to be visible, false if not
  this.isFieldVisible = function(field) {
    let visible = false;
    
    if ( formFieldDefaults[field] && formFieldDefaults[field].visibleInPublicationTypes.includes(this.justus['julkaisutyyppi']) ) {
      visible = true;
    }
  
    // If the field is visible for the current publication type, it
    // can still be hidden by the active organization
    if (visible === true || !formFieldDefaults[field]) {
      let organizationConfig = domain_organization[$rootScope.user.domain];
      visible = organizationConfig.visibleFields.includes(field) ? true : false; 
    }

    return visible;
  }

  this.isFieldRequired = function(fieldName) {
    // If the field is missing from the configuration, it cannot be mandatory unless made mandatory by organization config
    if(!formFieldDefaults[fieldName]) {
      if( this.isFieldRequiredByOrganization(fieldName) === true ) {
        return true;
      }
      return false;
    }

    let fieldRequired = formFieldDefaults[fieldName].requiredInPublicationTypes.includes(this.justus['julkaisutyyppi']) && 
    this.isFieldRequiredByOrganization(fieldName) ? 
    true : false;

    // If the field was required we need to check if the field required attribute depends on another filled field
    if(fieldRequired === true) {
      angular.forEach(formFieldDefaults[fieldName].optionalWithFields, function(field) {
        if(this.fieldIsEmpty(this.justus[field]) === false) {
          fieldRequired = false;
        }
      }, this);
    }
    // Otherwise the field can be made mandatory by another filled field
    else {
      angular.forEach(formFieldDefaults[fieldName].requiredWithFields, function(field) {
        if (this.fieldIsEmpty(this.justus[field]) === false) {
          fieldRequired = true;
        }
      }, this);
    }

    return fieldRequired;
  }

  this.isFieldRequiredByOrganization = function(fieldName) {
    let organizationConfig = domain_organization[$rootScope.user.domain];
    return organizationConfig.requiredFields.includes(fieldName) ? true : false; 
  }

  this.fieldIsEmpty = function(fieldValue) {
    if ( fieldValue === '' || 
    fieldValue === {} || 
    fieldValue === [] ||
    fieldValue === undefined ) {
      return true;
    }
    return false;
  }

  this.isValid = function(fieldName) {
    // Assume the field is valid, for performance we will continue validating until the field is first decided as invalid
    let valid = true;
    let reason = '';
    let fieldIsFilled = false;

    if(!formFieldDefaults[fieldName]) {
      return true;
    }

    if (this.isFieldVisible(fieldName) === false) {
      return true;
    }

    // If the field is empty we need to check if it is required for validation
    if ( this.fieldIsEmpty(this.justus[fieldName]) ) {
      valid = this.isFieldRequired(fieldName) === true ? false : true;
      reason = valid === false ? 'Field is empty' : '';
    }
    else {
      fieldIsFilled = true;
    }

    // Validate the field has against a possible validation pattern
    if (formFieldDefaults[fieldName].pattern !== null && valid === true && fieldIsFilled === true) {
      // If trying to pattern match something else than a string the value is invalid
      if(typeof this.justus[fieldName] === 'string') {
        valid = this.justus[fieldName].match(formFieldDefaults[fieldName].pattern) !== null ? true : false;
      }
      else {
        valid = false;
      }
      reason = valid === false ? 'Field value is invalid' : '';
    }

    // Validate a field that contains a list of values
    if (formFieldDefaults[fieldName].requiredAmount > 0 && valid === true) {
      valid = angular.isArray(this.justus[fieldName]) === true && 
      this.justus[fieldName].length >= formFieldDefaults[fieldName].requiredAmount ? 
      true : false;
      reason = valid === false ? 'At least ' +  formFieldDefaults[fieldName].requiredAmount + ' value is required': '';
    }

    // Validate a field which consists of multiple subfields
    if (formFieldDefaults[fieldName].subfields.length > 0 && valid === true) {
      valid = this.validateNestedField(fieldName);
      reason = valid === false ? 'One or more subfield value is invalid': '';
    }
    
    return valid;
  }

  this.validateNestedField = function(fieldName) {
    let valid = true;
    angular.forEach(formFieldDefaults[fieldName].subfields, function(subfieldName) {
      // If the field consists of a list of objects, we need to validate each index
      if ( angular.isArray(this.justus[fieldName]) ) {
        angular.forEach(this.justus[fieldName], function(fieldIndex) {
          if (this.fieldIsEmpty(fieldIndex[subfieldName]) === true) {
            valid = false;
          }
          else if ( angular.isArray(fieldIndex[subfieldName]) ) {
            if (fieldIndex[subfieldName].length > 0) {
              if(!fieldIndex[subfieldName][0][subfieldName]) {
                valid = false;
              }
            }
            else {
              valid = false;
            }
          }
        }, this);
      }
      // Otherwise we can just validate the direct child field
      else {
        if (this.fieldIsEmpty(formFieldDefaults[fieldName][subfieldName]) === true) {
          valid = false;
        }
      }
    }, this);

    return valid;
  }
  
  this.getInvalidFields = function() {
    let invalidFields = [];
    let organizationConfig = domain_organization[$rootScope.user.domain];
    angular.forEach(organizationConfig.visibleFields, function(field) {
      if (this.isValid(field) === false) {
        invalidFields.push(field);
      }
    }, this);
    return invalidFields;
  }

  // pattern checkers (for validity)

  this.pattern = {
    "orcid": /^(|[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{3}[0-9X])$/g,
    "isbn": /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/g,
    "issn": /^([0-9]{4}[- ][0-9]{3}[0-9X])$/g
  };

  this.checkISBN = function (isbn) {
    if (!isbn) return false;
    if (!isbn.match(this.pattern.isbn)) return false;
    // isbn regex and numbers(+X) 10 or 13! remove "-" chars
    let ret = false;
    let digits = isbn.replace(/-/g,'').replace(/ /g,'');
    
    let a=digits.substr(0,1); let aa=parseInt(a);
    let b=digits.substr(1,1); let bb=parseInt(b);
    let c=digits.substr(2,1); let cc=parseInt(c);
    let d=digits.substr(3,1); let dd=parseInt(d);
    let e=digits.substr(4,1); let ee=parseInt(e);
    let f=digits.substr(5,1); let ff=parseInt(f);
    let g=digits.substr(6,1); let gg=parseInt(g);
    let h=digits.substr(7,1); let hh=parseInt(h);
    let i=digits.substr(8,1); let ii=parseInt(i);
    if (digits.length == 10) {
      let x=digits.substr(9,1); let xx=(x=='X'?10:parseInt(x)); // nb "X"
      let sum = (10*aa)+(9*bb)+(8*cc)+(7*dd)+(6*ee)+(5*ff)+(4*gg)+(3*hh)+(2*ii)+(1*xx);
      let mod = sum%11;
      ret = 0==mod;
    }
    if (digits.length == 13) {
      let j=digits.substr(9,1); let jj=parseInt(j);
      let k=digits.substr(10,1); let kk=parseInt(k);
      let l=digits.substr(11,1); let ll=parseInt(l);
      let x=digits.substr(12,1); let xx=parseInt(x); // vain numeroita
      let sum = (1*aa)+(3*bb)+(1*cc)+(3*dd)+(1*ee)+(3*ff)+(1*gg)+(3*hh)+(1*ii)+(3*jj)+(1*kk)+(3*ll);
      let mod = sum%10;
      if (mod != 0) {
        ret = (10-mod)==x;
      } else {
        ret = mod==x;
      }
    }
    return ret;
  }

  this.checkISSN = function (issn) {
    if (!issn) return false;
    if (!issn.match(this.pattern.issn)) return false;
    let digits = issn.replace(/-/g,'').replace(/ /g,'');
    let a=digits.substr(0,1); let aa=parseInt(a);
    let b=digits.substr(1,1); let bb=parseInt(b);
    let c=digits.substr(2,1); let cc=parseInt(c);
    let d=digits.substr(3,1); let dd=parseInt(d);
    let e=digits.substr(4,1); let ee=parseInt(e);
    let f=digits.substr(5,1); let ff=parseInt(f);
    let g=digits.substr(6,1); let gg=parseInt(g);
    let x=digits.substr(7,1); let xx=(x=="X"?10:parseInt(x));
    let sum = (8*aa)+(7*bb)+(6*cc)+(5*dd)+(4*ee)+(3*ff)+(2*gg)+(xx);
    return 0==sum%11;
  }

  this.checkORCID = function (orcid) {
    if (!orcid) return false;
    if (!orcid.match(this.pattern.orcid)) return false;
    let a=orcid.substr( 0,1); let aa=(parseInt(a)   )*2;
    let b=orcid.substr( 1,1); let bb=(parseInt(b)+aa)*2;
    let c=orcid.substr( 2,1); let cc=(parseInt(c)+bb)*2;
    let d=orcid.substr( 3,1); let dd=(parseInt(d)+cc)*2;
    let e=orcid.substr( 5,1); let ee=(parseInt(e)+dd)*2;
    let f=orcid.substr( 6,1); let ff=(parseInt(f)+ee)*2;
    let g=orcid.substr( 7,1); let gg=(parseInt(g)+ff)*2;
    let h=orcid.substr( 8,1); let hh=(parseInt(h)+gg)*2;
    let i=orcid.substr(10,1); let ii=(parseInt(i)+hh)*2;
    let j=orcid.substr(11,1); let jj=(parseInt(j)+ii)*2;
    let k=orcid.substr(12,1); let kk=(parseInt(k)+jj)*2;
    let l=orcid.substr(13,1); let ll=(parseInt(l)+kk)*2;
    let m=orcid.substr(15,1); let mm=(parseInt(m)+ll)*2;
    let n=orcid.substr(16,1); let nn=(parseInt(n)+mm)*2;
    let o=orcid.substr(17,1); let oo=(parseInt(o)+nn)*2;
    let remainder = oo%11;
    let result = (12-remainder)%11;
    let x=orcid.substr(18,1); let xx=(x=="X"?10:parseInt(x));
    return x==result;
  }

}]);
