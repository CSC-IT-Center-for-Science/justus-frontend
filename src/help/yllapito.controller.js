'use strict';

justusApp.controller('YllapitoController',
['$scope', '$http', 'APIService',
function($scope,$http,API)
{
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
    $scope.useTaulu($scope.table.name);
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

}]);//-APIController
