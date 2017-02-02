'use strict';

justusApp.service('APIService', ['$http', function ($http) {

  this.meta = {
    tables: [
      {
        name: 'SA_Avainsanat',
        pkcol: 'ID',
        columns: [
          {name: 'ID'},
          {name: 'Julkaisu_Id'},
          {name: 'Avainsana'}
        ]
      },
      {
        name: 'SA_Hanke',
        pkcol: 'ID',
        columns: [
          {name: 'ID'},
          {name: 'Julkaisu_Id'},
          {name: 'Hankenumero'},
          {name: 'RahoittajaOrg'}
        ]
      },
      {
        name: 'SA_ISBN',
        pkcol: 'ID',
        columns: [
          {name: 'ID'},
          {name: 'Julkaisu_Id'},
          {name: 'ISBN'}
        ]
      },
      {
        name: 'SA_ISSN',
        pkcol: 'ID',
        columns: [
          {name: 'ID'},
          {name: 'Julkaisu_Id'},
          {name: 'ISSN'}
        ]
      },
      {
        name: 'SA_Julkaisut',
        pkcol: 'ID',
        columns: [
          {name: 'ID'},
          {name: 'OrganisaatioTunnus'},
          {name: 'IlmoitusVuosi'},
          {name: 'JulkaisunTilaKoodi'},
          {name: 'JulkaisunOrgTunnus'},
          {name: 'JulkaisuVuosi'},
          {name: 'JulkaisunNimi'},
          {name: 'TekijatiedotTeksti'},
          {name: 'TekijoidenLkm'},
          {name: 'SivunumeroTeksti'},
          {name: 'Artikkelinumero'},
          {name: 'ISBN'},
          {name: 'JufoTunnus'},
          {name: 'JufoLuokkaKoodi'},
          {name: 'JulkaisumaaKoodi'},
          {name: 'LehdenNimi'},
          {name: 'ISSN'},
          {name: 'VolyymiTeksti'},
          {name: 'LehdenNumeroTeksti'},
          {name: 'KonferenssinNimi'},
          {name: 'KustantajanNimi'},
          {name: 'KustannuspaikkaTeksti'},
          {name: 'EmojulkaisunNimi'},
          {name: 'EmojulkaisunToimittajatTeksti'},
          {name: 'JulkaisutyyppiKoodi'},
          {name: 'YhteisjulkaisuKVKytkin'},
          {name: 'YhteisjulkaisuSHPKytkin'},
          {name: 'YhteisjulkaisuTutkimuslaitosKytkin'},
          {name: 'YhteisjulkaisuMuuKytkin'},
          {name: 'JulkaisunKansainvalisyysKytkin'},
          {name: 'JulkaisunKieliKoodi'},
          {name: 'AvoinSaatavuusKoodi'},
          {name: 'EVOjulkaisuKytkin'},
          {name: 'DOI'},
          {name: 'PysyvaOsoiteTeksti'},
          {name: 'LahdetietokannanTunnus'},
          {name: 'RinnakkaistallenettuKytkin'},
          {name: 'YhteisjulkaisunTunnus'},
          {name: 'JuuliOsoiteTeksti'},
          {name: 'YhteisjulkaisuYritysKytkin'}
        ]
      },
      {
        name: 'SA_Koulutusalat',
        pkcol: 'ID',
        columns: [
          {name: 'ID'},
          {name: 'Julkaisu_Id'},
          {name: 'Koulutusala'},
          {name: 'JNro'}
        ]
      },
      {
        name: 'SA_OrgYksikko',
        pkcol: 'ID',
        columns: [
          {name: 'ID'},
          {name: 'Julkaisu_Id'},
          {name: 'OrganisaatioTunnus'},
          {name: 'julkaisu_yksikko'},
          {name: 'tekija_yksikko'}
        ]
      },
      {
        name: 'SA_Rinnakkaistallennettu',
        pkcol: 'ID',
        columns: [
          {name: 'ID'},
          {name: 'Julkaisu_Id'},
          {name: 'RinnakkaistallennettuOsoite'}
        ]
      },
      {
        name: 'SA_Tekijat',
        pkcol: 'ID',
        columns: [
          {name: 'ID'},
          {name: 'Julkaisu_Id'},
          {name: 'Etunimet'},
          {name: 'Sukunimi'},
          {name: 'ORCID'},
          {name: 'Yksikko'}
        ]
      },
      {
        name: 'SA_Tieteenalat',
        pkcol: 'ID',
        columns: [
          {name: 'ID'},
          {name: 'Julkaisu_Id'},
          {name: 'Tieteenala'},
          {name: 'JNro'}
        ]
      }
    ]
  };

  this.apiuri = 'https://raja-dev.csc.fi/justus/justus_save.php/';

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
