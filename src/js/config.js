'use strict';

let language = QueryString.lang||"FI";
/* jos haluaa tarjota selaimen kielen oletuksena:
if(window)if(window.navigator){
  language = window.navigator.userLanguage || window.navigator.language;
  language = language.substr(0,2);
  language = language.toUpperCase();
  console.log("from browser language: "+language);
}
//*/

let developmentmode = false;
if (location.hostname=='127.0.0.1' || location.hostname=='localhost') {
  console.debug("Development mode ("+location.hostname+")")
  developmentmode = true;
}
