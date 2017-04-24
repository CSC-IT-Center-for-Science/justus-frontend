'use strict';

let justushost = 'demo.justus.csc.fi';
let justusuri = 'https://'+justushost;
let apiuri = justusuri+'/api/justus_save.php/';
let authuri = justusuri+'/sec/api/auth.php';

let virtauri = 'https://virta-jtp.csc.fi/api/julkaisut/';
  //'https://dwitjutife1.csc.fi/api/julkaisut/';
  //'https://raja-dev.csc.fi/api/julkaisut/';
  //'http://localhost:8080/api/julkaisut/';
  //'http://localhost/api/julkaisut/';
let crossrefuri = '//api.crossref.org/works';

let developmentmode = false;
if (location.hostname=='127.0.0.1' || location.hostname=='localhost'
 || location.hostname=='demo.justus.csc.fi') {
  console.debug("Development mode ("+location.hostname+")")
  developmentmode = true;
}

// authorization / demo (shib-* mapping handled by backend)
let user = {
  //'shib-uid': 'jdem',
  //'shib-mail': 'justus@csc.fi',
  //'shib-givenName': 'Justus',
  //'shib-sn': 'Demo',
  //'shib-group': '@csc.fi;https://tt.eduuni.fi/groups/justus#group-admins', // 
  'uid': 'jdem', // should map from shib-uid
  'mail': 'justus@csc.fi', // should map from shib-mail
  'name': 'Justus Demo', // should join shib-givenName and shib-sn
  'domain': '@csc.fi', // should get from shib-group where split(;) array item is '@...'
  'organization': {code:'10056',email:'notvalid@haaga-helia.fi'}, // should map from shib-group where split(;) array item is '@...'
  'role': 'admin' // should map from shib-group where split(;) array item is '.../groups/justus#...'
};

// mapping of organization domain to organization codes (type or codeset vary!)
let domain_organization = {
  '@csc.fi': {code:'00000',email:'justus@csc.fi'} // debug/develop/demo (de3)

  ,'@arcada.fi': {code:'02535',email:'biblioteket@arcada.fi'} //Arcada - Nylands svenska yrkeshögskola  #arcada-admins
  ,'@centria.fi': {code:'02536',email:'marjo.pekola@centria'} //Centria-ammattikorkeakoulu  #centria-admins
  ,'@diak.fi': {code:'02623',email:'julkaisutiedot@diak.fi'} //Diakonia-ammattikorkeakoulu  #diak-admins
  ,'@haaga-helia.fi': {code:'10056',email:'kirjasto.pasila@haaga-helia.fi'} //Haaga-Helia ammattikorkeakoulu  #haaga-helia-admins
  ,'@humak.fi': {code:'02631',email:'kirjasto@humak.fi'} //Humanistinen ammattikorkeakoulu  #humak-admins
  ,'@jamk.fi': {code:'02504',email:'helpdesk@jamk.fi'} //Jyväskylän ammattikorkeakoulu  #jamk-admins
  ,'@kamk.fi': {code:'02473',email:'amkkirjasto@kamk.fi'} //Kajaanin ammattikorkeakoulu  #kamk-admins
  ,'@karelia.fi': {code:'02469',email:'julkaisut@karelia.fi'} //Karelia-ammattikorkeakoulu  #karelia-admins
  ,'@xamk.fi': {code:'10118',email:'julkaisut@xamk.fi'} //(mahd. kyamk.fi ja mamk.fi) //Kaakkois-Suomen ammattikorkeakoulu  #xamk-admins
  ,'@lamk.fi': {code:'02470',email:'pyydetty'} //Lahden ammattikorkeakoulu  #lamk-admins (odottaa jäseniä)
  ,'@laurea.fi': {code:'02629',email:'julkaisut@laurea.fi'} //Laurea-ammattikorkeakoulu  #laurea-admins
  ,'@metropolia.fi': {code:'10065',email:'annika.hayrynen@metropolia.fi'} //Metropolia ammattikorkeakoulu  #metropolia-admins
  ,'@samk.fi': {code:'02507',email:'lib.samk@samk.fi'} //Satakunnan ammattikorkeakoulu  #samk-admins
  ,'@seamk.fi': {code:'02472',email:'julkaisutuki@seamk.fi'} //Seinäjoen ammattikorkeakoulu  #seamk-admins
  ,'@tamk.fi': {code:'02630',email:'tiina.kenttala-koivumaki@tamk.fi'} //Tampereen ammattikorkeakoulu  #tamk-admins
  ,'@novia.fi': {code:'10066',email:'johanna.glader@novia.fi'} //Yrkeshögskolan Novia  #novia-admins
  ,'@polamk.fi': {code:'02557',email:'kirjasto@polamk.fi'} //Poliisiammattikorkeakoulu  #polamk-admins

  // tutkimusorganisaatio
  ,'@fmi.fi': {code:'4940015',email:'achim.drebs@fmi.fi'} //Ilmatieteen laitos  #fmi-admins
  ,'@nls.fi': {code:'4020217',email:'MML.VIRTA@maanmittauslaitos.fi'} //Maanmittauslaitos maanmittauslaitos.fi  #mml-admins

  //,'@': '' //...
};
