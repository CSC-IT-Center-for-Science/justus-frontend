'use strict';

angular.module('TallennusController', [])
.controller('TallennusController', [
  '$scope', '$log', '$http', '$state', 'APIService', 'API_BASE_URL', 'JustusService',
  function($scope, $log, $http, $state, APIService, API_BASE_URL, JustusService) {
    // index provides: lang, ...
    // justus provides: justus

    $scope.meta = APIService.meta;

    let saveTable = function(table, data, putid, refid) {
      // remove primary key from data
      let saveid = data[$scope.meta.tables[table].pkcol];
      delete data[$scope.meta.tables[table].pkcol];
      // set referencing key if given (only meaningful for inserting new but set anyway)
      if (refid) {
        if (table === 'avainsana' || table === 'tieteenala' || table === 'organisaatiotekija') {
          data.julkaisuid = refid;
        }
        if (table === 'alayksikko') {
          data.organisaatiotekijaid = refid;
        }
      }
      // update (put) or insert (post)
      if (putid) {
        // restore id
        data[$scope.meta.tables[table].pkcol] = saveid;
        return APIService.put(table, putid, data);
      }
      else {
        return APIService.post(table, data);
      }
    };

    const saveAvainsana = (julkaisuId) => {
      let promise = Promise.resolve();

      // Delete old keywords when updating an existing publication to replace with newly entered keywords
      if ($scope.justus.id) {
        promise = $http({
          method: 'DELETE',
          url: `${API_BASE_URL}justus_save.php/avainsana/julkaisuid/${julkaisuId}`
        });
      }

      promise.then(() => {
        $scope.justus.avainsana.forEach(function(item) {
          item.julkaisuid = julkaisuId;
        });
        return $http({
          method: 'POST',
          url: `${API_BASE_URL}justus_save.php/avainsana/julkaisuid/${julkaisuId}`,
          data: $scope.justus.avainsana,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        });
      });

      return promise;
    };

    // Data: [{ "tieteenalakoodi": "100", "jnro": 0, "julkaisuid": "1" }]
    const saveTieteenala = (julkaisuId) => {
      let promise = Promise.resolve();

      if ($scope.justus.id) {
        promise = $http({
          method: 'DELETE',
          url: `${API_BASE_URL}justus_save.php/tieteenala/julkaisuid/${julkaisuId}`
        });
      }

      promise.then(() => {
        const data = [];
        $scope.justus.tieteenala.forEach(function(item) {
          data.push({
            tieteenalakoodi: item.tieteenalakoodi,
            jnro: item.jnro,
            julkaisuid: julkaisuId
          });
        });

        return $http({
          method: 'POST',
          url: `${API_BASE_URL}justus_save.php/tieteenala/julkaisuid/${julkaisuId}`,
          data: data,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        });
      });

      return promise;
    };

    const saveOrganisaatiotekija = function(julkaisuId) {
      let promise = Promise.resolve();

      if ($scope.justus.id) {
        promise = $http({
          method: 'DELETE',
          url: `${API_BASE_URL}justus_save.php/organisaatiotekija/julkaisuid/${julkaisuId}`
        });
      }

      promise.then(() => {
        // nb! alayksikko needs new id of organisaatiotekija!
        angular.forEach($scope.justus.organisaatiotekija, function(odata, ok) {
          odata.julkaisuid = julkaisuId;

          // take alayksikko out and save it in its own loop
          let alayarr = odata.alayksikko;
          delete odata.alayksikko;
          // remove id (primary key) from data
          let putid = odata.id || null;
          delete odata.id;

          APIService.post('organisaatiotekija' + '/', odata)
          .then(function(otid) {
            // alayarr copied above
            angular.forEach(alayarr, function(adata, ak) {
              saveTable('alayksikko', adata, adata.id, otid);
            });
          });
        });
      });
    };

    $scope.savePublicationForm = function() {
      let dnew = {};
      // from main table julkaisu drop not significant columns, and id
      angular.forEach($scope.meta.tables.julkaisu.columns, function(v, k) {
        if (v.name !== 'id' && v.name !== 'modified' && v.name && $scope.justus[v.name]) {
          dnew[v.name] = $scope.justus[v.name];
        }
      });
      dnew.modified = new Date();

      // Update existing publication or create new depending on possible existing id
      const julkaisuPromise = $scope.justus.id ? APIService.put('julkaisu', $scope.justus.id, dnew) : APIService.post('julkaisu', dnew);
      let julkaisuId = null;

      return julkaisuPromise.then((newJulkaisuId) => {
        julkaisuId = $scope.justus.id ? $scope.justus.id : newJulkaisuId;

        if (!julkaisuId) {
          throw new Error('JulkaisuId missing from response');
        }

        return Promise.all([
          saveAvainsana(julkaisuId),
          saveTieteenala(julkaisuId)
        ]);
      })
      .then(() => {
        saveOrganisaatiotekija(julkaisuId);
        $state.go('omat', { lang: $scope.lang });
        JustusService.clearPublicationForm();
      })
      .catch((response) => {
        $log.error(response);
      });
    };
  }
]);
