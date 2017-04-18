'use strict';

let justusApp = angular.module('justusApp',
['ui.router','ui.select', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']
);

justusApp.config(function(
  $stateProvider
  ,$urlRouterProvider
  ,$locationProvider
) {

  $urlRouterProvider.otherwise("/");

  let indexState = {
    name: "index",
    url: "/?lang",
    views: {
      "": {
        templateUrl: "index_part.html"
      }
    },
    params: {
      lang: 'FI'
    }
  };

  let justusState = {
    name: "justus",
    url: "/justus?lang&vaihe&id", //&jufotunnus&jufoluokitus&organisaationtekijat&avainsanat&julkaisuntieteenalat&julkaisutyyppi&julkaisuvuosi&julkaisunnimi&tekijat&julkaisuntekijoidenlukumaara&konferenssinvakiintunutnimi&emojulkaisunnimi&isbn&emojulkaisuntoimittajat&lehdenjulkaisusarjannimi&issn&volyymi&numero&sivut&artikkelinumero&kustantaja&julkaisunkustannuspaikka&julkaisunkieli&julkaisunkansainvalisyys&julkaisumaa&kansainvalinenyhteisjulkaisu&yhteisjulkaisuyrityksenkanssa&doitunniste&pysyvaverkkoosoite&avoinsaatavuus&julkaisurinnakkaistallennettu&rinnakkaistallennetunversionverkkoosoite",
    views: {
      "": {
        templateUrl: "justus.html"
      }
    },
    params: {
      lang: 'FI',
      vaihe: null,
      id: null
      /*,
      jufotunnus: null,
      jufoluokitus: null,
      organisaationtekijat: null,
      avainsanat: null,
      julkaisuntieteenalat: null,
      julkaisutyyppi: null,
      julkaisuvuosi: null,
      julkaisunnimi: null,
      tekijat: null,
      julkaisuntekijoidenlukumaara: null,
      konferenssinvakiintunutnimi: null,
      emojulkaisunnimi: null,
      isbn: null,
      emojulkaisuntoimittajat: null,
      lehdenjulkaisusarjannimi: null,
      issn: null,
      volyymi: null,
      numero: null,
      sivut: null,
      artikkelinumero: null,
      kustantaja: null,
      julkaisunkustannuspaikka: null,
      julkaisunkieli: null,
      julkaisunkansainvalisyys: null,
      julkaisumaa: null,
      kansainvalinenyhteisjulkaisu: null,
      yhteisjulkaisuyrityksenkanssa: null,
      doitunniste: null,
      pysyvaverkkoosoite: null,
      avoinsaatavuus: null,
      julkaisurinnakkaistallennettu: null,
      rinnakkaistallennetunversionverkkoosoite: null
      */
    }
  };

  let omatState = {
    name: "omat",
    url: "/omat?lang",
    views: {
      "": {
        templateUrl: "omat.html"
      }
    },
    params: {
      lang: 'FI'
    }
  };

  let tarkastaState = {
    name: "tarkasta",
    url: "/tarkasta?lang",
    views: {
      "": {
        templateUrl: "tarkasta.html"
      }
    },
    params: {
      lang: 'FI',
    }
  };

  $stateProvider.state(indexState);
  $stateProvider.state(justusState);
  $stateProvider.state(omatState);
  $stateProvider.state(tarkastaState);

  // howto? $locationProvider.html5Mode(true).hashPrefix('!');
});
