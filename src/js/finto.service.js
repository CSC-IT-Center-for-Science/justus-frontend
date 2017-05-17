'use strict';

justusApp.service('FintoService', ['$http', function($http) {
  this.search = function(lang,input) {
    var uri = "http://api.finto.fi/rest/v1/yso/search?type=skos%3AConcept&lang="+lang+"&query="+input+"*";
    return $http.get(uri);
  }
}]);
