'use strict';

let justusApp = angular.module('justusApp',
['ui.router','ui.select', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']
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
        templateUrl: "index_part.html"
      }
    },
    params: {
      lang: 'FI'
    }
  };

  let justusState = {
    name: "justus",
    url: "/justus?lang&vaihe&id",
    views: {
      "": {
        templateUrl: "justus.html"
      }
    },
    params: {
      lang: 'FI',
      vaihe: null,
      id: null
    }
  };

  let omatState = {
    name: "omat",
    url: "/omat?lang",
    views: {
      "": {
        templateUrl: "omat.html"
      }
    },
    params: {
      lang: 'FI'
    }
  };

  let tarkastaState = {
    name: "tarkasta",
    url: "/tarkasta?lang",
    views: {
      "": {
        templateUrl: "tarkasta.html"
      }
    },
    params: {
      lang: 'FI',
    }
  };

  $stateProvider.state(indexState);
  $stateProvider.state(justusState);
  $stateProvider.state(omatState);
  $stateProvider.state(tarkastaState);

  // howto? $locationProvider.html5Mode(true).hashPrefix('!');
});
