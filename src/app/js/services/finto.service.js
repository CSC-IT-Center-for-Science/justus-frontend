'use strict';

angular.module('FintoService', [])
.service('FintoService', ['$http', '$log', function($http, $log) {
  this.search = function(language, input) {
    return new Promise(function(resolve, reject) {
      let languages = [language];
      if (language !== 'EN') {
        languages.push('EN');
      }

      let requests = [];
      languages.map(function(lang) {
        let uri = 'https://api.finto.fi/rest/v1/yso/search?type=skos%3AConcept&unique=true&lang=' + lang + '&query=' + input + '*';
        requests.push($http.get(uri));
      });

      Promise.all(requests)
      .then(function(responses) {
        let tags = [].concat.apply([], responses.map(function(response) {
          return response.data.results;
        }, []));
        return resolve(tags);
      })
      .catch(function(err) {
        $log.error(err);
        return reject(err);
      });
    });
  };
}]);
