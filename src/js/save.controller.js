'use strict';

justusApp.controller('saveController',
['$scope','$http','APIService',
function($scope,$http,API)
{
  var tallennaTaulu = function(table,refid) {
    console.log("tallennaTaulu "+table+" ("+refid+")")
    var dnew = []; // list but often just one member
    var di = 0;
    dnew[di] = {};
    var dataIsArray = false;

    // mapping of columns
    angular.forEach($scope.meta.tables,function(t,k){
      if (t.name==table) {
        var jsonKey = t.ui;
        angular.forEach(t.columns,function(c,q){
          if (table=="alayksikko") {
            dnew[di].organisaatiotekijaid = refid;
          } else if (c.name=="julkaisuid") {
            dnew[di][c.name] = refid;
          }

          if (c.name!="id" && c.name!="julkaisuid" && c.name!="organisaatiotekijaid") {
            let obj = $scope.justus[c.name]; // db vs ui names must match!
            if (jsonKey) { // object is marked "json" or special, really just an array
              obj = $scope.justus[jsonKey];
            } else {
              // normal case
              // has value
              if (obj!=null && obj!="") // may be 0, though
                dnew[di][c.name] = obj;
            }
            console.log("tallennaTaulu TABLE:"+table+" COLUMN:"+c.name)
            console.debug(obj)
            if (table=="alayksikko") {
              // inside another element, which is an array itself
              //console.debug($scope.justus.organisaationtekijat)
              obj = [];
              angular.forEach($scope.justus.organisaationtekijat,function(ot,oi){
                obj = obj.concat(ot.alayksikot)
              });
              console.debug(obj)
            }
            if (isArray(obj)) {
              angular.forEach(obj,function(jv,jk){
                // hack: jk määrää dnew indeksin!
                if (di < jk) {
                  di++;
                  dnew[di] = {};
                  if (table=="alayksikko") {
                    dnew[di].organisaatiotekijaid = refid;
                  } else {
                    dnew[di].julkaisuid = refid;
                  }
                }
                if (jv)
                  dnew[di][c.name] = jv;
                // dnew yhden rivin osalta valmis
                console.log("tallennaTaulu ARRAY#"+jk)
                console.debug(dnew)
              });
            }
          }
        });
      }
    });
    // loop'n'store
    angular.forEach(dnew,function(d,i){
      console.log("tallennaTaulu "+table+" #"+i)
      console.debug(d)
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
        //so dont do this: tallennaTaulu("organisaatiotekija",jid);
        angular.forEach($scope.justus.organisaationtekijat,function(ov,ok){
          var dot = {};
          dot.julkaisuid = jid;
          if(ov['sukunimi']) dot.sukunimi = ov['sukunimi'];
          if(ov['etunimet'])  dot.etunimet = ov['etunimet'];
          if(ov['orcid'])    dot.orcid = ov['orcid'];
          API.post('organisaatiotekija'+"/",dot).success(function(otid){
            console.log("useTallenna post oid: "+otid);
            tallennaTaulu("alayksikko",otid);
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
