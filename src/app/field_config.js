const organizationFieldConfig = [
  // debug/develop/demo (de3)
  {
    domain: '@csc.fi',
    code:'00000',
    email:'notvalid@csc.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  },
  // debug/develop/demo (de3)
  {
    domain: '@gofore.com',
    code:'00000',
    email:'notvalid@csc.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  },
  //Arcada - Nylands svenska yrkeshögskola  #arcada-admins
  {
    domain: '@arcada.fi',
    code:'02535',
    email:'notvalid@arcada.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'orcid', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite'] 
  },
  //Centria-ammattikorkeakoulu  #centria-admins
  {
    domain: '@centria.fi',
    code:'02536',
    email:'notvalid@centria', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'orcid', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  },
  //Diakonia-ammattikorkeakoulu  #diak-admins
  {
    domain: '@diak.fi',
    code:'02623',
    email:'notvalid@diak.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'orcid', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  },
  //Haaga-Helia ammattikorkeakoulu  #haaga-helia-admins
  {
    domain: '@haaga-helia.fi',
    code:'10056',
    email:'notvalid@haaga-helia.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'orcid', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  },
  //Humanistinen ammattikorkeakoulu  #humak-admins
  {
    domain: '@humak.fi',
    code:'02631',
    email:'notvalid@humak.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'orcid', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  },
  //Jyväskylän ammattikorkeakoulu  #jamk-admins
  {
    domain: '@jamk.fi',
    code:'02504',
    email:'notvalid@jamk.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'orcid', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  },
  //Kajaanin ammattikorkeakoulu  #kamk-admins
  {
    domain: '@kamk.fi',
    code:'02473',
    email:'notvalid@kamk.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'orcid', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  },
  //Karelia-ammattikorkeakoulu  #karelia-admins
  {
    domain: '@karelia.fi',
    code:'02469',
    email:'notvalid@karelia.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'orcid', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  },
  // nb! xamk may have 3 domains (mahd. kyamk.fi ja mamk.fi)
  //Kaakkois-Suomen ammattikorkeakoulu  #xamk-admins
  {
    domain: '@xamk.fi',
    code:'10118',
    email:'notvalid@xamk.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'orcid', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  },
  //Kaakkois-Suomen ammattikorkeakoulu  #xamk-admins
  {
    domain: '@kyamk.fi',
    code:'10118',
    email:'notvalid@xamk.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'orcid', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  },
  //Kaakkois-Suomen ammattikorkeakoulu  #xamk-admins
  {
    domain: '@mamk.fi',
    code:'10118',
    email:'notvalid@xamk.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'orcid', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  },
  //Lahden ammattikorkeakoulu  #lamk-admins
  {
    domain: '@lamk.fi',
    code:'02470',
    email:'notvalid@lamk.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'orcid', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  },
  //Laurea-ammattikorkeakoulu  #laurea-admins
  {
    domain: '@laurea.fi',
    code:'02629',
    email:'notvalid@laurea.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'orcid', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  },
  //Metropolia ammattikorkeakoulu  #metropolia-admins
  {
    domain: '@metropolia.fi',
    code:'10065',
    email:'notvalid@metropolia.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'orcid', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'orcid', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  },
  //Satakunnan ammattikorkeakoulu  #samk-admins
  {
    domain: '@samk.fi',
    code:'02507',
    email:'notvalid@samk.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'orcid', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  }, 
  //Seinäjoen ammattikorkeakoulu  #seamk-admins
  {
    domain: '@seamk.fi',
    code:'02472',
    email:'notvalid@seamk.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'orcid', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  },
  //Tampereen ammattikorkeakoulu  #tamk-admins
  {
    domain: '@tamk.fi',
    code:'02630',
    email:'notvalid@tamk.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'orcid', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  },
  //Yrkeshögskolan Novia  #novia-admins
  {
    domain: '@novia.fi',
    code:'10066',
    email:'notvalid@novia.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'orcid', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'alayksikko', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  },
  //Poliisiammattikorkeakoulu  #polamk-admins
  {
    domain: '@polamk.fi',
    code:'02557',
    email:'notvalid@polamk.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  },
  //Poliisiammattikorkeakoulu
  {
    domain: '@poliisi.fi',
    code:'02557',
    email:'notvalid@poliisi.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  },
  // tutkimusorganisaatio
  //Ilmatieteen laitos  #fmi-admins
  {
    domain: '@fmi.fi',
    code:'4940015',
    email:'notvalid@fmi.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  }, 
  // nb! mml has 2 domains
  //Maanmittauslaitos  #mml-admins
  {
    domain: '@nls.fi',
    code:'4020217', 
    email:'notvalid@maanmittauslaitos.fi', 
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  },
  //Maanmittauslaitos  #mml-admins
  {
    domain: '@maanmittauslaitos.fi',
    code:'4020217',
    email:'notvalid@maanmittauslaitos.fi',
    visibleFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'volyymi', 'numero', 
    'lehdenjulkaisusarjannimi', 'kustantaja',  'julkaisunkansainvalisyys', 'tieteenala', 'kansainvalinenyhteisjulkaisu', 
    'yhteisjulkaisuyrityksenkanssa', 'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite', 
    'emojulkaisunnimi', 'emojulkaisuntoimittajat', 'sivut', 'artikkelinumero', 'julkaisunkustannuspaikka', 'avainsanat', 
    'julkaisumaa', 'julkaisunkieli', 'doitunniste', 'pysyvaverkkoosoite'],
    requiredFields: ['etunimet', 'sukunimi', 'julkaisutyyppi', 'julkaisuvuosi', 'julkaisunnimi', 'tekijat', 'julkaisuntekijoidenlukumaara', 
    'organisaatiotekija', 'konferenssinvakiintunutnimi', 'isbn', 'issn', 'lehdenjulkaisusarjannimi', 'kustantaja', 
    'julkaisunkansainvalisyys', 'tieteenala', 'tieteenalakoodi', 'kansainvalinenyhteisjulkaisu', 'yhteisjulkaisuyrityksenkanssa',
    'avoinsaatavuus', 'julkaisurinnakkaistallennettu', 'rinnakkaistallennetunversionverkkoosoite']
  }

  //,'@': '' //...
];

// Depicts field settings based on selected publication type. Settings for a single field constist of the following attributes:
// requiredInPublicationTypes: Publication type codes for which the field is mandatory
// visibleInPublicationTypes: Publication type codes for which the field is visible. Field can be still hidden by organization specific settings in organization_config variable
// optionalWithFields: Other field or fields which makes the mandatory field optional if filled
// requiredWithFields: Fields that only when filled makes the field mandatory
// requiredAmountOfValues: Some fields are lists of values, depicts the required amount of values required, will be 0 for fields with a single value 
// pattern: A regex pattern for a valid field value or null if the field does not need to match a pattern to be valid
// subfields: A list of fields which are nested in the field object
const field_default_config = {
  'organisaatiotunnus': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'julkaisutyyppi': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'julkaisuvuosi': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'julkaisunnimi': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'tekijat': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'julkaisuntekijoidenlukumaara': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'organisaatiotekija': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 1,
    'pattern': null,
    'subfields': ['etunimet', 'sukunimi', 'alayksikko']
  },
  'konferenssinvakiintunutnimi': {
    'requiredInPublicationTypes': ['A4', 'B3', 'D3'],
    'visibleInPublicationTypes': ['A4', 'B3', 'D3'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'isbn': {
    'requiredInPublicationTypes': ['A3', 'A4', 'B2', 'B3', 'C1', 'C2'],
    'visibleInPublicationTypes': ['A3', 'A4', 'B2', 'B3', 'C1', 'C2', 'D2', 'D3', 'D4', 'D5', 'D6', 'E2', 'E3', 'G4', 'G5'],
    'optionalWithFields': ['issn'],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/g,
    'subfields': []
  },
  'issn': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': ['isbn'],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': /^([0-9]{4}[- ][0-9]{3}[0-9X])$/g,
    'subfields': []
  },
  'volyymi': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'numero': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'lehdenjulkaisusarjannimi': {
    'requiredInPublicationTypes': ['E1', 'D1'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'kustantaja': {
    'requiredInPublicationTypes': ['A3', 'B2', 'C1', 'C2', 'D2', 'D4', 'D5', 'D6', 'E2', 'E3'],
    'visibleInPublicationTypes': ['A3', 'A4', 'B2', 'B3', 'C1', 'C2', 'D2', 'D3', 'D4', 'D5', 'D6', 'E2', 'E3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'julkaisunkansainvalisyys': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'tieteenala': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 1,
    'pattern': null,
    'subfields': ['tieteenalakoodi']
  },
  'kansainvalinenyhteisjulkaisu': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'yhteisjulkaisuyrityksenkanssa': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'avoinsaatavuus': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'julkaisurinnakkaistallennettu': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'rinnakkaistallennetunversionverkkoosoite': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': ['julkaisurinnakkaistallennettu'],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'emojulkaisunnimi': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A3', 'A4', 'B2', 'B3', 'D2', 'D3'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'emojulkaisuntoimittajat': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A3', 'A4', 'B2', 'B3', 'D2', 'D3'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'sivut': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A4', 'B1', 'B3', 'D1', 'D3', 'E1'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'artikkelinumero': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A4', 'B1', 'B3', 'D1', 'D3', 'E1'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'julkaisunkustannuspaikka': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A3', 'A4', 'B2', 'B3', 'C1', 'C2', 'D2', 'D3', 'D4', 'D5', 'D6', 'E2', 'E3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'avainsanat': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'julkaisumaa': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'julkaisunkieli': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'doitunniste': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'pysyvaverkkoosoite': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  }
};