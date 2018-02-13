'use strict';

angular.module('APIService', [])
.service('APIService', [
  '$http', '$location', '$log', 'API_BASE_URL',
  function ($http, $location, $log, API_BASE_URL) {
    this.meta = {
      tables: {
        'julkaisu': {
          name: 'julkaisu',
          pkcol: 'id',
          columns: [
            { name: 'id', default: null },
            { name: 'organisaatiotunnus', default: '' },
            { name: 'julkaisutyyppi', default: '' },
            { name: 'julkaisuvuosi', default: '' },
            { name: 'julkaisunnimi', default: '' },
            { name: 'tekijat', default: '' },
            { name: 'julkaisuntekijoidenlukumaara', default: null },
            { name: 'konferenssinvakiintunutnimi', default: '' },
            { name: 'emojulkaisunnimi', default: '' },
            { name: 'isbn', default: '' },
            { name: 'emojulkaisuntoimittajat', default: '' },
            { name: 'lehdenjulkaisusarjannimi', default: '' },
            { name: 'issn', default: '' },
            { name: 'volyymi', default: null },
            { name: 'numero', default: null },
            { name: 'sivut', default: '' },
            { name: 'artikkelinumero', default: '' },
            { name: 'kustantaja', default: '' },
            { name: 'julkaisunkustannuspaikka', default: '' },
            { name: 'julkaisunkieli', default: '' },
            { name: 'julkaisunkansainvalisyys', default: '' },
            { name: 'julkaisumaa', default: null },
            { name: 'kansainvalinenyhteisjulkaisu', default: 0 },
            { name: 'yhteisjulkaisuyrityksenkanssa', default: 0 },
            { name: 'doitunniste', default: '' },
            { name: 'pysyvaverkkoosoite', default: '' },
            { name: 'avoinsaatavuus', default: '' },
            { name: 'julkaisurinnakkaistallennettu', default: '' },
            { name: 'rinnakkaistallennetunversionverkkoosoite', default: '' },
            { name: 'lisatieto', default: '' },
            { name: 'jufotunnus', default: '' },
            { name: 'jufoluokitus', default: '' },
            { name: 'julkaisuntila', default: '' },
            { name: 'username', default: '' },
            { name: 'modified', default: null }
          ]
        },
        'avainsana': {
          name: 'avainsana',
          ui: 'avainsana', // lista
          pkcol: 'id',
          columns: [
            { name: 'id' },
            { name: 'julkaisuid' },
            { name: 'avainsana' }
          ]
        },
        'organisaatiotekija': {
          name: 'organisaatiotekija',
          ui: 'organisaatiotekija', // lista
          pkcol: 'id',
          columns: [
            { name: 'id' },
            { name: 'julkaisuid' },
            { name: 'etunimet' },
            { name: 'sukunimi' },
            { name: 'orcid' },
            { name: 'rooli' }
          ]
        },
        'alayksikko': {
          name: 'alayksikko',
          ui: 'alayksikko', // lista
          pkcol: 'id',
          columns: [
            { name: 'id' },
            { name: 'organisaatiotekijaid' },
            { name: 'alayksikko' }
          ]
        },
        'tieteenala': {
          name: 'tieteenala',
          ui: 'tieteenala', // lista
          pkcol: 'id',
          columns: [
            { name: 'id' },
            { name: 'julkaisuid' },
            { name: 'tieteenalakoodi' },
            { name: 'jnro' }
          ]
        },
        'taiteenala': {
          name: 'taiteenala',
          ui: 'taiteenala', // lista
          pkcol: 'id',
          columns: [
            { name: 'id' },
            { name: 'julkaisuid' },
            { name: 'taiteenalakoodi' },
            { name: 'jnro' }
          ]
        },
        'lisatieto': {
          name: 'lisatieto',
          ui: 'lisatieto',
          pkcol: 'id',
          columns: [
            { name: 'id' },
            { name: 'julkaisuid' },
            { name: 'lisatietotyyppi' },
            { name: 'lisatietoteksti' }
          ]
        }
      }
    };

    this.restoreQuery = function() {
      let restoredQuery = $location.search();

      return {
        pageSize: restoredQuery.pageSize || 50,
        currentPage: restoredQuery.currentPage || 1,
        sort: restoredQuery.sort || 'id',
        direction: restoredQuery.direction || 'desc'
      };
    };

    /* CREATE :: POST */
    this.post = function(api, str) {
      return $http({
        method: 'POST',
        url: API_BASE_URL + 'justus_save.php/' + api,
        data: str,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (response) {
        $log.error('post ERROR ' + response.status + ' ' + response.data);
      });
    };

    /* READ :: GET */
    this.get = function (api, id, col, query, singleResult = false) {
      // id voi puuttua, jolloin palautetaan kaikki
      return $http({
        method: 'GET',
        url: API_BASE_URL + 'justus_save.php/' + api + (col ? '/' + col : '') + '/' + id,
        params: query
      })
      .then(function (response) {
        let ret = response.data; // list always
        if (singleResult === true) {
          return ret && ret.length > 0 ? ret[0] : {};
        }
        return ret || [];
      });
    };

    /* UPDATE :: PUT */
    this.put = function (api, id, str) {
      return $http({
        method: 'PUT',
        url: API_BASE_URL + 'justus_save.php/' + api + '/' + id,
        data: str,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (response) {
        $log.error('put ERROR ' + response.status + ' ' + response.data);
      });
    };

    /* DELETE :: DELETE */
    this.delete = function (api, id) {
      return $http({
        method: 'DELETE',
        url: API_BASE_URL + 'justus_save.php/' + api + '/' + id
      })
      .then(function (response) {
        return response.status + ' ' + response.data;
      })
      .catch(function (response) {
        $log.error('delete ERROR ' + response.status + ' ' + response.data);
      });
    };
  }
]);
