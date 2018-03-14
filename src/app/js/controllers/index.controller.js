'use strict';

angular.module('IndexController', [])
.controller('IndexController', [
  '$scope', '$rootScope', '$http', '$window', '$stateParams', '$transitions', '$location', 'KoodistoService', 'AuthService', 'AUTH_URL', 'SITE_URL', 'DEMO_ENABLED',
  function($scope, $rootScope, $http, $window, $stateParams, $transitions, $location, KoodistoService, AuthService, AUTH_URL, SITE_URL, DEMO_ENABLED) {
    $scope.demoEnabled = DEMO_ENABLED;
    $scope.siteUrl = SITE_URL;

    if (typeof (AUTH_URL) !== 'undefined') {
      $http.get(AUTH_URL)
      .then(function(response) {
        $scope.user = response.data;
        // backend/auth provides but config has more info (code+mail):
        $scope.user.organization = domain_organization[$scope.user.domain];
        $rootScope.user = $scope.user;
        $rootScope.initialUser = $scope.user;
        $scope.initialRole = $scope.user.role;
        AuthService.storeUserInfo($scope.user);

        // Initialize role/organization selectors for demo user
        $scope.selectedDemoUserRole = $scope.user.role;
        $scope.selectedDemoUserOrganizationCode = $scope.user.organization.code;
      })
      .catch(function() {
        if (DEMO_ENABLED) {
          $rootScope.user = demoUser;
          $scope.user = demoUser;
          $scope.initialRole = $scope.user.role;
          $rootScope.initialUser = $scope.user;
          AuthService.storeUserInfo($scope.user);

          // Initialize role/organization selectors for demo user
          $scope.selectedDemoUserRole = $scope.user.role;
          $scope.selectedDemoUserOrganizationCode = $scope.user.organization.code;
        }
      });
    }

  let init = function() {
    $scope.i18n = (typeof (i18n) !== 'undefined') ? i18n : {};
    $scope.codes = (typeof (codes) !== 'undefined') ? codes : {}; // config

    // test before setting (development helper)
    !$scope.codes.kieli && KoodistoService.getKoodisto('kieli').then(function(o) {
      $scope.codes.kieli = o;
    });
    !$scope.codes.maatjavaltiot2 && KoodistoService.getKoodisto('maatjavaltiot2').then(function(o) {
      $scope.codes.maatjavaltiot2 = o;
    });
    !$scope.codes.julkaisuntila && KoodistoService.getKoodisto('julkaisuntila').then(function(o) {
      $scope.codes.julkaisuntila = o;
    });
    !$scope.codes.julkaisufoorumitaso && KoodistoService.getKoodisto('julkaisufoorumitaso').then(function(o) {
      $scope.codes.julkaisufoorumitaso = o;
    });
    // tieteenalat, julkaisutyypit, ...
    !$scope.codes.tieteenalat && KoodistoService.getLuokitus('paatieteenala').then(function(o) {
      $scope.codes.tieteenalat = o;
    });
    !$scope.codes.julkaisutyypit && KoodistoService.getLuokitus('julkaisunpaaluokka').then(function(o) {
      $scope.codes.julkaisutyypit = o;

      angular.forEach($scope.codes.julkaisutyypit, function(aobj, akey) {
        KoodistoService.getAlatyypit('julkaisunpaaluokka', aobj.arvo).then(function (o) {
          aobj.alatyypit = o;
        });
      });
    });
    !$scope.codes.julkaisuntekijanrooli && KoodistoService.getKoodisto('julkaisuntekijanrooli').then(function(o) {
      $scope.codes.julkaisuntekijanrooli = o;
    });
    !$scope.codes.taiteenalat && KoodistoService.getKoodisto('taiteenala').then(function(o) {
      $scope.codes.taiteenalat = o;
    });
    !$scope.codes.taidealantyypit && KoodistoService.getKoodisto('taidealantyyppikategoria').then(function(o) {
      $scope.codes.taidealantyypit = o;
    });



    // unite organization code and alayksikkokoodi to "organization" codeset (our own!)
    // nb! only for those organizations we've included in config. (there are a lot of them otherwise, for ex all oppilaitosnumero)
    // reset variables
    if (!$scope.codes.organization) {
      $scope.codes.organization = []; // setup
      let orgPushed = []; // collect codes which have been pushed (multiple domains cases)
      angular.forEach(domain_organization, function(dobj, domain) {
        if (orgPushed.indexOf(dobj.code) < 0) {
          // nb! not entire koodisto, just one code at a time
          // not all organizations are of type oppilaitos there are tutkimusorganisaatio also
          let codeset = 'oppilaitosnumero';
          if (dobj.code.length > 5) {
            codeset = 'tutkimusorganisaatio';
          }
          KoodistoService.getKoodi(codeset, dobj.code).then(function(o) {
            KoodistoService.getKoodisto('alayksikkokoodi').then(function(a) {
              $scope.codes.alayksikkokoodi = a;
              angular.forEach(o, function(oobj, okey) {
                oobj.alatyypit = [];
                oobj.alatyypit2017 = [];
                angular.forEach(a, function(aobj, akey) {
                  if (aobj.arvo.match('^' + oobj.arvo + '-') && !aobj.arvo.match('-2017-')) { // alayksikkokoodi koodiarvo is in form "^123-..." where 123 is organization code
                  // if (aobj.arvo.match('^' + oobj.arvo + '-')) { // alayksikkokoodi koodiarvo is in form "^123-..." where 123 is organization code
                    oobj.alatyypit.push(aobj);
                  }
                  // filter year 2017 data
                  if (aobj.arvo.match('^' + oobj.arvo + '-' + '2017-')) {
                    oobj.alatyypit2017.push(aobj);
                  }
                });
                // store in variable by pushing one at a time now
                $scope.codes.organization.push(oobj);
                orgPushed.push(oobj.arvo);
              });
              $scope.getOrganizationList();
            });
          });
        }
      });
    }
  }

 // for ui listing unique organizations ordered by languaage!
  $scope.getOrganizationList = function() {

        let retFI = [];
        let retSV = [];
        let retEN = [];

      angular.forEach($scope.codes.organization, function(oobj, okey) {
        if (oobj.arvo !== '00000' && retFI.indexOf(oobj.selite['FI']) < 0) {
          retFI.push(oobj.selite['FI']);
        }
        if (oobj.arvo !== '00000' && retSV.indexOf(oobj.selite['SV']) < 0) {
          retSV.push(oobj.selite['SV']);
        }
        if (oobj.arvo !== '00000' && retEN.indexOf(oobj.selite['EN']) < 0) {
          retEN.push(oobj.selite['EN']);
        }
      });
      $scope.organizationListFI = retFI.sort();
      $scope.organizationListSV = retSV.sort();
      $scope.organizationListEN = retEN.sort();
  }

    // ugly hack to get ALL alatieteenalas in one list
    $scope.getAlltieteenalat = function() {
      let ret = [];
      angular.forEach($scope.codes.tieteenalat, function(tobj, tkey) {
        tobj.nogo = true;
        ret.push(tobj);
        angular.forEach(tobj.alatyypit, function(aobj, akey) {
          ret.push(aobj);
        });
      });
      return ret;
    };

    // for knowing (save to scope) which "state" is selected (criteria+$transitions)
    let criteria = {
      to: function(state) {
        return state.name != null;
      }
    };
    $transitions.onBefore(criteria, function(trans) {
      var name = trans.to().name;
      $scope.state = { name: name };
    });
    // figure out selected language (part of login process)
    $transitions.onSuccess(null, function(trans) {
      $scope.lang = $stateParams.lang || $scope.lang || 'FI';
    });

    // ACCESSORIES (scope functions)

    // check that user has access to whatever the input
    $scope.hasAccess = function(input) {
      // hyvaksy - admin role is required
      if (input === 'hyvaksy') {
        if ($scope.user && $scope.user.name &&
          $scope.user.organization && $scope.user.organization.code &&
          ($scope.user.role === 'owner' || $scope.user.role === 'admin')) {
          return true;
        }
        else {
          return false;
        }
      }
      // basically all states - name, organization (with code) and a role are required
      if ($scope.user && $scope.user.name &&
        $scope.user.organization && $scope.user.organization.code &&
        ($scope.user.role === 'owner' || $scope.user.role === 'admin' || $scope.user.role === 'member')) {
        return true;
      }
      return false;
    };

    $scope.login = function() {
      let target = encodeURIComponent(SITE_URL + '/#!/valitse?lang=' + $scope.lang);
      $window.location.href = SITE_URL + '/Shibboleth.sso/Login?target=' + target;
    };

    // map from service (generic) to scope
    $scope.getCode = function(codeset, code) {
      return KoodistoService.getCode($scope.codes, codeset, code);
    };

    // helper for localStorage
    $scope.resetKoodisto = function() {
      KoodistoService.reset();
    };

    $scope.getMenuClass = function(menuPath) {
      return ($location.path().indexOf(menuPath) !== -1) ? 'active' : '';
    };

    $scope.setDemoUserRole = function(userRole) {
      $scope.user.role = userRole;
      $rootScope.user = $scope.user;
      AuthService.storeUserInfo($scope.user);
    };

    $scope.setDemoUserOrganization = function(organizationCode) {
      for (let key in domain_organization) {
        if (domain_organization.hasOwnProperty(key)) {
          if (domain_organization[key].code === organizationCode) {
            $scope.user.organization = domain_organization[key];
            $scope.user.domain = key;
            $rootScope.user = $scope.user;
            AuthService.storeUserInfo($scope.user);
          }
        }
      }
    };

    init();

  }
]);
