'use strict';

//from config uses: user

justusApp.controller('TarkastaController',
['$rootScope','$scope','$http','APIService','KoodistoService',
function($rootScope,$scope,$http,API,Koodisto)
{
  //index provides: lang, i18n, codes, ...

  $scope.meta = API.meta;
  $scope.data = [];
  $scope.colOrder='id';
  $scope.colOrderReverse=false;

  // map from service (generic) to scope
  $scope.getCode = function(codeset,code) {
    return Koodisto.getCode($scope.codes,codeset,code);
  }

  $scope.usePaivita = function(table,jobj,julkaisuid,idcol,col,val) {
    console.log("usePaivita "+table+" "+julkaisuid+" "+idcol+" (optional: "+col+":"+val+")");
    // new params cols & vals could be used to send only changed values. now all goes.
    if (julkaisuid && jobj) {
      if (table=='julkaisu') {
        jobj.username = user.name;
        jobj.modified = new Date();
      }
      let copyof = {};
      angular.forEach(jobj,function(v,k){copyof[k]=v;});
      delete copyof[idcol]; // api doesn't like primary key in data
      delete copyof.ui_julkaisuntila; // our own addition
      if (col) {
        copyof[col] = val;
      }
      console.debug("usePaivita sending",copyof)
      API.put(table,julkaisuid,JSON.stringify(copyof));
      //jobj[idcol]=julkaisuid; // return id
    }
  }

  $scope.usePoista = function(table,id) {
    console.log("usePoista "+table+" "+id);
    API.delete(table,id);
    // delete from scope
    delete $scope.data[table][id];
  }

  $scope.useHae = function(table) {
    console.debug("useHae",table,user.organization.code);
    $scope.data[table] = [];
    // limit fetched rows by organisaatiotunnus
    let val = user.organization.code!='00000'?user.organization.code:null;
    let col = user.organization.code!='00000'?'organisaatiotunnus':null;
    API.get(table,val,col)
    .then(function (obj){
      // we get a list, loop
      angular.forEach(obj, function(o,k) {
        if (table=="julkaisu") {
          // convert to date type
          o.modified = o.modified?new Date(o.modified):null;
          // for showing julkaisuntila even after changing it to database...
          o.ui_julkaisuntila = o.julkaisuntila;
        }
        $scope.data[table].push(o);
      });
    });
  }

  $scope.resetData = function() {
    $scope.useHae("julkaisu");
  }

  // init
  $scope.resetData();
  
  $scope.odottavat = true;

  // additional
  // pass information to another controller yet to be loaded
  // nb! we use $rootScope to pass that information
  $scope.resetJustus = function(){
    $rootScope.resetJustus=true;
  }

}]);//-TarkastaController
