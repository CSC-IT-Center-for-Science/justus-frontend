'use strict';

//from config uses: user, domain_organization, justusuri, authuri

justusApp.controller('IndexController',
['$scope','$http','$stateParams','$transitions','KoodistoService',
function($scope,$http,$stateParams,$transitions,Koodisto)
{
  // map from service (generic) to scope
  $scope.getCode = function(codeset,code) {
    return Koodisto.getCode($scope.codes,codeset,code);
  }
  $scope.resetKoodisto = function(){
    Koodisto.reset();
  }

  $scope.alterViewWidth = function() {
    //console.debug(document.body.className)
    if (document.body.className=='container') {
      document.body.className='container-fluid'
    } else {
      document.body.className='container'
    }
  }

  $scope.hasAccess = function(input) {
    let ret = false;
    // check that user has access to whatever the input
    // TODO: organization
    if (input=='hyvaksy'){
      if ($scope.user.role=='admin') {
        ret = true;
      }
    }
    return ret;
  }
  //
  // VARIABLES AND INITIALIZATION
  //

  // ui-router and stateParams (when it is loaded)
  $scope.$on('$viewContentLoaded', function(event) {
    console.debug("viewContentLoaded","event",event,"stateParams",$stateParams);
    $scope.lang = $stateParams.lang||'FI'; // might not be necessary to set default here
  });
  // for knowing (save to scope) which "state" is selected (criteria+$transitions)
  let criteria = {
    to: function(state) {
      return state.name != null;
    }
  }
  $transitions.onBefore(criteria, function(trans) {
    var name = trans.to().name;
    //console.debug("TRANS",name,trans)
    $scope.state = {name:name};
    //return trans.router.stateService.target(name);
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

  $scope.justusuri = justusuri;

  $scope.user = user;
  console.debug("demo user:",$scope.user)
  //let authuser = Justus.authget();
  console.debug("auth user get:",authuri)
  let authuser = $http.get(authuri);
  //console.debug(authuser)
  authuser.then(function(au){
    console.debug("auth user:",au)
    $scope.user = au.data;
    $scope.user.organization = domain_organization[$scope.user.domain];
  });
  console.debug($scope.user)

  $scope.developmentmode = developmentmode;

}]);//-IndexController
