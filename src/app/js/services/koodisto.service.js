'use strict';

angular.module('KoodistoService', [])
.service('KoodistoService', [
  '$log', '$http', 'DEMO_ENABLED', function($log, $http, DEMO_ENABLED) {
    // Opintopolku / Koodisto Service:
    function getLanguageSpecificValue(fieldArray, fieldName, language) {
      if (fieldArray) {
        for (let i = 0; i < fieldArray.length; i++) {
          if (fieldArray[i].kieli === language) {
            const result = fieldArray[i][fieldName];
            return result == null ? '' : result;
          }
        }
      }
      return '';
    }
    function getLanguageSpecificValueOrValidValue(fieldArray, fieldName, language) {
      let specificValue = getLanguageSpecificValue(fieldArray, fieldName, language);

      if (specificValue === '' && language !== 'FI') {
        specificValue = getLanguageSpecificValue(fieldArray, fieldName, 'FI');
      }
      if (specificValue === '' && language !== 'SV') {
        specificValue = getLanguageSpecificValue(fieldArray, fieldName, 'SV');
      }
      if (specificValue === '' && language !== 'EN') {
        specificValue = getLanguageSpecificValue(fieldArray, fieldName, 'EN');
      }
      return specificValue;
    }

    //
    // VARIABLES
    //

    let baseuri = 'https://virkailija.opintopolku.fi/koodisto-service/rest/json/';
    if (DEMO_ENABLED) {
      baseuri = 'https://virkailija.testiopintopolku.fi/koodisto-service/rest/json/';
    }

    const maxage = 3600000; // 3600000 ms, 1 hour
    // placeholder for KoodistoService specific cache control ($http.defaults.cache affects the whole app!)
    const httpcache = false;

    //
    // internal private functions
    // not in 'this', so unscoped
    //

    // suorita HTTP-kutsu ja palauta JSON
    const callURI = function(fulluri) {
      //* localStorage:
      // let store = this.store;
      const stored = store(fulluri);
      if (stored) {
        // tässäpä hacki. kutsutaan '/' (localhost) jotta saadaan sama palautusmuoto. *huoh*
        // huomaa myös että palautetaan stored-muuttuja
        return $http.get('/').then(function(response) {
          return stored;
        });
      }
      $log.debug('KoodistoService.callURI NOT STORED calling HTTP', fulluri);
      return $http.get(fulluri, { cache: httpcache }).then(function(response) {
        const ret = [];
        // make an array for loop
        let responsedataarray = [];
        if (response.data.constructor === Array) {
          responsedataarray = response.data;
        }
        else {
          responsedataarray.push(response.data);
        }
        angular.forEach(responsedataarray, function(robj, skey) {
          const obj = {};
          obj.arvo = robj.koodiArvo;
          obj.selite = {
            FI: getLanguageSpecificValueOrValidValue(robj.metadata, 'nimi', 'FI'),
            SV: getLanguageSpecificValueOrValidValue(robj.metadata, 'nimi', 'SV'),
            EN: getLanguageSpecificValueOrValidValue(robj.metadata, 'nimi', 'EN')
          };
          obj.kuvaus = {
            FI: getLanguageSpecificValueOrValidValue(robj.metadata, 'kuvaus', 'FI'),
            SV: getLanguageSpecificValueOrValidValue(robj.metadata, 'kuvaus', 'SV'),
            EN: getLanguageSpecificValueOrValidValue(robj.metadata, 'kuvaus', 'EN')
          };
          ret.push(obj);
        });
        //* localStorage:
        store(fulluri, ret);
        return ret;
      });
    };

    //* localStorage:
    const store = function(key, value) {
      if (!key) return;
      if (typeof (Storage) !== 'undefined') {
        if (value) { // store given value no matter what
          // tallenna localStorageen
          localStorage.setItem(key + 'dateset', new Date());
          localStorage.setItem(key, JSON.stringify(value));
        }
        if (localStorage.getItem(key)) {
          const age = (new Date()).getTime() - new Date(localStorage.getItem(key + 'dateset')).getTime();
          if (age > maxage) { // remove item if outaged
            localStorage.removeItem(key);
            localStorage.removeItem(key + 'dateset');
          }
        }
      }
      else {
        $log.debug('KoodistoService no Web Storage');
      }
      return JSON.parse(localStorage.getItem(key));
    };

    const clearStorage = function() {
      angular.forEach(localStorage, function(l, key) {
        localStorage.removeItem(key);
      });
    };

    //
    // ACCESSORS
    //

    //* localStorage
    this.reset = function() {
      clearStorage();
    };

    // hae yksittäisen koodiarvon tiedot
    this.getKoodi = function(koodisto, koodi) {
      if (!koodisto || !koodi) return;

      const uri = baseuri + (koodisto + '/koodi/' + koodisto + '_' + koodi).toLowerCase();
      return callURI(uri); // nb! returning array!
    };

    // hae koko koodiston koodien tiedot yhdellä kutsulla
    this.getKoodisto = function(koodisto) {
      if (!koodisto) return;
        return callURI(baseuri + koodisto + '/koodi' + '?onlyValidKoodis=false');
    };

    // hae koko koodisto ja sen koodeihin sisältyvät koodit
    // - pitäisi valita/tietää minkä koodiston koodit jos useita!
    // - vain ennalta tunnettuja!
    // -- julkaisunpaaluokka -> julkaisutyyppi
    // -- paatieteenala -> tieteenala
    // - isot luokitukset, kuten koulutus, harkinnan mukaan
    this.getLuokitus = function(koodisto) {
      if (!koodisto) return;

      const getAlatyypit = this.getAlatyypit;
      const promise = this.getKoodisto(koodisto);
      return promise.then(function (robj) {
        const ret = [];
        angular.forEach(robj, function(aobj, akey) {
          const obj = aobj;
          const alapromise = getAlatyypit(koodisto, aobj.arvo);
          alapromise.then(function (o) {
            obj.alatyypit = o;
          });
          ret.push(obj);
        });
        return ret;
      });
    };

    this.getAlatyypit = function(koodisto, arvo) {
      if (!koodisto || !arvo) return;

      const alapromise = callURI(baseuri + 'relaatio/sisaltyy-alakoodit/' + koodisto + '_' + arvo.toLowerCase());
      return alapromise.then(function (robj) {
        // JUSTUS exceptions
        if (koodisto === 'julkaisunpaaluokka') {
          const ret = [];
          angular.forEach(robj, function(aobj, akey) {
            if ((arvo === 'A' && ['A1', 'A2', 'A3', 'A4'].indexOf(aobj.arvo) >= 0) ||
              (arvo === 'B' && ['B1', 'B2', 'B3'].indexOf(aobj.arvo) >= 0) ||
              (arvo === 'C' && ['C1', 'C2'].indexOf(aobj.arvo) >= 0) ||
              (arvo === 'D' && ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'].indexOf(aobj.arvo) >= 0) ||
              (arvo === 'E' && ['E1', 'E2', 'E3'].indexOf(aobj.arvo) >= 0) ||
              (arvo === 'F' && ['F1', 'F2', 'F3'].indexOf(aobj.arvo) >= 0) ||
              (arvo === 'G' && ['G4', 'G5'].indexOf(aobj.arvo) >= 0)

            ) {
              ret.push(aobj);
            }
          });
          return ret;
        }
        return robj;
      });
    };

    this.getCode = function (codes, codeset, code) {
      if (!codes || !codes[codeset]) return;

      for (let len = codes[codeset].length, i = 0; i < len && i in codes[codeset]; i++) {
        const c = codes[codeset][i];
        if (c.arvo === code) {
          return c;
        }
        if (c.alatyypit) {
          for (let jen = c.alatyypit.length, j = 0; j < jen && j in c.alatyypit; j++) {
            const a = c.alatyypit[j];
            if (a.arvo === code) {
              return a;
            }
          }
        }
        if (c.alatyypit2017) {
          for (let jen = c.alatyypit2017.length, j = 0; j < jen && j in c.alatyypit2017; j++) {
            const a = c.alatyypit2017[j];
            if (a.arvo === code) {
              return a;
            }
          }
        }
      }
    };
  }
]);
