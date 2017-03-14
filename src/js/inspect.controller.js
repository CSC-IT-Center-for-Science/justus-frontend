'use strict';

justusApp.controller('InspectController',
['$scope', '$http', 'APIService', 'KoodistoService',
function($scope,$http,API,Koodisto)
{
  var language = "FI";
  $scope.lang = language;
  $scope.i18n = i18n;
  $scope.codes = codes;

  $scope.meta = API.meta;
  $scope.data = [];

  var getKoodisto = function(koodisto) {
    if(!koodisto) return;
    Koodisto.getKoodisto(koodisto)
    .then(function (obj) {
      $scope.codes[koodisto] = obj;
    });
  }

  getKoodisto('kieli');
  getKoodisto('maatjavaltiot2');
  $scope.getKoodistoKoodi = function(koodisto,koodi) {
    console.log("getKoodistoKoodi "+koodisto+" "+koodi);
    if (koodisto && koodi) {
      if(!$scope.codes[koodisto]) {
        getKoodisto(koodisto);
      }
      for (var i=0 ; i<$scope.codes[koodisto].length; i++) {
        if ($scope.codes[koodisto][i].arvo == koodi) {
          return $scope.codes[koodisto][i];
        }
      }
    }
  }

  $scope.getCode = function(codeset,code) {
    return Koodisto.getCode($scope.codes,codeset,code);
  }

  $scope.resetData = function() {
    angular.forEach(API.meta.tables, function(tobj,tkey) {
      $scope.useHae(tobj.name);
    });
  }

  $scope.useHae = function(table,id) {
    console.log("useHae "+table+" "+id);
    API.get(table,id)
    .then(function (obj){
      angular.forEach(obj, function(o,k) { //saadaan lista, luupataan
        console.debug("useHae: o "+o.id)
        console.debug(o)
        if (table=="julkaisu"){
          $scope.data.push(o);
        }
      });
    });
  }

  $scope.usePaivita = function(table,id,idcol) {
    console.log("usePaivita "+table+" "+id+" "+idcol);
    var jobj = null;
    if($scope.data && $scope.data.length) {
      jobj = $scope.data.filter(function(data){return data[idcol]==id;})[0];
    }
    if (id && jobj) {
      delete jobj[idcol]; // api ei tykkää pk:n mukanaolosta datassa
      API.put(table,id,JSON.stringify(jobj));
    }
  }

  $scope.usePoista = function(table,id) {
    console.log("usePoista "+table+" "+id);
    API.delete(table,id);
  }

  // init
  $scope.resetData();

}]);//-InspectController
