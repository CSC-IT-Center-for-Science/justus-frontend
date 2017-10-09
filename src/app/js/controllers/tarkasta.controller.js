'use strict';

angular.module('TarkastaController', [])
.controller('TarkastaController', [
  '$rootScope', '$scope', '$http', '$state', '$location', 'APIService', 'KoodistoService',
  function($rootScope, $scope, $http, $state, $location, APIService, KoodistoService) {
    $scope.meta = APIService.meta;
    $scope.data = [];
    $scope.colOrder = 'id';
    $scope.colOrderReverse = false;
    $scope.totalItems = 0;
    $scope.query = APIService.restoreQuery();
    $scope.loading = {};

    $scope.setPageSize = function(pageSize) {
      $scope.query.pageSize = pageSize;
    };

    $scope.csvExportHeader = [
      'Julkaisun ID',
      'Organisaatiotunnus',
      'Vuosi',
      'Julkaisutyyppi',
      'Julkaisun tekijöiden lukumäärä',
      'Kansainvälinen yhteisjulkaisu',
      'Julkaisun nimi',
      'Julkaisuvuosi',
      'Volyymi',
      'Numero',
      'Sivut',
      'Artikkelinumero',
      'Julkaisun kieli',
      'Lehden/sarjan nimi',
      'ISSN',
      'ISBN',
      'Emojulkaisun nimi',
      'Kustantaja',
      'Julkaisun kustannuspaikka',
      'Julkaisumaa',
      'Julkaisun kansainvälisyys',
      'DOI-tunniste',
      'Pysyvä verkko-osoite',
      'Rinnakkaistallennetun version verkko-osoite',
      'Avoin saatavuus',
      'Avainsanat'
    ];

    $scope.getCsvExportFile = function() {
      $scope.loading.csv = true;
      return Promise.map($scope.data.julkaisu, function(publication) {
        return {
          'Julkaisun ID': publication.id,
          'Organisaatiotunnus': publication.organisaatiotunnus,
          'Vuosi': publication.julkaisuvuosi,
          'Julkaisutyyppi': publication.julkaisutyyppi,
          // Todo add tieteenalat
          // Todo add alayksikko
          'Julkaisun tekijöiden lukumäärä': publication.julkaisuntekijoidenlukumaara,
          'Kansainvälinen yhteisjulkaisu': publication.kansainvalinenyhteisjulkaisu,
          'Julkaisun nimi': publication.julkaisunnimi,
          'Julkaisuvuosi': publication.julkaisuvuosi,
          'Volyymi': publication.volyymi,
          'Numero': publication.numero,
          'Sivut': publication.sivut,
          'Artikkelinumero': publication.artikkelinumero,
          'Julkaisun kieli': publication.julkaisunkieli,
          'Lehden/sarjan nimi': publication.lehdenjulkaisusarjannimi,
          'ISSN': publication.issn,
          'ISBN': publication.isbn,
          'Emojulkaisun nimi': publication.emojulkaisunnimi,
          'Emojulkaisun toimittajat': publication.emojulkaisuntoimittajat,
          'Kustantaja': publication.kustantaja,
          'Julkaisun kustannuspaikka': publication.julkaisunkustannuspaikka,
          'Julkaisumaa': publication.julkaisumaa,
          'Julkaisun kansainvälisyys': publication.julkaisunkansainvalisyys,
          'DOI-tunniste': publication.doitunniste,
          'Pysyvä verkko-osoite': publication.pysyvaverkkoosoite,
          'Rinnakkaistallennetun version verkko-osoite': publication.rinnakkaistallennetunversionverkkoosoite,
          'Avoin saatavuus': publication.avoinsaatavuus,
          'Avainsanat': publication.avainsanat
        };
      })
      .then(function(data) {
        $scope.loading.csv = false;
        return data;
      });
    };

    // map from service (generic) to scope
    $scope.getCode = function(codeset, code) {
      return KoodistoService.getCode($scope.codes, codeset, code);
    };

    $scope.usePaivita = function(table, jobj, julkaisuid, idcol, col, val) {
      // new params cols & vals could be used to send only changed values. now all goes.
      if (julkaisuid && jobj) {
        if (table === 'julkaisu') {
          jobj.username = $scope.user.name;
          jobj.modified = new Date();
        }
        let copyof = {};
        angular.forEach(jobj, function(v, k) {
          copyof[k] = v;
        });
        delete copyof[idcol]; // api doesn't like primary key in data
        delete copyof.ui_julkaisuntila; // our own addition
        if (col) {
          copyof[col] = val;
        }
        APIService.put(table, julkaisuid, JSON.stringify(copyof));
      }
    };

    $scope.usePoista = function(table, id) {
      APIService.delete(table, id);
      // delete from scope
      delete $scope.data[table][id];
    };

    $scope.useHae = function(table) {
      // Update current query to url and restore any missing parameters
      $location.search($scope.query);

      $scope.data[table] = [];
      // limit fetched rows by organisaatiotunnus
      let val = $scope.user.organization.code !== '00000' ? $scope.user.organization.code : null;
      let col = $scope.user.organization.code !== '00000' ? 'organisaatiotunnus' : null;

      APIService.get(table, val, col, $scope.query)
      .then(function (obj) {
        $scope.totalItems = obj.totalItems || 0;

        // we get a list, loop
        angular.forEach(obj, function(o, k) {
          if (table === 'julkaisu') {
            // convert to date type
            // NB! API returns '2017-03-24 12:37:47.18+02'
            // => convert string first (as illustrated in http://dygraphs.com/date-formats.html)
            if (o.modified) {
              let m = o.modified;
              m = m.replace(/-/g, '/'); // date separator to '/'
              m = m.replace(/\..*$/, ''); // strip milliseconds away
              o.modified = new Date(m);
            }
            // for showing julkaisuntila even after changing it to database...
            o.ui_julkaisuntila = o.julkaisuntila;
          }
          $scope.data[table].push(o);
        });
      });
    };

    $scope.resetData = function() {
      $scope.useHae('julkaisu');
    };

    let init = function() {
      // at very first test that user object is accessible
      if (!$scope.hasAccess($scope.state.name)) {
        $state.go('index', { lang: $scope.lang });
        // stop initializing
        return;
      }
      $scope.resetData();

      $scope.odottavat = true;
    };

    init();
  }
]);
