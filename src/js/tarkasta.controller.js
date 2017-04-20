'use strict';

justusApp.controller('TarkastaController',
['$scope','$http','$stateParams','APIService','KoodistoService',
function($scope,$http,$stateParams,API,Koodisto)
{
  //index provides: i18n, codes

  $scope.lang = $stateParams.lang||'FI';
  console.debug($scope.lang)

  $scope.meta = API.meta;
  $scope.data = [];
  $scope.colOrder='id';
  $scope.colOrderReverse=false;

  // map from service (generic) to scope
  $scope.getCode = function(codeset,code) {
    return Koodisto.getCode($scope.codes,codeset,code);
  }

  $scope.usePaivita = function(table,jobj,julkaisuid,idcol,cols,vals) {
    console.log("usePaivita "+table+" "+julkaisuid+" "+idcol+" (optional: "+cols+":"+vals+")");
    // new params cols & vals could be used to send only changed values. now all goes.
    //console.log("usePaivita in between...")
    //console.debug(jobj)
    if (julkaisuid && jobj) {
      delete jobj[idcol]; // api ei tykkää pk:n mukanaolosta datassa
      if (table=='julkaisu') {
        jobj.username = 'JustusDemo';
        jobj.modified = new Date().toISOString();
      }
      //console.log("usePaivita sending")
      //console.debug(jobj)
      API.put(table,julkaisuid,JSON.stringify(jobj));
      jobj[idcol]=julkaisuid; // return id
    }
  }

  $scope.usePoista = function(table,id) {
    console.log("usePoista "+table+" "+id);
    API.delete(table,id);
    // delete from scope
    delete $scope.data[table][id];
  }

  $scope.useHae = function(table) {
    console.log("useHae "+table);
    $scope.data[table] = [];
    API.get(table)
    .then(function (obj){
      angular.forEach(obj, function(o,k) { //saadaan lista, luupataan
        //console.debug("useHae: o "+o.id)
        //console.debug(o)
        // convert to date type
        if (table=="julkaisu" && o.modified){
          o.modified = new Date(o.modified)
        }
        $scope.data[table].push(o);
      });
    });
  }

  $scope.resetData = function() {
    //angular.forEach($scope.meta.tables,function(tobj,tkey){
    //  $scope.useHae(tobj.name);
    //});
    $scope.useHae("julkaisu");
  }

  // init
  $scope.resetData();
  
  $scope.odottavat = true;
  //if (QueryString['julkaisuntila']) {
  //  $scope.odottavat = false;
  //}
}]);//-TarkastaController
