'use strict';

// from config uses: apiuri

angular.module('APIService', [])
.service('APIService', [
  '$http', '$location', '$log',
  function ($http, $location, $log) {
    this.meta = {
      tables: {
        'julkaisu': {
          name: 'julkaisu',
          pkcol: 'id',
          columns: [
            { name: 'id' },
            { name: 'organisaatiotunnus' },
            { name: 'julkaisutyyppi' },
            { name: 'julkaisuvuosi' },
            { name: 'julkaisunnimi' },
            { name: 'tekijat' },
            { name: 'julkaisuntekijoidenlukumaara' },
            { name: 'konferenssinvakiintunutnimi' },
            { name: 'emojulkaisunnimi' },
            { name: 'isbn' },
            { name: 'emojulkaisuntoimittajat' },
            { name: 'lehdenjulkaisusarjannimi' },
            { name: 'issn' },
            { name: 'volyymi' },
            { name: 'numero' },
            { name: 'sivut' },
            { name: 'artikkelinumero' },
            { name: 'kustantaja' },
            { name: 'julkaisunkustannuspaikka' },
            { name: 'julkaisunkieli' },
            { name: 'julkaisunkansainvalisyys' },
            { name: 'julkaisumaa' },
            { name: 'kansainvalinenyhteisjulkaisu' },
            { name: 'yhteisjulkaisuyrityksenkanssa' },
            { name: 'doitunniste' },
            { name: 'pysyvaverkkoosoite' },
            { name: 'avoinsaatavuus' },
            { name: 'julkaisurinnakkaistallennettu' },
            { name: 'rinnakkaistallennetunversionverkkoosoite' },
            { name: 'jufotunnus' },
            { name: 'jufoluokitus' },
            { name: 'julkaisuntila' },
            { name: 'username' },
            { name: 'modified' }
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
            { name: 'orcid' }
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
            { ame: 'id' },
            { name: 'julkaisuid' },
            { name: 'tieteenalakoodi' },
            { name: 'jnro' }
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
        url: apiuri + api,
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
    this.get = function (api, id, col, query) {
      // id voi puuttua, jolloin palautetaan kaikki
      return $http({
        method: 'GET',
        url: apiuri + api + (col ? '/' + col : '') + '/' + id,
        params: query
      })
      .then(function (response) {
        let ret = response.data; // list always
        return ret;
      });
    };

    /* UPDATE :: PUT */
    this.put = function (api, id, str) {
      return $http({
        method: 'PUT',
        url: apiuri + api + '/' + id,
        data: str,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      })
      .then(function (response) {
        return response.status + ' ' + response.data;
      })
      .catch(function (response) {
        $log.error('put ERROR ' + response.status + ' ' + response.data);
      });
    };

    /* DELETE :: DELETE */
    this.delete = function (api, id) {
      return $http({
        method: 'DELETE',
        url: apiuri + api + '/' + id
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
