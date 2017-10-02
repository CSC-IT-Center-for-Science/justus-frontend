'use strict';

angular.module('VIRTAService', [])
.service('VIRTAService', ['$http', 'API_BASE_URL', function ($http, API_BASE_URL) {
  this.uri = virtauri;

  this.fields = {
    'organisaatiotunnus': { fetch: 'organisaatioTunnus', get: 'OrganisaatioTunnus' },
    'julkaisutyyppi': { fetch: 'julkaisuTyyppi', get: 'JulkaisutyyppiKoodi' },
    'julkaisuvuosi': { fetch: 'julkaisuVuosi', get: 'JulkaisuVuosi' },
    'julkaisunnimi': { fetch: 'julkaisunNimi', get: 'JulkaisunNimi' },
    'tekijat': { fetch: 'tekijat', get: 'TekijatiedotTeksti' },
    'julkaisuntekijoidenlukumaara': { fetch: null, get: 'TekijoidenLkm' },
    'konferenssinvakiintunutnimi': { fetch: 'konferenssinNimi', get: 'KonferenssinNimi' },
    'emojulkaisunnimi': { fetch: 'emojulkaisunNimi', get: 'EmojulkaisunNimi' },
    'isbn': { fetch: 'isbn', get: 'ISBN' },
    'emojulkaisuntoimittajat': { fetch: null, get: null },
    'lehdenjulkaisusarjannimi': { fetch: 'lehdenNimi', get: 'LehdenNimi' },
    'issn': { fetch: 'issn', get: 'ISSN' },
    'volyymi': { fetch: null, get: 'VolyymiTeksti' },
    'numero': { fetch: null, get: 'LehdenNumeroTeksti' },
    'sivut': { fetch: null, get: 'SivunumeroTeksti' },
    'artikkelinumero': { fetch: null, get: 'Artikkelinumero' },
    'kustantaja': { fetch: 'kustantajanNimi', get: 'KustantajanNimi' },
    'julkaisunkustannuspaikka': { fetch: null, get: 'KustannuspaikkaTeksti' },
    'julkaisunkieli': { fetch: null, get: 'JulkaisunKieliKoodi' },
    'julkaisunkansainvalisyys': { fetch: null, get: 'JulkaisunKansainvalisyysKytkin' },
    'julkaisumaa': { fetch: null, get: 'JulkaisumaaKoodi' },
    'kansainvalinenyhteisjulkaisu': { fetch: null, get: 'YhteisjulkaisuKVKytkin' },
    'yhteisjulkaisuyrityksenkanssa': { fetch: null, get: 'YhteisjulkaisuYritysKytkin' },
    'doitunniste': { fetch: 'doi', get: 'DOI' },
    'pysyvaverkkoosoite': { fetch: 'pysyvaOsoiteTeksti', get: 'PysyvaOsoiteTeksti' },
    'avoinsaatavuus': { fetch: null, get: 'AvoinSaatavuusKoodi' },
    'julkaisurinnakkaistallennettu': { fetch: null, get: 'RinnakkaistallennettuKytkin' },
    'rinnakkaistallennetunversionverkkoosoite': { fetch: null, get: null },
    'jufotunnus': { fetch: 'jufoTunnus', get: 'JufoTunnus' },
    'jufoluokitus': { fetch: null, get: 'JufoLuokkaKoodi' },
    'julkaisuntila': { fetch: 'julkaisunTila', get: 'JulkaisunTilaKoodi' }
  };

  this.fetch = function(input, tekija) {
    this.uri = API_BASE_URL + 'virtahaku.php'; // TODO dev
    const uriapi = '?julkaisunNimi='; // TODO dev
    // let uriapi = 'haku?julkaisunNimi=';

    const filter = '';
    // if ($scope.julkaisuvuosi != null && $scope.julkaisuvuosi != '') filter='&filter=from-pub-date:'+$scope.julkaisuvuosi+',until-pub-date:'+$scope.julkaisuvuosi;
    let authorquery = '';
    if (tekija != null && tekija !== '') authorquery = '&henkiloHaku=' + tekija;

    return $http.get(this.uri + uriapi + input + authorquery + filter)
    .then(function (response) {
      let ret = [];
      angular.forEach(response.data, function(robj, rkey) {
        let obj = {};
        obj.source = 'VIRTA';
        obj.title = robj.julkaisunNimi || ''; // luo tyhjä arvo jos puuttuu
        if (robj.doi) obj.doi = robj.doi; // saa puuttuakin
        obj.identifier = robj.julkaisunTunnus; // undefined ok, jos puuttuu!
        if (robj.issn) obj.issn = robj.issn;
        obj.author = robj.tekijat || ''; // luo tyhjä arvo
        // virta omat (saa puuttua)
        if (robj.julkaisunTunnus) obj.julkaisuntunnus = robj.julkaisunTunnus;  // sama kuin identifier
        if (robj.jufoTunnus) obj.jufotunnus = robj.jufoTunnus;
        if (robj.julkaisuTyyppi) obj.julkaisutyyppi = robj.julkaisuTyyppi;
        if (robj.julkaisuVuosi) obj.julkaisuvuosi = robj.julkaisuVuosi;
        if (robj.julkaisunNimi) obj.julkaisunnimi = robj.julkaisunNimi; // sama kuin title
        if (robj.tekijat) obj.tekijat = robj.tekijat.replace(/'/g, ''); // melkein sama kuin author
        if (robj.isbn) obj.isbn = robj.isbn;
        if (robj.lehdenNimi) obj.lehdenjulkaisusarjannimi = robj.lehdenNimi;
        if (robj.kustantajanNimi) obj.kustantaja = robj.kustantajanNimi;
        if (robj.organisaatioTunnus) obj.organisaatiotunnus = robj.organisaatioTunnus;
        ret.push(obj);
      });
      return ret;
    });
  };
  this.get = function(input) {
    this.uri = API_BASE_URL + 'virtahaku.php?julkaisunTunnus='; // TODO dev
    // this.uri = 'virtahaku.php?julkaisunTunnus=';
    return $http.get(this.uri + input);
  };
}]);
