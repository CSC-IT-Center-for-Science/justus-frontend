'use strict';

let codes = {

  // KOODISTOT :: OPH:n Koodistopalvelu!
  // populoidaan koodistopalvelusta haettavia koodistoja pohjaksi yleisimmillä arvoilla
  /*
  kieli: [
    {arvo: "EN", selite: {FI: "englanti", SV: "engelska", EN: "English"}},
    {arvo: "FI", selite: {FI: "suomi", SV: "finska", EN: "Finnish"}}
  ],
  */
  /*
  maatjavaltiot2: [
    {arvo: "FI", selite: {FI: "Suomi", SV: "Finland", EN: "Finland"}},
    {arvo: "FI", selite: {FI: "Suomi", SV: "Finland", EN: "Finland"}}
  ],
  */

  //
  // OMIA, HIERARKISIAKIN
  //

  // TIETEENALAT :: hierarkinen!
  tieteenalat: [
    {arvo: "1", selite: {FI: "LUONNONTIETEET", SV: "*SV*LUONNONTIETEET", EN: "*EN*LUONNONTIETEET"},
      alatyypit: [
        {arvo: "111", selite: {FI: "Matematiikka", SV: "*SV*Matematiikka", EN: "*EN*Matematiikka"}},
        {arvo: "112", selite: {FI: "Tilastotiede", SV: "*SV*Tilastotiede", EN: "*EN*Tilastotiede"}},
        {arvo: "113", selite: {FI: "Tietojenkäsittely ja informaatiotieteet", SV: "*SV*Tietojenkäsittely ja informaatiotieteet", EN: "*EN*Tietojenkäsittely ja informaatiotieteet"}},
        {arvo: "114", selite: {FI: "Fysiikka", SV: "*SV*Fysiikka", EN: "*EN*Fysiikka"}},
        {arvo: "115", selite: {FI: "Avaruustieteet ja tähtitiede", SV: "*SV*Avaruustieteet ja tähtitiede", EN: "*EN*Avaruustieteet ja tähtitiede"}},
        {arvo: "116", selite: {FI: "Kemia", SV: "*SV*Kemia", EN: "*EN*Kemia"}},
        {arvo: "117", selite: {FI: "Maantiede ja ympäristötieteet", SV: "*SV*Maantiede ja ympäristötieteet", EN: "*EN*Maantiede ja ympäristötieteet"}},
        {arvo: "1171", selite: {FI: "Geotieteet", SV: "*SV*Geotieteet", EN: "*EN*Geotieteet"}},
        {arvo: "1172", selite: {FI: "Ympäristötiede", SV: "*SV*Ympäristötiede", EN: "*EN*Ympäristötiede"}},
        {arvo: "118", selite: {FI: "Biotieteet", SV: "*SV*Biotieteet", EN: "*EN*Biotieteet"}},
        {arvo: "1181", selite: {FI: "Ekologia, evoluutiobiologia", SV: "*SV*Ekologia, evoluutiobiologia", EN: "*EN*Ekologia, evoluutiobiologia"}},
        {arvo: "1182", selite: {FI: "Biokemia, solu- ja molekyylibiologia", SV: "*SV*Biokemia, solu- ja molekyylibiologia", EN: "*EN*Biokemia, solu- ja molekyylibiologia"}},
        {arvo: "1183", selite: {FI: "Kasvibiologia, mikrobiologia, virologia", SV: "*SV*Kasvibiologia, mikrobiologia, virologia", EN: "*EN*Kasvibiologia, mikrobiologia, virologia"}},
        {arvo: "1184", selite: {FI: "Genetiikka, kehitysbiologia, fysiologia", SV: "*SV*Genetiikka, kehitysbiologia, fysiologia", EN: "*EN*Genetiikka, kehitysbiologia, fysiologia"}},
        {arvo: "119", selite: {FI: "Muut luonnontieteet", SV: "*SV*Muut luonnontieteet", EN: "*EN*Muut luonnontieteet"}}
      ]},
    {arvo: "2", selite: {FI: "TEKNIIKKA", SV: "*SV*TEKNIIKKA", EN: "*EN*TEKNIIKKA"},
      alatyypit: [
        {arvo: "211", selite: {FI: "Arkkitehtuuri", SV: "*SV*Arkkitehtuuri", EN: "*EN*Arkkitehtuuri"}},
        {arvo: "212", selite: {FI: "Rakennus- ja yhdyskuntatekniikka", SV: "*SV*Rakennus- ja yhdyskuntatekniikka", EN: "*EN*Rakennus- ja yhdyskuntatekniikka"}},
        {arvo: "213", selite: {FI: "Sähkö-, automaatio- ja tietoliikennetekniikka, elektroniikka", SV: "*SV*Sähkö-, automaatio- ja tietoliikennetekniikka, elektroniikka", EN: "*EN*Sähkö-, automaatio- ja tietoliikennetekniikka, elektroniikka"}},
        {arvo: "214", selite: {FI: "Kone- ja valmistustekniikka", SV: "*SV*Kone- ja valmistustekniikka", EN: "*EN*Kone- ja valmistustekniikka"}},
        {arvo: "215", selite: {FI: "Teknillinen kemia, kemian prosessitekniikka", SV: "*SV*Teknillinen kemia, kemian prosessitekniikka", EN: "*EN*Teknillinen kemia, kemian prosessitekniikka"}},
        {arvo: "216", selite: {FI: "Materiaalitekniikka", SV: "*SV*Materiaalitekniikka", EN: "*EN*Materiaalitekniikka"}},
        {arvo: "217", selite: {FI: "Lääketieteen tekniikka", SV: "*SV*Lääketieteen tekniikka", EN: "*EN*Lääketieteen tekniikka"}},
        {arvo: "218", selite: {FI: "Ympäristötekniikka", SV: "*SV*Ympäristötekniikka", EN: "*EN*Ympäristötekniikka"}},
        {arvo: "219", selite: {FI: "Ympäristön bioteknologia", SV: "*SV*Ympäristön bioteknologia", EN: "*EN*Ympäristön bioteknologia"}},
        {arvo: "220", selite: {FI: "Teollinen bioteknologia", SV: "*SV*Teollinen bioteknologia", EN: "*EN*Teollinen bioteknologia"}},
        {arvo: "221", selite: {FI: "Nanoteknologia", SV: "*SV*Nanoteknologia", EN: "*EN*Nanoteknologia"}},
        {arvo: "222", selite: {FI: "Muu tekniikka", SV: "*SV*Muu tekniikka", EN: "*EN*Muu tekniikka"}}
      ]},
    {arvo: "3", selite: {FI: "LÄÄKE- JA TERVEYSTIETEET", SV: "*SV*LÄÄKE- JA TERVEYSTIETEET", EN: "*EN*LÄÄKE- JA TERVEYSTIETEET"},
      alatyypit: [
        {arvo: "311", selite: {FI: "Peruslääketieteet", SV: "*SV*Peruslääketieteet", EN: "*EN*Peruslääketieteet"}},
        {arvo: "3111", selite: {FI: "Biolääketieteet", SV: "*SV*Biolääketieteet", EN: "*EN*Biolääketieteet"}},
        {arvo: "3112", selite: {FI: "Neurotieteet", SV: "*SV*Neurotieteet", EN: "*EN*Neurotieteet"}},
        {arvo: "312", selite: {FI: "Kliiniset lääketieteet", SV: "*SV*Kliiniset lääketieteet", EN: "*EN*Kliiniset lääketieteet"}},
        {arvo: "3121", selite: {FI: "Sisätaudit", SV: "*SV*Sisätaudit", EN: "*EN*Sisätaudit"}},
        {arvo: "3122", selite: {FI: "Syöpätaudit", SV: "*SV*Syöpätaudit", EN: "*EN*Syöpätaudit"}},
        {arvo: "3123", selite: {FI: "Naisten- ja lastentaudit", SV: "*SV*Naisten- ja lastentaudit", EN: "*EN*Naisten- ja lastentaudit"}},
        {arvo: "3124", selite: {FI: "Neurologia ja psykiatria", SV: "*SV*Neurologia ja psykiatria", EN: "*EN*Neurologia ja psykiatria"}},
        {arvo: "3125", selite: {FI: "Korva-, nenä- ja kurkkutaudit, silmätaudit", SV: "*SV*Korva-, nenä- ja kurkkutaudit, silmätaudit", EN: "*EN*Korva-, nenä- ja kurkkutaudit, silmätaudit"}},
        {arvo: "3126", selite: {FI: "Kirurgia, anestesiologia, tehohoito, radiologia", SV: "*SV*Kirurgia, anestesiologia, tehohoito, radiologia", EN: "*EN*Kirurgia, anestesiologia, tehohoito, radiologia"}},
        {arvo: "313", selite: {FI: "Hammaslääketieteet", SV: "*SV*Hammaslääketieteet", EN: "*EN*Hammaslääketieteet"}},
        {arvo: "314", selite: {FI: "Terveystieteet", SV: "*SV*Terveystieteet", EN: "*EN*Terveystieteet"}},
        {arvo: "3141", selite: {FI: "Terveystiede", SV: "*SV*Terveystiede", EN: "*EN*Terveystiede"}},
        {arvo: "3142", selite: {FI: "Kansanterveystiede, ympäristö ja työterveys", SV: "*SV*Kansanterveystiede, ympäristö ja työterveys", EN: "*EN*Kansanterveystiede, ympäristö ja työterveys"}},
        {arvo: "315", selite: {FI: "Liikuntatiede", SV: "*SV*Liikuntatiede", EN: "*EN*Liikuntatiede"}},
        {arvo: "316", selite: {FI: "Hoitotiede", SV: "*SV*Hoitotiede", EN: "*EN*Hoitotiede"}},
        {arvo: "317", selite: {FI: "Farmasia", SV: "*SV*Farmasia", EN: "*EN*Farmasia"}},
        {arvo: "318", selite: {FI: "Lääketieteen bioteknologia", SV: "*SV*Lääketieteen bioteknologia", EN: "*EN*Lääketieteen bioteknologia"}},
        {arvo: "319", selite: {FI: "Oikeuslääketiede ja muut lääketieteet", SV: "*SV*Oikeuslääketiede ja muut lääketieteet", EN: "*EN*Oikeuslääketiede ja muut lääketieteet"}}
      ]},
    {arvo: "4", selite: {FI: "MAATALOUS- JA METSÄTIETEET", SV: "*SV*MAATALOUS- JA METSÄTIETEET", EN: "*EN*MAATALOUS- JA METSÄTIETEET"},
      alatyypit: [
        {arvo: "411", selite: {FI: "Maatalous ja metsätieteet", SV: "*SV*Maatalous ja metsätieteet", EN: "*EN*Maatalous ja metsätieteet"}},
        {arvo: "4111", selite: {FI: "Maataloustiede", SV: "*SV*Maataloustiede", EN: "*EN*Maataloustiede"}},
        {arvo: "4112", selite: {FI: "Metsätiede", SV: "*SV*Metsätiede", EN: "*EN*Metsätiede"}},
        {arvo: "412", selite: {FI: "Kotieläintiede, maitotaloustiede", SV: "*SV*Kotieläintiede, maitotaloustiede", EN: "*EN*Kotieläintiede, maitotaloustiede"}},
        {arvo: "413", selite: {FI: "Eläinlääketiede", SV: "*SV*Eläinlääketiede", EN: "*EN*Eläinlääketiede"}},
        {arvo: "414", selite: {FI: "Maatalouden bioteknologia", SV: "*SV*Maatalouden bioteknologia", EN: "*EN*Maatalouden bioteknologia"}},
        {arvo: "415", selite: {FI: "Muut maataloustieteet", SV: "*SV*Muut maataloustieteet", EN: "*EN*Muut maataloustieteet"}}
      ]},
    {arvo: "5", selite: {FI: "YHTEISKUNTATIETEET", SV: "*SV*YHTEISKUNTATIETEET", EN: "*EN*YHTEISKUNTATIETEET"},
      alatyypit: [
        {arvo: "511", selite: {FI: "Kansantaloustiede", SV: "*SV*Kansantaloustiede", EN: "*EN*Kansantaloustiede"}},
        {arvo: "512", selite: {FI: "Liiketaloustiede", SV: "*SV*Liiketaloustiede", EN: "*EN*Liiketaloustiede"}},
        {arvo: "513", selite: {FI: "Oikeustiede", SV: "*SV*Oikeustiede", EN: "*EN*Oikeustiede"}},
        {arvo: "514", selite: {FI: "Sosiaalitieteet", SV: "*SV*Sosiaalitieteet", EN: "*EN*Sosiaalitieteet"}},
        {arvo: "5141", selite: {FI: "Sosiologia", SV: "*SV*Sosiologia", EN: "*EN*Sosiologia"}},
        {arvo: "5142", selite: {FI: "Sosiaali- ja yhteiskuntapolitiikka", SV: "*SV*Sosiaali- ja yhteiskuntapolitiikka", EN: "*EN*Sosiaali- ja yhteiskuntapolitiikka"}},
        {arvo: "515", selite: {FI: "Psykologia", SV: "*SV*Psykologia", EN: "*EN*Psykologia"}},
        {arvo: "516", selite: {FI: "Kasvatustieteet", SV: "*SV*Kasvatustieteet", EN: "*EN*Kasvatustieteet"}},
        {arvo: "517", selite: {FI: "Valtio-oppi, hallintotiede", SV: "*SV*Valtio-oppi, hallintotiede", EN: "*EN*Valtio-oppi, hallintotiede"}},
        {arvo: "518", selite: {FI: "Media- ja viestintätieteet", SV: "*SV*Media- ja viestintätieteet", EN: "*EN*Media- ja viestintätieteet"}},
        {arvo: "519", selite: {FI: "Yhteiskuntamaantiede, talousmaantiede", SV: "*SV*Yhteiskuntamaantiede, talousmaantiede", EN: "*EN*Yhteiskuntamaantiede, talousmaantiede"}},
        {arvo: "520", selite: {FI: "Muut yhteiskuntatieteet", SV: "*SV*Muut yhteiskuntatieteet", EN: "*EN*Muut yhteiskuntatieteet"}}
      ]},
    {arvo: "6", selite: {FI: "HUMANISTISET TIETEET", SV: "*SV*HUMANISTISET TIETEET", EN: "*EN*HUMANISTISET TIETEET"},
      alatyypit: [
        {arvo: "611", selite: {FI: "Filosofia", SV: "*SV*Filosofia", EN: "*EN*Filosofia"}},
        {arvo: "612", selite: {FI: "Kielitieteet, kirjallisuus", SV: "*SV*Kielitieteet, kirjallisuus", EN: "*EN*Kielitieteet, kirjallisuus"}},
        {arvo: "6121", selite: {FI: "Kielitieteet", SV: "*SV*Kielitieteet", EN: "*EN*Kielitieteet"}},
        {arvo: "6122", selite: {FI: "Kirjallisuuden tutkimus", SV: "*SV*Kirjallisuuden tutkimus", EN: "*EN*Kirjallisuuden tutkimus"}},
        {arvo: "613", selite: {FI: "Taiteiden tutkimus", SV: "*SV*Taiteiden tutkimus", EN: "*EN*Taiteiden tutkimus"}},
        {arvo: "6131", selite: {FI: "Teatteri, tanssi, musiikki, muut esittävät taiteet", SV: "*SV*Teatteri, tanssi, musiikki, muut esittävät taiteet", EN: "*EN*Teatteri, tanssi, musiikki, muut esittävät taiteet"}},
        {arvo: "6132", selite: {FI: "Kuvataide ja muotoilu", SV: "*SV*Kuvataide ja muotoilu", EN: "*EN*Kuvataide ja muotoilu"}},
        {arvo: "614", selite: {FI: "Teologia", SV: "*SV*Teologia", EN: "*EN*Teologia"}},
        {arvo: "615", selite: {FI: "Historia ja arkeologia", SV: "*SV*Historia ja arkeologia", EN: "*EN*Historia ja arkeologia"}},
        {arvo: "616", selite: {FI: "Muut humanistiset tieteet", SV: "*SV*Muut humanistiset tieteet", EN: "*EN*Muut humanistiset tieteet"}}
      ]},
    {arvo: "9", selite: {FI: "MUUT", SV: "*SV*MUUT", EN: "*EN*MUUT"},
      alatyypit: [
        {arvo: "999", selite: {FI: "Muut", SV: "*SV*Muut", EN: "*EN*Muut"}}
      ]}
  ]

  // JOTAKIN MUUTA

  // JUFOLUOKITUKSET
  ,jufoluokitukset: {
    "": {FI: "Ei ole arvioitu", SV: "*SV*Ei ole arvioitu", EN: "*EN*Ei ole arvioitu"},
    "0": {FI: "#selite puuttuu#", SV: "*SV*#selite puuttuu#", EN: "*EN*#selite puuttuu#"},
    "1": {FI: "Perustaso", SV: "*SV*Perustaso", EN: "*EN*Perustaso"},
    "2": {FI: "Johtava taso", SV: "*SV*Johtava taso", EN: "*EN*Johtava taso"},
    "3": {FI: "Korkein taso", SV: "*SV*Korkein taso", EN: "*EN*Korkein taso"}
  }

  ,oppilaitokset: [
    {arvo: "10056", selite: {FI: "Haaga-Helia ammattikorkeakoulu", SV: "Haaga-Helia yrkeshögskola", EN: "Haaga-Helia University of Applied Sciences"},
      alatyypit: [
        {arvo: "H01", selite: {FI: "Haagan kampus", SV: "Haaga campus", EN: "Haaga campus"}},
        {arvo: "H02", selite: {FI: "Pasilan kampus", SV: "Pasila campus", EN: "Pasila campus"}}
      ]
    },
    {arvo: "01901", selite: {FI: "Helsingin yliopisto", SV: "Helsigfors universitet", EN: "University of Helsinki"},
      alatyypit: [
        {arvo: "H01", selite: {FI: "Keskushallinto", SV: "*SV*Keskushallinto", EN: "*EN*Keskushallinto"}},
        {arvo: "H010", selite: {FI: "Keskushallinto", SV: "*SV*Keskushallinto", EN: "*EN*Keskushallinto"}},
        {arvo: "H100", selite: {FI: "Teologinen tiedekunta", SV: "*SV*Teologinen tiedekunta", EN: "*EN*Teologinen tiedekunta"}},
        {arvo: "H200", selite: {FI: "Oikeustieteellinen tiedekunta", SV: "*SV*Oikeustieteellinen tiedekunta", EN: "*EN*Oikeustieteellinen tiedekunta"}},
        {arvo: "H300", selite: {FI: "Lääketieteellisen tiedekunnan kanslia", SV: "*SV*Lääketieteellisen tiedekunnan kanslia", EN: "*EN*Lääketieteellisen tiedekunnan kanslia"}},
        {arvo: "H304", selite: {FI: "Tutkimusohjelmayksikkö", SV: "*SV*Tutkimusohjelmayksikkö", EN: "*EN*Tutkimusohjelmayksikkö"}},
        {arvo: "H305", selite: {FI: "Hammaslääketieteen laitos", SV: "*SV*Hammaslääketieteen laitos", EN: "*EN*Hammaslääketieteen laitos"}},
        {arvo: "H330", selite: {FI: "Hjelt-instituutti", SV: "*SV*Hjelt-instituutti", EN: "*EN*Hjelt-instituutti"}},
        {arvo: "H345", selite: {FI: "Biolääketieteen laitos - Medicum", SV: "*SV*Biolääketieteen laitos - Medicum", EN: "*EN*Biolääketieteen laitos - Medicum"}},
        {arvo: "H360", selite: {FI: "Kliinisteoreettinen laitos", SV: "*SV*Kliinisteoreettinen laitos", EN: "*EN*Kliinisteoreettinen laitos"}},
        {arvo: "H370", selite: {FI: "Kliininen laitos - Clinicum", SV: "*SV*Kliininen laitos - Clinicum", EN: "*EN*Kliininen laitos - Clinicum"}},
        {arvo: "H400", selite: {FI: "Humanistisen tiedekunnan kanslia", SV: "*SV*Humanistisen tiedekunnan kanslia", EN: "*EN*Humanistisen tiedekunnan kanslia"}},
        {arvo: "H440", selite: {FI: "Suomen kielen, suomalais-ugrilaisten ja pohjoismaisten kielten ja kirjallisuuksien laitos", SV: "*SV*Suomen kielen, suomalais-ugrilaisten ja pohjoismaisten kielten ja kirjallisuuksien laitos", EN: "*EN*Suomen kielen, suomalais-ugrilaisten ja pohjoismaisten kielten ja kirjallisuuksien laitos"}},
        {arvo: "H450", selite: {FI: "Nykykielten laitos", SV: "*SV*Nykykielten laitos", EN: "*EN*Nykykielten laitos"}},
        {arvo: "H460", selite: {FI: "Maailman kulttuurien laitos", SV: "*SV*Maailman kulttuurien laitos", EN: "*EN*Maailman kulttuurien laitos"}},
        {arvo: "H470", selite: {FI: "Filosofian, historian, kulttuurin ja taiteiden tutkimuksen laitos", SV: "*SV*Filosofian, historian, kulttuurin ja taiteiden tutkimuksen laitos", EN: "*EN*Filosofian, historian, kulttuurin ja taiteiden tutkimuksen laitos"}},
        {arvo: "H500", selite: {FI: "Matemaattis- luonnontieteellisen tiedekunnan kanslia", SV: "*SV*Matemaattis- luonnontieteellisen tiedekunnan kanslia", EN: "*EN*Matemaattis- luonnontieteellisen tiedekunnan kanslia"}},
        {arvo: "H510", selite: {FI: "Geotieteiden ja maantieteen laitos", SV: "*SV*Geotieteiden ja maantieteen laitos", EN: "*EN*Geotieteiden ja maantieteen laitos"}},
        {arvo: "H516", selite: {FI: "Matematiikan ja tilastotieteen laitos", SV: "*SV*Matematiikan ja tilastotieteen laitos", EN: "*EN*Matematiikan ja tilastotieteen laitos"}},
        {arvo: "H523", selite: {FI: "Tietojenkäsittelytieteen laitos", SV: "*SV*Tietojenkäsittelytieteen laitos", EN: "*EN*Tietojenkäsittelytieteen laitos"}},
        {arvo: "H528", selite: {FI: "Fysiikan laitos", SV: "*SV*Fysiikan laitos", EN: "*EN*Fysiikan laitos"}},
        {arvo: "H529", selite: {FI: "Kemian laitos", SV: "*SV*Kemian laitos", EN: "*EN*Kemian laitos"}},
        {arvo: "H550", selite: {FI: "Farmasian tiedekunta", SV: "*SV*Farmasian tiedekunta", EN: "*EN*Farmasian tiedekunta"}},
        {arvo: "H570", selite: {FI: "Bio- ja ympäristötieteellisen tiedekunnan kanslia", SV: "*SV*Bio- ja ympäristötieteellisen tiedekunnan kanslia", EN: "*EN*Bio- ja ympäristötieteellisen tiedekunnan kanslia"}},
        {arvo: "H573", selite: {FI: "Biotieteiden laitos", SV: "*SV*Biotieteiden laitos", EN: "*EN*Biotieteiden laitos"}},
        {arvo: "H575", selite: {FI: "Ympäristötieteiden laitos", SV: "*SV*Ympäristötieteiden laitos", EN: "*EN*Ympäristötieteiden laitos"}},
        {arvo: "H577", selite: {FI: "Asemat", SV: "*SV*Asemat", EN: "*EN*Asemat"}},
        {arvo: "H600", selite: {FI: "Käyttäytymistieteellisen tiedekunnan kanslia", SV: "*SV*Käyttäytymistieteellisen tiedekunnan kanslia", EN: "*EN*Käyttäytymistieteellisen tiedekunnan kanslia"}},
        {arvo: "H620", selite: {FI: "Opettajankoulutuslaitos", SV: "*SV*Opettajankoulutuslaitos", EN: "*EN*Opettajankoulutuslaitos"}},
        {arvo: "H630", selite: {FI: "Käyttäytymistieteiden laitos", SV: "*SV*Käyttäytymistieteiden laitos", EN: "*EN*Käyttäytymistieteiden laitos"}},
        {arvo: "H690", selite: {FI: "Harjoittelukoulut", SV: "*SV*Harjoittelukoulut", EN: "*EN*Harjoittelukoulut"}},
        {arvo: "H700", selite: {FI: "Valtiotieteellisen tiedekunnan kanslia", SV: "*SV*Valtiotieteellisen tiedekunnan kanslia", EN: "*EN*Valtiotieteellisen tiedekunnan kanslia"}},
        {arvo: "H720", selite: {FI: "Sosiaalitieteiden laitos", SV: "*SV*Sosiaalitieteiden laitos", EN: "*EN*Sosiaalitieteiden laitos"}},
        {arvo: "H725", selite: {FI: "Politiikan ja talouden tutkimuksen laitos", SV: "*SV*Politiikan ja talouden tutkimuksen laitos", EN: "*EN*Politiikan ja talouden tutkimuksen laitos"}},
        {arvo: "H740", selite: {FI: "Svenska social- och kommunalhögskolan", SV: "*SV*Svenska social- och kommunalhögskolan", EN: "*EN*Svenska social- och kommunalhögskolan"}},
        {arvo: "H800", selite: {FI: "Maatalous- metsätieteellisen tiedekunnan kanslia", SV: "*SV*Maatalous- metsätieteellisen tiedekunnan kanslia", EN: "*EN*Maatalous- metsätieteellisen tiedekunnan kanslia"}},
        {arvo: "H820", selite: {FI: "Metsätieteiden laitos", SV: "*SV*Metsätieteiden laitos", EN: "*EN*Metsätieteiden laitos"}},
        {arvo: "H830", selite: {FI: "Maataloustieteiden laitos", SV: "*SV*Maataloustieteiden laitos", EN: "*EN*Maataloustieteiden laitos"}},
        {arvo: "H840", selite: {FI: "Elintarvike- ja ympäristötieteiden laitos", SV: "*SV*Elintarvike- ja ympäristötieteiden laitos", EN: "*EN*Elintarvike- ja ympäristötieteiden laitos"}},
        {arvo: "H850", selite: {FI: "Taloustieteen laitos", SV: "*SV*Taloustieteen laitos", EN: "*EN*Taloustieteen laitos"}},
        {arvo: "H901", selite: {FI: "Eläinlääketieteellinen tiedekunta", SV: "*SV*Eläinlääketieteellinen tiedekunta", EN: "*EN*Eläinlääketieteellinen tiedekunta"}},
        {arvo: "H902", selite: {FI: "Yliopistollinen eläinsairaala", SV: "*SV*Yliopistollinen eläinsairaala", EN: "*EN*Yliopistollinen eläinsairaala"}},
        {arvo: "H903", selite: {FI: "Tila- ja kiinteistökeskus", SV: "*SV*Tila- ja kiinteistökeskus", EN: "*EN*Tila- ja kiinteistökeskus"}},
        {arvo: "H906", selite: {FI: "Kielikeskus", SV: "*SV*Kielikeskus", EN: "*EN*Kielikeskus"}},
        {arvo: "H907", selite: {FI: "Tietotekniikkakeskus", SV: "*SV*Tietotekniikkakeskus", EN: "*EN*Tietotekniikkakeskus"}},
        {arvo: "H909", selite: {FI: "UniSport", SV: "*SV*UniSport", EN: "*EN*UniSport"}},
        {arvo: "H911", selite: {FI: "IPR University Center", SV: "*SV*IPR University Center", EN: "*EN*IPR University Center"}},
        {arvo: "H913", selite: {FI: "Helsingin taloustieteellinen tutkimuskeskus", SV: "*SV*Helsingin taloustieteellinen tutkimuskeskus", EN: "*EN*Helsingin taloustieteellinen tutkimuskeskus"}},
        {arvo: "H915", selite: {FI: "Fysiikan tutkimuslaitos", SV: "*SV*Fysiikan tutkimuslaitos", EN: "*EN*Fysiikan tutkimuslaitos"}},
        {arvo: "H916", selite: {FI: "Neurotieteen tutkimuskeskus", SV: "*SV*Neurotieteen tutkimuskeskus", EN: "*EN*Neurotieteen tutkimuskeskus"}},
        {arvo: "H918", selite: {FI: "Tutkijakollegium", SV: "*SV*Tutkijakollegium", EN: "*EN*Tutkijakollegium"}},
        {arvo: "H919", selite: {FI: "Biotekniikan instituutti", SV: "*SV*Biotekniikan instituutti", EN: "*EN*Biotekniikan instituutti"}},
        {arvo: "H929", selite: {FI: "Ruralia-instituutti", SV: "*SV*Ruralia-instituutti", EN: "*EN*Ruralia-instituutti"}},
        {arvo: "H930", selite: {FI: "Avoin yliopisto", SV: "*SV*Avoin yliopisto", EN: "*EN*Avoin yliopisto"}},
        {arvo: "H941", selite: {FI: "Aleksanteri-instituutti", SV: "*SV*Aleksanteri-instituutti", EN: "*EN*Aleksanteri-instituutti"}},
        {arvo: "H945", selite: {FI: "Suomen molekyylilääketieteen instituutti", SV: "*SV*Suomen molekyylilääketieteen instituutti", EN: "*EN*Suomen molekyylilääketieteen instituutti"}},
        {arvo: "H955", selite: {FI: "Helsingin yliopiston koe-eläinkeskus", SV: "*SV*Helsingin yliopiston koe-eläinkeskus", EN: "*EN*Helsingin yliopiston koe-eläinkeskus"}},
        {arvo: "H960", selite: {FI: "Helsingin yliopiston koulutus- ja kehittämispalvelut - Palmenia", SV: "*SV*Helsingin yliopiston koulutus- ja kehittämispalvelut - Palmenia", EN: "*EN*Helsingin yliopiston koulutus- ja kehittämispalvelut - Palmenia"}},
        {arvo: "H978", selite: {FI: "Luonnontieteellinen keskusmuseo", SV: "*SV*Luonnontieteellinen keskusmuseo", EN: "*EN*Luonnontieteellinen keskusmuseo"}},
        {arvo: "H981", selite: {FI: "Kansalliskirjasto", SV: "*SV*Kansalliskirjasto", EN: "*EN*Kansalliskirjasto"}},
        {arvo: "H985", selite: {FI: "Helsingin yliopiston kirjasto", SV: "*SV*Helsingin yliopiston kirjasto", EN: "*EN*Helsingin yliopiston kirjasto"}}
      ]
    }
  ]
};
