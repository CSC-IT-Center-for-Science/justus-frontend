### JUSTUS frontend files

Browse repository for images and CSS files but here's a very short description about JavaScript ja HTML files.

#### JavaScript

Unpackaged

  * config.js

    File is for giving environment specific values to variables. Meant to be maintained on site.

    NB! This file is _NOT_ deployed to production from repository (or is but will and should be overwritten by a local copy)!

Packaged

  * js/index.js

    * js/i18n.js

      All visible strings with language choices.

    * js/app.js

      AngularJS module definition.

    * js/koodisto.service.js

      Handles HTTP calls and data conversion for Opintopolku Koodisto Service. Uses some of generic.js functions which might be unnecessary dependency (those functions could and should be moved to this file).

    * js/index.controller.js

      AngularJS controller file definition. Basically a "root" controller for data always available in app.


  * js/service.js

    * js/crossref.service.js

      Handles HTTP calls and data conversion for CrossRef Service.

    * js/virta.service.js

      Handles HTTP calls and data conversion for VIRTA-julkaisutietopalvelu Service.

    * js/jufo.service.js

      Handles HTTP calls and data conversion for JUFO Service.

    * js/finto.service.js

      Handles HTTP calls and data conversion for Finto (YSA/YSO) Service.

    * js/justus.service.js

      Handles variables visibility and dependency settings. File api.service.js handles stuff which could be in this file.

      (At least some) content may be moved to justus.directive.js!

    * js/api.service.js

      Handles HTTP calls and data conversion for JUSTUS. The link between frontend and backend.

  * js/justus.js

    * js/justus.controller.js

      AngularJS controller file for the JUSTUS application.

    * js/justus.directive.js

      AngularJS directive file which has some field specific requirements for the JUSTUS applications main "form" (actual data that is collected).

      This file and justus.service.js have very tight relation and some parts may be misplaced now!

  * js/tallennus.js

    * js/tallennus.controller.js

      AngularJS controller file for tallennus view.

  * js/tarkasta.js

    * js/tarkasta.controller.js

      AngularJS controller file for tarkasta (omat and hyvaksy) view.


#### HTML

  * index.html

    One page angularjs application file.

  * html/header.html

    The obvious. Always shown.

  * html/footer.html

    The obvious. Always shown.

  * html/index_part.html

    Content of "welcoming" page or "click to log in" page.

  * html/justus.html

    The actual application. Depending on stage includes files:

    * html/justus/valitse.html

      Choose what to do.

    * html/justus/vaihevuo.html

      Header like buttons when in feeding a record mode.

    * html/justus/esitayta.html

      Stage 1. Fetch data from other sources to prefill the form.

    * html/justus/julkaisutyyppi.html

      Stage 2. Choose on field nicely.

    * html/justus/tietojensyotto.html

      Stage 3. Actual "form".

    * html/justus/tallennus.html

      Stage 4. 

  * html/tarkasta.html

    Page for checking already recorded data. Has views for "omat" (own records) and "hyvaksy" (organizational admin listing for all organizations records).

