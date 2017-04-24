'use strict';

justusApp.controller('IndexController',
['$scope','$http','$window','$stateParams','$transitions','KoodistoService',
function($scope,$http,$window,$stateParams,$transitions,Koodisto)
{
  //config provides: user, domain_organization, justusuri, authuri

  $scope.developmentmode = developmentmode;
  $scope.demomode = demomode;

  $scope.justusuri = justusuri;

  console.debug("auth user get:",authuri)
  $http.get(authuri)
  .success(function(au){
    console.debug("auth user:",au)
    $scope.user = au;
    $scope.user.organization = domain_organization[$scope.user.domain];
  })
  .error(function(){
    if (demomode) {
      $scope.user = user;
      console.debug("demo user:",$scope.user)
    }
  });

  $scope.i18n = i18n;
  $scope.codes = {};

  Koodisto.getKoodisto('kieli').then(function(o){ $scope.codes.kieli=o; });
  Koodisto.getKoodisto('maatjavaltiot2').then(function(o){ $scope.codes.maatjavaltiot2=o; });
  Koodisto.getKoodisto('julkaisuntila').then(function(o){ $scope.codes.julkaisuntila=o; });
  Koodisto.getKoodisto('julkaisufoorumitaso').then(function(o){ $scope.codes.julkaisufoorumitaso=o; });
  // tieteenalat, julkaisutyypit, ...
  Koodisto.getLuokitus('paatieteenala').then(function(o){ $scope.codes.tieteenalat=o; });
  Koodisto.getLuokitus('julkaisunpaaluokka').then(function(o){
    $scope.codes.julkaisutyypit=o;
    angular.forEach($scope.codes.julkaisutyypit,function(aobj,akey){
      Koodisto.getAlatyypit('julkaisunpaaluokka',aobj.arvo).then(function (o) {
        aobj.alatyypit = o;
      });
    });
  });

  // unite organization code and alayksikkokoodi to "organization" codeset (our own!)
  // nb! only for those organizations we've included in config. (there are a lot of them otherwise, for ex all oppilaitosnumero)
  // reset variables
  $scope.codes.organization = []; // setup
  angular.forEach(domain_organization,function(dobj,domain){
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
        });
      });
    });
  });
  console.debug("codes:",$scope.codes)

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

  $scope.alterViewWidth = function() {
    if (document.body.className=='container') {
      document.body.className='container-fluid'
    } else {
      document.body.className='container'
    }
  }

  // check that user has access to whatever the input
  $scope.hasAccess = function(input) {
    let ret = false;
    // TODO: organization
    if (input=='hyvaksy'){
      if ($scope.user.role=='admin') {
        ret = true;
      }
    }
    return ret;
  }

  $scope.login = function() {
    let target = encodeURIComponent(justusuri+'/#/justus?lang='+$scope.lang);
    console.debug("login",justusuri,target)
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

}]);//-IndexController
