'use strict';

justusApp.controller('TarkastaController',
['$scope','$http','APIService','KoodistoService',
function($scope,$http,API,Koodisto)
{
  var language = "FI";
  $scope.lang = language;
  $scope.i18n = i18n;
  $scope.codes = codes;

  $scope.meta = API.meta;
  $scope.data = [];
  $scope.colOrder='id';
  $scope.colOrderReverse=false;

  var getKoodisto = function(koodisto) {
    if(!koodisto) return;
    Koodisto.getKoodisto(koodisto)
    .then(function (obj) {
      $scope.codes[koodisto] = obj;
    });
  }

  getKoodisto('julkaisuntila');
  getKoodisto('kieli');
  getKoodisto('maatjavaltiot2');
  $scope.getKoodistoKoodi = function(koodisto,koodi) {
    console.log("getKoodistoKoodi "+koodisto+" "+koodi);
    if (koodisto && koodi) {
      if(!$scope.codes[koodisto]) {
        getKoodisto(koodisto);
      }
      for (var i=0 ; i<$scope.codes[koodisto].length; i++) {
        if ($scope.codes[koodisto][i].arvo == koodi) {
          return $scope.codes[koodisto][i];
        }
      }
    }
  }

  $scope.getCode = function(codeset,code) {
    return Koodisto.getCode($scope.codes,codeset,code);
  }

  $scope.usePaivita = function(table,id,idcol,cols,vals) {
    console.log("usePaivita "+table+" "+id+" "+idcol+" optional: "+cols+":"+vals);
    var jobj = null;
    if($scope.data && $scope.data[table]) {
      jobj = $scope.data[table][id];
    }
    if (id && jobj) {
      delete jobj[idcol]; // api ei tykkää pk:n mukanaolosta datassa
      if (table=='julkaisu') {
        jobj.username = 'JustusDemo';
        jobj.modified = new Date().toISOString();
      }
      //console.log("usePaivita sending")
      //console.debug(jobj)
      API.put(table,id,JSON.stringify(jobj));
      jobj[idcol]=id; // return id
    }
  }

  $scope.usePoista = function(table,id) {
    console.log("usePoista "+table+" "+id);
    API.delete(table,id);
    // delete from scope
    delete $scope.data[table][id];
  }

  // TODO: justus serviceen?
  $scope.makeParams = function(input) {
    //console.log("makeParams");
    //console.debug(input)
    if (input==null) return;
    var kvpairs = [];
    kvpairs.push("lang="+$scope.lang);
    angular.forEach(input, function(fobj,fkey){
      //console.log("makeParams FKEY "+fkey);
      //console.debug(fobj)
      if (fobj!=null && fobj!="") { // no null or empty values
        if (i18n.content.form[fkey]) {
          //console.log("makeParams FORM "+fkey);
          kvpairs.push(encodeURIComponent(fkey) + "=" + encodeURIComponent(fobj));
        }
      }
    });
    if (input.id) {
      angular.forEach($scope.meta.tables,function(t,k){
        if (t.name!="julkaisu" && t.name!="alayksikko") {
          angular.forEach($scope.data[t.name],function(o,i){
            //console.log("makeParams TABLES "+t.name+" :: "+o.julkaisuid)
            //console.debug(o)
            if (o.julkaisuid==input.id) {
              //kvpairs.push(encodeURIComponent("avainsanat") + "=" + encodeURIComponent(a.avainsana));
              if (t.name=="avainsana") {
                //console.log("makeParams TABLES "+t.ui+" :: "+o.avainsana)
                kvpairs.push(encodeURIComponent(t.ui) + "=" + encodeURIComponent(angular.toJson(o.avainsana)));
              }
              if (t.name=="tieteenala") {
                kvpairs.push(encodeURIComponent(t.ui) + "=" + encodeURIComponent(angular.toJson(o.tieteenalakoodi)));
              }
              // organisaatiotekija + alayksikko
              if (t.name=="organisaatiotekija") {
                let ays = [];
                angular.forEach($scope.data["alayksikko"],function(s,j){
                  //console.log("makeParams OT+AY "+t.ui+" :: "+o.id+" ~ "+s.organisaatiotekijaid)
                  //console.debug(s)
                  if (s.organisaatiotekijaid==o.id) {
                    ays.push(s.alayksikko)
                  }
                });
                let oto = {};
                oto.etunimet = o.etunimet;
                oto.sukunimi = o.sukunimi;
                oto.orcid = o.orcid;
                oto.alayksikot = ays;
                kvpairs.push(encodeURIComponent(t.ui) + "=" + encodeURIComponent(angular.toJson(oto)));
              }
            }
          });
        }
      });
    }
    //console.debug(kvpairs)
    return kvpairs;
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
    angular.forEach($scope.meta.tables,function(tobj,tkey){
      $scope.useHae(tobj.name);
    });
    //angular.forEach($scope.data,function(t,k){
    //  console.log("resetData "+k);
    //  console.debug(t)
    //});
  }

  // init
  $scope.resetData();
  
  $scope.odottavat = true;
  if (QueryString['status']) {
    $scope.odottavat = false;
  }
}]);//-TarkastaController
