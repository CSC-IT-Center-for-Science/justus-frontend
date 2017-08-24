'use strict';

angular.module('JUFOService', [])
.service('JUFOService', ['$http', function($http) {
  this.etsikanava = function(input, tyyppi) {
    var uri = 'https://jufo-rest.csc.fi/v1.0/etsi.php?tyyppi=' + tyyppi + '&nimi=';
    return $http.get(uri + input);
  };

  this.etsiissn = function(input) {
    var uri = 'https://jufo-rest.csc.fi/v1.0/etsi.php?issn=';
    return $http.get(uri + input);
  };

  this.kanava = function(input) {
    var uri = 'https://jufo-rest.csc.fi/v1.0/kanava/';
    return $http.get(uri + input)
    .then(function (response) {
      return response.data[0];
    });
  };
}]);
