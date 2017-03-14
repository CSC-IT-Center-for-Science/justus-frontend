'use strict';

justusApp.controller('justusController',
['$scope','$http','KoodistoService',
function($scope,$http,Koodisto)
{

  // mappaa genericistä scopeen
  $scope.getCode = function(codeset,code) {
    return Koodisto.getCode($scope.codes,codeset,code);
  }

  //
  // MUUTTUJAT JA ALUSTUS
  //
  var language = QueryString.lang||"FI";
  /* jos haluaa tarjota selaimen kielen oletuksena:
  if(window)if(window.navigator){
    language = window.navigator.userLanguage || window.navigator.language;
    language = language.substr(0,2);
    language = language.toUpperCase();
    console.log("from browser language: "+language);
  }
  //*/
  $scope.lang = language;
  $scope.i18n = i18n;
  // populoi yleisimmät, jotka jyrätään yli mikäli haetaan kirjoittamalla
  $scope.codes = codes;
}]);//-justusController
