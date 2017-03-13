'use strict';

justusApp.controller('APIController',
['$scope', '$http', 'APIService',
function($scope,$http,API)
{
  var language = "FI";
  /* jos haluaa tarjota selaimen kielen oletuksena:
  if(window)if(window.navigator){
    language = window.navigator.userLanguage || window.navigator.language;
    language = language.substr(0,2);
    language = language.toUpperCase();
    console.log("from browser language: "+language);
  }
  //*/
  $scope.lang = language;
  $scope.i18n = i18n;

  $scope.meta = API.meta;
  $scope.table = {};

  $scope.dnew = {}; // init jotta UI ja loopit osaa...
  $scope.useLisaa = function() {
    var str=JSON.stringify($scope.dnew);
    $scope.dnew = {};
    if(str) {
      console.log("useLisaa "+str);
      API.post($scope.table.name,str);
      $scope.useHae();
    }
  }

  $scope.useHae = function(id) {
    console.log("useHae "+id);
    API.get($scope.table.name,id)
    .then(function (obj){
      $scope.rawdata = obj;
      $scope.data = obj;
    });
  }

  $scope.usePaivita = function(id,idcol) {
    console.log("usePaivita "+id+" "+idcol);
    var jobj = null;
    if($scope.data && $scope.data.length) {
      jobj = $scope.data.filter(function(data){return data[idcol]==id;})[0];
    }
    if (id && jobj) {
      delete jobj[idcol]; // api ei tykkää pk:n mukanaolosta datassa
      API.put($scope.table.name,id,JSON.stringify(jobj));
      $scope.useHae();
    }
  }

  $scope.usePoista = function(id) {
    API.delete($scope.table.name,id);
    $scope.useHae();
  }

  $scope.useTaulu = function(input) {
    console.log("useTaulu "+input);
    angular.forEach($scope.meta.tables, function(mobj,mkey) {
      if (mobj.name == input) {
        $scope.table = mobj;
      }
    });
    $scope.useHae();
  }

  // debug/develop init
  //$scope.useTaulu("julkaisu");

}]);//-APIController
