'use strict';

justusApp.service('APIService', ['$http', function ($http) {

  this.meta = {
    tables: [
      {
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
          {name: 'julkaisurinnakkaistallenettu'},
          {name: 'rinnakkaistallenetunversionverkkoosoite'},
          {name: 'jufotunnus'},
          {name: 'jufoluokitus'}
        ]
      },
      {
        name: 'avainsana',
        pkcol: 'id',
        columns: [
          {name: 'id'},
          {name: 'julkaisuid'},
          {name: 'avainsana'}
        ]
      },
      {
        name: 'organisaatiotekija',
        pkcol: 'id',
        columns: [
          {name: 'id'},
          {name: 'julkaisuid'},
          {name: 'etunimet'},
          {name: 'sukunimi'},
          {name: 'orcid'}
        ]
      },
      {
        name: 'alayksikko',
        pkcol: 'id',
        columns: [
          {name: 'id'},
          {name: 'julkaisuid'},
          {name: 'organisaatiotekijaid'},
          {name: 'alayksikko'}
        ]
      },
      {
        name: 'tieteenala',
        pkcol: 'id',
        columns: [
          {name: 'id'},
          {name: 'julkaisuid'},
          {name: 'tieteenalakoodi'},
          {name: 'jnro'}
        ]
      }
    ]
  };

  this.apiuri = 'https://demo.justus.csc.fi/api/justus_save.php/';

  /* CREATE :: POST */
  this.post = function(api,str) {
    return $http({
      method: 'POST',
      url: this.apiuri+api,
      data: str
    })
    .success(function (data, status, headers, config) {
      return status+" "+data;
    })
    .error(function (data, status, header, config) {
      console.log("post ERROR "+status+" "+data);
    });
  }

  /* READ :: GET */
  this.get = function (api,id) {
    //id voi puuttua, jolloin palautetaan kaikki
    return $http({
      method: 'GET',
      url: this.apiuri+api+"/"+id
    })
    .then(function (response){
      var ret = [];
      if(id) ret.push(reponse.data); // ei lista
      else  ret = response.data; // lista
      return ret;
    });
  }

  /* UPDATE :: PUT */
  this.put = function (api,id,str) {
    return $http({
      method: 'PUT',
      url: this.apiuri+api+"/"+id,
      data: str
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
      url: this.apiuri+api+"/"+id
    })
    .success(function (data, status, headers, config) {
      return status+" "+data;
    })
    .error(function (data, status, header, config) {
      console.log("delete ERROR "+status+" "+data);
    });
  }

}]);
