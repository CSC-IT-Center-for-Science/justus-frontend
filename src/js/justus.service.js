'use strict';

// from config uses: ?

justusApp.service('JustusService',
['$http',
function ($http) {

  // VARIABLES
  // nb! these may be directive stuff?

  // in justus we keep data to be stored in database
  this.justus = {};

  this.visible = {
    "konferenssinvakiintunutnimi": {
      "julkaisutyyppi": ["A4","B3","D3"]
    },
    "emojulkaisunnimi": {
      "julkaisutyyppi": ["A3","B2","D2" ,"A4","B3","D3"]
    },
    "emojulkaisuntoimittajat": {
      "julkaisutyyppi": ["A3","B2","D2" ,"A4","B3","D3"]
    },
    "isbn": {
      "julkaisutyyppi": ["A3","B2","D2" ,"A4","B3","D3" ,"C1","D4","D5","E2","G4","G5" ,"C2","D6","E3"]
    },
    // nb! there are multiple fields that are always visible (lehdenjulkaisusarjannimi,issn,volyymi,numero)
    "issn": {
      "julkaisutyyppi": ["A1","A2","B1","D1","E1" ,"A3","B2","D2" ,"A4","B3","D3" ,"C1","D4","D5","E2","G4","G5" ,"C2","D6","E3"]
    },
    "sivut": {
      "julkaisutyyppi": ['A1','A2','B1','D1','E1' ,'A4','B3','D3']
    },
    "artikkelinumero": {
      "julkaisutyyppi": ['A1','A2','B1','D1','E1' ,'A4','B3','D3']
    },
    "kustantaja": {
      "julkaisutyyppi": ['A3','B2','D2' ,'A4','B3','D3' ,'C1','D4','D5','E2','G4','G5' ,'C2','D6','E3']
    },
    "julkaisunkustannuspaikka": {
      "julkaisutyyppi": ['A3','B2','D2' ,'A4','B3','D3' ,'C1','D4','D5','E2','G4','G5' ,'C2','D6','E3']
    },

    "julkaisumaa": {
      "julkaisunkansainvalisyys": 1
    },
    "rinnakkaistallennetunversionverkkoosoite": {
      "julkaisurinnakkaistallennettu": 1
    }
  };
  this.requirement = {
    "julkaisutyyppi":true,
    "julkaisuvuosi":true,
    "julkaisunnimi":true,
    "tekijat":true,
    "julkaisuntekijoidenlukumaara":true,
    //"organisaatiotekija":true,

    "konferenssinvakiintunutnimi":true,
    "isbn":true, // true but conditional or dependent (or covered) by issn
    "issn":true, // true but conditional or dependent (or covered) by isbn
    "kustantaja":true, // yes and no

    "julkaisunkansainvalisyys":true,
    "tieteenala":true,
    "kansainvalinenyhteisjulkaisu":true,
    "yhteisjulkaisuyrityksenkanssa":true,
    "avoinsaatavuus":true,
    "julkaisurinnakkaistallennettu":true,

    "rinnakkaistallennetunversionverkkoosoite":true
  };
  this.condition = {
    "organisaatiotekija": {
      "sukunimi": null, "etunimet": null, "alayksikko": null
      //, "orcid": null
    },
    "orcid": {
      "pattern": /^(|[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{3}[0-9X])$/g
    },
    "konferenssinvakiintunutnimi": {
      "julkaisutyyppi": ["A4","B3","D3"]
    },
    "isbn": {
      "pattern": /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/g,
      "issn": "julkaisutyyppi",
      "julkaisutyyppi": ["A3","B2","D2" ,"A4","B3","D3" ,"C1","D4","D5","E2","G4","G5" ,"C2","D6","E3"]
    },
    "issn": {
      "pattern": /^([0-9]{4}[- ][0-9]{3}[0-9X])$/g,
      "isbn": "julkaisutyyppi",
      "julkaisutyyppi": ["A3","B2","D2" ,"A4","B3","D3" ,"C1","D4","D5","E2","G4","G5" ,"C2","D6","E3"]
    },
    "kustantaja": {
      "julkaisutyyppi": ['A4','B3','D3']
    },
    "rinnakkaistallennetunversionverkkoosoite": {
      "julkaisurinnakkaistallennettu": 1
    }
  };

  // FUNCTIONS

  // identify from data when given field must show up
  this.isVisible = function(field) {
    //console.log("isVisible "+field)
    if (!this.visible[field]) return true;
    let visible = false;
    for (let k in this.visible[field]) {
      if (angular.isArray(this.visible[field][k])) {
        for (let e in this.visible[field][k]) {
          if (this.visible[field][k][e]==this.justus[k]) {
            visible = true;
          }
        }
      } else {
        visible = this.visible[field][k] == this.justus[k];
      }
    }
    //console.log("isVisible "+field+" "+visible)
    return visible;
  }

  this.isRequired = function(field) {
    //console.log("isRequired "+field)
    if (!this.isVisible(field)) return false;
    if (!this.requirement[field]) return false;
    let required = true;
    if (field in this.condition) {
      for (let k in this.condition[field]) {
        //console.log("isRequired "+field+" for "+k)
        if (angular.isArray(this.condition[field][k])) {
          required = false;
          for (let e in this.condition[field][k]) {
            if (this.condition[field][k][e]==this.justus[k]) {
              required = true;
            }
          }
        } else {
          required = this.condition[field][k]==this.justus[k];
        }
      }
      // if more conditions (dependencies) fix answer accordingly
      if (field=="isbn" || field=="issn") {
        // pattern makes model undefined...
        if ((this.justus.isbn||"").match(this.condition.isbn.pattern) || (this.justus.issn||"").match(this.condition.issn.pattern)) {
          for (let e in this.condition[field].julkaisutyyppi) {
            if (this.condition[field].julkaisutyyppi[e]==this.justus.julkaisutyyppi) {
              required = false;
            }
          }
        }
      }
    }
    //console.log("isRequired "+field+" "+required)
    return required;
  }

  // identify from data when given field is valid
  // - should this be moved as directive?
  // - then html elements states would directly tell if valid or not
  // - exceptions are isbn and issn which have dependency with each other (which also would be better to handle some other way)
  this.isValid = function(field) {
    //console.log("isValid "+field);
    var valid = true; // assume ok!
    if (!this.isVisible(field)) return true;
    //console.debug(this.justus[field]);
    //console.log("isValid "+field+" array="+angular.isArray(this.justus[field])+" object="+typeof(this.justus[field]))
    if (field=="organisaatiotekija") {
      var thisisok = true;
      if (!this.justus[field]) {
        thisisok = false;
      } else {
        for (let len=this.justus[field].length, i=0; i<len && i in this.justus[field]; i++) {
          for (let c in this.condition[field]) {
            //console.debug("isValid "+field+" "+c+"=",this.justus[field][i][c])
            // nb! orcid is not yet(?) mandatory
            if (c=="orcid") {
              // nb! not fully tested: how does pattern directive affect here?
              if (this.justus[field][i][c]!="") {
                //console.debug("isValid "+field+" "+c+" => NOT OK (orcid)",this.justus[field][i][c])
                thisisok = false;
              }
            } else if (angular.isArray(this.justus[field][i][c])) {
              for (let e in this.justus[field][i][c]) {
                if (!this.justus[field][i][c][e]) {
                  //console.debug("isValid "+field+" "+c+" "+e+" => NOT OK ARRAY",this.justus[field][i][c][e])
                  thisisok = false;
                }
              }
            } else if (!this.justus[field][i][c]) {
              //console.debug("isValid "+field+" "+c+" => NOT OK",this.justus[field][i][c])
              thisisok = false;
            }
          }
        }
      }
      if (!thisisok) {
        valid = false;
      }
    } else if (angular.isArray(this.justus[field])) { // tieteenala, avainsana?
      //console.log("isValid "+field+" array");
      for (let e in this.justus[field]) {
        if (!this.justus[field][e]) {
          valid = false;
        }
      }
    } else if (this.condition[field] && this.condition[field].pattern) {
      // especially ISBN and ISSN; we go thru them in two phases:
      // - first by them selves (single) and then together
      // - nb! affect of pattern to objects value (=> undefined until matches)
      //console.log("isValid 0 "+field+" "+valid+" initially");
      if (this.justus[field]===undefined) { // pattern makes undefined!
        valid = false;
        //console.log("isValid 1 "+field+" "+valid+" A");
      } else {
        // remember to handle null, "" and undefined!
        if (this.justus[field]!==null && this.justus[field]!="") {
          if (field=="isbn"){
            valid = this.checkISBN(this.justus[field]);
          }
          if (field=="issn"){
            valid = this.checkISSN(this.justus[field]);
          }
        }
        //console.log("isValid 1 "+field+" "+valid+" B");
      }
      //console.log("isValid 1 "+field+" "+valid+" single");
      // together part 1 issn (valid status may change!)
      if (field=="issn") {
        // should we even look?
        for (let e in this.condition.issn.julkaisutyyppi) {
          if (this.condition.issn.julkaisutyyppi[e]==this.justus.julkaisutyyppi) {
            // let's look...
            valid = this.checkISSN(this.justus[field]);
            // ... unless "pal" covers?
            if ((this.justus.isbn||"").match(this.condition.isbn.pattern)) {
              for (let e in this.condition.isbn.julkaisutyyppi) {
                if (this.condition.isbn.julkaisutyyppi[e]==this.justus.julkaisutyyppi) {
                  valid = true;
                }
              }
            }
          }
        }
      }
      // together part 2 isbn (valid status may change!)
      if (field=="isbn") {
        // should we even look?
        for (let e in this.condition.isbn.julkaisutyyppi) {
          if (this.condition.isbn.julkaisutyyppi[e]==this.justus.julkaisutyyppi) {
            // let's look...
            valid = this.checkISBN(this.justus[field]);
            // ... unless "pal" covers?
            if ((this.justus.issn||"").match(this.condition.issn.pattern)) {
              for (let e in this.condition.issn.julkaisutyyppi) {
                if (this.condition.issn.julkaisutyyppi[e]==this.justus.julkaisutyyppi) {
                  valid = true;
                }
              }
            }
          }
        }
      }
      //console.log("isValid 2 "+field+" "+valid+" together (final)");
  } else if (!this.justus[field]) {
      //console.log("isValid "+field+" may be...");
      if (this.isVisible(field)) {
        valid = false;
      } else {
        //console.log("isValid "+field+" may be x 2");
        if (this.condition[field]) {
          var thisisok = true; // not valid only if next...
          for (var c in this.condition[field]) {
            if (this.condition[field][c]!==undefined && this.justus[c]!==undefined) {
              if (this.condition[field][c] == this.justus[c]) {
                thisisok = false;
              }
            }
          }
          if (!thisisok) {
            valid = false;
          }
        } else {
          valid = false;
        }
      }
    }
    //console.log("isValid "+field+" "+valid);
    return valid;
  }
  this.getInvalids = function() {
    //console.log("getInvalids");
    let ret = [];
    for (let r in this.requirement) {
      if (!this.isValid(r)) {
        //console.log("getInvalids NOT VALID "+r);
        ret.push(r);
      }
    }
    //console.debug(ret)
    return ret;
  }

  //
  // these check functions should not be needed here. they are directives.
  // actually most of this justus service should be as directives, i think
  //

  this.checkISBN = function (isbn) {
    //console.log("checkISBN "+isbn+" => "+(!isbn));
    if (!isbn) return false; // null, undefined, "", ...
    // isbn regex and numbers(+X) 10 or 13! remove "-" chars
    let d = isbn.replace(/-/g,'').replace(/ /g,'');
    return isbn.match(this.condition.isbn.pattern)&&(d.length==10||d.length==13);
  }

  this.checkISSN = function (issn) {
    if (!issn) return false;
    if (!issn.match(this.condition.issn.pattern)) return false;
    let a=issn.substr(0,1); let aa=parseInt(a);
    let b=issn.substr(1,1); let bb=parseInt(b);
    let c=issn.substr(2,1); let cc=parseInt(c);
    let d=issn.substr(3,1); let dd=parseInt(d);
    // skip "-"
    let e=issn.substr(5,1); let ee=parseInt(e);
    let f=issn.substr(6,1); let ff=parseInt(f);
    let g=issn.substr(7,1); let gg=parseInt(g);
    let x=issn.substr(8,1); let xx=(x=="X"?10:parseInt(x));
    let sum = (8*aa)+(7*bb)+(6*cc)+(5*dd)+(4*ee)+(3*ff)+(2*gg)+(xx);
    //console.log("checkISSN "+issn+" .. "+a+b+c+d+e+f+g+x+" sum="+sum+" mod="+(sum%11)+" ==0?" )
    return 0==sum%11;
  }

  this.checkORCID = function (orcid) {
    if (!orcid) return false;
    if (!orcid.match(this.condition.orcid.pattern)) return false;
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
    //console.log("checkORCID "+orcid+" .. "+a+b+c+d+e+f+g+h+i+j+k+l+m+n+o+x+" rem="+remainder+" result="+result+" =="+xx+"?");
    return x==result;
  }

}]);
