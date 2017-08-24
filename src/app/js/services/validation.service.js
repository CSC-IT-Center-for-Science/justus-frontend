'use strict';

angular.module('ValidationService', [])
.service('ValidationService', [
  '$http', '$rootScope',
  function ($http, $rootScope) {
    this.clearValidationErrors = function() {
      angular.element('.has-error').removeClass('has-error');
      angular.element('.has-feedback').removeClass('has-feedback');
      angular.element('.form-control-feedback').hide();
    };

    this.setValidationErrors = function(fieldsWithErrors) {
      this.clearValidationErrors();
      fieldsWithErrors.map(function(field) {
        var element = angular.element('#' + field + 'Group');
        element.addClass('has-error has-feedback');
        element.find('.form-control-feedback').show();
      });
    };
  }
]);
