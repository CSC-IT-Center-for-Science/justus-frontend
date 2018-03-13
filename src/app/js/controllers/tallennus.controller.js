'use strict';

angular.module('TallennusController', [])
.controller('TallennusController', [
  '$scope', '$log', '$window', '$http', '$state', 'APIService', 'API_BASE_URL', 'JustusService', 'DataStoreService',
  function($scope, $log, $window, $http, $state, APIService, API_BASE_URL, JustusService, DataStoreService) {
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
      return Promise.resolve()
      .then(() => {
        // Delete old keywords when updating an existing publication to replace with newly entered keywords
        if ($scope.justus.id) {
          return $http({
            method: 'DELETE',
            url: `${API_BASE_URL}justus_save.php/avainsana/julkaisuid/${julkaisuId}`
          });
        }
      })
      .then(() => {
        $scope.justus.avainsana.forEach((item) => {
          item.julkaisuid = julkaisuId;
        });
        return $http({
          method: 'POST',
          url: `${API_BASE_URL}justus_save.php/avainsana/julkaisuid/${julkaisuId}`,
          data: $scope.justus.avainsana,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        });
      });
    };

    // Data: [{ "tieteenalakoodi": "100", "jnro": 0, "julkaisuid": "1" }]
    const saveTieteenala = (julkaisuId) => {
      return Promise.resolve()
      .then(() => {
        if ($scope.justus.id) {
          return $http({
            method: 'DELETE',
            url: `${API_BASE_URL}justus_save.php/tieteenala/julkaisuid/${julkaisuId}`
          });
        }
      })
      .then(() => {
        const data = [];
        $scope.justus.tieteenala.forEach((item) => {
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
    };

    // Data: [{ "taiteenalakoodi": "100", "jnro": 0, "julkaisuid": "1" }]
    const saveTaiteenala = (julkaisuId) => {
      // if no art publication; return
      if ($scope.justus.taiteenala.length === 0) {
        return Promise.resolve(true);
      }
        return Promise.resolve()
          .then(() => {
            if ($scope.justus.id) {
              return $http({
                method: 'DELETE',
                url: `${API_BASE_URL}justus_save.php/taiteenala/julkaisuid/${julkaisuId}`
              });
            }
          })
          .then(() => {
            const data = [];
            $scope.justus.taiteenala.forEach((item) => {
              data.push({
                taiteenalakoodi: item.taiteenalakoodi,
                jnro: item.jnro,
                julkaisuid: julkaisuId
              });
            });
            return $http({
              method: 'POST',
              url: `${API_BASE_URL}justus_save.php/taiteenala/julkaisuid/${julkaisuId}`,
              data: data,
              headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            });
          });
    };

    const saveLisatieto = (julkaisuId) => {
      // if no art publication; return
      if ($scope.justus.taidelisatieto.length === 0) {
        return Promise.resolve(true);
      }
      return Promise.resolve()
        .then(() => {
          if ($scope.justus.id) {
            return $http({
              method: 'DELETE',
              url: `${API_BASE_URL}justus_save.php/lisatieto/julkaisuid/${julkaisuId}`
            });
          }
        })
        .then(() => {
          const data = [];
          $scope.justus.taidelisatieto.forEach((item) => {
            data.push({
              lisatietoteksti: item.lisatietoteksti,
              lisatietotyyppi: item.lisatietotyyppi,
              julkaisuid: julkaisuId
            });
          });
          return $http({
            method: 'POST',
            url: `${API_BASE_URL}justus_save.php/lisatieto/julkaisuid/${julkaisuId}`,
            data: data,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
          });
        });
    };

    const savaTaidelanTyyppikategoria = (julkaisuId) => {
      // if tyyppikategoria is empty; return
      if ($scope.justus.taidealantyyppikategoria.length === 0) {
        return Promise.resolve(true);
      }
      return Promise.resolve()
        .then(() => {
          if ($scope.justus.id) {
            return $http({
              method: 'DELETE',
              url: `${API_BASE_URL}justus_save.php/taidealantyyppikategoria/julkaisuid/${julkaisuId}`
            });
          }
        })
        .then(() => {
          const data = [];
          $scope.justus.taidealantyyppikategoria.forEach((item) => {
            data.push({
              tyyppikategoria: item.tyyppikategoria,
              julkaisuid: julkaisuId
            });
          });
          return $http({
            method: 'POST',
            url: `${API_BASE_URL}justus_save.php/taidealantyyppikategoria/julkaisuid/${julkaisuId}`,
            data: data,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
          });
        });
    };

    const saveOrganisaatiotekija = function(julkaisuId) {
      return Promise.resolve()
      .then(() => {
        if ($scope.justus.id) {
          return $http({
            method: 'DELETE',
            url: `${API_BASE_URL}justus_save.php/organisaatiotekija/julkaisuid/${julkaisuId}`
          });
        }
      })
      .then(() => {
        return Promise.map($scope.justus.organisaatiotekija, (organisaatiotekija) => {
          if (organisaatiotekija.etunimet && organisaatiotekija.sukunimi) {
            organisaatiotekija.julkaisuid = julkaisuId;

            // Remove alayksikko, since it will be saved separately
            const alayksikot = organisaatiotekija.alayksikko;
            delete organisaatiotekija.alayksikko;

            // Remove old organisaatiotekijaIds
            delete organisaatiotekija.id;

            return APIService.post('organisaatiotekija' + '/', organisaatiotekija)
            .then((otid) => {
              return Promise.map(alayksikot, (alayksikko) => {
                if (alayksikko) {
                  alayksikko.organisaatiotekijaid = otid;
                  return saveTable('alayksikko', alayksikko);
                }
              });
            });
          }
        });
      });
    };

    $scope.savePublicationForm = function() {
      const publication = {};

      // Replace user entered values in schema and set default values for
      // not entered fields
      angular.forEach($scope.meta.tables.julkaisu.columns, (field) => {
        publication[field.name] = $scope.justus[field.name] || field.default;
      });
      delete publication.id;
      publication.modified = new Date();

      // Combine lisatiedot to one array
      angular.forEach($scope.justus.tempLisatieto, function(value, key){
        if (value.lisatietoteksti !== '') {
          $scope.justus.taidelisatieto.push({
            lisatietoteksti: value.lisatietoteksti,
            lisatietotyyppi: value.lisatietotyyppi
          });
        }
      });

      // Loop through tieteenala array and add order number
      angular.forEach($scope.justus.tieteenala, function(value, key) {
        $scope.justus.tieteenala[key].jnro = key + 1;
      });

      // Loop through taiteenala array and add order number
      angular.forEach($scope.justus.taiteenala, function(value, key) {
        $scope.justus.taiteenala[key].jnro = key + 1;
      });

      // Update existing publication or create new depending on possible existing id
      const julkaisuPromise = $scope.justus.id ? APIService.put('julkaisu', $scope.justus.id, publication) : APIService.post('julkaisu', publication);
      let julkaisuId = null;

      return julkaisuPromise.then((newJulkaisuId) => {
        julkaisuId = $scope.justus.id ? $scope.justus.id : newJulkaisuId;

        if (!julkaisuId) {
          throw new Error('JulkaisuId missing from response');
        }
          return Promise.all([
            saveAvainsana(julkaisuId),
            saveTieteenala(julkaisuId),
            saveOrganisaatiotekija(julkaisuId),
            saveTaiteenala(julkaisuId),
            saveLisatieto(julkaisuId),
            savaTaidelanTyyppikategoria(julkaisuId)
          ]);
      })
      .then(() => {
        $state.go('omat', { lang: $scope.lang });
        JustusService.clearPublicationForm();
      })
      .catch((error) => {
          $log.error(error);

        // Todo: Backend provides invalid JSON as a response which results in a baddata-error even though the save is a success
        // Can be removed after the responses are fixed
        if (error && error.message && error.message.indexOf('$http:baddata') !== -1) {
          $state.go('omat', { lang: $scope.lang });
          JustusService.clearPublicationForm();
        }
      });
     };

      $scope.cancelAndReturnToPublicationListing = function() {
        if (!DataStoreService.getStateName()) {
          $state.go('omat');
          JustusService.clearPublicationForm();
        } else {
          let state = DataStoreService.getStateName();
          $state.go(state);
          DataStoreService.storeStateData(null);
          JustusService.clearPublicationForm();
        }
      };

  }
]);
