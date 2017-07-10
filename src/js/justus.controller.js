'use strict';

justusApp.controller('JustusController', [
  '$rootScope', '$scope', '$http', '$state', '$stateParams', 'CrossRefService', 'VIRTAService',
  'JUFOService', 'FintoService', 'KoodistoService', 'JustusService', 'APIService', 'ValidationService',
  function($rootScope, $scope, $http, $state, $stateParams, CrossRef, VIRTA, 
  JUFO, Finto, Koodisto, Justus, API, Validation) {
    //index provides: lang, i18n, codes, user, ...

    $scope.meta = API.meta;

    $scope.justus = Justus.justus; // do put "must have's" in service!
    $scope.pattern = Justus.pattern; // ng-pattern

    // other setups
    $scope.tekijatTags = [];
    $scope.lehtinimet = [];
    $scope.kustantajanimet = [];
    $scope.konferenssinimet = [];
    $scope.julkaisunnimet = [];
    $scope.julkaisu = {}; // ui-select, must set! (.selected reserved)

    $scope.crossrefLataa = false;
    $scope.virtaLataa = false;

    $scope.requiredHighlight = false;
    $scope.invalidFields = [];

    // more on justus-variable
    //$scope.justus.jufotunnus = "";
    //$scope.justus.jufoluokitus = "";

    // Parses first- and lastnames from a string of names and returns them in a list of objects [{ firstName: '', lastName: '' }, ...]
    var parseNames = function(namesString) {
      let parsedNames = [];
      if(namesString && namesString.length > 0) {
        let namePairs = namesString.split(';');

        namePairs.map(function(namePair) {
          let splittedNames = namePair.split(',');
          parsedNames.push({
            lastName: splittedNames[0] ? splittedNames[0].trim() : '',
            firstName: splittedNames[1] ? splittedNames[1].trim() : ''
          })
        });
      }

      return parsedNames;
    }

    $scope.useTekijat = function() {
      // Add space after each comma if none entered
      $scope.tekijatTags = $scope.tekijatTags.map(function(tag, index) {
        if(tag.text && tag.text.indexOf(', ') === -1) {
          tag.text = tag.text.replace(',', ', ');
        }
        return tag;
      });

      $scope.justus.tekijat = '';
      $scope.justus.tekijat = $scope.tekijatTags.map(function(tag, index) {
        return tag.text;
      }).join('; ')
      $scope.justus.julkaisuntekijoidenlukumaara = $scope.tekijatTags.length;
    }

    $scope.useKopioiTekijat = function(input) {
      var tempstr = input;
      for (var i=0; i<$scope.justus.julkaisuntekijoidenlukumaara; i++) {
        var sb = 0;
        var se = tempstr.indexOf(',');
        var eb = tempstr.indexOf(',')+1;
        var ee = tempstr.indexOf(';')>=0?tempstr.indexOf(';'):tempstr.length;
        $scope.justus.organisaatiotekija[i] = {};
        $scope.justus.organisaatiotekija[i].sukunimi=tempstr.substring(sb,se).trim();
        $scope.justus.organisaatiotekija[i].etunimet=tempstr.substring(eb,ee).trim();
        $scope.justus.organisaatiotekija[i].alayksikko = [""];
        tempstr=tempstr.substring(ee+1);
      }
    }

    $scope.useOrganisaatiotekijaAlayksikko = function(parIndex,index,input) {
      $scope.justus.organisaatiotekija[parIndex].alayksikko[index] = {};
      $scope.justus.organisaatiotekija[parIndex].alayksikko[index].alayksikko = input;
    }

    $scope.useJulkaisutyyppiPaa = function(input) {
      if(!input) return
      $scope.julkaisutyyppi_paa = input;
    }

    $scope.refreshKanavanimet = function(tyyppi,input) {
      if(tyyppi == null) return;
      if(input == null) return;
      if(input.length < 5) return [];
      return JUFO.etsikanava(input,tyyppi)
      .then(function (response){
        if (angular.isArray(response.data)) {
          if (tyyppi==3) $scope.konferenssinimet = response.data;
          if (tyyppi==2) $scope.kustantajanimet = response.data;
          if (tyyppi==1) $scope.lehtinimet = response.data;
          return response.data;
        }
      });
    }
    $scope.useLehtisarja = function(input) { //jufo_id
      if(input == null) return;
      JUFO.kanava(input)
      .then(function (obj){
        $scope.justus.lehdenjulkaisusarjannimi = obj.Name;
        $scope.justus.jufotunnus = input; // tai vastauksesta...
        $scope.justus.jufoluokitus = obj.Level;
        if (obj.ISSN1) $scope.justus.issn = obj.ISSN1;
        if ($scope.justus.issn == null || $scope.justus.issn == "")
          if (obj.ISSN2) $scope.justus.issn = obj.ISSN2;
        if (obj.Publisher) {
          $scope.justus.kustantaja = obj.Publisher
            // "html unescape"
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&');
        }
      });
    }
    $scope.fetchLehtisarja = function(input) { //issn
      if(input == null) return;
      JUFO.etsiissn(input)
      .then(function (response){
        var jobj = response.data;
        var jufotunnus = jobj && jobj.length > 0 ? jobj[0].Jufo_ID : null; // voisi asettaa jo scopeen, mutta seuraavassa kutsussa
        $scope.useLehtisarja(jufotunnus); // vain issn?
        $scope.lehtinimet.selected = jobj && jobj.length > 0 ? jobj[0] : null;
      });
    }

    $scope.refreshJulkaisunnimet = function(input,tekija) {
      if(input == null){ return; }
      if(input.length < 3){ return; }

      $scope.julkaisunnimet = [];
      // CrossRef :: haku julkaisun nimellä, mutta voi olla myös tekijän nimi
      $scope.crossrefLataa = true;
      CrossRef.worksquery(input,tekija)
      .then(function(obj){
        $scope.julkaisunnimet = $scope.julkaisunnimet.concat(obj);
        $scope.crossrefLataa = false;
      });

      // VIRTA :: haku julkaisun nimellä, mutta voi olla myös tekijän nimi
      $scope.virtaLataa = true;
      VIRTA.fetch(input,tekija)
      .then(function (obj){
        $scope.julkaisunnimet = $scope.julkaisunnimet.concat(obj);
        $scope.virtaLataa = false;
      });
    }

    $scope.useJulkaisunnimi = function(source, input) { // input == identifier
      if(!source) return;
      if(!input) return;
      if (source=="CrossRef") {
        $scope.crossrefLataa = true;
        CrossRef.works(input)
        .then(function successCb(response){
          angular.forEach(response.data, function(robj,rkey){
            $scope.justus.doitunniste = input;
            if(robj.title){
              if(typeof robj.title=="object" && robj.title.length>0){
                $scope.justus.julkaisunnimi = robj.title[0];
              }else{
                $scope.justus.julkaisunnimi = robj.title;
              }
            }
            if(robj.ISSN){
              if(typeof robj.ISSN=="object" && robj.ISSN.length>0){
                $scope.justus.issn = robj.ISSN[0];
              }else{
                $scope.justus.issn = robj.ISSN;
              }
            }
            $scope.justus.volyymi = robj.volume||"";
            $scope.justus.numero = robj.issue||"";
            $scope.justus.sivut = robj.page||"";
            if(robj['article-number'])
              $scope.justus.artikkelinumero = robj['article-number'];

            var s = "";
            angular.forEach(robj.author, function(aobj,akey){
              if(s.length>0) s+="; ";
              s+=aobj.family+", "+aobj.given;
            });
            $scope.justus.tekijat = s;

            // Initialize tekijatTags input
            parseNames($scope.justus.tekijat).map(function(nameObject) {
              $scope.tekijatTags.push(`${nameObject.lastName}, ${nameObject.firstName}`);
            });
            $scope.useTekijat();
            if(robj.issued){
              if(robj.issued['date-parts']){
                var s = ""+robj.issued['date-parts'];
                $scope.justus.julkaisuvuosi = s.split(",")[0];
              }
            }
            $scope.fetchLehtisarja($scope.justus.issn);
            $scope.julkaisuhaettu = true;
          });
          $scope.crossrefLataa = false;
          $scope.useVaihe(3);//->tietojen syöttöön
        }
        , function errorCb(response){
          console.log("useJulkaisunnimi "+source+" "+input+" ei löytynyt!");
          $scope.julkaisuhaettu = false;
          return false;
        });
      }
      // Prefill publication from VIRTA
      if (source=="VIRTA") {
        $scope.virtaLataa = true;
        VIRTA.get(input)
        .then(function successCb(response) {
          let robj = response.data;
          //  loop VIRTA services fields mapped to justus
          angular.forEach(VIRTA.fields, function(virta, justusFieldKey) {
            if ((robj[virta.get] !== null || robj[virta.get] !== undefined) && justusFieldKey !== 'julkaisuntila') {
              $scope.useField(justusFieldKey, robj[virta.get]);
            }
          });

          $scope.fetchLehtisarja($scope.justus.issn);
          // Initialize tekijatTags input
          parseNames($scope.justus.tekijat).map(function(nameObject) {
            $scope.tekijatTags.push(`${nameObject.lastName}, ${nameObject.firstName}`);
          });
          $scope.useTekijat();

          let o = [];
          if (robj['Tekijat']) {
            if (robj.Tekijat['Tekija']) {
              let tmp = [];
              if (angular.isArray(robj.Tekijat.Tekija)) {
                tmp = robj.Tekijat.Tekija;
              } else {
                tmp.push(robj.Tekijat.Tekija);
              }
              angular.forEach(tmp, function(aobj,akey){
                let a = [];
                if (aobj.Yksikot) {
                  if (angular.isArray(aobj.Yksikot)) {
                    angular.forEach(aobj.Yksikot,function(yobj,ykey){
                      a.push({alayksikko:yobj.YksikkoKoodi});
                    });
                  } else {
                    a.push({alayksikko:aobj.Yksikot.YksikkoKoodi});
                  }
                }
                o.push({
                  'sukunimi': aobj.Sukunimi,
                  'etunimet': aobj.Etunimet,
                  'orcid': null,
                  'alayksikko': a
                });
              });
            }
          }
          $scope.justus.organisaatiotekija = o;

          //$scope.justus.tieteenala = [{tieteenalakoodi:'', jnro:null}];
          let t = [];
          if (robj['TieteenalaKoodit']) {
            if (robj.TieteenalaKoodit['TieteenalaKoodi']) {
              let tmp = [];
              if (angular.isArray(robj.TieteenalaKoodit.TieteenalaKoodi)) {
                tmp = robj.TieteenalaKoodit.TieteenalaKoodi;
              } else {
                tmp.push(robj.TieteenalaKoodit.TieteenalaKoodi);
              }
              angular.forEach(tmp, function(tobj,tkey){
                t.push({'tieteenalakoodi': ''+tobj.content, 'jnro': ''+tobj.JNro});
              });
            }
          }
          $scope.justus.tieteenala = t;

          // missing lists?
          fillMissingJustusLists();

          $scope.julkaisuhaettu = true;

          $scope.virtaLataa = false;
          $scope.useVaihe(3);//->tietojen syöttöön
        }
        , function errorCb(response){
          console.log("useJulkaisunnimi "+source+" "+input+" ei löytynyt!");
          $scope.julkaisuhaettu = false;
          return false;
        });
      }
    }

    $scope.refreshAvainsanat = function(input) {
      if(input == null) return;
      if(input.length < 3) return [];
      return Finto.search($scope.lang,input)
      .then(
        function successCb(response){
          $scope.avainsanatLataa = false;
          return response.data.results;
        },function errorCb(response){
          console.log("refreshAvainsanat "+input+" ei löytynyt!");
          $scope.avainsanatLataa = false;
          return false;
        }
      );
    }

    $scope.useTieteenala = function(input) {
      if (input === null) return;

      // Selecting päätieteenala, filter alatieteenala input options
      if (input.length === 1) {
        $scope.tieteenala_paa = input;
        $scope.alatieteenalat = $scope.getCode('tieteenalat', input).alatyypit;
      }

      // Otherwise selecting alatieteenala, initialize a new empty field
      else {
        if ($scope.justus.tieteenala.indexOf(input) < 0) {
          
          // Append new field if the field was empty
          let appendNewField = $scope.justus.tieteenala[$scope.justus.tieteenala.length - 1].tieteenalakoodi === '' ? true : false;

          $scope.justus.tieteenala[$scope.justus.tieteenala.length - 1] = { 
            tieteenalakoodi: input, 
            jnro: ''+($scope.justus.tieteenala.length) 
          };

          if(appendNewField === true) {
            // Add a new empty field for the next selection
            $scope.justus.tieteenala.push({ 
              tieteenalakoodi: '', 
              jnro: null
            });
          }
        }
      }
    }

    $scope.useVaihe = function(vaihe) {
      $scope.vaihe=vaihe;
      if ($scope.justus.julkaisutyyppi && $scope.justus.julkaisutyyppi.length>1) {
        // make sure both values are set (paa,ala):
        $scope.useJulkaisutyyppiPaa($scope.justus.julkaisutyyppi.substring(0,1));
        // Stay on stage 3 if stage form not valid
        if ($scope.vaihe == 4) {
          if(!$scope.isJustusValid()) {
            $scope.useVaihe(3);
            return;
          }
          // Add user's organisaatiotunnus to the form
          this.justus.organisaatiotunnus = domain_organization[$rootScope.user.domain].code;
        }
      } 
      else {
        // ei julkaisutyyppiä ja vaihe jotain liikaa, siirrytään valitsemaan:
        if ($scope.vaihe>2) {
          // TO-DO? näytä jokin message!? (sivun ulkoasu kyllä muuttuu jo, mutta miksi...)
          $scope.useVaihe(2);
          return;
        }
      }
      //messes up initialization even though brings history to use...: $state.go('justus', {lang:$scope.lang,id:$scope.justus.id,vaihe:vaihe});
    }

    $scope.useRequiredHighlight = function() {
      $scope.requiredHighlight=!$scope.requiredHighlight;
    }

    $scope.useField = function(field, input) {
      if (input !== null && input !== undefined) {
        $scope.justus[field] = String(input);
      }
    }

    // map from service (generic) to scope
    $scope.getCode = function(codeset,code) {
      return Koodisto.getCode($scope.codes,codeset,code);
    }

    $scope.isFieldVisible = function(field) {
      return Justus.isFieldVisible(field);
    }

    $scope.isFieldRequired = function(field) {
      return Justus.isFieldRequired(field);
    }

    $scope.isValid = function(field) {
      return Justus.isValid(field);
    }

    $scope.isJustusValid = function() {
      $scope.invalidFields = Justus.getInvalidFields();
      Validation.setValidationErrors($scope.invalidFields);
      return $scope.invalidFields.length == 0;
    }

    $scope.isFieldRequired = function(fieldName) {
      return Justus.isFieldRequired(fieldName);
    }

    // INITIALIZE
    //  * fill in the form
    //  * read possible parameters
    //  * sanitize variables

    // resetJustus - clear $scope.justus variable
    // - internal unscoped function
    let resetJustus = function(){
      // do not remove or alter service related variable as it apparently
      // messes up things, instead remove its contents like so:
      angular.forEach($scope.justus,function(v,k){
        delete $scope.justus[k];
      });
    }

    // fillMissingJustusLists - for UI setup list fields if otherwise missing
    // - internal unscoped function
    // - parameter input is optional
    let fillMissingJustusLists = function(input) {
      if ((!input || input=='avainsana') && !$scope.justus.avainsana) {
        $scope.justus.avainsana = [{avainsana:''}];
      }
      if ((!input || input=='tieteenala') && !$scope.justus.tieteenala) {
        $scope.justus.tieteenala = [{tieteenalakoodi:'', jnro:null}];
      }
      if ((!input || input=='organisaatiotekija')) {
        if (!$scope.justus.organisaatiotekija || $scope.justus.organisaatiotekija.length==0) {
          $scope.justus.organisaatiotekija = [{}];
        }
      }
      if ((!input || input=='alayksikko')) {
        angular.forEach($scope.justus.organisaatiotekija,function(ot,oi){
          if(!ot.alayksikko || ot.alayksikko.length==0) {
            ot.alayksikko = [{alayksikko:''}];
          }
        });
      }
    }
    // finalizeInit - all values should be in place but if there's some critical missing
    // - internal unscoped function
    let finalizeInit = function() {
      // pattern and directive fields
      $scope.justus.isbn = $scope.justus.isbn||"";
      $scope.justus.issn = $scope.justus.issn||"";
      //orcid? $scope.justus.orcid = $scope.justus.orcid||"";
      
      // populate lists for UI
      fillMissingJustusLists();

      $scope.justus.username = $scope.user.name; // or mail or uid?
      // remove entirely as it is not needed here and messes up things later on!
      delete $scope.justus.modified;
      // keep this: $scope.justus.julkaisuntila;

      // julkaisutyyppi / vaihe
      $scope.useVaihe($stateParams.vaihe||1);
    }

    // startInit - read in data and figure out parameters and messages
    // - internal unscoped function
    let startInit = function() {
      // at very first test that user object is accessible
      if (!$scope.hasAccess('justus')) {
        $state.go('index', {lang:$scope.lang});
        // stop initializing
        return;
      }
      if ($rootScope.resetJustus) {
        resetJustus();
        // remove the reset message (so we won't keep resetting)
        delete $rootScope.resetJustus;
      }
      if ($stateParams.id) {
        // id change? clean up
        if ($scope.justus.id != $stateParams.id) {
          resetJustus();
        }
        // begin populating
        $scope.justus.id = $stateParams.id;
        // we need all info from database, especially id's
        API.get("julkaisu",$scope.justus.id).then(function(julkresp){
          angular.forEach(julkresp,function(jud,juk){
            // copy all values
            angular.forEach(jud,function(v,k){
              $scope.justus[k]=v;
            });

            // get by foreign key!
            // replace only if not set already
            if (!$scope.justus.avainsana) {
              API.get("avainsana",jud.id,"julkaisuid").then(function(avairesp){
                if (avairesp.length>0) {
                  $scope.justus.avainsana = avairesp;
                } else {
                  fillMissingJustusLists('avainsana');
                }
              });
            }
            API.get("tieteenala",jud.id,"julkaisuid").then(function(tietresp){
              if (tietresp.length>0) {
                $scope.justus.tieteenala = tietresp;
              } else {
                fillMissingJustusLists('tieteenala');
              }
            });
            $scope.justus.organisaatiotekija = [];
            API.get("organisaatiotekija",jud.id,"julkaisuid").then(function(orgaresp){
              angular.forEach(orgaresp,function(ord,ork){
                let orgaid=ord.id;
                $scope.justus.organisaatiotekija.push(ord);
                let orlen=$scope.justus.organisaatiotekija.length;
                $scope.justus.organisaatiotekija[orlen-1].alayksikko = [];
                API.get("alayksikko",orgaid,"organisaatiotekijaid").then(function(alayresp){
                  $scope.justus.organisaatiotekija[orlen-1].alayksikko = alayresp;
                  if (!$scope.justus.organisaatiotekija[orlen-1].alayksikko) {
                    $scope.justus.organisaatiotekija[orlen-1].alayksikko = [{alayksikko:''}];
                  }
                });
              });
              if ($scope.justus.organisaatiotekija.length==0) {
                fillMissingJustusLists('organisaatiotekija');
                fillMissingJustusLists('alayksikko');
              }
              finalizeInit();
            });
          });
        });
      } else {
        finalizeInit();
      }
    }

    startInit();
  }
]);//-JustusController
