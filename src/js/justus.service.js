'use strict';

// from config uses: ?

justusApp.service('JustusService',['$http','$rootScope', function ($http, $rootScope) {

  // VARIABLES

  // in justus we keep data to be stored in database
  this.justus = {};

  // Depicts visible fields on each publication type
  this.visible = {
    'julkaisutyyppi': {
      "julkaisutyyppi": []
    },
    'julkaisuvuosi': {
      "julkaisutyyppi": []
    },
    'julkaisunnimi': {
      "julkaisutyyppi": []
    },
    'tekijat': {
      "julkaisutyyppi": []
    },
    'julkaisuntekijoidenlukumaara': {
      "julkaisutyyppi": []
    },
    'organisaatiotekija': {
      "julkaisutyyppi": []
    },
    'alayksikko': {
      "julkaisutyyppi": []
    },
    "konferenssinvakiintunutnimi": {
      "julkaisutyyppi": ["A4","B3","D3"]
    },
    "isbn": {
      "julkaisutyyppi": ["A3","B2","D2" ,"A4","B3","D3" ,"C1","D4","D5","E2","G4","G5" ,"C2","D6","E3"]
    },
    // nb! there are multiple fields that are always visible (lehdenjulkaisusarjannimi,issn,volyymi,numero)
    "issn": {
      "julkaisutyyppi": ["A1","A2","B1","D1","E1" ,"A3","B2","D2" ,"A4","B3","D3" ,"C1","D4","D5","E2","G4","G5" ,"C2","D6","E3"]
    },
    'volyymi': {
      "julkaisutyyppi": []
    },
    'numero': {
      "julkaisutyyppi": []
    },
    'lehdenjulkaisusarjannimi': {
      "julkaisutyyppi": []
    },
    "kustantaja": {
      "julkaisutyyppi": ['A3','B2','D2' ,'A4','B3','D3' ,'C1','D4','D5','E2','G4','G5' ,'C2','D6','E3' ,'E1']
    },
    'julkaisunkansainvalisyys': {
      "julkaisutyyppi": []
    },
    'tieteenala': {
      "julkaisutyyppi": []
    },
    'kansainvalinenyhteisjulkaisu': {
      "julkaisutyyppi": []
    },
    'yhteisjulkaisuyrityksenkanssa': {
      "julkaisutyyppi": []
    },
    'avoinsaatavuus': {
      "julkaisutyyppi": []
    },
    'julkaisurinnakkaistallennettu': {
      "julkaisutyyppi": []
    },
    "rinnakkaistallennetunversionverkkoosoite": {
      "julkaisurinnakkaistallennettu": 1
    },
    "emojulkaisunnimi": {
      "julkaisutyyppi": ["A3","B2","D2" ,"A4","B3","D3"]
    },
    "emojulkaisuntoimittajat": {
      "julkaisutyyppi": ["A3","B2","D2" ,"A4","B3","D3"]
    },
    "sivut": {
      "julkaisutyyppi": ['A1','A2','B1','D1','E1' ,'A4','B3','D3']
    },
    "artikkelinumero": {
      "julkaisutyyppi": ['A1','A2','B1','D1','E1' ,'A4','B3','D3']
    },
    "julkaisunkustannuspaikka": {
      "julkaisutyyppi": ['A3','B2','D2' ,'A4','B3','D3' ,'C1','D4','D5','E2','G4','G5' ,'C2','D6','E3']
    },
    'avainsanat': {
      "julkaisutyyppi": []
    },
    "julkaisumaa": {
      "julkaisunkansainvalisyys": 1
    },
    'julkaisunkieli': {
      "julkaisutyyppi": []
    },
    'doitunniste': {
      "julkaisutyyppi": []
    },
    'pysyvaverkkoosoite': {
      "julkaisutyyppi": []
    }
  };

  this.pattern = {
    "orcid": /^(|[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{3}[0-9X])$/g,
    "isbn": /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/g,
    "issn": /^([0-9]{4}[- ][0-9]{3}[0-9X])$/g
  };

  this.dependency = {
    "organisaatiotekija": {
      "sukunimi": null, "etunimet": null, "alayksikko": null
      //, "orcid": null
    },
    "konferenssinvakiintunutnimi": {
      "julkaisutyyppi": ["A4","B3","D3"]
    },
    "isbn": {
      "issn": {"julkaisutyyppi": ["A1","A2","A3","A4","B1","B2","B3","C1","C2"]},
      "julkaisutyyppi": ["A1","A2","A3","A4","B1","B2","B3","C1","C2"]
    },
    "issn": {
      "isbn": {"julkaisutyyppi": ["A1","A2","A3","A4","B1","B2","B3","C1","C2"]},
      "julkaisutyyppi": ["A1","A2","A3","A4","B1","B2","B3","C1","C2"]
    },
    "lehdenjulkaisusarjannimi": {
      "julkaisutyyppi": ["E1"],
      "kustantaja": {"julkaisutyyppi": ["E1"]}
    },
    "kustantaja": {
      "julkaisutyyppi": ["A3","B2","C1","C2","D2","D4","D5","D6","E2","E3" ,"E1"],
      "lehdenjulkaisusarjannimi": {"julkaisutyyppi": ["E1"]}
    },
    "rinnakkaistallennetunversionverkkoosoite": {
      "julkaisurinnakkaistallennettu": 1
    }
  };

  // Returns true if the provided field is configured to be visible, false if not
  this.isFieldVisible = function(field) {
    let visible = false;

    // If the field is visible in specific publication types or specific publication types were not defined
    if (this.visible[field] && angular.isArray(this.visible[field]['julkaisutyyppi'])) {
      if (this.visible[field]['julkaisutyyppi'].includes(this.justus['julkaisutyyppi']) || 
      this.visible[field]['julkaisutyyppi'].length === 0) {
        visible = true;
      }
    }
  
    // If the field is visible for the current publication type, it
    // can still be hidden by the active organization
    if (visible === true) {
      let organizationConfig = domain_organization[$rootScope.user.domain];
      visible = organizationConfig.visibleFields.includes(field) ? true : false; 
    }

    return visible;
  }

  this.isFieldRequired = function(field) {
    let required = true;
    
    // dependencies may change requirement still
    if (field in this.dependency) {
      // loop all dependencies
      for (let k in this.dependency[field]) {
        // handle most generic dependency julkaisutyyppi first
        if (k=='julkaisutyyppi') {
          required = false; // so NOT required unless...
          for (let i in this.dependency[field][k]) { // i=index num
            if (this.dependency[field][k][i]==this.justus[k]) {
              required = true;
            }
          }
        } else {
          let ftype = typeof(this.dependency[field][k]);
          if (k in this.justus && ftype in ['string','number']) { // element exists and is not an object (array, json, ...)
            required = this.dependency[field][k]==this.justus[k];
          }
        }
      }
      // special dependencies to fix answer accordingly
      if (field=="isbn" || field=="issn") {
        // for relaxing the answer based on if the *other* is filled in and covers for *field*
        let other = field=="isbn"?"issn":"isbn";
        // nb! use pattern (pattern vs filled in value) here to see are we even interested in altering the answer...
        // nb! pattern makes model undefined...
        if ((this.justus[other]||"N/A").match(this.pattern[other])) {
          // so filled in value is ok
          for (let i in this.dependency[field][other].julkaisutyyppi) {
            if (this.dependency[field][other].julkaisutyyppi[i] == this.justus.julkaisutyyppi) {
              required = false;
            }
          }
        }
      }
      if (field=="lehdenjulkaisusarjannimi" || field=="kustantaja") {
        // for relaxing the answer based on if the *other* is filled in and covers for *field*
        let other = field=="kustantaja"?"lehdenjulkaisusarjannimi":"kustantaja";
        if ((this.justus[other]||"")!="") { // empty is NOT ok, doesn't cover
          for (let i in this.dependency[field][other].julkaisutyyppi) {
            if (this.dependency[field][other].julkaisutyyppi[i] == this.justus.julkaisutyyppi) {
              required = false;
            }
          }
        }
      }
    }
    return required;
  }

  this.isFieldRequiredByOrganization = function(fieldName) {
    let organizationConfig = domain_organization[$rootScope.user.domain];
    return organizationConfig.requiredFields.includes(fieldName) ? true : false; 
  }

  // identify from data when given field is valid
  // - then html elements states would directly tell if valid or not
  // - exceptions are isbn and issn which have dependency with each other (which also would be better to handle some other way)
  this.isValid = function(field) {
    if (this.isFieldVisible(field) === false) {
      return true;
    }

    let valid = true;

    // Todo field specific validations need to be rewritten
    // if (field === 'organisaatiotekija') {
    //   // loop organisaatiotekija list
    //   for (let i=0; i<this.justus[field].length; i++) {
    //     if (!this.justus[field][i].sukunimi || !this.justus[field][i].etunimet) {
    //       valid = false;
    //     }
    //   }
    // } 
    // else if (field === 'alayksikko') {
    //   if (['00000','4940015','4020217'].indexOf(this.justus.userorganization)<0) {
    //     // loop alayksikko list
    //     for (let a=0; a<this.justus[field][i].alayksikko.length; a++) {
    //       if (!this.justus[field][i].alayksikko[a].alayksikko) {
    //         valid = false;
    //       }
    //     }
    //   }
    // }
    // else if (field === "tieteenala") {
    //   for (let i in this.justus[field]) {
    //     if (!this.justus[field][i].tieteenalakoodi) {
    //       valid = false;
    //     }
    //   }
    // } 
    // else if (angular.isArray(this.justus[field])) { // avainsana?
    //   for (let i in this.justus[field]) {
    //     if (!this.justus[field][i]) {
    //       valid = false;
    //     }
    //   }
    // } 
    // else if (this.pattern[field]) { // isbn, issn orcid
    //   // especially ISBN and ISSN; we go thru them in two phases:
    //   // - first by them selves (single) and then together
    //   // - nb! affect of pattern to objects value (=> undefined until matches)
    //   if (this.justus[field]===undefined) { // pattern makes undefined!
    //     valid = false;
    //   } 
    //   else {
    //     // remember to handle null, "" and undefined!
    //     if (this.justus[field]!==null && this.justus[field]!="") {
    //       if (field=="isbn"){
    //         valid = this.checkISBN(this.justus[field]);
    //       }
    //       if (field=="issn"){
    //         valid = this.checkISSN(this.justus[field]);
    //       }
    //     }
    //   }
    //   // together part 1 issn (valid status may change!)
    //   if (field=="issn") {
    //     // should we even look?
    //     for (let e in this.dependency.issn.julkaisutyyppi) {
    //       if (this.dependency.issn.julkaisutyyppi[e]==this.justus.julkaisutyyppi) {
    //         // let's look...
    //         valid = this.checkISSN(this.justus[field]);
    //         // ... unless "pal" covers?
    //         if ((this.justus.isbn||"").match(this.pattern.isbn)) {
    //           for (let e in this.dependency.isbn.julkaisutyyppi) {
    //             if (this.dependency.isbn.julkaisutyyppi[e]==this.justus.julkaisutyyppi) {
    //               valid = true;
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   // together part 2 isbn (valid status may change!)
    //   if (field=="isbn") {
    //     // should we even look?
    //     for (let e in this.dependency.isbn.julkaisutyyppi) {
    //       if (this.dependency.isbn.julkaisutyyppi[e]==this.justus.julkaisutyyppi) {
    //         // let's look...
    //         valid = this.checkISBN(this.justus[field]);
    //         // ... unless "pal" covers?
    //         if ((this.justus.issn||"").match(this.pattern.issn)) {
    //           for (let e in this.dependency.issn.julkaisutyyppi) {
    //             if (this.dependency.issn.julkaisutyyppi[e]==this.justus.julkaisutyyppi) {
    //               valid = true;
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    
    if ((this.justus[field]||"")=="") {
      if (this.isFieldRequired(field)) {
        valid = false;
      }
    }
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
