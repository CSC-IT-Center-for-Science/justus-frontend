'use strict';

angular.module('DataStoreService', [])
  .service('DataStoreService', [
    '$log', '$http', 'DEMO_ENABLED', function($log, $http, DEMO_ENABLED) {

      let o;
      let s;

      return {
        storeBooleanforOdottavat: function (odottavat) {
          o = odottavat;
        },
        storeStateData: function(state) {
          s = state;
        },
        getBooleanForOdottavat: function() {
          return o;
        },
        getStateName: function() {
          return s;
        }
      };
}
]);