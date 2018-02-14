'use strict';

angular.module('TarkastaController', [])
.controller('TarkastaController', [
  '$rootScope', '$scope', '$http', '$state', '$location', '$log', 'APIService', 'KoodistoService',
  function($rootScope, $scope, $http, $state, $location, $log, APIService, KoodistoService) {
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
      'Julkaisuvuosi',
      'Julkaisutyyppi',
      'Julkaisun tekijöiden lukumäärä',
      'Kansainvälinen yhteisjulkaisu',
      'Julkaisun nimi',
      'Volyymi',
      'Numero',
      'Sivut',
      'Artikkelinumero',
      'Julkaisun kieli',
      'Lehden/sarjan nimi',
      'ISSN',
      'ISBN',
      'Emojulkaisun nimi',
      'Emojulkaisun toimittajat',
      'Kustantaja',
      'Julkaisun kustannuspaikka',
      'Julkaisumaa',
      'Julkaisun kansainvälisyys',
      'DOI-tunniste',
      'Pysyvä verkko-osoite',
      'Rinnakkaistallennetun version verkko-osoite',
      'Avoin saatavuus',
      'Lisätieto',
      'Avainsanat'
    ];

    $scope.getCsvExportFile = function() {
      $scope.loading.csv = true;
      return Promise.map($scope.data.julkaisu, function(publication) {
        return {
          'Julkaisun ID': publication.id,
          'Organisaatiotunnus': publication.organisaatiotunnus,
          'Julkaisuvuosi': publication.julkaisuvuosi,
          'Julkaisutyyppi': publication.julkaisutyyppi,
          // Todo add tieteenalat
          // Todo add alayksikko
          'Julkaisun tekijöiden lukumäärä': publication.julkaisuntekijoidenlukumaara,
          'Kansainvälinen yhteisjulkaisu': publication.kansainvalinenyhteisjulkaisu,
          'Julkaisun nimi': publication.julkaisunnimi,
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
          'Lisätieto': publication.lisatieto,
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

    $scope.updatePublication = function(julkaisu, julkaisuntila) {
      if (julkaisu && julkaisu.id) {
        julkaisu.username = $scope.user.name;
        julkaisu.modified = new Date();
        const julkaisuCopy = angular.copy(julkaisu);
        delete julkaisuCopy.id; // api doesn't like primary key in data
        delete julkaisuCopy.ui_julkaisuntila;
        julkaisuCopy.julkaisuntila = julkaisuntila;
        APIService.put('julkaisu', julkaisu.id, JSON.stringify(julkaisuCopy));
      }
    };

    $scope.usePoista = function(table, id) {
      APIService.delete(table, id);
      // delete from scope
      delete $scope.data[table][id];
    };

    $scope.loadPublications = function() {
      $scope.loading.publications = true;

      // Update current query to url and restore any missing parameters
      $location.search($scope.query);

      $scope.data['julkaisu'] = [];
      // limit fetched rows by organisaatiotunnus
      const val = $scope.user.organization.code !== '00000' ? $scope.user.organization.code : null;
      const col = $scope.user.organization.code !== '00000' ? 'organisaatiotunnus' : null;

      APIService.get('julkaisu', val, col, $scope.query)
      .then(function (obj) {
        $scope.totalItems = obj.totalItems || 0;

        return Promise.map(obj, function(o, k) {
          // NB! API returns '2017-03-24 12:37:47.18+02'
          // => convert string first (as illustrated in http://dygraphs.com/date-formats.html)
          if (o.modified) {
            let m = o.modified;
            m = m.replace(/-/g, '/'); // date separator to '/'
            m = m.replace(/\..*$/, ''); // strip milliseconds away
            o.modified = new Date(m);
          }
          o.ui_julkaisuntila = o.julkaisuntila;
          $scope.data['julkaisu'].push(o);
        });
      })
      .then(function() {
        $scope.loading.publications = false;
      })
      .catch(function(err) {
        $log.error(err);
      });
    };

    $scope.resetData = function() {
      $scope.loadPublications();
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
