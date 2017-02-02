'use strict';

justusApp.controller('justusController',
['$scope', '$http', 'CrossRefService', 'VIRTAService','JUFOService','KoodistoService','JustusService',
function($scope,$http,CrossRefService,VIRTAService,JUFOService,Koodisto,Justus)
{
  $scope.useTekijat = function(input) { // tekijat string
    console.log("useTekijat "+input+" => "+((input.match(/[^;]+;?/g) || []).length));
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
    //console.log("useKopioiTekijat "+input);
    var tempstr = input;
    for (var i=0; i<$scope.justus.julkaisuntekijoidenlukumaara; i++) {
      //console.log("useKopioiTekijat i "+i);
      var sb = 0;
      var se = tempstr.indexOf(',');
      var eb = tempstr.indexOf(',')+1;
      var ee = tempstr.indexOf(';')>=0?tempstr.indexOf(';'):tempstr.length;
      $scope.justus.organisaationtekijat[i] = {};
      $scope.justus.organisaationtekijat[i].sukunimi=tempstr.substring(sb,se).trim();
      $scope.justus.organisaationtekijat[i].etunimi=tempstr.substring(eb,ee).trim();
      $scope.justus.organisaationtekijat[i].alayksikot = [""];
      tempstr=tempstr.substring(ee+1);
    }
  }

  $scope.useOrganisaationtekijatAlayksikko = function(parIndex,index,input) {
    console.log("useOrganisaationtekijatAlayksikko "+parIndex+" "+index+" "+input);
    console.debug(input);
    $scope.justus.organisaationtekijat[parIndex].alayksikot[index] = input.arvo;
  }

  $scope.useJulkaisutyyppiPaa = function(arvo) {
    console.log("useJulkaisutyyppiPaa "+arvo);
    if(!arvo) return
    $scope.julkaisutyyppi_paa = arvo;
  }
  $scope.useJulkaisutyyppi = function(arvo) {
    console.log("useJulkaisutyyppi "+arvo);
    if(!arvo) return
    $scope.justus.julkaisutyyppi = arvo;
  }

  $scope.refreshKanavanimet = function(tyyppi,input) {
    if(tyyppi == null) return;
    if(input == null) return;
    if(input.length < 5) return [];
    console.log("refreshKanavanimet "+tyyppi+" "+input);
    return JUFOService.etsikanava(input,tyyppi)
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
    console.log("useLehtisarja "+input);
    console.debug(input)
    if(input == null) return;
    JUFOService.kanava(input)
    .then(function (obj){
      $scope.justus.lehdenjulkaisusarjannimi = obj.Name;
      $scope.justus.jufoid = input; // tai vastauksesta...
      $scope.justus.jufoluokitus = obj.Level;
      if (obj.ISSN1) $scope.justus.issn = obj.ISSN1;
      if ($scope.justus.issn == null || $scope.justus.issn == "")
        if (obj.ISSN2) $scope.justus.issn = obj.ISSN2;
      if (obj.Publisher) $scope.justus.kustantaja = htmlUnescape(obj.Publisher);
    });
  }
  $scope.fetchLehtisarja = function(input) { //issn
    console.log("fetchLehtisarja "+input);
    if(input == null) return;
    JUFOService.etsiissn(input)
    .then(function (response){
      var jobj = response.data;
      var jufoid = jobj[0].Jufo_ID; // voisi asettaa jo scopeen, mutta seuraavassa kutsussa
      $scope.useLehtisarja(jufoid); // vain issn?
      $scope.lehtinimet.selected = jobj[0];
    });
  }

  $scope.refreshJulkaisunnimet = function(input,tekija) {
    if(input == null){ return; }
    if(input.length < 3){ return; }

    $scope.julkaisunnimet = [];
    // CrossRef :: haku julkaisun nimellä, mutta voi olla myös tekijän nimi
    $scope.crossrefLataa = true;
    CrossRefService.worksquery(input,tekija)
    .then(function(obj){
      $scope.julkaisunnimet = $scope.julkaisunnimet.concat(obj);
      $scope.crossrefLataa = false;
    });

    // VIRTA :: haku julkaisun nimellä, mutta voi olla myös tekijän nimi
    $scope.virtaLataa = true;
    VIRTAService.fetch(input,tekija)
    .then(function (obj){
      $scope.julkaisunnimet = $scope.julkaisunnimet.concat(obj);
      $scope.virtaLataa = false;
    });
  }

  $scope.useJulkaisunnimi = function(source, input) { // input == identifier
    console.log("useJulkaisunnimi: "+source+" "+input)
    if(!source) return;
    if(!input) return;
    if (source=="CrossRef") {
      $scope.crossrefLataa = true;
      CrossRefService.works(input)
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
        console.log("useJulkaisunnimi loaded "+source+" "+input);
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
      VIRTAService.get(input)
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
        console.log("useJulkaisunnimi loaded "+source+" "+input);
        $scope.useVaihe(3);//->tietojen syöttöön
      }
      , function errorCb(response){
        console.log("useJulkaisunnimi "+source+" "+input+" ei löytynyt!");
        $scope.julkaisuhaettu = false;
        return false;
      });
    }
  }

  $scope.getKoodisto = function(koodisto,input) {
    if(!koodisto) return;
    if(input == null) return; // ei vielä haettu mitään
    if(input.length < 1) return;
    // onko ladattu jo (nb! oletusarvot)
    if($scope.codes[koodisto])
      if($scope.codes[koodisto].length>5)
        return $scope.codes[koodisto]; //ladattu jo
    // tyhjennä oletukset pois
    $scope.codes[koodisto] = [];
    return Koodisto.getKoodisto(koodisto)
    .then(function (obj) {
      $scope.codes[koodisto] = obj;
      return obj;
    });
  }

  $scope.useJulkaisuntieteenala = function(input,index) {
    console.log("useJulkaisuntieteenala "+input+" "+index);
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

  $scope.makeParams = function(input) {
    //console.log("makeParams");
    if (input==null) input = $scope.justus;
    var kvpairs = [];
    angular.forEach(input, function(fobj,fkey){
      if (!fkey.match(/^_/)) { // skipataan sisälset
        // muuta fkey organisaationtekijat "root" osaan (eli organisaationtekijat.sukunimi => organisaationtekijat jne)
        if (fkey.match(/organisaationtekijat/)) {
          fkey = fkey.match(/organisaationtekijat/);
        }
        if (isArray(input[fkey])) {
          //console.log("useJatka ARRAY "+fkey);
          angular.forEach(input[fkey], function(sobj,skey){
            kvpairs.push(encodeURIComponent(fkey) + "=" + encodeURIComponent(angular.toJson(sobj)));
          });
        } else {
          if (i18n.content.form[fkey]) {
            //console.log("useJatka FORM "+fkey);
            kvpairs.push(encodeURIComponent(fkey) + "=" + encodeURIComponent(fobj));
          }
        }
      }
    });
    return kvpairs;
  }

  $scope.useJatka = function() {
    //console.log("useJatka");
    //$scope.useVaihe(parseInt($scope.ui_vaihe)+1);//->tallennus
    var kvpairs = [];
    kvpairs.push("vaihe="+(parseInt($scope.ui_vaihe)+1));
    kvpairs = kvpairs.concat($scope.makeParams());
    var queryString = kvpairs.join("&");
    console.log("useJatka => "+queryString);
    window.location = "?" + queryString;
    // TO-maybe-DO something like:
    //var stateObj = { justusvaihe: $scope.ui_vaihe };
    //history.pushState(stateObj, "tallennus", "?HHI=OO&"+queryString);
    //console.debug(history.state)
  }

  $scope.useRequiredHighlight = function() {
    $scope.requiredHighlight=!$scope.requiredHighlight;
  }

  $scope.useVaihe = function(vaihe) {
    //console.log("useVaihe "+$scope.ui_vaihe+" => "+vaihe);
    //$scope.ui_vaihe=vaihe;
    // just change vaihe (above) or make browser history with: (could almost use useJatka but not quite)
    var kvpairs = [];
    kvpairs.push("vaihe="+(parseInt(vaihe)));
    kvpairs = kvpairs.concat($scope.makeParams());
    var queryString = kvpairs.join("&");
    console.log("useVaihe => "+queryString);
    window.location = "?" + queryString;
  }

  $scope.useField = function(field,input) {
    $scope.justus[field] = input;
  }

  // mappaa genericistä scopeen
  $scope.getCode = function(codeset,code) {
    return Justus.getCode($scope.codes,codeset,code);
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
  // MUUTTUJAT JA ALUSTUS
  //
  var language = QueryString.lang||"FI";
  /* jos haluaa tarjota selaimen kielen oletuksena:
  if(window)if(window.navigator){
    language = window.navigator.userLanguage || window.navigator.language;
    language = language.substr(0,2);
    language = language.toUpperCase();
    console.log("from browser language: "+language);
  }
  //*/
  $scope.lang = language;
  $scope.i18n = i18n;
  // populoi yleisimmät, jotka jyrätään yli mikäli haetaan kirjoittamalla
  $scope.codes = codes;
  // haetaan Koodistopalvelusta sinne vietyjä
  if (!$scope.codes.julkaisutyypit) {
    /* localStorage:
    $scope.codes.julkaisutyypit = Koodisto.store('julkaisunpaaluokka');
    if (!$scope.codes.julkaisutyypit) {
    //*/
      let promise = Koodisto.getLuokitus('julkaisunpaaluokka');
      promise.then(function(o){
        $scope.codes.julkaisutyypit=o;
        //Koodisto.store('julkaisunpaaluokka',o);
      });
      //$scope.codes.julkaisutyypit = Koodisto.getLuokitus('julkaisunpaaluokka');
    //}
  }
  angular.forEach($scope.codes.julkaisutyypit,function(aobj,akey){
    let alapromise = Koodisto.getAlatyypit('julkaisunpaaluokka',aobj.arvo);
    alapromise.then(function (o) {
      aobj.alatyypit = o;
      //Koodisto.store('julkaisunpaaluokka_'+aobj.arvo,o);
    });
  });
  if (!$scope.codes.tieteenalat) {
    let promise = Koodisto.getLuokitus('paatieteenala');
    promise.then(function(o){ $scope.codes.tieteenalat=o; });
  }
  if (!$scope.codes.kieli) {
    let promise = Koodisto.getKoodisto('kieli');
    promise.then(function(o){ $scope.codes.kieli=o; });
  }
  if (!$scope.codes.maatjavaltiot2) {
    let promise = Koodisto.getKoodisto('maatjavaltiot2');
    promise.then(function(o){ $scope.codes.maatjavaltiot2=o; });
  }

  $scope.justus = Justus.justus;
  $scope.requirement = Justus.requirement;
  $scope.condition = Justus.condition;
  $scope.visible = Justus.visible;

  $scope.checkISSN = Justus.checkISSN;
  $scope.checkORCID = Justus.checkORCID;

  // populoi koodistot (saatetaan tarvita jo parametrien tulkitsemisessa)
  $scope.alatieteenalat = [];

  // muut alustukset
  $scope.lehtinimet = [];
  $scope.kustantajanimet = [];
  $scope.konferenssinimet = [];
  $scope.justus.jufoid = "";
  $scope.justus.jufoluokitus = "";

  $scope.justus.organisaationtekijat = [{}]; //pakko populoida (ei tule muuten ui:hin)
  $scope.justus.organisaationtekijat[0].alayksikot = [""];
  $scope.julkaisunnimet = [];
  $scope.julkaisu = {}; // ui-select pakko alustaa! (.selected varattu)
  $scope.crossrefLataa = false;
  $scope.virtaLataa = false;

  $scope.requiredHighlight = false;

  $scope.justus.avainsanat = [""]; //pakko populoida (ei tule muuten ui:hin)
  $scope.justus.julkaisuntieteenalat = [""];

  // parametrit :: täytetään lomakkeen tiedot
  // - luupataan formi, mutta arvot querystringistä ja arvot scope.justus:iin.
  // - varmaan voisi luupata nyt myös vain querystringin, eli oikeasti olemassaolevat arvot
  // - scope.justus ei käy, sillä tässä vasta alustetaan
  angular.forEach(i18n.content.form, function(fobj,fkey){
    //console.log("query "+fkey)

    // tehdään fkey scope.justus:iin -- aina, oli parametri tai ei
    // noudetaan arvo urista (ei listat)
    if (fkey!="organisaationtekijat" && fkey!="avainsanat" && fkey!="julkaisuntieteenalat" && fkey!="julkaisuntekijoidenlukumaara") {
      $scope.justus[fkey] = QueryString[fkey]||"";
    }

    // pitää olla annettu parametri JA vaadittu
    if (QueryString[fkey]) {
      // listat
      if (fkey=="organisaationtekijat" || fkey=="avainsanat" || fkey=="julkaisuntieteenalat") {
        var qarr = QueryString[fkey];
        if (isArray(qarr)) {
          $scope.justus[fkey] = qarr.map(function(o){return JSON.parse(o)});
        } else { //vain yksi, korvataan alkupopulointi
          $scope.justus[fkey][0] = JSON.parse(qarr);
        }
      }

      // julkaisutyyppi-valinta
      if (fkey=="julkaisutyyppi") {
        $scope.useJulkaisutyyppiPaa($scope.justus[fkey].substring(0,1));
        $scope.useJulkaisutyyppi($scope.justus[fkey]);
      }
      // lasketaan pituus (uudestaan vaikka olisikin annettu; itse asiassa tekijoidenlkm skipataan kokonaan!)
      if (fkey=="tekijat") {
        $scope.useTekijat($scope.justus[fkey]);
      }
      // haetaan selitteitä koodeille
      if (fkey=="jufoid") {
        JUFOService.kanava($scope.justus[fkey])
        .then(function (obj) {
          $scope.lehtinimet.selected = obj;
        });
        $scope.useLehtisarja($scope.justus[fkey]);
      }
      if (fkey=="julkaisunkieli") {
        $scope.kieli = {};
        Koodisto.getKoodi('kieli',$scope.justus[fkey])
        .then(function (obj) {
          $scope.kieli.selected = obj;
          // oletuksena ei ladata koko koodistoa, joten laitetaan tämä arvo
          if (!$scope.codes['kieli']) {
            $scope.codes['kieli'] = [];
            $scope.codes['kieli'].push(obj);
          }
        });
      }
      if (fkey=="julkaisumaa") {
        $scope.maa = {};
        Koodisto.getKoodi('maatjavaltiot2',$scope.justus[fkey])
        .then(function (obj) {
          $scope.maa.selected = obj;
          // oletuksena ei ladata koko koodistoa, joten laitetaan tämä arvo
          if (!$scope.codes['maatjavaltiot2']) {
            $scope.codes['maatjavaltiot2'] = [];
            $scope.codes['maatjavaltiot2'].push(obj);
          }
        });
      }
    }
  });
  // haetaan vielä EI formiin kuuluva parametri
  if ($scope.justus.julkaisutyyppi && $scope.justus.julkaisutyyppi.length>1) {
    $scope.ui_vaihe = QueryString.vaihe||0;
    // päivitä varmuuden vuoksi vielä:
    $scope.useJulkaisutyyppi($scope.justus.julkaisutyyppi);
    // jos ei ole validi ja yritetään tallennusvaihetta:
    if ($scope.ui_vaihe==4 && (!$scope.isJustusValid() || !$scope.isValid('organisaationtekijat'))) {
      // TODO näytä jokin message!?
      $scope.useVaihe(3);
    }
  } else {
    //if (QueryString.vaihe) {
    //  $scope.ui_vaihe = QueryString.vaihe;
    //} else {
      // TODO näytä jokin message!?
      $scope.ui_vaihe = QueryString.vaihe||0;
    //}
    console.log('dev: ui_vaihe='+$scope.ui_vaihe)
  }

}]);//-justusController
