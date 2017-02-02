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
    console.log("phppost "+str);
    return $http({
      method: 'POST',
      url: apiuri,
      data: str
    })
    .success(function (data, status, headers, config) {
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
      data: str
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
    var dnew = []; // lista, mutta usein vain yksi
    var di = 0;
    dnew[di] = {};
    var dataIsArray = false;
    var jsonKey = $scope.meta.tables[table].ui;

    // mapataan sarakkeet
    angular.forEach($scope.meta.tables[table].columns,function(v,k){
      // Julkaisu_Id
      if (v.name=="Julkaisu_Id") {
        dnew[di][v.name] = jid;
      } else if (v.name!="ID") {
        console.debug(table+" "+v.name+" columns "+k+" :: "+v.ui)
        var tmpObj = $scope.justus[v.ui];
        if (v.ui) { // tunnistettu justus-tieto
          if (jsonKey) { // objekti on jsonia (orgtek)
            tmpObj = $scope.justus[jsonKey]; // array tässä
            console.debug(table+" "+v.name+" jsonKey "+jsonKey)
            console.debug($scope.justus[jsonKey])
            console.debug(v.ui)
            console.debug($scope.justus[jsonKey][0][v.ui])
          } else {
            // perustapauksessa tämä riittää
            dnew[di][v.name] = tmpObj;
          }
          if (isArray(tmpObj)) {
            angular.forEach(tmpObj,function(jv,jk){
              console.debug(table+" "+v.name+" array "+v.ui+" "+jk+"="+jv)
              // hack: jk määrää dnew indeksin!
              if (di < jk) {
                di++;
                dnew[di] = {};
                dnew[di].Julkaisu_Id = jid;
              }
              if (table=="SA_Tekijat") {
                console.debug("JSON HANDLING")
                console.debug(jv)
                dnew[di].Etunimet = jv.etunimi;
                dnew[di].Sukunimi = jv.sukunimi;
                dnew[di].Yksikko = jv.alayksikko;
                dnew[di].ORCID = jv.orcid;
              } else {
                dnew[di][v.name] = jv;
              }
              // dnew yhden rivin osalta valmis
              console.debug(dnew)
            });
          }
        }
      }
    });
    angular.forEach(dnew,function(d,i){
      console.debug(table+" post "+i)
      console.debug(d)
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

    var table = "SA_Julkaisut";
    console.log("useTallenna "+table)
    dnew = {};
    angular.forEach($scope.meta.tables[table].columns,function(v,k){
      if (v.name!="ID" && v.ui) {
        dnew[v.name] = $scope.justus[v.ui];
      }
    });
    console.debug(dnew);
    phppost(baseapiuri+table+"/",dnew).success(function(jid){
      console.log("useTallenna post jid: "+jid);

      if (jid) {
        tallennaTaulu("SA_Avainsanat",jid);
        tallennaTaulu("SA_ISBN",jid);
        tallennaTaulu("SA_ISSN",jid);
        //tallennaTaulu("SA_OrgYksikko",jid);
        tallennaTaulu("SA_Rinnakkaistallennettu",jid);
        tallennaTaulu("SA_Tekijat",jid);
        tallennaTaulu("SA_Tieteenalat",jid);
      }

      window.location = "omat_tallennukset.html";
    });
  }

  //
  // Muuttujat ja alustus
  //
  var baseapiuri = "justus_save.php/";

  $scope.meta = {
    tables: {
      'SA_Avainsanat': {
        columns: {
          id: {name: 'ID'},
          c1: {name: 'Julkaisu_Id'},
          c2: {name: 'Avainsana', ui: 'avainsanat'} // nb: listana
        }
      },
      'SA_Hanke': {
        columns: {
          id: {name: 'ID'},
          c1: {name: 'Julkaisu_Id'},
          c2: {name: 'Hankenumero'},
          c3: {name: 'RahoittajaOrg'}
        }
      },
      'SA_ISBN': {
        columns: {
          id: {name: 'ID'},
          c1: {name: 'Julkaisu_Id'},
          c2: {name: 'ISBN', ui: "isbn"}
        }
      },
      'SA_ISSN': {
        columns: {
          id: {name: 'ID'},
          c1: {name: 'Julkaisu_Id'},
          c2: {name: 'ISSN', ui: "issn"}
        }
      },
      'SA_Julkaisut': {
        columns: {
          id: {name: 'ID'},
          c1: {name: 'OrganisaatioTunnus', ui: null},
          c2: {name: 'IlmoitusVuosi', ui: null},
          c3: {name: 'JulkaisunTilaKoodi', ui: null},
          c4: {name: 'JulkaisunOrgTunnus', ui: null},
          c5: {name: 'JulkaisuVuosi', ui: 'julkaisuvuosi'},
          c6: {name: 'JulkaisunNimi', ui: 'julkaisunnimi'},
          c7: {name: 'TekijatiedotTeksti', ui: 'tekijat'},
          c8: {name: 'TekijoidenLkm', ui: 'julkaisuntekijoidenlukumaara'},
          c9: {name: 'SivunumeroTeksti', ui: 'sivut'},
          c10: {name: 'Artikkelinumero', ui: 'artikkelinumero'},
          c11: {name: 'ISBN', ui: 'isbn'},
          c12: {name: 'JufoTunnus', ui: 'jufoid'},
          c13: {name: 'JufoLuokkaKoodi', ui: 'jufoluokitus'},
          c14: {name: 'JulkaisumaaKoodi', ui: 'julkaisumaa'},
          c15: {name: 'LehdenNimi', ui: 'lehdenjulkaisusarjannimi'},
          c16: {name: 'ISSN', ui: 'issn'},
          c17: {name: 'VolyymiTeksti', ui: 'volyymi'},
          c18: {name: 'LehdenNumeroTeksti', ui: 'numero'},
          c19: {name: 'KonferenssinNimi', ui: 'konferenssinvakiintunutnimi'},
          c20: {name: 'KustantajanNimi', ui: 'kustantaja'},
          c21: {name: 'KustannuspaikkaTeksti', ui: 'julkaisunkustannuspaikka'},
          c22: {name: 'EmojulkaisunNimi', ui: 'emojulkaisunnimi'},
          c23: {name: 'EmojulkaisunToimittajatTeksti', ui: 'emojulkaisuntoimittajat'},
          c24: {name: 'JulkaisutyyppiKoodi', ui: 'julkaisutyyppi'},
          c25: {name: 'YhteisjulkaisuKVKytkin', ui: 'kansainvalinenyhteisjulkaisu'}, // todo: vaihtoehdot
          c29: {name: 'JulkaisunKansainvalisyysKytkin', ui: 'julkaisunkansainvalisyys'}, // todo: vaihtoehdot
          c30: {name: 'JulkaisunKieliKoodi', ui: 'julkaisunkieli'},
          c31: {name: 'AvoinSaatavuusKoodi', ui: 'avoinsaatavuus'}, // todo: vaihtoehdot
          c33: {name: 'DOI', ui: 'doitunniste'},
          c34: {name: 'PysyvaOsoiteTeksti', ui: 'pysyvaverkkoosoite'},
          c35: {name: 'LahdetietokannanTunnus', ui: null},
          c36: {name: 'RinnakkaistallenettuKytkin', ui: 'julkaisurinnakkaistallennettu'}, // todo: vaihtoehdot
          c37: {name: 'YhteisjulkaisunTunnus', ui: null},
          c38: {name: 'JuuliOsoiteTeksti', ui: null},
          c39: {name: 'YhteisjulkaisuYritysKytkin', ui: 'yhteisjulkaisuyrityksenkanssa'} // todo: vaihtoehdot
        }
      },
      'SA_OrgYksikko': {
        columns: {
          id: {name: 'ID'},
          c1: {name: 'Julkaisu_Id'},
          c2: {name: 'OrganisaatioTunnus'},
          c3: {name: 'julkaisu_yksikko'},
          c4: {name: 'tekija_yksikko'}
        }
      },
      'SA_Rinnakkaistallennettu': {
        columns: {
          id: {name: 'ID'},
          c1: {name: 'Julkaisu_Id'},
          c2: {name: 'RinnakkaistallennettuOsoite', ui: 'rinnakkaistallennetunversionverkkoosoite'}
        }
      },
      'SA_Tekijat': {
        columns: {
          id: {name: 'ID'},
          c1: {name: 'Julkaisu_Id'},
          c2: {name: 'Etunimet', ui: 'etunimi'}, // nb! lista+json
          c3: {name: 'Sukunimi', ui: 'sukunimi'}, // nb! lista+json
          c4: {name: 'ORCID', ui: 'orcid'}, // nb! lista+json
          c5: {name: 'Yksikko', ui: 'alayksikko'} // nb! lista+json
        },
        ui: "organisaationtekijat" //json-tunnistin
      },
      'SA_Tieteenalat': {
        columns: {
          id: {name: 'ID'},
          c1: {name: 'Julkaisu_Id'},
          c2: {name: 'Tieteenala', ui: 'julkaisuntieteenalat'},
          c3: {name: 'JNro'} // todo: $scope ja $index?
        }
      }
    }
  };
  // init
  console.log("justusSaveController");

}]);//-justusSaveController
