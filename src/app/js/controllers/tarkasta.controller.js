'use strict'

angular.module('TarkastaController', [])
  .controller('TarkastaController', [
    '$rootScope', '$scope', '$http', '$state', '$location', '$log', '$timeout', 'APIService', 'KoodistoService', 'DataStoreService',
    function ($rootScope, $scope, $http, $state, $location, $log, $timeout, APIService, KoodistoService, DataStoreService) {
      $scope.meta = APIService.meta;
      $scope.data = [];
      $scope.colOrder = 'modified';
      $scope.colOrderReverse = true;
      $scope.totalItems = 0;
      $scope.query = APIService.restoreQuery();
      $scope.loading = {};

      $scope.setPageSize = function (pageSize) {
        $scope.query.pageSize = pageSize;
      };

      $scope.csvExportHeader = [
        'Julkaisun ID',
        'Organisaatiotunnus',
        'Julkaisutyyppi',
        'Julkaisun tila',
        'Julkaisuvuosi',
        'Julkaisun nimi',
        'Julkaisun tekijöiden lukumäärä',
        'Tekijätiedot',
        'Lehden/sarjan nimi',
        'Kustantaja',
        'Julkaisun kustannuspaikka',
        'Julkaisumaa',
        'Julkaisun kieli',
        'Volyymi',
        'Numero',
        'Sivut',
        'Artikkelinumero',
        'ISSN',
        'ISBN',
        'Konferenssin vakiintunut nimi',
        'Emojulkaisun nimi',
        'Emojulkaisun toimittajat',
        // 'Julkistamispaikkakunta',
        // 'Tapahtuma',
        'Julkaisun kansainvälisyys',
        'Kansainvälinen yhteisjulkaisu',
        'DOI-tunniste',
        // 'Muu tunniste',
        'Pysyvä verkko-osoite',
        'Rinnakkaistallennetun version verkko-osoite',
        'Avoin saatavuus',
        // 'Avainsanat',
        'Lisätieto'
        // 'Julkaisuvuoden lisätieto',
        // 'Julkaisun tieteenala 1',
        // 'Julkaisun tieteenala 2',
        // 'Julkaisun tieteenala 3',
        // 'Julkaisun tieteenala 4',
        // 'Julkaisun tieteenala 5',
        // 'Julkaisun tieteenala 6',
        // 'Julkaisun taiteenalat',
        // 'Taidealan tyyppikategoriat',
        // 'Organisaation tekijä 1',
        // 'Alayksikkö 1',
        // 'ORCID 1',
        // 'Rooli 1',
        // 'Organisaation tekijä 2',
        // 'Alayksikkö 2',
        // 'ORCID 2',
        // 'Rooli 2',
        // 'Organisaation tekijä 3',
        // 'Alayksikkö 3',
        // 'ORCID 3',
        // 'Rooli 3',
        // 'Organisaation tekijä 4',
        // 'Alayksikkö 4',
        // 'ORCID 4',
        // 'Rooli 4',
        // 'Organisaation tekijä 5',
        // 'Alayksikkö 5',
        // 'ORCID 5',
        // 'Rooli 5',
        // 'Organisaation tekijä 6',
        // 'Alayksikkö 6',
        // 'ORCID 6',
        // 'Rooli 6',
        // 'Organisaation tekijä 7',
        // 'Alayksikkö 7',
        // 'ORCID 7',
        // 'Rooli 7',
        // 'Organisaation tekijä 8',
        // 'Alayksikkö 8',
        // 'ORCID 8',
        // 'Rooli 8',
        // 'Organisaation tekijä 9',
        // 'Alayksikkö 9',
        // 'ORCID 9',
        // 'Rooli 9',
        // 'Organisaation tekijä 10',
        // 'Alayksikkö 10',
        // 'ORCID 10',
        // 'Rooli 10',
        // 'Organisaation tekijä 11',
        // 'Alayksikkö 11',
        // 'ORCID 11',
        // 'Rooli 11',
        // 'Organisaation tekijä 12',
        // 'Alayksikkö 12',
        // 'ORCID 12',
        // 'Rooli 12',
        // 'Organisaation tekijä 13',
        // 'Alayksikkö 13',
        // 'ORCID 13',
        // 'Rooli 13',
        // 'Organisaation tekijä 14',
        // 'Alayksikkö 14',
        // 'ORCID 14',
        // 'Rooli 14',
        // 'Organisaation tekijä 15',
        // 'Alayksikkö 15',
        // 'ORCID 15',
        // 'Rooli 15',
        // 'Organisaation tekijä 16',
        // 'Alayksikkö 16',
        // 'ORCID 16',
        // 'Rooli 16',
        // 'Organisaation tekijä 17',
        // 'Alayksikkö 17',
        // 'ORCID 17',
        // 'Rooli 17',
        // 'Organisaation tekijä 18',
        // 'Alayksikkö 18',
        // 'ORCID 18',
        // 'Rooli 18',
        // 'Organisaation tekijä 19',
        // 'Alayksikkö 19',
        // 'ORCID 19',
        // 'Rooli 19',
        // 'Organisaation tekijä 20',
        // 'Alayksikkö 20',
        // 'ORCID 20',
        // 'Rooli 20'
      ];

      // Hide button from My publications
      $scope.getCsvExportFile = function () {

        $scope.loading.csv = true;

        // $scope.getOtherData();
        return Promise.map($scope.data.julkaisu, function (publication) {
          return {
            'Julkaisun ID': publication.id,
            'Organisaatiotunnus': publication.organisaatiotunnus,
            'Julkaisutyyppi': publication.julkaisutyyppi,
            'Julkaisun tila': publication.julkaisuntila,
            'Julkaisuvuosi': publication.julkaisuvuosi,
            'Julkaisun nimi': publication.julkaisunnimi,
            'Julkaisun tekijöiden lukumäärä': publication.julkaisuntekijoidenlukumaara,
            'Tekijätiedot': publication.tekijat,
            'Lehden/sarjan nimi': publication.lehdenjulkaisusarjannimi,
            'Kustantaja': publication.kustantaja,
            'Julkaisun kustannuspaikka': publication.julkaisunkustannuspaikka,
            'Julkaisumaa': publication.julkaisumaa,
            'Julkaisun kieli': publication.julkaisunkieli,
            'Volyymi': publication.volyymi,
            'Numero': publication.numero,
            'Sivut': publication.sivut,
            'Artikkelinumero': publication.artikkelinumero,
            'ISSN': publication.issn,
            'ISBN': publication.isbn,
            'Konferenssin vakiintunut nimi': publication.konferenssinvakiintunutnimi,
            'Emojulkaisun nimi': publication.emojulkaisunnimi,
            'Emojulkaisun toimittajat': publication.emojulkaisuntoimittajat,
            // 'Julkistamispaikkakunta': publication.julkistamispaikkakunta,
            // 'Tapahtuma': publication.tapahtuma,
            'Julkaisun kansainvälisyys': publication.julkaisunkansainvalisyys,
            'Kansainvälinen yhteisjulkaisu': publication.kansainvalinenyhteisjulkaisu,
            'DOI-tunniste': publication.doitunniste,
            // 'Muu tunniste': publication.muutunniste,
            'Pysyvä verkko-osoite': publication.pysyvaverkkoosoite,
            'Rinnakkaistallennetun version verkko-osoite': publication.rinnakkaistallennetunversionverkkoosoite,
            'Avoin saatavuus': publication.avoinsaatavuus,
            // 'Avainsanat': publication.avainsanat,
            'Lisätieto': publication.lisatieto
            // 'Julkaisuvuoden lisätieto': publication.julkaisuvuodenlisatieto,
            // 'Julkaisun tieteenala 1': getTieteenala(publication.tieteenala, 1),
            // 'Julkaisun tieteenala 2': getTieteenala(publication.tieteenala, 2),
            // 'Julkaisun tieteenala 3': getTieteenala(publication.tieteenala, 3),
            // 'Julkaisun tieteenala 4': getTieteenala(publication.tieteenala, 4),
            // 'Julkaisun tieteenala 5': getTieteenala(publication.tieteenala, 5),
            // 'Julkaisun tieteenala 6': getTieteenala(publication.tieteenala, 6),
            // 'Julkaisun taiteenalat': getTaiteenalat(publication.taiteenalat),
            // 'Taidealan tyyppikategoriat': getTyyppikategoriat(publication.taidealantyyppikategoria),
            // 'Organisaation tekijä 1': getOrganisaatioTekijat(publication.organisaatiotekijat, 1),
            // 'Alayksikkö 1': getAlayksikko(publication.organisaatiotekijat, 1),
            // 'ORCID 1': getOrcid(publication.orcid, 1),
            // 'Rooli 1': getRooli(publication.rooli, 1),
            // 'Organisaation tekijä 2': getOrganisaatioTekijat(publication.organisaatiotekijat, 2),
            // 'Alayksikkö 2': getAlayksikko(publication.organisaatiotekijat, 2),
            // 'ORCID 2': getOrcid(publication.orcid, 2),
            // 'Rooli 2': getRooli(publication.rooli, 2),
            // 'Organisaation tekijä 3': getOrganisaatioTekijat(publication.organisaatiotekijat, 3),
            // 'Alayksikkö 3': getAlayksikko(publication.organisaatiotekijat, 3),
            // 'ORCID 3': getOrcid(publication.orcid, 3),
            // 'Rooli 3': getRooli(publication.rooli, 3),
            // 'Organisaation tekijä 4': getOrganisaatioTekijat(publication.organisaatiotekijat, 4),
            // 'Alayksikkö 4': getAlayksikko(publication.organisaatiotekijat, 4),
            // 'ORCID 4': getOrcid(publication.orcid, 4),
            // 'Rooli 4': getRooli(publication.rooli, 4),
            // 'Organisaation tekijä 5': getOrganisaatioTekijat(publication.organisaatiotekijat, 5),
            // 'Alayksikkö 5': getAlayksikko(publication.organisaatiotekijat, 5),
            // 'ORCID 5': getOrcid(publication.orcid, 5),
            // 'Rooli 5': getRooli(publication.rooli, 5),
            // 'Organisaation tekijä 6': getOrganisaatioTekijat(publication.organisaatiotekijat, 6),
            // 'Alayksikkö 6': getAlayksikko(publication.organisaatiotekijat, 6),
            // 'ORCID 6': getOrcid(publication.orcid, 6),
            // 'Rooli 6': getRooli(publication.rooli, 6),
            // 'Organisaation tekijä 7': getOrganisaatioTekijat(publication.organisaatiotekijat, 7),
            // 'Alayksikkö 7': getAlayksikko(publication.organisaatiotekijat, 7),
            // 'ORCID 7': getOrcid(publication.orcid, 7),
            // 'Rooli 7': getRooli(publication.rooli, 7),
            // 'Organisaation tekijä 8': getOrganisaatioTekijat(publication.organisaatiotekijat, 8),
            // 'Alayksikkö 8': getAlayksikko(publication.organisaatiotekijat, 8),
            // 'ORCID 8': getOrcid(publication.orcid, 8),
            // 'Rooli 8': getRooli(publication.rooli, 8),
            // 'Organisaation tekijä 9': getOrganisaatioTekijat(publication.organisaatiotekijat, 9),
            // 'Alayksikkö 9': getAlayksikko(publication.organisaatiotekijat, 9),
            // 'ORCID 9': getOrcid(publication.orcid, 9),
            // 'Rooli 9': getRooli(publication.rooli, 9),
            // 'Organisaation tekijä 10': getOrganisaatioTekijat(publication.organisaatiotekijat, 10),
            // 'Alayksikkö 10': getAlayksikko(publication.organisaatiotekijat, 10),
            // 'ORCID 10': getOrcid(publication.orcid, 10),
            // 'Rooli 10': getRooli(publication.rooli, 10),
            // 'Organisaation tekijä 11': getOrganisaatioTekijat(publication.organisaatiotekijat, 11),
            // 'Alayksikkö 11': getAlayksikko(publication.organisaatiotekijat, 11),
            // 'ORCID 11': getOrcid(publication.orcid, 11),
            // 'Rooli 11': getRooli(publication.rooli, 11),
            // 'Organisaation tekijä 12': getOrganisaatioTekijat(publication.organisaatiotekijat, 12),
            // 'Alayksikkö 12': getAlayksikko(publication.organisaatiotekijat, 12),
            // 'ORCID 12': getOrcid(publication.orcid, 12),
            // 'Rooli 12': getRooli(publication.rooli, 12),
            // 'Organisaation tekijä 13': getOrganisaatioTekijat(publication.organisaatiotekijat, 13),
            // 'Alayksikkö 13': getAlayksikko(publication.organisaatiotekijat, 13),
            // 'ORCID 13': getOrcid(publication.orcid, 13),
            // 'Rooli 13': getRooli(publication.rooli, 13),
            // 'Organisaation tekijä 14': getOrganisaatioTekijat(publication.organisaatiotekijat, 14),
            // 'Alayksikkö 14': getAlayksikko(publication.organisaatiotekijat, 14),
            // 'ORCID 14': getOrcid(publication.orcid, 14),
            // 'Rooli 14': getRooli(publication.rooli, 14),
            // 'Organisaation tekijä 15': getOrganisaatioTekijat(publication.organisaatiotekijat, 15),
            // 'Alayksikkö 15': getAlayksikko(publication.organisaatiotekijat, 15),
            // 'ORCID 15': getOrcid(publication.orcid, 15),
            // 'Rooli 15': getRooli(publication.rooli, 15),
            // 'Organisaation tekijä 16': getOrganisaatioTekijat(publication.organisaatiotekijat, 16),
            // 'Alayksikkö 16': getAlayksikko(publication.organisaatiotekijat, 16),
            // 'ORCID 16': getOrcid(publication.orcid, 16),
            // 'Rooli 16': getRooli(publication.rooli, 16),
            // 'Organisaation tekijä 17': getOrganisaatioTekijat(publication.organisaatiotekijat, 17),
            // 'Alayksikkö 17': getAlayksikko(publication.organisaatiotekijat, 17),
            // 'ORCID 17': getOrcid(publication.orcid, 17),
            // 'Rooli 17': getRooli(publication.rooli, 17),
            // 'Organisaation tekijä 18': getOrganisaatioTekijat(publication.organisaatiotekijat, 18),
            // 'Alayksikkö 18': getAlayksikko(publication.organisaatiotekijat, 18),
            // 'ORCID 18': getOrcid(publication.orcid, 18),
            // 'Rooli 18': getRooli(publication.rooli, 18),
            // 'Organisaation tekijä 19': getOrganisaatioTekijat(publication.organisaatiotekijat, 19),
            // 'Alayksikkö 19': getAlayksikko(publication.organisaatiotekijat, 19),
            // 'ORCID 19': getOrcid(publication.orcid, 19),
            // 'Rooli 19': getRooli(publication.rooli, 19),
            // 'Organisaation tekijä 20': getOrganisaatioTekijat(publication.organisaatiotekijat, 20),
            // 'Alayksikkö 20': getAlayksikko(publication.organisaatiotekijat, 20),
            // 'ORCID 20': getOrcid(publication.orcid, 20),
            // 'Rooli 20': getRooli(publication.rooli, 20)

          };
        })
          .then(function (data) {
            $scope.loading.csv = false;
            $timeout(function() {
              emptyMappingData();
            }, 1000);
            return data;
          });
      };

      let emptyMappingData = function() {
        angular.forEach($scope.data.julkaisu, function (jvalue, jkey) {
          $scope.data.julkaisu[jkey].organisaatiotekijat = [];
          $scope.data.julkaisu[jkey].rooli = [];
          $scope.data.julkaisu[jkey].orcid = [];
          $scope.data.julkaisu[jkey].tieteenala = [];
          $scope.data.julkaisu[jkey].taiteenalat = [];
          $scope.data.julkaisu[jkey].alayksikot = [];
          $scope.data.julkaisu[jkey].taidealantyyppikategoria = [];
          $scope.data.julkaisu[jkey].avainsanat = [];
        });
      };

      let getAlayksikko = function (data, val) {
        if (data === null || typeof data === 'undefined') {
          return;
          } else if (data[val - 1]) {
            return data[val - 1].alayksikot;
          }
      };

      let getOrganisaatioTekijat = function (data, val) {
        if (typeof data === 'undefined') {
          return;
        } else if (data[val - 1]) {
          return data[val - 1].sukunimi + ',' + data[val - 1].etunimet;
        } else {
          return;
        }
      };

      let getOrcid = function (data, val) {
        if (typeof data === 'undefined' || data === null) {
          return;
        } else if (typeof data[val - 1] !== 'undefined') {
          return data[val - 1];
        } else {
          return;
        }
      };

      let getTieteenala = function(data, val) {
        if (!data || !data[0]) {
          return;
        } else if (data[val - 1] && data[val - 1].jnro) {
          const tieteenala = $scope.getCode('tieteenalat', data[val - 1].tieteenalakoodi);
          if (!tieteenala) {
            return;
          }
          return tieteenala.arvo + ' ' + tieteenala.selite[$scope.lang];
        } else {
          return;
        }
      };

      let getTaiteenalat = function(data) {
        if (!data) {
          return;
        } else if (data[0]) {
          const taiteenalat = [];
          for (let i = 0; i < data.length; i++) {
            taiteenalat.push(data[i] + ' ' + $scope.getCode('taiteenalat', data[i]).selite[$scope.lang]);
          }
          return taiteenalat.join('; ');
        } else {
          return;
        }
      };

      let getTyyppikategoriat = function(data) {
        if (!data) {
          return;
        } else if (data[0]) {
          const tyyppikategoriat = [];
          for (let i = 0; i < data.length; i++) {
            tyyppikategoriat.push(data[i] + ' ' + $scope.getCode('taidealantyypit', data[i]).selite[$scope.lang]);
          }
          return tyyppikategoriat.join('; ');
        } else {
          return;
        }
      };

      let getRooli = function (data, val) {
        if (typeof data === 'undefined' || data[0] === null) {
          return;
        } else if (data[val - 1]) {
          console.log(data[val - 1]);
          let rooli = $scope.getCode('julkaisuntekijanrooli', data[val - 1]);
          return rooli.selite[$scope.lang];
        } else {
          return;
        }
      };

      let mapAlayksikkoData = function () {
        angular.forEach($scope.data.julkaisu, function (ovalue, okey) {
          angular.forEach($scope.alayksikkoData, function (avalue, akey) {
            if (!ovalue.organisaatiotekijat) {
              return;
            }
            for (let i = 0; i < ovalue.organisaatiotekijat.length; i++) {
              if (ovalue.organisaatiotekijat[i].organisaatiotekijaid.match(avalue.organisaatiotekijaid)) {
                if (typeof ovalue.organisaatiotekijat[i].alayksikot === 'undefined') {
                  ovalue.organisaatiotekijat[i].alayksikot = [];
                }
                ovalue.organisaatiotekijat[i].alayksikot.push(avalue.alayksikko);
              }
            }
          });
        });
      };

      let mapTieteenalaData = function () {
        angular.forEach($scope.data.julkaisu, function (avalue, akey) {
          angular.forEach($scope.tieteenalaData, function (bvalue, bkey) {
            if (avalue.id.match(bvalue.julkaisuid)) {
              if (typeof $scope.data.julkaisu[akey].tieteenala === 'undefined') {
                $scope.data.julkaisu[akey].tieteenala = [];
              }
              $scope.data.julkaisu[akey].tieteenala.push(bvalue);
            }
          });
        });
      };

      let mapTaiteenalaData = function () {
        angular.forEach($scope.data.julkaisu, function (avalue, akey) {
          angular.forEach($scope.taiteenalaData, function (bvalue, bkey) {
            if (avalue.id.match(bvalue.julkaisuid)) {
              if (typeof $scope.data.julkaisu[akey].taiteenalat === 'undefined') {
                $scope.data.julkaisu[akey].taiteenalat = [];
              }
              $scope.data.julkaisu[akey].taiteenalat.push(bvalue.taiteenalakoodi);
            }
          });
        });
      };

      let mapAvainsanat = function () {
        angular.forEach($scope.data.julkaisu, function (avalue, akey) {
          angular.forEach($scope.avainsanaData, function (bvalue, bkey) {
            if (avalue.id.match(bvalue.julkaisuid)) {
              if (typeof $scope.data.julkaisu[akey].avainsanat === 'undefined') {
                $scope.data.julkaisu[akey].avainsanat = [];
              }
              if (bvalue.avainsana || bvalue.avainsana.length !== 0) {
                $scope.data.julkaisu[akey].avainsanat.push(bvalue.avainsana);
              }
            }
          });
        });
      };

      let mapTaidelisatietoData = function () {
        angular.forEach($scope.data.julkaisu, function (avalue, akey) {
          angular.forEach($scope.taidelisatietoData, function (bvalue, bkey) {
            if (avalue.id.match(bvalue.julkaisuid)) {
              if (bvalue.lisatietoteksti || bvalue.lisatietoteksti.length !== 0) {
                if (bvalue.lisatietotyyppi === 'tapahtuma') {
                  $scope.data.julkaisu[akey].tapahtuma = bvalue.lisatietoteksti;
                }
                if (bvalue.lisatietotyyppi === 'julkaisuvuodenlisatieto') {
                  $scope.data.julkaisu[akey].julkaisuvuodenlisatieto = bvalue.lisatietoteksti;
                }
                if (bvalue.lisatietotyyppi === 'julkistamispaikkakunta') {
                  $scope.data.julkaisu[akey].julkistamispaikkakunta = bvalue.lisatietoteksti;
                }
                if (bvalue.lisatietotyyppi === 'muutunniste') {
                  $scope.data.julkaisu[akey].muutunniste = bvalue.lisatietoteksti;
                }
              }
            }
          });
        });
      };

      let mapTaidealantyyppiData = function () {
        angular.forEach($scope.data.julkaisu, function (avalue, akey) {
          angular.forEach($scope.taidealantyyppiData, function (bvalue, bkey) {
            if (avalue.id.match(bvalue.julkaisuid)) {
              if (typeof $scope.data.julkaisu[akey].taidealantyyppikategoria === 'undefined') {
                $scope.data.julkaisu[akey].taidealantyyppikategoria = [];
              }
              $scope.data.julkaisu[akey].taidealantyyppikategoria.push(bvalue.tyyppikategoria);
            }
          });
        });
      };

      let mapOrganisaatioData = function () {
        angular.forEach($scope.data.julkaisu, function (avalue, akey) {
          angular.forEach($scope.organisaatioData, function (bvalue, bkey) {
            if (avalue.id.match(bvalue.julkaisuid)) {
              if (typeof $scope.data.julkaisu[akey].organisaatiotekijat === 'undefined') {
                $scope.data.julkaisu[akey].organisaatiotekijat = [];
              }
              if (typeof $scope.data.julkaisu[akey].orcid === 'undefined') {
                $scope.data.julkaisu[akey].orcid = [];
              }
              if (typeof $scope.data.julkaisu[akey].rooli === 'undefined') {
                $scope.data.julkaisu[akey].rooli = [];
              }
              $scope.data.julkaisu[akey].organisaatiotekijat.push(
                {
                  'etunimet': bvalue.etunimet,
                  'sukunimi': bvalue.sukunimi,
                  'organisaatiotekijaid': bvalue.id

                });
              $scope.data.julkaisu[akey].orcid.push(bvalue.orcid);
              $scope.data.julkaisu[akey].rooli.push(bvalue.rooli);
            }
          });
        });
      };

      $scope.editPublication = function(d) {
        if ($scope.state.name === 'omat' && d.julkaisuntila) {
          return;
        } else {
          DataStoreService.storeStateData($scope.state.name)
          DataStoreService.storeBooleanforOdottavat($scope.odottavat);
          $location.path('/justus').search({lang: $scope.lang, id: d.id, vaihe: 4});
        }
      };


      // map from service (generic) to scope
      $scope.getCode = function (codeset, code) {
        return KoodistoService.getCode($scope.codes, codeset, code);
      };

      $scope.updatePublication = function (julkaisu, julkaisuntila) {
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

      $scope.usePoista = function (table, id) {
        APIService.delete(table, id);
        // delete from scope
        delete $scope.data[table][id];
      };

      $scope.loadPublications = function () {
        $scope.loading.publications = true;

        // Update current query to url and restore any missing parameters
        $location.search($scope.query);

        $scope.data['julkaisu'] = [];
        // limit fetched rows by organisaatiotunnus
        const val = $scope.user.organization.code !== '00000' ? $scope.user.organization.code : null;
        const col = $scope.user.organization.code !== '00000' ? 'organisaatiotunnus' : null;

        APIService.get('julkaisu', val, col, $scope.query)
          .then(function (obj) {
            // console.log(val);

            $scope.totalItems = obj.totalItems || 0;

            return Promise.map(obj, function (o, k) {
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
          .then(function () {
            $scope.loading.publications = false;
          })
          .catch(function (err) {
            $log.error(err);
          });
      };

      // $scope.getData = function (table) {
      //   return APIService.get(table, val, col, null);
      // };

      $scope.resetData = function () {
        $scope.loadPublications();
      };


      // $scope.getOtherData = function() {
      //   Promise.all([
      //     $scope.getData('organisaatiotekija'),
      //     $scope.getData('alayksikko'),
      //     $scope.getData('tieteenala'),
      //     $scope.getData('taiteenala'),
      //     $scope.getData('avainsana'),
      //     $scope.getData('lisatieto'),
      //     $scope.getData('taidealantyyppikategoria')
      //   ])
      //     .spread((organisaatiotekija, alayksikko, tieteenala, taiteenala, avainsana, lisatieto, taidealantyyppikategoria) => {
      //       $scope.organisaatioData = organisaatiotekija;
      //       $scope.alayksikkoData = alayksikko;
      //       $scope.tieteenalaData = tieteenala;
      //       $scope.taiteenalaData = taiteenala;
      //       $scope.avainsanaData = avainsana;
      //       $scope.taidelisatietoData = lisatieto;
      //       $scope.taidealantyyppiData = taidealantyyppikategoria;
      //     }).then(() => {
      //     mapOrganisaatioData();
      //     mapAlayksikkoData();
      //     mapTieteenalaData();
      //     mapTaiteenalaData();
      //     mapAvainsanat();
      //     mapTaidelisatietoData();
      //     mapTaidealantyyppiData();
      //   });
      // }

      // let val;
      // let col;

      $scope.showRejectedPublications = function() {


        if($scope.showRejected) {
          $scope.showRejected = false;
          $scope.showhide = $scope.i18n.content.tarkasta.hylatyt.nayta;

        } else {
          $scope.showRejected = true;
          $scope.showhide = $scope.i18n.content.tarkasta.hylatyt.piilota;

        }
      }

      let init = function () {

        // at very first test that user object is accessible
        if (!$scope.hasAccess($scope.state.name)) {
          $state.go('index', {lang: $scope.lang});
          // stop initializing
          return;
        }
        $scope.resetData();
        $scope.showRejected = false;
        $scope.showhide = $scope.i18n.content.tarkasta.hylatyt.nayta;

        if (DataStoreService.getBooleanForOdottavat() === false) {
          $scope.odottavat = false;
          DataStoreService.storeBooleanforOdottavat(null);
        } else {
          $scope.odottavat = true;
        }
      };

      init();
    }
  ]);
