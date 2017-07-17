'use strict';

angular.module('IndexController', [])
.controller('IndexController',
['$scope','$rootScope', '$http', '$window', '$stateParams', '$transitions', '$location', 'KoodistoService',
function($scope, $rootScope, $http, $window, $stateParams, $transitions, $location, Koodisto)
{
  //config provides: demomode, justusuri, authuri, domain_organization
  //i18n provides: i18n
  //config provides also for demo/dev: user, codes

  $scope.demomode = (typeof(demomode) !== 'undefined') ? demomode : false;

  $scope.justusuri = (typeof(justusuri) !== 'undefined') ? justusuri : 'https://'+location.hostname;

  if (typeof(authuri) !== 'undefined') {
    $http.get(authuri)
    .then(function(au){
      $rootScope.user = au;
      $scope.user = au;
      //backend/auth provides but config has more info (code+mail):
      $scope.user.organization = domain_organization[$scope.user.domain];
      $scope.initrole=$scope.user.role;
    })
    .catch(function(){
      if (demomode) {
        $rootScope.user = user;
        $scope.user = user;
        $scope.initrole=$scope.user.role;
      }
    });
  }

  $scope.i18n = (typeof(i18n) !== 'undefined') ? i18n : {};
  $scope.codes = (typeof(codes) !== 'undefined') ? codes : {}; // config

  // test before setting (development helper)
  !$scope.codes.kieli && Koodisto.getKoodisto('kieli').then(function(o){ $scope.codes.kieli=o; });
  !$scope.codes.maatjavaltiot2 && Koodisto.getKoodisto('maatjavaltiot2').then(function(o){ $scope.codes.maatjavaltiot2=o; });
  !$scope.codes.julkaisuntila && Koodisto.getKoodisto('julkaisuntila').then(function(o){ $scope.codes.julkaisuntila=o; });
  !$scope.codes.julkaisufoorumitaso && Koodisto.getKoodisto('julkaisufoorumitaso').then(function(o){ $scope.codes.julkaisufoorumitaso=o; });
  // tieteenalat, julkaisutyypit, ...
  !$scope.codes.tieteenalat && Koodisto.getLuokitus('paatieteenala').then(function(o){ $scope.codes.tieteenalat=o; });
  !$scope.codes.julkaisutyypit && Koodisto.getLuokitus('julkaisunpaaluokka').then(function(o){
    $scope.codes.julkaisutyypit=o;
    angular.forEach($scope.codes.julkaisutyypit,function(aobj,akey){
      Koodisto.getAlatyypit('julkaisunpaaluokka',aobj.arvo).then(function (o) {
        aobj.alatyypit = o;
      });
    });
  });

  // ugly hack to get ALL alatieteenalas in one list
  $scope.getAlltieteenalat = function() {
    let ret = [];
    angular.forEach($scope.codes.tieteenalat,function(tobj,tkey){
      tobj.nogo=true;
      ret.push(tobj);
      angular.forEach(tobj.alatyypit,function(aobj,akey){
        ret.push(aobj);
      });
    });
    return ret;
  };

  // unite organization code and alayksikkokoodi to "organization" codeset (our own!)
  // nb! only for those organizations we've included in config. (there are a lot of them otherwise, for ex all oppilaitosnumero)
  // reset variables
  if (!$scope.codes.organization) {
    $scope.codes.organization = []; // setup
    let org_pushed = []; // collect codes which have been pushed (multiple domains cases)
    angular.forEach(domain_organization,function(dobj,domain){
      if (org_pushed.indexOf(dobj.code)<0) {
        // nb! not entire koodisto, just one code at a time
        // not all organizations are of type oppilaitos there are tutkimusorganisaatio also 
        let codeset = 'oppilaitosnumero';
        if (dobj.code.length>5) {
          codeset = 'tutkimusorganisaatio';
        }
        Koodisto.getKoodi(codeset,dobj.code).then(function(o){
          Koodisto.getKoodisto('alayksikkokoodi').then(function(a){
            $scope.codes.alayksikkokoodi=a;
            angular.forEach(o,function(oobj,okey){
              oobj.alatyypit = [];
              angular.forEach(a,function(aobj,akey){
                if (aobj.arvo.match('^'+oobj.arvo+'-')) { // alayksikkokoodi koodiarvo is in form "^123-..." where 123 is organization code
                  oobj.alatyypit.push(aobj);
                }
              });
              // store in variable by pushing one at a time now
              $scope.codes.organization.push(oobj);
              org_pushed.push(oobj.arvo);
            });
          });
        });
      }
    });
  }
  // for ui listing unique organizations ordered!
  $scope.allowedOrganizations = function() {
    let ret = []; //
    angular.forEach($scope.codes.organization,function(oobj,okey){
      if (oobj.arvo!='00000' && ret.indexOf(oobj.selite[$scope.lang])<0) {
        ret.push(oobj.selite[$scope.lang]);
      }
    });
    return ret.sort();
  }

  // for knowing (save to scope) which "state" is selected (criteria+$transitions)
  let criteria = {
    to: function(state) {
      return state.name != null;
    }
  }
  $transitions.onBefore(criteria, function(trans) {
    var name = trans.to().name;
    $scope.state = {name:name};
  });
  // figure out selected language (part of login process)
  $transitions.onSuccess(null, function(trans) {
    $scope.lang = $stateParams.lang||$scope.lang||'FI';
  });

  // ACCESSORIES (scope functions)

  // check that user has access to whatever the input
  $scope.hasAccess = function(input) {
    // hyvaksy - admin role is required
    if (input=='hyvaksy'){
      if ($scope.user && $scope.user.name
       && $scope.user.organization && $scope.user.organization.code
       && ($scope.user.role=='owner' || $scope.user.role=='admin')
      ) {
        return true;
      } else {
        return false;
      }
    }
    // basically all states - name, organization (with code) and a role are required
    if ($scope.user && $scope.user.name
     && $scope.user.organization && $scope.user.organization.code
     && ($scope.user.role=='owner' || $scope.user.role=='admin' || $scope.user.role=='member')
    ) {
      return true;
    }
    return false;
  }

  $scope.login = function() {
    let target = encodeURIComponent(justusuri+'/#/valitse?lang='+$scope.lang);
    $window.location.href = justusuri+'/Shibboleth.sso/Login?target='+target;
  }

  // map from service (generic) to scope
  $scope.getCode = function(codeset,code) {
    return Koodisto.getCode($scope.codes,codeset,code);
  }

  // helper for localStorage
  $scope.resetKoodisto = function(){
    Koodisto.reset();
  }

  $scope.getMenuClass = function(menuPath) {
    return ($location.path().indexOf(menuPath) !== -1) ? 'active' : '';
  };

}]);//-IndexController
