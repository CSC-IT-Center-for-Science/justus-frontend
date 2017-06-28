'use strict';

let justusApp = angular.module('justusApp',
['ui.router', 'ui.select', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']
);

justusApp.config(function(
  $stateProvider
  ,$urlRouterProvider
  ,$locationProvider
) {

  $urlRouterProvider.otherwise("/");

  let indexState = {
    name: "index",
    url: "/?lang",
    views: {
      "": {
        templateUrl: "html/index_part.html"
      }
    },
    params: {
      lang: null
    }
  };

  let valitseState = {
    name: "valitse",
    url: "/valitse?lang",
    views: {
      "": {
        templateUrl: "html/valitse.html"
      }
    },
    params: {
      lang: null
    }
  };

  let justusState = {
    name: "justus",
    url: "/justus?lang&vaihe&id",
    views: {
      "": {
        templateUrl: "html/justus.html"
      }
    },
    params: {
      lang: null,
      vaihe: null,
      id: null
    }
  };

  let omatState = {
    name: "omat",
    url: "/omat?lang",
    views: {
      "": {
        templateUrl: "html/tarkasta.html"
      }
    },
    params: {
      lang: null
    }
  };

  let hyvaksyState = {
    name: "hyvaksy",
    url: "/hyvaksy?lang",
    views: {
      "": {
        templateUrl: "html/tarkasta.html"
      }
    },
    params: {
      lang: null
    }
  };

  $stateProvider.state(indexState);
  $stateProvider.state(valitseState);
  $stateProvider.state(justusState);
  $stateProvider.state(omatState);
  $stateProvider.state(hyvaksyState);

  // howto? $locationProvider.html5Mode(true).hashPrefix('!');
});
