'use strict';

justusApp.controller('InspectController',
['$scope', '$http', 'APIService', 'KoodistoService', 'JustusService',
function($scope,$http,API,Koodisto,Justus)
{
  var language = "FI";
  $scope.lang = language;
  $scope.i18n = i18n;
  $scope.codes = codes;
  //$scope.getCode = getCode;
  // mappaa genericistä scopeen
  $scope.getCode = function(codeset,code) {
    return Justus.getCode($scope.codes,codeset,code);
  }

  $scope.meta = API.meta;
  $scope.data = [];

  var getKoodisto = function(koodisto) {
    if(!koodisto) return;
    Koodisto.getKoodisto(koodisto)
    .then(function (obj) {
      $scope.codes[koodisto] = obj;
    });
  }
  // tiedetään että tarvitaan:
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
        var id = "";
        console.debug("useHae: o "+o.id)
        console.debug(o)
        if (table=="julkaisu"){ //eri "id"-sarake
          $scope.data.push(o);
        }
        /*
        if (table=="julkaisu"){ //eri "id"-sarake
          id = o.id;
        } else {
          id=o.julkaisuid;
        }
        if (!$scope.data[id]) { //tee objekti jos ei ole
          $scope.data[id] = {};
        }
        if (table=="julkaisu"){ //vain yksi rivi
          $scope.data[id][table] = o;
        } else {
          if (!$scope.data[id][table]) {// tee lista jos ei ole
            $scope.data[id][table] = [];
          }
          $scope.data[id][table].push(o);
        }
        */
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

  // debug/develop init
  $scope.resetData();

}]);//-APIController
