'use strict';

justusApp.controller('IndexController',
['$scope','$http','KoodistoService',
function($scope,$http,Koodisto)
{

  // mappaa genericistä scopeen
  $scope.getCode = function(codeset,code) {
    return Koodisto.getCode($scope.codes,codeset,code);
  }
  $scope.resetKoodisto = function(){
    Koodisto.reset();
  }
  //
  // MUUTTUJAT JA ALUSTUS
  //
  $scope.lang = language;
  $scope.i18n = i18n;
  // populoi yleisimmät, jotka jyrätään yli mikäli haetaan kirjoittamalla
  $scope.codes = codes;

  $scope.developmentmode = developmentmode;

}]);//-IndexController
