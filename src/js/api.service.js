'use strict';

// from config uses: apiuri

justusApp.service('APIService', ['$http', function ($http) {

  this.meta = {
    tables: {
      'julkaisu': {
        name: 'julkaisu',
        pkcol: 'id',
        columns: [
          {name: 'id'},
          {name: 'organisaatiotunnus'},
          {name: 'julkaisutyyppi'},
          {name: 'julkaisuvuosi'},
          {name: 'julkaisunnimi'},
          {name: 'tekijat'},
          {name: 'julkaisuntekijoidenlukumaara'},
          {name: 'konferenssinvakiintunutnimi'},
          {name: 'emojulkaisunnimi'},
          {name: 'isbn'},
          {name: 'emojulkaisuntoimittajat'},
          {name: 'lehdenjulkaisusarjannimi'},
          {name: 'issn'},
          {name: 'volyymi'},
          {name: 'numero'},
          {name: 'sivut'},
          {name: 'artikkelinumero'},
          {name: 'kustantaja'},
          {name: 'julkaisunkustannuspaikka'},
          {name: 'julkaisunkieli'},
          {name: 'julkaisunkansainvalisyys'},
          {name: 'julkaisumaa'},
          {name: 'kansainvalinenyhteisjulkaisu'},
          {name: 'yhteisjulkaisuyrityksenkanssa'},
          {name: 'doitunniste'},
          {name: 'pysyvaverkkoosoite'},
          {name: 'avoinsaatavuus'},
          {name: 'julkaisurinnakkaistallennettu'},
          {name: 'rinnakkaistallennetunversionverkkoosoite'},
          {name: 'jufotunnus'},
          {name: 'jufoluokitus'},
          
          //{name: 'julkaisuid'},
          {name: 'julkaisuntila'},
          {name: 'username'},
          {name: 'modified'}
        ]
      },
      'avainsana': {
        name: 'avainsana',
        ui: 'avainsana', // lista
        pkcol: 'id',
        columns: [
          {name: 'id'},
          {name: 'julkaisuid'},
          {name: 'avainsana'}
        ]
      },
      'organisaatiotekija': {
        name: 'organisaatiotekija',
        ui: 'organisaatiotekija', // lista
        pkcol: 'id',
        columns: [
          {name: 'id'},
          {name: 'julkaisuid'},
          {name: 'etunimet'},
          {name: 'sukunimi'},
          {name: 'orcid'}
        ]
      },
      'alayksikko': {
        name: 'alayksikko',
        ui: 'alayksikko', // lista
        pkcol: 'id',
        columns: [
          {name: 'id'},
          {name: 'organisaatiotekijaid'},
          {name: 'alayksikko'}
        ]
      },
      'tieteenala': {
        name: 'tieteenala',
        ui: 'tieteenala', // lista
        pkcol: 'id',
        columns: [
          {name: 'id'},
          {name: 'julkaisuid'},
          {name: 'tieteenalakoodi'},
          {name: 'jnro'}
        ]
      }
    }
  };

  /* CREATE :: POST */
  this.post = function(api,str) {
    return $http({
      method: 'POST',
      url: apiuri+api,
      data: str,
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    })
    .success(function (data, status, headers, config) {
      return status+" "+data;
    })
    .error(function (data, status, header, config) {
      console.log("post ERROR "+status+" "+data);
    });
  }

  /* READ :: GET */
  this.get = function (api,id,col) {
    //id voi puuttua, jolloin palautetaan kaikki
    return $http({
      method: 'GET',
      url: apiuri+api+(col?"/"+col:"")+"/"+id
    })
    .then(function (response){
      let ret = response.data; // list always
      return ret;
    });
  }

  /* UPDATE :: PUT */
  this.put = function (api,id,str) {
    return $http({
      method: 'PUT',
      url: apiuri+api+"/"+id,
      data: str,
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    })
    .success(function (data, status, headers, config) {
      return status+" "+data;
    })
    .error(function (data, status, header, config) {
      console.log("put ERROR "+status+" "+data);
    });
  }

  /* DELETE :: DELETE */
  this.delete = function (api,id) {
    return $http({
      method: 'DELETE',
      url: apiuri+api+"/"+id
    })
    .success(function (data, status, headers, config) {
      return status+" "+data;
    })
    .error(function (data, status, header, config) {
      console.log("delete ERROR "+status+" "+data);
    });
  }

}]);
