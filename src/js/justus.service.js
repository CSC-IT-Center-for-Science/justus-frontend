'use strict';

//
// JUSTUS Business Logic
//
justusApp.service('JustusService', [function() {

  //
  // MUUTTUJAT
  //

  // justus-muuttujassa pidetään tallennettavat tiedot
  this.justus = {};

  // alusta sisäisiä tietoja
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
    // useita näkyy aina (lehdenjulkaisusarjannimi,issn,volyymi,numero)
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
    //"organisaationtekijat":true,

    "konferenssinvakiintunutnimi":true,
    "isbn":true, // joo, mutta ehdollinen/vaihtoehtoinen (issn)
    "issn":true, // joo, mutta ehdollinen/vaihtoehtoinen (isbn)
    "kustantaja":true, // joo ja ei

    "julkaisunkansainvalisyys":true,
    "julkaisuntieteenalat":true,
    "kansainvalinenyhteisjulkaisu":true,
    "yhteisjulkaisuyrityksenkanssa":true,
    "avoinsaatavuus":true,
    "julkaisurinnakkaistallennettu":true,

    "rinnakkaistallennetunversionverkkoosoite":true
  };
  this.condition = {
    "organisaationtekijat": {
      "sukunimi": null, "etunimi": null, "alayksikot": null
      //, "alayksikko": null, "orcid": null
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

  //
  // FUNKTIOT
  //

  // tunnistetaan tietosisällöstä milloin parametrissa mainittu kenttä pitää näkyä
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
        //if (k=="julkaisutyyppi" || k=="julkaisurinnakkaistallennettu"){
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
      // jos lisäehtoja (toisesta riippuvia), korjataan vastausta tarvittaessa
      if (field=="isbn" || field=="issn") {
        // pattern tekee modelin undefinediksi...
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

  // tunnistetaan tietosisällöstä milloin parametrissa mainittu kenttä on validi
  // - pitäisikö siirtää direktiiveiksi?
  // - jolloin html-elementin tilat kertoisi suoraan onko validi vai ei
  // - poikkeuksia on isbn ja issn joilla on keskinäinen korrelaatio, joka sekin olisi kyllä parempi hoitaa toisin
  this.isValid = function(field) {
    //console.log("isValid "+field);
    var valid = true; // oletetaan että ok
    //console.debug(this.justus[field]);
    //console.log("isValid "+field+" array="+angular.isArray(this.justus[field])+" object="+typeof(this.justus[field]))
    if (field=="organisaationtekijat") {
      var thisisok = true;
      for (let len=this.justus[field].length, i=0; i<len && i in this.justus[field]; i++) {
        for (let c in this.condition[field]) {
          //console.log("isValid "+field+" "+c+"="+this.justus[field][i][c])
          // NB! ORCID ei vielä pakollinen!
          if (c=="orcid") {
            // TODO: vaikuttaako pattern-määre tässä?
            if (this.justus[field][i][c]!="") {
              //console.log("isValid "+field+" "+c+" => NOT OK")
              thisisok = false;
            }
          } else if (angular.isArray(this.justus[field][i][c])) {
            for (let e in this.justus[field][i][c]) {
              if (!this.justus[field][i][c][e]) {
                thisisok = false;
              }
            }
          } else if (!this.justus[field][i][c]) {
            //console.log("isValid "+field+" "+c+" => NOT OK")
            thisisok = false;
          }
        }
      }
      if (!thisisok) {
        valid = false;
      }
    } else if (angular.isArray(this.justus[field])) { // julkaisuntieteenalat, avainsanat?
      //console.log("isValid "+field+" array");
      for (let e in this.justus[field]) {
        if (!this.justus[field][e]) {
          valid = false;
        }
      }
    } else if (this.condition[field] && this.condition[field].pattern) {
      // erityisesti ISBN js ISSN; käydään kahdessa vaiheessa läpi:
      // - ensin yksittäin ja sitten vielä yhdessä
      // - nb! pattern vaikutus objektin arvoon (=> undefined kunnes matchaa)
      if (this.justus[field]===undefined) { // pattern tekee undefinediksi!
        valid = false;
      } else {
        if (this.justus[field]!="") {
          if (field=="isbn"){
            valid = this.checkISBN(this.justus[field]);
          }
          if (field=="issn"){
            valid = this.checkISSN(this.justus[field]);
          }
        }
      }
      if (valid && field=="issn") {
        // pitääkö edes katsoa?
        for (let e in this.condition.issn.julkaisutyyppi) {
          if (this.condition.issn.julkaisutyyppi[e]==this.justus.julkaisutyyppi) {
            // katsotaan...
            valid = this.checkISSN(this.justus[field]);
            // ... ellei "kaveri" kata jo?
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
      if (valid && field=="isbn") {
        // pitääkö edes katsoa?
        for (let e in this.condition.isbn.julkaisutyyppi) {
          if (this.condition.isbn.julkaisutyyppi[e]==this.justus.julkaisutyyppi) {
            // katsotaan...
            valid = this.checkISBN(this.justus[field]);
            // ... ellei "kaveri" kata jo?
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
    } else if (!this.justus[field]) {
      //console.log("isValid "+field+" ehkä...");
      if (this.isVisible(field)) {
        valid = false;
      } else {
        //console.log("isValid "+field+" ehkä x 2");
        if (this.condition[field]) {
          var thisisok = true; // ei validi vain jos seuraava...
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
        //console.log("getInvalids EI VALIDI "+r);
        ret.push(r);
      }
    }
    //console.debug(ret)
    return ret;
  }

  this.getCode = function (codes,codeset,code) {
    //console.log("getCode "+codeset+" "+code);
    if (!codes || !codes[codeset]) return;

    for (let len=codes[codeset].length, i=0; i<len && i in codes[codeset]; i++) {
      let c = codes[codeset][i];
      if (c.arvo == code) {
        return c;
      }
      if (c.alatyypit) {
        for (let jen=c.alatyypit.length, j=0; j<jen && j in c.alatyypit; j++) {
          let a = c.alatyypit[j];
          if (a.arvo == code) {
            return a;
          }
        }
      }
    }
  }

  //
  // these check functions should not be needed here. they are directives.
  // actually most of this justus service should be as directives!
  //

  this.checkISBN = function (isbn) {
    //console.log("checkISBN "+isbn+" => "+(!isbn));
    if (!isbn) return false;
    // isbn regex ja numeroita(+X) 10 tai 13! poista "-" merkit
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
    // skippaa "-"
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
