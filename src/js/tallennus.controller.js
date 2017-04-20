'use strict';

justusApp.controller('TallennusController',
['$scope','$http','$state','APIService',
function($scope,$http,$state,API)
{
  var tallennaTaulu = function(table,data) {
    console.debug("tallennaTaulu "+table,data)
    delete data[$scope.meta.tables[table].pkcol];
    console.debug(data)
    API.post(table+"/",data);
  }

  $scope.useTallenna = function() {
    console.log("useTallenna")
    var dnew = {};
    angular.forEach($scope.meta.tables.julkaisu.columns,function(v,k){
      if (v.name!="id" && v.name && $scope.justus[v.name]) {
        dnew[v.name] = $scope.justus[v.name];
      }
    });
    console.debug("post julkaisu",dnew);
    API.post("julkaisu"+"/",dnew).success(function(jid){
      console.log("useTallenna post jid: "+jid);
      if (jid) {
        angular.forEach($scope.justus.avainsana,function(adata,ak){
          adata.julkaisuid=jid;
          tallennaTaulu("avainsana",adata);
        })
        angular.forEach($scope.justus.tieteenala,function(tdata,tk){
          tdata.julkaisuid=jid;
          tallennaTaulu("tieteenala",tdata);
        });
        // nb! alayksikko needs new id of organisaatiotekija!
        angular.forEach($scope.justus.organisaatiotekija,function(odata,ok){
          odata.julkaisuid = jid;
          delete odata.id;
          let alayarr = odata.alayksikko;
          delete odata.alayksikko;
          console.debug("post organisaatiotekija",odata);
          API.post('organisaatiotekija'+"/",odata).success(function(otid){
            console.log("useTallenna post otid: "+otid);
            // adata copied above
            console.debug("post alayksikko",alayarr);
            angular.forEach(alayarr,function(adata,ak){
              adata.organisaatiotekijaid=otid;
              tallennaTaulu("alayksikko",adata);
            });
          });
        });
      }
      // move on to own publications
      $state.go('omat', {lang: $scope.lang});
    });
  }

  //
  // Muuttujat ja alustus
  //
  $scope.meta = API.meta;
  // init
  console.log("TallennusController");

}]);//-TallennusController
