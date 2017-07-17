angular.module('DirectivesModule', [])
.directive('isbnDirective', ['JustusService', function(Justus) {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function myValidation(isbn) {
        if (!isbn) return false; // undefined?
        if (!isbn.match(Justus.pattern.isbn)) return false;
        let ret = Justus.checkISBN(isbn);
        mCtrl.$setValidity('isbnValid', ret);
        return isbn;
      }
      mCtrl.$parsers.push(myValidation);
    }
  };
}])

.directive('issnDirective', ['JustusService', function(Justus) {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function myValidation(issn) {
        if (!issn) return false; // undefined?
        if (!issn.match(Justus.pattern.issn)) return false;
        let ret = Justus.checkISSN(issn);
        mCtrl.$setValidity('issnValid', ret);
        return issn;
      }
      mCtrl.$parsers.push(myValidation);
    }
  };
}])

.directive('orcidDirective', ['JustusService', function(Justus) {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function myValidation(orcid) {
        // NB! tyhjä käy, eli ei pakollinen (vielä)
        if (orcid===null || orcid=="") {
          mCtrl.$setValidity('orcidValid', true);
          return orcid;
        }
        if (!orcid) return false; // undefined?
        if (!orcid.match(Justus.pattern.orcid)) return false;
        let ret = Justus.checkORCID(orcid);
        mCtrl.$setValidity('orcidValid', ret);
        return orcid;
      }
      mCtrl.$parsers.push(myValidation);
    }
  };
}]);
