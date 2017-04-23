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

  $scope.usePaivita = function(table,jobj,julkaisuid,idcol,cols,vals) {
    console.log("usePaivita "+table+" "+julkaisuid+" "+idcol+" (optional: "+cols+":"+vals+")");
    // new params cols & vals could be used to send only changed values. now all goes.
    //console.log("usePaivita in between...")
    //console.debug(jobj)
    if (julkaisuid && jobj) {
      delete jobj[idcol]; // api ei tykkää pk:n mukanaolosta datassa
      if (table=='julkaisu') {
        jobj.username = user.name;
        jobj.modified = new Date();
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
    console.debug("useHae",table,user.organization.code);
    $scope.data[table] = [];
    // limit fetched rows by organisaatiotunnus
    let val = user.organization.code!='00000'?user.organization.code:null;
    let col = user.organization.code!='00000'?'organisaatiotunnus':null;
    API.get(table,val,col)
    .then(function (obj){
      // we get a list, loop
      angular.forEach(obj, function(o,k) {
        // convert to date type
        if (table=="julkaisu" && o.modified){
          o.modified = new Date(o.modified)
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
