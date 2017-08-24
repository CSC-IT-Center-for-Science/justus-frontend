'use strict';

angular.module('TallennusController', [])
.controller('TallennusController', [
  '$scope', '$http', '$state', 'APIService', 'JustusService',
  function($scope, $http, $state, APIService, JustusService) {
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
        APIService.put(table, putid, data);
        // restore id
        data[$scope.meta.tables[table].pkcol] = saveid;
      }
      else {
        APIService.post(table, data);
      }
    };

    let saveOrganisaatiotekija = function(julkaisuid) {
      // nb! alayksikko needs new id of organisaatiotekija!
      angular.forEach($scope.justus.organisaatiotekija, function(odata, ok) {
        odata.julkaisuid = julkaisuid;

        // take alayksikko out and save it in its own loop
        let alayarr = odata.alayksikko;
        delete odata.alayksikko;
        // remove id (primary key) from data
        let putid = odata.id || null;
        delete odata.id;
        // put or post
        if (putid) {
          APIService.put('organisaatiotekija', putid, odata);
          // alayarr copied above
          angular.forEach(alayarr, function(adata, ak) {
            saveTable('alayksikko', adata, adata.id, adata.organisaatiotekijaid);
          });
          // restore id
          odata.id = putid;
        }
        else {
          APIService.post('organisaatiotekija' + '/', odata).then(function(otid) {
            // alayarr copied above
            angular.forEach(alayarr, function(adata, ak) {
              saveTable('alayksikko', adata, adata.id, otid);
            });
          });
        }
      });
    };

    // ACCESSORS (scope)

    $scope.useTallenna = function() {
      let dnew = {};
      // from main table julkaisu drop not significant columns, and id
      angular.forEach($scope.meta.tables.julkaisu.columns, function(v, k) {
        if (v.name !== 'id' && v.name !== 'modified' && v.name && $scope.justus[v.name]) {
          dnew[v.name] = $scope.justus[v.name];
        }
      });
      dnew.modified = new Date();
      if ($scope.justus.id) { // we have id so we're updating
        APIService.put('julkaisu', $scope.justus.id, dnew);
        angular.forEach($scope.justus.avainsana, function(adata, ak) {
          // refid should be given here as we might be inserting new, in which case adata.id is undefined
          saveTable('avainsana', adata, adata.id, $scope.justus.id);
        });
        angular.forEach($scope.justus.tieteenala, function(tdata, tk) {
          // refid should be given here as we might be inserting new, in which case tdata.id is undefined
          saveTable('tieteenala', tdata, tdata.id, $scope.justus.id);
        });
        saveOrganisaatiotekija($scope.justus.id);
        // move on to own publications
        $state.go('omat', { lang: $scope.lang });
        JustusService.clearPublicationForm();
      }
      else {
        APIService.post('julkaisu', dnew).then(function(jid) {
          if (jid) {
            angular.forEach($scope.justus.avainsana, function(adata, ak) {
              saveTable('avainsana', adata, adata.id, jid);
            });
            angular.forEach($scope.justus.tieteenala, function(tdata, tk) {
              saveTable('tieteenala', tdata, tdata.id, jid);
            });
            saveOrganisaatiotekija(jid);
          }
          // move on to own publications
          $state.go('omat', { lang: $scope.lang });
          JustusService.clearPublicationForm();
        });
      }
    };
  }
]);
