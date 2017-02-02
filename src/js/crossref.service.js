'use strict';

justusApp.service('CrossRefService', ['$http', function ($http) {
  this.worksquery = function(input,tekija) {
    var uri = "//api.crossref.org/works";
    var uriapi = "?sort=published&order=desc&rows=50&query.title=";
    var filter = "";
    var authorquery = "";
    if (tekija != null && tekija != "") authorquery="&query.author="+tekija;

    console.log("call "+uri+"+"+uriapi+"+"+input+"+"+authorquery+"+"+filter);
    return $http.get(uri+uriapi+input+authorquery+filter)
    .then(function (response){
      var ret=[];
      angular.forEach(response.data.message, function(robj,rkey){
         if (rkey == "items") {
          angular.forEach(robj, function(kobj,kkey){
            var obj={};
            obj.source = "CrossRef";
            obj.title = "";//kobj.title; // TODO: lista?
            angular.forEach(kobj.title, function(tobj,tkey){
              obj.title = tobj;
            });
            obj.doi = kobj.DOI;
            obj.identifier = kobj.DOI;
            obj.issn = kobj.ISSN;
            obj.author = "";
            angular.forEach(kobj.author, function(aobj,akey){
              if(obj.author.length>0) obj.author+="; ";
              obj.author += aobj.family+", "+aobj.given;
            });
            ret.push(obj);
            // järjestetään lista
            //obj.sort(sort_by('title',false,function(a){return a.toUpperCase()}));
          });
        }
      });
      return ret;
    });
  }
  this.works = function(input) {
    var uri = "//api.crossref.org/works/";
    return $http.get(uri+input);
  }
}]);
