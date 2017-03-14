'use strict';

justusApp.controller('saveController',
['$scope', '$http', 'APIService',
function($scope,$http,API)
{
  var tallennaTaulu = function(table,jid) {
    console.log("tallennaTaulu "+table+" ("+jid+")")
    var dnew = []; // list but often just one member
    var di = 0;
    dnew[di] = {};
    var dataIsArray = false;

    // mapping of columns
    angular.forEach($scope.meta.tables,function(t,u){
      var jsonKey = t.ui;
      if (t.name==table) {
        angular.forEach(t.columns,function(v,k){
          if (table=="alayksikko") {
            dnew[di].organisaatiotekijaid = jid;
          }
          if (v.name=="julkaisuid") {
            dnew[di][v.name] = jid;
          } else if (v.name!="id") {
            var tmpObj = $scope.justus[v.name]; // TODO db vs ui
            if (v.name) { // recognized from ui meaning it should be stored :: TODO ui
              if (jsonKey) { // object is marked "json" or special, really just an array
                tmpObj = $scope.justus[jsonKey];
              } else {
                // normal case
                // has value
                if (tmpObj)
                  dnew[di][v.name] = tmpObj;
              }
              if (isArray(tmpObj)) {
                angular.forEach(tmpObj,function(jv,jk){
                  // hack: jk määrää dnew indeksin!
                  if (di < jk) {
                    di++;
                    dnew[di] = {};
                    if (table=="alayksikko") {
                      dnew[di].organisaatiotekijaid = jid;
                    } else {
                      dnew[di].julkaisuid = jid;
                    }
                  }
                  if (jv)
                    dnew[di][v.name] = jv;
                  // dnew yhden rivin osalta valmis
                  console.debug(dnew)
                });
              }
            }
          }
        });
      }
    });
    // loop'n'store
    angular.forEach(dnew,function(d,i){
      API.post(table+"/",d);
    });
  }
  //
  // ACCESSORIT
  //
  $scope.useTallenna = function() {
    console.log("useTallenna")
    // käytetään "parent" justus-objektia, josta tallennettava data
    //console.debug($scope.justus)

    var dnew = {};

    var table = "julkaisu";
    console.log("useTallenna "+table)
    dnew = {};
    angular.forEach($scope.meta.tables,function(j,i){
      if (j.name==table) {
        angular.forEach(j.columns,function(v,k){
          // no id column, is "ui" (=supposed to store) and has a value
          // TODO some names in db are not same as ui has!
          if (v.name!="id" && v.name && $scope.justus[v.name]) {
            dnew[v.name] = $scope.justus[v.name];
          }
        });
      }
    });
    console.debug(dnew);
    API.post(table+"/",dnew).success(function(jid){
      console.log("useTallenna post jid: "+jid);

      if (jid) {
        tallennaTaulu("avainsana",jid);
        tallennaTaulu("tieteenala",jid);
        // alayksikko needs new id of organisaatiotekija also:
        //tallennaTaulu("organisaatiotekija",jid);
        angular.forEach($scope.justus.organisaationtekijat,function(ov,ok){
          var dot = {};
          dot.julkaisuid = jid;
          if(ov['sukunimi']) dot.sukunimi = ov['sukunimi'];
          if(ov['etunimi'])  dot.etunimet = ov['etunimi'];
          if(ov['orcid'])    dot.orcid = ov['orcid'];
          API.post('organisaatiotekija'+"/",dot).success(function(oid){
            console.log("useTallenna post oid: "+oid);
            tallennaTaulu("alayksikko",oid);
          });
        });
      }
      // move on to own publications
      window.location = "omat.html";
    });
  }

  //
  // Muuttujat ja alustus
  //
  $scope.meta = API.meta;
  // init
  console.log("saveController");

}]);//-saveController
