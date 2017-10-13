angular.module('JustusApp', [

  // Vendor modules
  'ui.router',
  'ui.select',
  'ngAnimate',
  'ngTouch',
  'ngSanitize',
  'ui.bootstrap',
  'ngTagsInput',
  'ngCsv',

  // App modules
  'appConfig',
  'templates',
  'FiltersModule',
  'DirectivesModule',
  'ControllersModule',
  'ServicesModule'
])

.config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    const indexState = {
      name: 'index',
      url: '/?lang',
      views: {
        '': {
          templateUrl: 'html/index_part.html'
        }
      },
      params: {
        lang: null
      }
    };

    const valitseState = {
      name: 'valitse',
      url: '/valitse?lang',
      views: {
        '': {
          templateUrl: 'html/valitse.html'
        }
      },
      params: {
        lang: null
      }
    };

    const justusState = {
      name: 'justus',
      url: '/justus?lang&vaihe&id',
      views: {
        '': {
          templateUrl: 'html/justus.html'
        }
      },
      params: {
        lang: null,
        vaihe: null,
        id: null
      }
    };

    const omatState = {
      name: 'omat',
      url: '/omat?lang',
      views: {
        '': {
          templateUrl: 'html/tarkasta.html',
          controller: 'TarkastaController'
        }
      },
      params: {
        lang: null
      }
    };

    const hyvaksyState = {
      name: 'hyvaksy',
      url: '/hyvaksy?lang',
      views: {
        '': {
          templateUrl: 'html/tarkasta.html',
          controller: 'TarkastaController'
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
  }
])

// Configure bluebird
.run(['$rootScope', '$window', '$log', function ($rootScope, $window, $log) {
  const Promise = $window.Promise;

  Promise.setScheduler(function (cb) {
    $rootScope.$evalAsync(cb);
  });

  window.addEventListener('unhandledrejection', function(e) {
    e.preventDefault();
    $log.error(e.detail.reason);
  });
}])

.run(['$rootScope', 'AuthService', function($rootScope, AuthService) {
  $rootScope.user = AuthService.getUserInfo();
}]);
