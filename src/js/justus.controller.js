'use strict';

justusApp.controller('JustusController',
['$scope','$http','$location','$state','$stateParams','CrossRefService','VIRTAService','JUFOService','KoodistoService','JustusService','APIService',
function($scope,$http,$location,$state,$stateParams,CrossRef,VIRTA,JUFO,Koodisto,Justus,API)
{
  $scope.useTekijat = function(input) { // tekijat string
    //console.log("useTekijat "+input+" => "+((input.match(/[^;]+;?/g) || []).length));
    if(!input){
      $scope.justus.julkaisuntekijoidenlukumaara=0;
      return;
    }
    if(input.length==0){
      $scope.justus.julkaisuntekijoidenlukumaara=0;
    }else{
      $scope.justus.julkaisuntekijoidenlukumaara=(input.match(/[^;]+;?/g) || []).length;
    }
  }

  $scope.useKopioiTekijat = function(input) {
    var tempstr = input;
    for (var i=0; i<$scope.justus.julkaisuntekijoidenlukumaara; i++) {
      //console.log("useKopioiTekijat i "+i);
      var sb = 0;
      var se = tempstr.indexOf(',');
      var eb = tempstr.indexOf(',')+1;
      var ee = tempstr.indexOf(';')>=0?tempstr.indexOf(';'):tempstr.length;
      $scope.justus.organisaationtekijat[i] = {};
      $scope.justus.organisaationtekijat[i].sukunimi=tempstr.substring(sb,se).trim();
      $scope.justus.organisaationtekijat[i].etunimet=tempstr.substring(eb,ee).trim();
      $scope.justus.organisaationtekijat[i].alayksikot = [""];
      tempstr=tempstr.substring(ee+1);
    }
  }

  $scope.useOrganisaationtekijatAlayksikko = function(parIndex,index,input) {
    //console.log("useOrganisaationtekijatAlayksikko "+parIndex+" "+index+" "+input)
    $scope.justus.organisaationtekijat[parIndex].alayksikot[index] = input;
  }

  $scope.useJulkaisutyyppiPaa = function(input) {
    if(!input) return
    $scope.julkaisutyyppi_paa = input;
  }

  $scope.refreshKanavanimet = function(tyyppi,input) {
    if(tyyppi == null) return;
    if(input == null) return;
    if(input.length < 5) return [];
    //console.log("refreshKanavanimet "+tyyppi+" "+input);
    return JUFO.etsikanava(input,tyyppi)
    .then(function (response){
      if (isArray(response.data)) {
        if (tyyppi==3) $scope.konferenssinimet = response.data;
        if (tyyppi==2) $scope.kustantajanimet = response.data;
        if (tyyppi==1) $scope.lehtinimet = response.data;
        //console.debug(response.data);
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
      if (obj.Publisher) $scope.justus.kustantaja = htmlUnescape(obj.Publisher);
    });
  }
  $scope.fetchLehtisarja = function(input) { //issn
    if(input == null) return;
    JUFO.etsiissn(input)
    .then(function (response){
      var jobj = response.data;
      var jufotunnus = jobj[0].Jufo_ID; // voisi asettaa jo scopeen, mutta seuraavassa kutsussa
      $scope.useLehtisarja(jufotunnus); // vain issn?
      $scope.lehtinimet.selected = jobj[0];
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
          //$scope.julkaisunnimi = robj.title; //TODO: lista?
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
          $scope.justus.numero = robj.issue||""; //todo?
          $scope.justus.sivut = robj.page||"";
          if(robj['article-number'])
            $scope.justus.artikkelinumero = robj['article-number'];

          var s = "";
          angular.forEach(robj.author, function(aobj,akey){
            if(s.length>0) s+="; ";
            s+=aobj.family+", "+aobj.given;
          });
          $scope.justus.tekijat = s;
          $scope.useTekijat(s);
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
        //console.log("useJulkaisunnimi loaded "+source+" "+input);
        $scope.useVaihe(3);//->tietojen syöttöön
      }
      , function errorCb(response){
        console.log("useJulkaisunnimi "+source+" "+input+" ei löytynyt!");
        $scope.julkaisuhaettu = false;
        return false;
      });
    }
    if (source=="VIRTA") {
      $scope.virtaLataa = true;
      VIRTA.get(input)
      .then(function successCb(response){
        var robj = response.data;
        $scope.justus.doitunniste = robj.DOI||"";
        $scope.justus.julkaisunnimi = robj.JulkaisunNimi||"";
        //console.log("useJulkaisunnimi ISSN "+typeof robj.ISSN+" "+robj.ISSN);
        $scope.justus.issn = robj.ISSN||"";
        $scope.justus.volyymi = robj.VolyymiTeksti||"";
        $scope.justus.numero = robj.LehdenNumeroTeksti||"";
        $scope.justus.sivut = robj.SivunumeroTeksti||"";
        if(robj['Artikkelinumero']) {
          $scope.justus.artikkelinumero = robj['Artikkelinumero'];
        }
        var s = "";
        if (robj['Tekijat']) {
          if (robj.Tekijat['Tekija']) {
            //nb! lista vai ei?
            if (robj.Tekijat.Tekija['Sukunimi']) {
              s+=robj.Tekijat.Tekija.Sukunimi+", "+robj.Tekijat.Tekija.Etunimet;
            } else {
              angular.forEach(robj.Tekijat.Tekija, function(aobj,akey){
                if(s.length>0) s+="; ";
                s+=aobj.Sukunimi+", "+aobj.Etunimet;
              });
            }
          }
        }
        $scope.justus.tekijat = s;
        $scope.useTekijat(s);
        $scope.justus.julkaisuvuosi = robj.JulkaisuVuosi;
        $scope.fetchLehtisarja($scope.justus.issn);
        $scope.julkaisuhaettu = true;

        $scope.virtaLataa = false;
        //console.log("useJulkaisunnimi loaded "+source+" "+input);
        $scope.useVaihe(3);//->tietojen syöttöön
      }
      , function errorCb(response){
        console.log("useJulkaisunnimi "+source+" "+input+" ei löytynyt!");
        $scope.julkaisuhaettu = false;
        return false;
      });
    }
  }

  $scope.useJulkaisuntieteenala = function(input,index) {
    //console.log("useJulkaisuntieteenala "+input+" "+index);
    if(input == null) return;
    if(input.length==1) {
      $scope.julkaisuntieteenala_paa = input;
      $scope.alatieteenalat = $scope.getCode('tieteenalat',input).alatyypit;
    } else {
      if ($scope.justus.julkaisuntieteenalat.indexOf(input)<0) {
        $scope.julkaisuntieteenala_paa = null;
        $scope.justus.julkaisuntieteenalat[index] = input;
      }
    }
  }

  $scope.useVaihe = function(vaihe) {
    console.log("useVaihe "+$scope.ui_vaihe+" => "+vaihe);
    $scope.ui_vaihe=vaihe;
    $state.go('justus', $scope.justus);
  }

  $scope.useRequiredHighlight = function() {
    $scope.requiredHighlight=!$scope.requiredHighlight;
  }

  $scope.useField = function(field,input) {
    $scope.justus[field] = input;
  }

  // map from service (generic) to scope
  $scope.getCode = function(codeset,code) {
    return Koodisto.getCode($scope.codes,codeset,code);
  }

  $scope.isVisible = function(field) {
    return Justus.isVisible(field);
  }
  $scope.isRequired = function(field) {
    return Justus.isRequired(field);
  }
  $scope.isValid = function(field) {
    return Justus.isValid(field);
  }

  $scope.getInvalids = function() {
    return Justus.getInvalids();
  }
  $scope.isJustusValid = function() {
    return $scope.getInvalids().length==0;
  }

  //
  // VARIABLES AND INITIALIZE
  //
  //index provides: lang, i18n, codes

  $scope.meta = API.meta;

  $scope.justus = Justus.justus; // when must have's are put in service! (see below)
  $scope.requirement = Justus.requirement;
  $scope.condition = Justus.condition;
  $scope.visible = Justus.visible;

  $scope.checkISSN = Justus.checkISSN;
  $scope.checkORCID = Justus.checkORCID;

  // other setups
  $scope.lehtinimet = [];
  $scope.kustantajanimet = [];
  $scope.konferenssinimet = [];
  $scope.julkaisunnimet = [];
  $scope.julkaisu = {}; // ui-select, must set! (.selected reserved)

  $scope.crossrefLataa = false;
  $scope.virtaLataa = false;

  $scope.requiredHighlight = false;

  // more on justus-variable
  //$scope.justus.jufotunnus = "";
  //$scope.justus.jufoluokitus = "";

  //
  // INITIALIZE
  //  * fill in the form
  //  * read possible parameters
  //  * sanitize variables
  //

  // TODO Coming up? UI-router and state handling
  /* no use? or should switch to $transitions?
  $scope.$on('$locationChangeStart', function() {
    console.log("locationChangeStart");
    console.debug($location)
    console.debug($stateParams)
  });
  $scope.$on('$viewContentLoaded', function(event) {
    console.debug("viewContentLoaded event,stateParams:",event,$stateParams);
  });
  //*/

  // finalizeInit - all values should be in place but if there's some critical missing
  let finalizeInit = function() {
    
    // sanity checks for UI
    // must set (ui behaves poorly otherwise)
    if (!$scope.justus.organisaationtekijat) {
      $scope.justus.organisaationtekijat = [{}];
      $scope.justus.organisaationtekijat[0].alayksikot = [""];
    }
    if (!$scope.justus.organisaationtekijat.alayksikot) {
      $scope.justus.organisaationtekijat[0].alayksikot = [""];
    }
    if (!$scope.justus.avainsanat) {
      $scope.justus.avainsanat = [""];
    }
    if (!$scope.justus.julkaisuntieteenalat) {
      $scope.justus.julkaisuntieteenalat = [""];
    }

    // julkaisutyyppi / vaihe
    $scope.ui_vaihe = $stateParams.vaihe||0;
    console.debug("finalizeInit julkaisutyyppi",$scope.justus.julkaisutyyppi)
    if ($scope.justus.julkaisutyyppi && $scope.justus.julkaisutyyppi.length>1) {
      // make sure both values are set (paa,ala):
      $scope.useJulkaisutyyppiPaa($scope.justus.julkaisutyyppi.substring(0,1));
      // if not valid and trying to enter saving stage:
      if ($scope.ui_vaihe==4 && (!$scope.isJustusValid() || !$scope.isValid('organisaationtekijat'))) {
        // TO-DO? näytä jokin message!? (sivun ulkoasu kyllä muuttuu jo, mutta miksi...)
        $scope.useVaihe(3);
      }
    } else {
      // ei julkaisutyyppiä ja vaihe jotain liikaa, siirrytään valitsemaan:
      if ($scope.ui_vaihe>2) {
        // TO-DO? näytä jokin message!? (sivun ulkoasu kyllä muuttuu jo, mutta miksi...)
        $scope.useVaihe(2);
      }
    }
  }

  let startInit = function() {
    console.debug("startInit stateParams",$stateParams)
    if ($stateParams.id) {
      console.debug("startInit stateParams has id:",$stateParams.id)
      $scope.justus.id = $stateParams.id;
      API.get("uijulkaisut",$scope.justus.id).then(function (dat){
        angular.forEach(dat,function(jobj,jkey){
          // dont replace service object, instead replace its values
          angular.forEach(jobj,function(j,k){
            //console.debug("startInit from DB",k,j)
            $scope.justus[k]=j;
          });
        });
        // convert to date type
        $scope.justus.modified = new Date($scope.justus.modified);
        finalizeInit();
      });
    } else {
      finalizeInit();
    }
    // to-do: we could loop stateParams to read URI parameters and override values from database..
    // ...but that's too fancy for now
  }

  //angular.forEach($stateParams, function(v,k){ console.debug("JUSTUS INIT stateParams",k,v); });
  startInit();

}]);//-JustusController
