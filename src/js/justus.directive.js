'use strict';

justusApp.directive('isbnDirective', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function myValidation(isbn) {
        // NB! tyhjä käy, eli ei pakollinen (vielä)
        if (isbn=="") {
          mCtrl.$setValidity('isbnValid', true);
          return isbn;
        }
        if (!isbn) return false;
        
        let ret = false;
        let digits = isbn.replace(/-/g,'').replace(/ /g,'');
        
        let a=digits.substr(0,1); let aa=parseInt(a);
        let b=digits.substr(1,1); let bb=parseInt(b);
        let c=digits.substr(2,1); let cc=parseInt(c);
        let d=digits.substr(3,1); let dd=parseInt(d);
        let e=digits.substr(4,1); let ee=parseInt(e);
        let f=digits.substr(5,1); let ff=parseInt(f);
        let g=digits.substr(6,1); let gg=parseInt(g);
        let h=digits.substr(7,1); let hh=parseInt(h);
        let i=digits.substr(8,1); let ii=parseInt(i);
        if (digits.length == 10) {
          let x=digits.substr(9,1); let xx=(x=='X'?10:parseInt(x)); // nb "X"
          let sum = (10*aa)+(9*bb)+(8*cc)+(7*dd)+(6*ee)+(5*ff)+(4*gg)+(3*hh)+(2*ii)+(1*xx);
          let mod = sum%11;
          ret = 0==mod;
          console.log("isbnDirective "+isbn+" pat="+scope.condition.isbn.pattern+" sum="+sum+" mod="+mod+" == "+x+"? "+ret)
        }
        if (digits.length == 13) {
          let j=digits.substr(9,1); let jj=parseInt(j);
          let k=digits.substr(10,1); let kk=parseInt(k);
          let l=digits.substr(11,1); let ll=parseInt(l);
          let x=digits.substr(12,1); let xx=parseInt(x); // vain numeroita
          let sum = (1*aa)+(3*bb)+(1*cc)+(3*dd)+(1*ee)+(3*ff)+(1*gg)+(3*hh)+(1*ii)+(3*jj)+(1*kk)+(3*ll);
          let mod = sum%10;
          if (mod != 0) {
            ret = (10-mod)==x;
          } else {
            ret = mod==x;
          }
          console.log("isbnDirective "+isbn+" .. "+scope.condition.isbn.pattern+" sum="+sum+" mod="+mod+" => "+x+"? "+ret)
        }
        mCtrl.$setValidity('isbnValid', ret);
        return isbn;
      }
      mCtrl.$parsers.push(myValidation);
    }
  };
});
justusApp.directive('issnDirective', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function myValidation(issn) {
        // NB! tyhjä käy, eli ei pakollinen (vielä)
        if (issn=="") {
          mCtrl.$setValidity('issnValid', true);
          return issn;
        }
        if (!issn) return false;
        if (!issn.match(scope.condition.issn.pattern)) return false;
        let digits = issn.replace(/-/g,'').replace(/ /g,'');
        let a=digits.substr(0,1); let aa=parseInt(a);
        let b=digits.substr(1,1); let bb=parseInt(b);
        let c=digits.substr(2,1); let cc=parseInt(c);
        let d=digits.substr(3,1); let dd=parseInt(d);
        let e=digits.substr(4,1); let ee=parseInt(e);
        let f=digits.substr(5,1); let ff=parseInt(f);
        let g=digits.substr(6,1); let gg=parseInt(g);
        let x=digits.substr(7,1); let xx=(x=="X"?10:parseInt(x));
        let sum = (8*aa)+(7*bb)+(6*cc)+(5*dd)+(4*ee)+(3*ff)+(2*gg)+(xx);
        //console.log("issnDirective "+issn+" .. "+scope.condition.issn.pattern+" sum="+sum+" mod="+(sum%11)+" ==0?" )
        let ret = 0==sum%11;
        mCtrl.$setValidity('issnValid', ret);
        return issn;
      }
      mCtrl.$parsers.push(myValidation);
    }
  };
});
justusApp.directive('orcidDirective', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function myValidation(orcid) {
        // NB! tyhjä käy, eli ei pakollinen (vielä)
        if (orcid=="") {
          mCtrl.$setValidity('orcidValid', true);
          return orcid;
        }
        if (!orcid) return false;
        if (!orcid.match(scope.condition.orcid.pattern)) return false;
        let a=orcid.substr( 0,1); let aa=(parseInt(a)   )*2;
        let b=orcid.substr( 1,1); let bb=(parseInt(b)+aa)*2;
        let c=orcid.substr( 2,1); let cc=(parseInt(c)+bb)*2;
        let d=orcid.substr( 3,1); let dd=(parseInt(d)+cc)*2;
        let e=orcid.substr( 5,1); let ee=(parseInt(e)+dd)*2;
        let f=orcid.substr( 6,1); let ff=(parseInt(f)+ee)*2;
        let g=orcid.substr( 7,1); let gg=(parseInt(g)+ff)*2;
        let h=orcid.substr( 8,1); let hh=(parseInt(h)+gg)*2;
        let i=orcid.substr(10,1); let ii=(parseInt(i)+hh)*2;
        let j=orcid.substr(11,1); let jj=(parseInt(j)+ii)*2;
        let k=orcid.substr(12,1); let kk=(parseInt(k)+jj)*2;
        let l=orcid.substr(13,1); let ll=(parseInt(l)+kk)*2;
        let m=orcid.substr(15,1); let mm=(parseInt(m)+ll)*2;
        let n=orcid.substr(16,1); let nn=(parseInt(n)+mm)*2;
        let o=orcid.substr(17,1); let oo=(parseInt(o)+nn)*2;
        let remainder = oo%11;
        let result = (12-remainder)%11;
        let x=orcid.substr(18,1); let xx=(x=="X"?10:parseInt(x));
        //console.log("orcidDirective "+orcid+" .. "+scope.condition.orcid.pattern+" rem="+remainder+" result="+result+" =="+xx+"?");
        let ret = x==result;
        mCtrl.$setValidity('orcidValid', ret);
        return orcid;
      }
      mCtrl.$parsers.push(myValidation);
    }
  };
});
