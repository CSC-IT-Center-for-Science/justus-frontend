'use strict';

// from config uses: ? TODO

justusApp.service('KoodistoService',
['$http',
function($http) {
  let baseuri = "https://virkailija.opintopolku.fi/koodisto-service/rest/json/";
  if (developmentmode || demomode) {
    baseuri = "https://testi.virkailija.opintopolku.fi/koodisto-service/rest/json/";
  }

  let maxage = 1*60*60*1000; // h*mi*s*millisekunteja
  console.debug("KoodistoService baseuri for developmentmode="+developmentmode+" demomode="+demomode+" is "+baseuri)
  //* localStorage:
  console.debug("KoodistoService localStorage "+(typeof(Storage) !== "undefined")+" maxage "+maxage)
  //*/
  //placeholder for KoodistoService specific cache control ($http.defaults.cache affects the whole app!)
  let httpcache = false;
  console.debug("KoodistoService httpcache (for config)",httpcache)

  //
  // internal private functions
  // not in 'this', so unscoped
  //

  // suorita HTTP-kutsu ja palauta JSON
  let callURI = function(fulluri) {
    //console.log("KoodistoService.callURI "+fulluri);
    //* localStorage:
    //let store = this.store;
    let stored = store(fulluri);
    if (stored) {
      // tässäpä hacki. kutsutaan '/' (localhost) jotta saadaan sama palautusmuoto. *huoh*
      // huomaa myös että palautetaan stored-muuttuja
      return $http.get('/').then(function(response){return stored;});
    }
    console.debug("KoodistoService.callURI NOT STORED calling HTTP",fulluri);
    //*/
    return $http.get(fulluri,{cache: httpcache}).then(function(response){
      let ret = [];
      // make an array for loop
      let responsedataarray = [];
      if (response.data.constructor === Array) {
        responsedataarray = response.data
      } else {
        responsedataarray.push(response.data)
      }
      angular.forEach(responsedataarray,function(robj,skey){
        var obj={};
        obj.arvo = robj.koodiArvo;
        obj.selite = {
          FI: getLanguageSpecificValueOrValidValue(robj.metadata,"nimi","FI"),
          SV: getLanguageSpecificValueOrValidValue(robj.metadata,"nimi","SV"),
          EN: getLanguageSpecificValueOrValidValue(robj.metadata,"nimi","EN")
        };
        obj.kuvaus = {
          FI: getLanguageSpecificValueOrValidValue(robj.metadata,"kuvaus","FI"),
          SV: getLanguageSpecificValueOrValidValue(robj.metadata,"kuvaus","SV"),
          EN: getLanguageSpecificValueOrValidValue(robj.metadata,"kuvaus","EN")
        };
        ret.push(obj);
      });
      //* localStorage:
      //console.log("callURI trying to save..."+fulluri)
      //console.debug(ret)
      store(fulluri,ret);
      //*/
      return ret;
    });
  }

  //* localStorage:
  let store = function(key,value) {
    //console.log("KoodistoService.store "+key);
    if (!key) return;
    if (typeof(Storage) !== "undefined") {
      //console.debug(localStorage.getItem(key))
      //console.debug(localStorage.getItem(key+"dateset"))
      if (value) { // store given value no matter what
        // tallenna localStorageen
        localStorage.setItem(key+'dateset',new Date());
        //console.log("store save "+key);
        //console.debug(value);
        localStorage.setItem(key,JSON.stringify(value));
      }
      if (localStorage.getItem(key)) {
        let age = (new Date()).getTime() - new Date(localStorage.getItem(key+'dateset')).getTime();
        //console.debug(age+" > "+maxage)
        if (age > maxage) { // remove item if outaged
          localStorage.removeItem(key);
          localStorage.removeItem(key+'dateset');
        }
      }
    } else {
      console.log("KoodistoService no Web Storage")
      // then what? so what?
    }
    //console.log("store return "+key);
    //console.debug(localStorage.getItem(key))
    return JSON.parse(localStorage.getItem(key));
  }

  let clearStorage = function(){
    angular.forEach(localStorage,function(l,key){
      //console.debug(key)
      localStorage.removeItem(key)
    });
  }
  //*/

  //
  // ACCESSORS
  //

  //* localStorage
  this.reset = function() {
    console.log("Koodisto.reset: clearing localStorage")
    clearStorage()
  }
  //*/
  // hae yksittäisen koodiarvon tiedot
  this.getKoodi = function(koodisto,koodi) {
    if(!koodisto) return;
    if(!koodi) return;
    var uri = baseuri+(koodisto+"/koodi/"+koodisto+"_"+koodi).toLowerCase();
    return callURI(uri); // nb! returning array!
  }

  // hae koko koodiston koodien tiedot yhdellä kutsulla
  this.getKoodisto = function(koodisto) {
    if(!koodisto) return;
    return callURI(baseuri+koodisto+"/koodi"+"?onlyValidKoodis=false");
  }

  // hae koko koodisto ja sen koodeihin sisältyvät koodit
  // - pitäisi valita/tietää minkä koodiston koodit jos useita!
  // - vain ennalta tunnettuja!
  // -- julkaisunpaaluokka -> julkaisutyyppi
  // -- paatieteenala -> tieteenala
  // - isot luokitukset, kuten koulutus, harkinnan mukaan
  this.getLuokitus = function(koodisto) {
    if(!koodisto) return;

    //let baseuri = this.baseuri; // kopioi lokaaliksi muuttujaksi (this skooppi vaihtelee)
    //let callURI = this.callURI;
    let getAlatyypit = this.getAlatyypit;
    //return this.getKoodisto(koodisto)
    //.then(function (robj){
    let promise = this.getKoodisto(koodisto);
    return promise.then(function (robj){
      let ret=[];
      angular.forEach(robj,function(aobj,akey){
        let obj=aobj;
        let alapromise = getAlatyypit(koodisto,aobj.arvo);
        alapromise.then(function (o) {
          obj.alatyypit = o;
        });
        ret.push(obj);
      });
      return ret;
    });
  }
  this.getAlatyypit = function(koodisto,arvo) {
    if(!koodisto) return;
    if(!arvo) return;
    let alapromise = callURI(baseuri+'relaatio/sisaltyy-alakoodit/'+koodisto+'_'+arvo.toLowerCase());
    return alapromise.then(function (robj) {
      // JUSTUS exceptions
      if (koodisto=='julkaisunpaaluokka') {
        let ret=[];
        angular.forEach(robj,function(aobj,akey){
          if (1==0
            || (arvo=="A" && ["A1","A2","A3","A4"          ].indexOf(aobj.arvo)>=0)
            || (arvo=="B" && ["B1","B2","B3"               ].indexOf(aobj.arvo)>=0)
            || (arvo=="C" && ["C1","C2"                    ].indexOf(aobj.arvo)>=0)
            || (arvo=="D" && ["D1","D2","D3","D4","D5","D6"].indexOf(aobj.arvo)>=0)
            || (arvo=="E" && ["E1","E2","E3"               ].indexOf(aobj.arvo)>=0)
            || (arvo=="G" && [               "G4","G5"     ].indexOf(aobj.arvo)>=0)
          ) {
            ret.push(aobj);
          }
        });
        return ret;
      }
      return robj;
    });
  }

  this.getCode = function (codes,codeset,code) {
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

}]);//-KoodistoService
