'use strict';

//let justusApp = angular.module('justusApp', ['ngAnimate', 'ngSanitize', 'ui.select', 'ui.bootstrap']);

/*
justusApp.service('justusSaveService', ['$rootScope', function($rootScope) {
  var service = {
    meta:
  };
  return service;
}]);
//*/

//ei toiminut? justusApp.controller('justusSaveController', 'justusSaveService', ['$scope', 'Save', '$http', function($scope,Save,$http)
justusApp.controller('justusSaveController', ['$scope', '$http', function($scope,$http)
{
  //
  // Privaatit funktiot (todo: -> serviceen)
  //
  var phpget = function (apiuri,id) {
    console.log("phpget "+id);
    return $http({
      method: 'GET',
      url: apiuri+id
    })
    .success(function (data, status, headers, config){
      var ret = [];
      if(id) ret.push(data); // ei lista
      else  ret = data; // lista
      return ret;
    })
    .error(function (data, status, header, config) {
      console.log("phpget ERROR "+status+" "+data);
    });
  }

  var phppost = function (apiuri,obj) {
    var str=JSON.stringify(obj)
    console.log("phppost "+apiuri+" "+str);
    return $http({
      method: 'POST',
      url: apiuri,
      data: str,
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    })
    .success(function (data, status, headers, config) {
      console.log("phppost OK "+status+" "+data);
      return data.result;
    })
    .error(function (data, status, header, config) {
      console.log("phppost ERROR "+status+" "+data);
    });
  }

  var phpput = function (apiuri,id,obj) {
    var str=JSON.stringify(obj)
    console.log("phpput "+id+" "+str);
    return $http({
      method: 'PUT',
      url: apiuri+id,
      data: str,
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    })
    .success(function (data, status, headers, config) {
      return data.result;
    })
    .error(function (data, status, header, config) {
      console.log("phpput ERROR "+status+" "+data);
    });
  }

  var phpdelete = function (apiuri,id) {
    console.log("phpdelete "+id);
    return $http({
      method: 'DELETE',
      url: apiuri+id
    })
    .success(function (data, status, headers, config) {
      return data.result;
    })
    .error(function (data, status, header, config) {
      console.log("phpdelete ERROR "+status+" "+data);
    });
  }

  //
  //
  //
  var tallennaTaulu = function(table,jid) {
    console.log("tallennaTaulu "+table+" ("+jid+")")
    var dnew = []; // list but often just one member
    var di = 0;
    dnew[di] = {};
    var dataIsArray = false;
    var jsonKey = $scope.meta.tables[table].ui;

    // mapping of columns
    angular.forEach($scope.meta.tables[table].columns,function(v,k){
      if (table=="alayksikko") {
        dnew[di].organisaatiotekijaid = jid;
      }
      if (v.name=="julkaisuid") {
        dnew[di][v.name] = jid;
      } else if (v.name!="id") {
        var tmpObj = $scope.justus[v.ui];
        if (v.ui) { // recognized from ui meaning it should be stored
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
    // loop'n'store
    angular.forEach(dnew,function(d,i){
      phppost(baseapiuri+table+"/",d);
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
    angular.forEach($scope.meta.tables[table].columns,function(v,k){
      // no id column, is "ui" (=supposed to store) and has a value
      if (v.name!="id" && v.ui && $scope.justus[v.ui]) {
        dnew[v.name] = $scope.justus[v.ui];
      }
    });
    console.debug(dnew);
    phppost(baseapiuri+table+"/",dnew).success(function(jid){
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
          phppost(baseapiuri+'organisaatiotekija'+"/",dot).success(function(oid){
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
  var baseapiuri = "https://demo.justus.csc.fi/api/justus_save.php/";

  $scope.meta = {
    tables: {
      'julkaisu': {
        columns: {
          id: {name: 'id'},
          c1: {name: 'organisaatiotunnus', ui: null},
          c2: {name: 'julkaisutyyppi', ui: 'julkaisutyyppi'},
          c3: {name: 'julkaisuvuosi', ui: 'julkaisuvuosi'},
          c4: {name: 'julkaisunnimi', ui: 'julkaisunnimi'},
          c5: {name: 'tekijat', ui: 'tekijat'},
          c6: {name: 'julkaisuntekijoidenlukumaara', ui: 'julkaisuntekijoidenlukumaara'},
          c7: {name: 'konferenssinvakiintunutnimi', ui: 'konferenssinvakiintunutnimi'},
          c8: {name: 'emojulkaisunnimi', ui: 'emojulkaisunnimi'},
          c9: {name: 'isbn', ui: 'isbn'},
          c10: {name: 'emojulkaisuntoimittajat', ui: 'emojulkaisuntoimittajat'},
          c11: {name: 'lehdenjulkaisusarjannimi', ui: 'lehdenjulkaisusarjannimi'},
          c12: {name: 'issn', ui: 'issn'},
          c13: {name: 'volyymi', ui: 'volyymi'},
          c14: {name: 'numero', ui: 'numero'},
          c15: {name: 'sivut', ui: 'sivut'},
          c16: {name: 'artikkelinumero', ui: 'artikkelinumero'},
          c17: {name: 'kustantaja', ui: 'kustantaja'},
          c18: {name: 'julkaisunkustannuspaikka', ui: 'julkaisunkustannuspaikka'},
          c19: {name: 'julkaisunkieli', ui: 'julkaisunkieli'},
          c20: {name: 'julkaisunkansainvalisyys', ui: 'julkaisunkansainvalisyys'},
          c21: {name: 'julkaisumaa', ui: 'julkaisumaa'},
          c22: {name: 'kansainvalinenyhteisjulkaisu', ui: 'kansainvalinenyhteisjulkaisu'},
          c23: {name: 'yhteisjulkaisuyrityksenkanssa', ui: 'yhteisjulkaisuyrityksenkanssa'},
          c24: {name: 'doitunniste', ui: 'doitunniste'},
          c25: {name: 'pysyvaverkkoosoite', ui: 'pysyvaverkkoosoite'},
          c26: {name: 'avoinsaatavuus', ui: 'avoinsaatavuus'},
          c27: {name: 'julkaisurinnakkaistallenettu', ui: 'julkaisurinnakkaistallennettu'},
          c28: {name: 'rinnakkaistallenetunversionverkkoosoite', ui: 'rinnakkaistallennetunversionverkkoosoite'},
          c29: {name: 'jufotunnus', ui: 'jufoid'},
          c30: {name: 'jufoluokitus', ui: 'jufoluokitus'}
        }
      },
      'avainsana': {
        ui: 'avainsanat', // lista
        columns: {
          id: {name: 'id'},
          c1: {name: 'julkaisuid'},
          c2: {name: 'avainsana', ui: 'avainsana'}
        }
      },
      'organisaatiotekija': {
        ui: 'organisaationtekijat', // lista
        columns: {
          id: {name: 'id'},
          c1: {name: 'julkaisuid'},
          c2: {name: 'etunimet', ui: 'etunimi'},
          c3: {name: 'sukunimi', ui: 'sukunimi'},
          c4: {name: 'orcid', ui: 'orcid'}
        }
      },
      'alayksikko': {
        ui: 'alayksikot', // lista
        columns: {
          id: {name: 'id'},
          //nb! ei julkaisuid:tä
          c1: {name: 'organisaatiotekijaid'},
          c2: {name: 'alayksikko', ui: 'alayksikko'}
        }
      },
      'tieteenala': {
        ui: 'julkaisuntieteenalat', // lista
        columns: {
          id: {name: 'id'},
          c1: {name: 'julkaisuid'},
          c2: {name: 'tieteenalakoodi', ui: 'tieteenala'},
          c3: {name: 'jnro', ui: 'jnro'}
        }
      }
    }
  };
  // init
  console.log("justusSaveController");

}]);//-justusSaveController
