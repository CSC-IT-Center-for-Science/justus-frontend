'use strict';

justusApp.controller('TarkastaController',
['$rootScope','$scope','$http','$state','APIService','KoodistoService',
function($rootScope,$scope,$http,$state,API,Koodisto)
{
  //index provides: lang, i18n, codes, user, ...

  $scope.meta = API.meta;
  $scope.data = [];
  $scope.colOrder='id';
  $scope.colOrderReverse=false;

  // map from service (generic) to scope
  $scope.getCode = function(codeset,code) {
    return Koodisto.getCode($scope.codes,codeset,code);
  }

  $scope.usePaivita = function(table,jobj,julkaisuid,idcol,col,val) {
    // new params cols & vals could be used to send only changed values. now all goes.
    if (julkaisuid && jobj) {
      if (table=='julkaisu') {
        jobj.username = $scope.user.name;
        jobj.modified = new Date();
      }
      let copyof = {};
      angular.forEach(jobj,function(v,k){copyof[k]=v;});
      delete copyof[idcol]; // api doesn't like primary key in data
      delete copyof.ui_julkaisuntila; // our own addition
      if (col) {
        copyof[col] = val;
      }
      API.put(table,julkaisuid,JSON.stringify(copyof));
    }
  }

  $scope.usePoista = function(table,id) {
    API.delete(table,id);
    // delete from scope
    delete $scope.data[table][id];
  }

  $scope.useHae = function(table) {
    $scope.data[table] = [];
    // limit fetched rows by organisaatiotunnus
    let val = $scope.user.organization.code!='00000'?$scope.user.organization.code:null;
    let col = $scope.user.organization.code!='00000'?'organisaatiotunnus':null;
    API.get(table,val,col)
    .then(function (obj){
      // we get a list, loop
      angular.forEach(obj, function(o,k) {
        if (table=="julkaisu") {
          // convert to date type
          // NB! API returns "2017-03-24 12:37:47.18+02"
          // => convert string first (as illustrated in http://dygraphs.com/date-formats.html)
          if (o.modified) {
            let m = o.modified;
            m = m.replace(/-/g,"/"); // date separator to "/"
            m = m.replace(/\..*$/,""); // strip milliseconds away
            o.modified = new Date(m);
          }
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

  // additional
  // pass information to another controller yet to be loaded
  // nb! we use $rootScope to pass that information
  $scope.resetJustus = function(){
    $rootScope.resetJustus=true;
  }

  let init = function() {
    // at very first test that user object is accessible
    if (!$scope.hasAccess($scope.state.name)) {
      $state.go('index', {lang:$scope.lang});
      // stop initializing
      return;
    }
    $scope.resetData();
    
    $scope.odottavat = true;
  }

  init();

}]);//-TarkastaController
