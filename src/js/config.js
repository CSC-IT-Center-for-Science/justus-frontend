'use strict';

//router: let language = QueryString.lang||"FI";
let language = "FI";
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

// authorization
let user = {
  'shib-uid': 'jdem',
  'shib-mail': 'justus@csc.fi',
  'shib-givenName': 'Justus',
  'shib-sn': 'Demo',
  'shib-group': '@csc.fi;https://tt.eduuni.fi/groups/justus#group-admins', // 
  'role': 'admin', // should map from shib-group where split(;) array item is '.../groups/justus#...'
  'domain': '@csc.fi', // should get from shib-group where split(;) array item is '@...'
  'organization': '10056', // should map from shib-group where split(;) array item is '@...'
  'name': 'Justus Demo', // should join shib-givenName and shib-sn
  '#': '' // placeholder
};

// mapping of organization domain to organization codes (type or codeset vary!)
let domain_organization = {
  '@csc.fi': '00000' // debug/develop/demo (de3)

  ,'@arcada.fi': '02535' //Arcada - Nylands svenska yrkeshögskola #arcada-admins
  ,'@centria.fi': '02536' //Centria-ammattikorkeakoulu  #centria-admins
  ,'@diak.fi': '02623' //Diakonia-ammattikorkeakoulu  #diak-admins
  ,'@haaga-helia.fi': '10056' //Haaga-Helia ammattikorkeakoulu  #haaga-helia-admins
  ,'@humak.fi': '02631' //Humanistinen ammattikorkeakoulu  #humak-admins
  ,'@jamk.fi': '02504' //Jyväskylän ammattikorkeakoulu  #jamk-admins
  ,'@kamk.fi': '02473' //Kajaanin ammattikorkeakoulu  #kamk-admins
  ,'@karelia.fi': '02469' //Karelia-ammattikorkeakoulu  #karelia-admins
  ,'@xamk.fi': '10118' //(mahd. kyamk.fi ja mamk.fi) //Kaakkois-Suomen ammattikorkeakoulu  #xamk-admins
  ,'@lamk.fi': '02470' //Lahden ammattikorkeakoulu  #lamk-admins (odottaa jäseniä)
  ,'@laurea.fi': '02629' //Laurea-ammattikorkeakoulu  #laurea-admins
  ,'@metropolia.fi': '10065' //Metropolia ammattikorkeakoulu  #metropolia-admins
  ,'@samk.fi': '02507' //Satakunnan ammattikorkeakoulu  #samk-admins
  ,'@seamk.fi': '02472' //Seinäjoen ammattikorkeakoulu  #seamk-admins
  ,'@tamk.fi': '02630' //Tampereen ammattikorkeakoulu  #tamk-admins
  ,'@novia.fi': '10066' //Yrkeshögskolan Novia  #novia-admins
  ,'@polamk.fi': '02557' //Poliisiammattikorkeakoulu  #polamk-admins

  // tutkimusorganisaatio
  ,'@fmi.fi': '4940015' //Ilmatieteen laitos  #fmi-admins
  ,'@nls.fi': '4020217' //Maanmittauslaitos maanmittauslaitos.fi   #mml-admins

  //,'@': '' //...
};



