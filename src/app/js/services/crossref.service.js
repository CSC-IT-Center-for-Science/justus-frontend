'use strict';

angular.module('CrossRefService', [])
.service('CrossRefService', ['$http', function ($http) {
  this.worksquery = function(input, tekija) {
    let uri = crossrefuri;
    let uriapi = '?sort=published&order=desc&rows=50&query.title=';
    let filter = '';
    let authorquery = '';
    if (tekija != null && tekija !== '') authorquery = '&query.author=' + tekija;

    let requestUrl = uri + uriapi + input + authorquery + filter;
    return $http.get(requestUrl)
    .then(function (response) {
      let ret = [];
      angular.forEach(response.data.message, function(robj, rkey) {
        if (rkey === 'items') {
          angular.forEach(robj, function(kobj, kkey) {
            let obj = {};
            obj.source = 'CrossRef';
            obj.title = '';
            angular.forEach(kobj.title, function(tobj, tkey) {
              obj.title = tobj;
            });
            obj.doi = kobj.DOI; // undefined ok, jos puuttuu!
            obj.identifier = kobj.DOI; // undefined ok, jos puuttuu!
            if (kobj.issn) {
              obj.issn = kobj.ISSN; // saa puuttuakin
            }
            obj.author = '';
            angular.forEach(kobj.author, function(aobj, akey) {
              if (obj.author.length > 0) {
                obj.author += '; ';
              }
              obj.author += aobj.family + ', ' + aobj.given;
            });
            ret.push(obj);
          });
        }
      });
      return ret;
    });
  };

  this.works = function(input) {
    let requestUrl = crossrefuri + '/http://dx.doi.org' + input;
    return $http.get(requestUrl);
  };
}]);
