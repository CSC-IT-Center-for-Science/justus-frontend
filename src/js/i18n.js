'use strict';

let i18n = {
  header: {
    title: {FI: "JUSTUS", SV: "JUSTUS", EN: "JUSTUS"},
    logotext: {FI: "JUSTUS - JULKAISUTIETOJEN TALLENNUS", SV: "JUSTUS - JULKAISUTIETOJEN TALLENNUS", EN: "JUSTUS - JULKAISUTIETOJEN TALLENNUS"},
    lang: {FI: "Suomeksi", SV: "På svenska", EN: "In English"},
    logout: {FI: 'Kirjaudu ulos', SV: 'Logga ut', EN: 'Logout'},
    help: {FI: "Ohje", SV: "*SV*Ohje", EN: "*EN*Ohje"}
  },
  navi: {
    stage: {
      "0": {FI: "VALITSE JULKAISUTYYPPI", SV: "*SV*VALITSE JULKAISUTYYPPI", EN: "*EN*VALITSE JULKAISUTYYPPI"},
      "1": {FI: "TARKENNA JULKAISUTYYPPIÄ", SV: "*SV*TARKENNA JULKAISUTYYPPIÄ", EN: "*EN*TARKENNA JULKAISUTYYPPIÄ"},
      "2": {FI: "HAE JULKAISUN TIETOJA MUISTA TIETOKANNOISTA TAI OHITA HAKU", SV: "*SV*HAE JULKAISUN TIETOJA MUISTA TIETOKANNOISTA TAI OHITA HAKU", EN: "*EN*HAE JULKAISUN TIETOJA MUISTA TIETOKANNOISTA TAI OHITA HAKU"},
      "3": {FI: "SYÖTÄ JULKAISUTIEDOT", SV: "*SV*SYÖTÄ JULKAISUTIEDOT", EN: "*EN*SYÖTÄ JULKAISUTIEDOT"},
      "4": {FI: "SYÖTÄ OMAAN ORGANISAATIOOSI KUULUVIEN TEKIJÖIDEN TIEDOT", SV: "*SV*SYÖTÄ OMAAN ORGANISAATIOOSI KUULUVIEN TEKIJÖIDEN TIEDOT", EN: "*EN*SYÖTÄ OMAAN ORGANISAATIOOSI KUULUVIEN TEKIJÖIDEN TIEDOT"},
      "5": {FI: "TARKISTA TIEDOT", SV: "*SV*TARKISTA TIEDOT", EN: "*EN*TARKISTA TIEDOT"}
    },
    form: {FI: "SYÖTTÖLOMAKE", SV: "*SV*SYÖTTÖLOMAKE", EN: "INPUT FORM"},
    records: {FI: "OMAT TALLENNUKSET", SV: "*SV*OMAT TALLENNUKSET", EN: "*EN*OMAT TALLENNUKSET"}
  },
  footer: {
    help: {
      title: {FI: "Asiakaspalvelu", SV: "*SV*Asiakaspalvelu", EN: "*EN*Asiakaspalvelu"},
      email: {FI: "justus@csc.fi", SV: "justus@csc.fi", EN: "justus@csc.fi"},
      time: {FI: "ma-pe klo 8.30-16", SV: "*SV*ma-pe klo 8.30-16", EN: "Mon-Tue 8.30am-4pm"}
    },
    csc: {
      name: {FI: "CSC - TIETEEN TIETOTEKNIIKAN KESKUS OY", SV: "CSC - TIETEEN TIETOTEKNIIKAN KESKUS OY", EN: "CSC - IT CENTER FOR SCIENCE LTD"},
      address: {FI: "PL 405, 02101 Espoo", SV: "PL 405, 02101 Espoo", EN: "P.O. Box 405, FI-02101 Espoo"},
      phone: {FI: "puh. (09) 457 2001", SV: "tel. +358 (0)9 457 2001", EN: "tel. +358 (0)9 457 2001"}
    }
  },
  content: {
    valitse: {
      title: {FI: "VALITSE TOIMINTO", SV: "*SV*VALITSE TOIMINTO", EN: "*EN*VALITSE TOIMINTO"},
      tallenna: {FI: "Tallenna julkaisu", SV: "*SV*Tallenna julkaisu", EN: "*EN*Tallenna julkaisu"},
      omat: {FI:"Omat tallennukset", SV:"*SV*Omat tallennukset", EN:"*EN*Omat tallennukset"},
      hyvaksy: {FI:"Hyväksy tallennuksia", SV:"*SV*Hyväksy tallennuksia", EN:"*EN*Hyväksy tallennuksia"}
    },
    tiedonhaku: {
      title: {FI: "Tietojen haku", SV: "*SV*Tietojen haku", EN: "*EN*Tietojen haku"},
      text: {
        FI: "Tällä näytöllä voit hakea jo tallennettuja tietoja muista järjestelmistä pohjaksi.", SV: "*SV*", EN: "*EN*",
        doi: {
          FI: "Suoraviivainen DOI-tunnisteella haku CrossRef:stä; syötä DOI-tunniste ja klikkaa Hae-painiketta niin siirryt suoraan esitäytettyyn tietojensyöttölomakkeeseen.",
          SV:"*SV*", EN:"*EN*"
        },
        haku: {
          FI: "Julkaisun haku tekijän ja julkaisun nimen perusteella; syötä tekijän nimi (osa) omaan kenttäänsä ja julkaisun nimeä (osa) seuraavaan kenttään. Haku käynnistyy automaattisesti CrossRef- ja VIRTA-palveluihin ja tulokset näytetään valintalistana josta sopivan julkaisun voi valita klikkaamalla. Tämän jälkeen valitun julkaisun voi ottaa mukaan klikkaamalla Käytä-painiketta jonka myötä siirrytään esitäytettuun tietojen syöttölomakkeeseen.",
          SV:"*SV*", EN:"*EN*"
        },
        ohita: {
          FI: "Vaihtoehtoisesti voit myös ohittaa hakuvaiheen klikkaamalla 'Ohita haku'-painiketta jonka jälkeen siirryt tietojen syöttämiseen",
          SV: "*SV*", EN: "*EN*"
        }
      },
      doihaku: {
        title: {FI: "Hae tietoja DOI-tunnisteella", SV: "*SV*Hae tietoja DOI-tunnisteella", EN: "*EN*Hae tietoja DOI-tunnisteella"},
        tunniste: {
          FI: "Kirjoita DOI-tunniste", SV: "*SV*Kirjoita DOI-tunniste", EN: "*EN*Kirjoita DOI-tunniste",
          tooltip: {FI: "Esim. https://doi.org/10.4324/9780203841693", SV: "*SV*Kirjoita DOI-tunniste", EN: "*EN*Kirjoita DOI-tunniste"}
        },
        klikkaa: {
          FI: "ja klikkaa", SV: "*SV*ja klikkaa", EN: "*EN*ja klikkaa",
          tooltip: {FI: "ja klikkaa", SV: "*SV*ja klikkaa", EN: "*EN*ja klikkaa"}
        },
        hae: {FI: "Hae", SV: "*SV*Hae", EN: "*EN*Hae"}
      },
      etsijulkaisu: {
        title: {FI: "Hae tietoja julkaisun nimellä", SV: "*SV*Hae tietoja julkaisun nimellä", EN: "*EN*Hae tietoja julkaisun nimellä"},
        picktip: {FI: "Hae julkaisun nimellä", SV: "*SV*Hae julkaisun nimellä", EN: "*EN*Hae julkaisun nimellä"},
        tekija: {
          FI: "Kirjoita hakuehto: tekijä", SV: "*SV*Kirjoita hakuehto: tekijä", EN: "*EN*Kirjoita hakuehto: tekijä",
          tooltip: {FI: "Rajaa hakua halutessasi tekijän nimellä", SV: "*SV*Rajaa hakua halutessasi tekijän nimellä", EN: "*EN*Rajaa hakua halutessasi tekijän nimellä"}
        },
      },
      uudestaan: {
        FI: "Hae julkaisua uudestaan", SV: "*SV*Hae julkaisua uudestaan", EN: "*EN*Hae julkaisua uudestaan"
      },
      hae: {FI: "Hae", SV: "*SV*Hae", EN: "*EN*Hae"},
      ohita: {FI: "Ohita vaihe ja syötä julkaisutiedot käsin", SV: "*SV*Ohita vaihe ja syötä julkaisutiedot käsin", EN: "*EN*Ohita vaihe ja syötä julkaisutiedot käsin"}
    },
    form: {
      julkaisutyyppi: {
        FI: "Julkaisutyyppi", SV: "Publikationstyp", EN: "Publication type",
        paa: {FI: "VALITSE JULKAISUTYYPPI PÄÄLUOKKA", SV: "*SV*VALITSE JULKAISUTYYPPI PÄÄLUOKKA", EN: "*EN*VALITSE JULKAISUTYYPPI PÄÄLUOKKA"},
        ala: {FI: "VALITSE JULKAISUTYYPPI ALALUOKKA", SV: "*SV*VALITSE JULKAISUTYYPPI ALALUOKKA", EN: "*EN*VALITSE JULKAISUTYYPPI ALALUOKKA"},
      },
      julkaisuvuosi: {
        FI: "Julkaisuvuosi", SV: "Utgivningsår", EN: "Year of publication",
        tooltip: {
          FI: "Vuosi, jolloin julkaisu on julkaistu ensimmäistä kertaa versiona, jossa on täydelliset viitetiedot.",
          SV: "Det år anges då publikationen för första gången har utgetts som en version med fullständiga referensuppgifter.",
          EN: "The year in which the publication was published for the first time as a version with full reference data."
        }
      },
      julkaisunnimi: {
        FI: "Julkaisun nimi", SV: "Publikationens namn/titel", EN: "Publication name",
        tooltip: {
          FI: "Julkaisun nimi siten kuin se on artikkelissa tai teoksessa mainittu. Vieraskielisen julkaisun nimi voidaan kirjoittaa translitteroituna versiona.",
          SV: "Publikationens namn/titel såsom den nämns i artikeln eller verket. Namnet på en publikation på ett främmande språk kan vid behov sparas som en translittererad version.",
          EN: "Publication name as given in the article or the book. If necessary, the name of a foreign-language publication may be reported on as a transliterated version."
        }
      },
      tekijat: {
        FI: "Tekijät", SV: "Publikationens upphovsmän", EN: "Publication authors",
        tooltip: {
          FI: "Julkaisun täydelliset tekijätiedot siinä muodossa ja järjestyksessä, jossa ne on listattu alkuperäisessä julkaisussa tai lähdetietokannassa. 20 ensimmäistä tekijää riittää.",
          SV: "Fullständig information om publikationens upphovsmän anges i den form och i den ordning som de nämns i den ursprungliga publikationen eller källdatabasen (högst 20 st.).",
          EN: "Authors of the publication in the format and order in which they were listed in the original publication or source database (max. 20)."
        },
        picktip: {FI: "Tekijät puolipistein eroteltuna", SV: "*SV*Tekijät puolipistein eroteltuna", EN: "*EN*Tekijät puolipistein eroteltuna"}
      },
      julkaisuntekijoidenlukumaara: {
        FI: "Julkaisun tekijöiden lukumäärä", SV: "Antalet upphovsmän", EN: "Number of authors in publication",
        tooltip: {
          FI: "Julkaisun tekijöiden kokonaislukumäärä.",
          SV: "Det totala antalet upphovsmän vad gäller publikationen.",
          EN: "The total number of authors in the publication."
        }
      },
      organisaationtekijat: {
        FI: "Organisaation tekijät", SV: "Organisationens upphovsmän", EN: "Organisation authors",
        tooltip: {
          FI: "Organisaatioon kuuluvat tutkijat, jotka ovat osallistuneet julkaisun tekemiseen. Organisaation tiedekunta, osasto, laitos tai yksikkö, jonka henkilöstöön julkaisun tekijä kuuluu. Tekijän ORCID-tunniste esim. 0000-0000-0000-0000, ks. http://www.orcid.org",
          SV: "Forskare, som har varit med om att göra publikationen och som hör till organisationen. Organisationens fakulteter, avdelningar, institutioner eller enheter inom vilka publikationens upphovsmän är anställda. ORCID-identifieringsnumren, t.ex. 0000-0000-0000-0000, på den rapporterande organisationens egna upphovsmän, se http://www.orcid.org",
          EN: "Researchers at the organisation involved in producing the publication. Faculties, departments or units of the organisation whose staff includes the authors of the publication. The ORCID identifiers of authors from the reporting organisation, e.g. 0000-0000-0000-0000, refer to http://www.orcid.org"
        },
        sukunimi: {FI: "Sukunimi", SV: "*SV*Sukunimi", EN: "*EN*Sukunimi", picktip: {FI: "Sukunimi", SV: "*SV*Sukunimi", EN: "*EN*Sukunimi"}},
        etunimi: {FI: "Etunimi", SV: "*SV*Etunimi", EN: "*EN*Etunimi", picktip: {FI: "Etunimi", SV: "*SV*Etunimi", EN: "*EN*Etunimi"}},
        alayksikko: {FI: "Alayksikkö", SV: "*SV*Alayksikkö", EN: "*EN*Alayksikkö", picktip: {FI: "Alayksikkö", SV: "*SV*Alayksikkö", EN: "*EN*Alayksikkö"}},
        orcid: {FI: "ORCID", SV: "*SV*ORCID", EN: "*EN*ORCID", picktip: {FI: "ORCID", SV: "*SV*ORCID", EN: "*EN*ORCID"}},
        lisaa: {FI: "+", SV: "+", EN: "+", tooltip: {FI: "Lisää", SV: "*SV*Lisää", EN: "*EN*Lisää"}},
        poista: {FI: "-", SV: "-", EN: "-", tooltip: {FI: "Poista", SV: "*SV*Poista", EN: "*EN*Poista"}},
        kopioi: {FI: "Kopioi tekijät", SV: "*SV*Kopioi tekijät", EN: "*EN*Kopioi tekijät",
          tooltip: {
            FI: "Kopioi julkaisun tekijät organisaation tekijöiksi",
            SV: "*SV*Kopioi julkaisun tekijät organisaation tekijöiksi",
            EN: "*EN*Kopioi julkaisun tekijät organisaation tekijöiksi"
          }
        }
      },
      konferenssinvakiintunutnimi: {
        FI: "Konferenssin vakiintunut nimi", SV: "Konferensens vedertagna namn", EN: "Established conference name",
        tooltip: {
          FI: "Konferenssin vakiintunut nimi ilman kirjainlyhennettä tai järjestys- ja vuosilukuja.",
          SV: "Konferensens etablerade namn utan ordningsnummer, årtal och bokstavsförkortning.",
          EN: "The established conference name without the ordinal and year and with no abbreviations."
        },
        picktip: {FI: "Kirjoita ja valitse konferenssin nimi", SV: "*SV*Kirjoita ja valitse konferenssin nimi", EN: "*EN*Kirjoita ja valitse konferenssin nimi"}
      },
      emojulkaisunnimi: {
        FI: "Emojulkaisun nimi", SV: "Moderpublikationens namn", EN: "Parent publication name",
        tooltip: {
          FI: "Emojulkaisun nimi, jossa artikkeli on julkaistu.",
          SV: "Namnet på den moderpublikationen där artikeln har publicerats.",
          EN: "Name of the parent publication in which the article was published."
        }
      },
      isbn: {
        FI: "ISBN", SV: "ISBN", EN: "ISBN",
        tooltip: {
          FI: "Monografian tai emojulkaisun ISBN-numero, esim. 978-952-245-683-0",
          SV: "Monografins eller moderpublikationens ISBN-nummer, t.ex. 978-952-245-683-0",
          EN: "Monograph or parent publication ISBN number e.g. 978-952-245-683-0."
        }
      },
      emojulkaisuntoimittajat: {
        FI: "Emojulkaisun toimittajat", SV: "Moderpublikationens redaktörer", EN: "Parent publication editors",
        tooltip: {
          FI: "Emojulkaisun toimittajat siinä muodossa ja järjestyksessä, jossa ne on listattu alkuperäisessä julkaisussa tai lähdetietokannassa.",
          SV: "Det redigerade verkets redaktörer anges i den form och i den ordning som de nämns i den ursprungliga publikationen eller källdatabasen.",
          EN: "Editors of the parent publication in the format and order in which they were listed in the original publication or source database."
        }
      },
      lehdenjulkaisusarjannimi: {
        FI: "Lehden / julkaisusarjan nimi", SV: "Namnet på tidningen/serien", EN: "Journal/series name",
        tooltip: {
          FI: "Lehden/sarjan nimi mahdollisimman täydellisenä ja kokonaan auki kirjoitettuna (ei lyhenteitä).",
          SV: "Namnet på tidningen/serien så fullständigt som möjligt och helt utskrivet (inga förkortningar).",
          EN: "Journal/series name, as complete as possible, and spelled out (no abbreviations)."
        },
        picktip: {FI: "Kirjoita ja valitse lehden/sarjan nimi", SV: "*SV*Kirjoita ja valitse lehden/sarjan nimi", EN: "*EN*Kirjoita ja valitse lehden/sarjan nimi"}
      },
      issn: {
        FI: "ISSN", SV: "ISSN", EN: "ISSN",
        tooltip: {
          FI: "Lehden tai sarjan ISSN-numero ensisijaisesti painetun version mukaisesti. Jos painettua versiota ei ole, ilmoitetaan elektronisen version ISSN-numero.",
          SV: "ISSN-numret för den serie i vilken tidskriften, monografin eller moderpublikationen har publicerats i första hand i enlighet med den tryckta versionen. Om en tryckt version saknas, meddelas den elektroniska versionens ISSN-nummer.",
          EN: "The ISSN number of the series or of the journal according to the primary printed version. If there is no printed version, the ISSN number of the electronic version will be indicated."
        }
      },
      volyymi: {
        FI: "Volyymi", SV: "Volym", EN: "Volume",
        tooltip: {
          FI: "Lehden tai sarjan volyymi, jossa artikkeli/teos on ilmestynyt.",
          SV: "Tidskriftens eller seriens volym där artikeln har getts ut.",
          EN: "Volume of the journal or series in which the article/scientific book appeared."
        }
      },
      numero: {
        FI: "Numero", SV: "Nummer", EN: "Issue",
        tooltip: {
          FI: "Lehden tai sarjan numero, jossa artikkeli/teos on ilmestynyt.",
          SV: "Tidskriftens eller seriens nummer där artikeln har getts ut.",
          EN: "Issue of the journal or series in which the article/scientific book appeared."
        }
      },
      sivut: {
        FI: "Sivut", SV: "Sidor", EN: "Pages",
        tooltip: {
          FI: "Lehden tai sarjan sivunumerot, joilla artikkeli on ilmestynyt. Ilmoitetaan siinä muodossa kuin ne on esitetty alkuperäisessä artikkelissa tai lähdetietokannassa.",
          SV: "De sidnummer som artikeln har haft i samband med sin publicering i den ursprungliga artikeln eller i källdatabasen.",
          EN: "Publication page numbers on which the article was published in the same format as in the original article or source database."
        }
      },
      artikkelinumero: {
        FI: "Artikkelinumero", SV: "Artikelns nummer", EN: "Article number",
        tooltip: {
          FI: "Lehden tai sarjan artikkelinumero, jolla artikkeli on ilmestynyt. Ilmoitetaan siinä muodossa kuin se on esitetty alkuperäisessä artikkelissa tai lähdetietokannassa.",
          SV: "Det artikelnummer som artikeln har haft vid sin publicering i den form som numren har presenterats i den ursprungliga artikeln eller i källdatabasen.",
          EN: "Journal/series article number used for the publication of the article in the same format as in the original article or source database."
        }
      },
      kustantaja: {
        FI: "Kustantaja", SV: "Förläggare", EN: "Publisher",
        tooltip: {
          FI: "Julkaisun kustantajan nimi mahdollisimman täydellisenä ja kokonaan auki kirjoitettuna (ei lyhenteitä).",
          SV: "Namnet på publikationens förläggare så fullständigt som möjligt och helt utskrivet (inga förkortningar).",
          EN: "Publisher’s name, as complete as possible, and spelled out (no abbreviations)."
        },
        picktip: {FI: "Kirjoita ja valitse kustantajan nimi", SV: "*SV*Kirjoita ja valitse kustantajan nimi", EN: "*EN*Kirjoita ja valitse kustantajan nimi"}
      },
      julkaisunkustannuspaikka: {
        FI: "Julkaisun kustannuspaikka", SV: "Förlagsort", EN: "Place of publishing",
        tooltip: {
          FI: "Julkaisun kustantajan nimen yhteydessä ilmoitettu paikkakunta tai paikkakunnat.",
          SV: "Ort eller orter som angetts i anslutning till namnet på publikationens förläggare.",
          EN: "The place or places given in connection with the publication’s publisher."
        }
      },
      avainsanat: {
        FI: "Avainsanat", SV: "Nyckelord", EN: "Key words",
        tooltip: {
          FI: "Julkaisun sisältöä mahdollisimman hyvin kuvailevat avainsanat.",
          SV: "Nyckelord som så bra som möjligt beskriver publikationens innehåll.",
          EN: "Keywords that describe the content of the publication as accurately as possible."
        },
        lisaa: {FI: "+", SV: "+", EN: "+", tooltip: {FI: "Lisää", SV: "*SV*Lisää", EN: "*EN*Lisää"}},
        poista: {FI: "-", SV: "-", EN: "-", tooltip: {FI: "Poista", SV: "*SV*Poista", EN: "*EN*Poista"}}
      },
      julkaisunkieli: {
        FI: "Julkaisun kieli", SV: "Publikationens språk", EN: "Publication language",
        tooltip: {
          FI: "Kieli, jolla julkaisu on kirjoitettu Tilastokeskuksen kielet 2003 -luokituksen mukaisesti.",
          SV: "Det språk på vilket publikationen är skriven i enlighet med klassificeringen Statistikcentralens språk 2003.",
          EN: "The language used to write the publication according to the Lan-guages 2003 classification of Statistics Finland."
        },
        picktip: {FI: "Valitse kieli", SV: "*SV*Valitse kieli", EN: "*EN*Valitse kieli"}
      },
      julkaisunkansainvalisyys: {
        FI: "Julkaisun kansainvälisyys", SV: "Publikationens internationalitet", EN: "Internationality of publication",
        tooltip: {
          FI: "Kotimaisen julkaisun julkaisija on suomalainen tai se on ensisijaisesti julkaistu Suomessa. Kansainvälisen julkaisun julkaisija ei ole suomalainen ja se on ensisijaisesti julkaistu muualla kuin Suomessa. Huom. Konferenssijulkaisun julkaisijalla tarkoitetaan sen kustantajaa.",
          SV: "Utgivaren av en inhemsk publikation är finländsk eller publikationen har i första hand publicerats i Finland. Utgivaren av en utländsk publikation är inte finländsk eller publikationen har i första hand publicerats någon annanstans än i Finland. Utgivaren av en konferenspublikation avser förläggaren.",
          EN: "The publisher of a Finnish publication is Finnish, or it was mainly pub-lished in Finland. The publisher of an international publication is not Finnish, or it was mainly published outside Finland. The publisher of a conference publication refers to the publishing house."
        },
        '0': {FI: "Kotimainen", SV: "*SV*Kotimainen", EN: "*EN*Kotimainen"},
        '1': {FI: "Kansainvälinen", SV: "*SV*Kansainvälinen", EN: "*EN*Kansainvälinen"}
      },
      julkaisumaa: {
        FI: "Julkaisumaa", SV: "Utgivningsland", EN: "Country of publication",
        tooltip: {
          FI: "Julkaisumaa Tilastokeskuksen valtiot ja maat 2007 -luokituksen mukaisesti.",
          SV: "Tidskriftens, seriens, monografins eller moderpublikationens utgivningsland enligt klassificeringen Statistikcentralens stater och länder 2007.",
          EN: "Country of publication according to the countries 2007 classification of Statistics Finland."
        },
        picktip: {FI: "Valitse maa", SV: "*SV*Valitse maa", EN: "*EN*Valitse maa"}
      },
      julkaisuntieteenalat: {
        FI: "Julkaisun tieteenalat", SV: "Publikationens vetenskapsområde", EN: "Field of science of the publication",
        tooltip: {
          FI: "1-6 tieteenalaa Tilastokeskuksen tieteenalaluokituksen mukaan siinä järjestyksessä, mitä tieteenalaa julkaisu eniten koskee. Ensimmäinen, ns. ensisijainen tieteenala, on pakollinen tieto.",
          SV: "1–6 vetenskapsområden enligt Statistikcentralens klassificering av vetenskapsområden med det vetenskapsområde först som publikationen i första hand berör. Det första, s.k. primära, vetenskapsområdet måste anges.",
          EN: "One to six fields of science according to the field of science classification of Statistics Finland in the order of relevance of each field to the publication. The first, so-called primary field of science is mandatory."
        },
        lisaa: {FI: "+", SV: "+", EN: "+", tooltip: {FI: "Lisää", SV: "*SV*Lisää", EN: "*EN*Lisää"}},
        poista: {FI: "-", SV: "-", EN: "-", tooltip: {FI: "Poista", SV: "*SV*Poista", EN: "*EN*Poista"}},
        paa: {picktip: {FI: "Valitse päätieteenala", SV: "*SV*Valitse päätieteenala", EN: "*EN*Valitse päätieteenala"}},
        ala: {picktip: {FI: "Valitse alatieteenala", SV: "*SV*Valitse alatieteenala", EN: "*EN*Valitse alatieteenala"}}
      },
      kansainvalinenyhteisjulkaisu: {
        FI: "Kansainvälinen yhteisjulkaisu", SV: "Internationell sampublikation", EN: "International co-publication",
        tooltip: {
          FI: "Kansainvälisen yhteisjulkaisun tekijöistä vähintään yksi on affilioitunut muuhun kuin suomalaisen organisaatioon (myös jos tekijällä on affiliaatio sekä suomalainen että ulkomaalaiseen organisaatioon).",
          SV: "Minst en av den internationella sampublikationens upphovsmän har anknytning till en annan organisation än en finländsk (också om upphovsmannen har anknytning till både en finländsk och en utländsk organisation).",
          EN: "At least one author of the international co-publication is affiliated to a non-Finnish organisation (the author may also be affiliated to both a Finnish and foreign organisation)."
        },
        '1': {FI: "Kyllä", SV: "*SV*Kyllä", EN: "*EN*Kyllä"},
        '0': {FI: "Ei", SV: "*SV*Ei", EN: "*EN*Ei"}
      },
      yhteisjulkaisuyrityksenkanssa: {
        FI: "Yhteisjulkaisu yrityksen kanssa", SV: "Sampublikation med ett företag", EN: "Co-publication with a company",
        tooltip: {
          FI: "Julkaisun tekijöistä vähintään yksi on affilioitunut kansalliseen tai kansainväliseen yritykseen (myös jos tekijällä on affiliaatio sekä tutkimusorganisaatioon että yritykseen). Yrityksellä tarkoitetaan muita yrityksiä kuin valtio-omisteisia valtion erityistehtäviä toteuttavia yhtiöitä (esim. VTT).",
          SV: "Minst en av publikationens upphovsmän har anknytning till ett nationellt eller internationellt företag (också om upphovsmannen har anknytning till både en forskningsorganisation och ett företag.) Med ett företag avses andra företag än bolag som sköter statens specialuppgifter (t.ex. VTT).",
          EN: "At least one author of the publication is affiliated to a national or international company (the author may also be affiliated both to a research organisation and a company). Company refers to an enterprise other than a state-owned group carrying out specific government tasks (such as VTT Technical Research Centre of Finland Ltd)."
        },
        '1': {FI: "Kyllä", SV: "*SV*Kyllä", EN: "*EN*Kyllä"},
        '0': {FI: "Ei", SV: "*SV*Ei", EN: "*EN*Ei"}
      },
      doitunniste: {
        FI: "DOI tunniste", SV: "DOI-identifieringsnummer", EN: "DOI",
        tooltip: {
          FI: "Julkaisun DOI-tunniste, esim. http://dx.doi.org/10.1111/j.1398-9995.2011.02728.x",
          SV: "Publikationens DOI-identifieringsnummer, t.ex. http://dx.doi.org/10.1111/j.1398-9995.2011.02728.x",
          EN: "The DOI of the publication e.g. http://dx.doi.org/10.1111/j.1398-9995.2011.02728.x"
        }
      },
      pysyvaverkkoosoite: {
        FI: "Pysyvä verkko-osoite", SV: "Bestående webbadress", EN: "Permanent website address",
        tooltip: {
          FI: "Julkaisun pysyviin tunnisteisiin (esim. DOI, URN tai handle) perustuva verkko-osoite, joka vie suoraan julkaisun kokotekstiversioon (vapaasti saatavilla olevaan tai kustantajan palvelimella sijaitsevaan käyttöoikeudeltaan rajoitettuun versioon).",
          SV: "Webbadress som grundar sig på publikationens permanenta identifiering (t.ex. DOI, URN eller handle) och som leder direkt till publikationens kompletta textversion (fritt tillgängliga version eller en version med begränsad användarrätt på förläggarens server).",
          EN: "Website address based on permanent identifiers (e.g. DOI, URN or handle) of the publication that takes the user directly to the full text version of the publication (a publicly available version or a limited access version on the publisher's server)."
        }
      },
      avoinsaatavuus: {
        FI: "Avoin saatavuus", SV: "Fri tillgänglighet", EN: "Open access",
        tooltip: {
          FI: "",
          SV: "",
          EN: ""
        },
        '0': {FI: "Ei vastausta", SV: "*SV*Ei vastausta", EN: "*EN*Ei vastausta"},
        '1': {
          FI: "Open access -julkaisukanavassa ilmestynyt julkaisu",
          SV: "*SV*Open access -julkaisukanavassa ilmestynyt julkaisu",
          EN: "*EN*Open access -julkaisukanavassa ilmestynyt julkaisu",
          tooltip: {
            FI: "Julkaisukanavan kaikki julkaisut ovat avoimesti saatavilla.",
            SV: "Alla publikationer i publikationskanalen fritt tillgängliga.",
            EN: "All publications on the channel are openly accessible."
          }
        },
        '2': {
          FI: "Hybridijulkaisukanavassa ilmestynyt avoin julkaisu",
          SV: "*SV*Hybridijulkaisukanavassa ilmestynyt avoin julkaisu",
          EN: "*EN*Hybridijulkaisukanavassa ilmestynyt avoin julkaisu",
          tooltip: {
            FI: "Julkaisukanavassa on sekä avoimesti että ei-avoimesti saatavilla olevia julkaisuja.",
            SV: "Fritt tillgängliga och icke-fritt tillgängliga publikationer i publikationskanalen",
            EN: "The channel contains both open access and non-open access publications."
          }
        }
      },
      julkaisurinnakkaistallennettu: {
        FI: "Julkaisu rinnakkaistallennettu", SV: "Publikationens har lagrats parallellt", EN: "Self-archived publication",
        tooltip: {
          FI: "Julkaisu on rinnakkaistallennettu organisaatio- tai tieteenalakohtaiseen julkaisuarkistoon joko välittömästi tai kustantajan määrittämän kohtuullisen mittaisen embargoajan jälkeen. Julkaisu voi olla joko ns. kustantajan versio tai tutkijan oma viimeinen (vertaisarvioitu) versio.",
          SV: "Publikationen har lagrats parallellt i ett organisations- eller vetenskapsområdesspecifikt publikationsarkiv antingen omedelbart eller efter en rimlig embargotid som förläggaren har fastställt. Publikationen kan vara en s.k. förläggarversion eller forskarens egen, sista (referentgranskade) version.",
          EN: "The publication is self-archived in the publication archive of the organisation or the field of science, whether immediately or after a reasonable embargo specified by the publisher. The publication may be a so-called publisher’s version or the author’s final (refereed) version."
        },
        '1': {FI: "Kyllä", SV: "*SV*Kyllä", EN: "*EN*Kyllä"},
        '0': {FI: "Ei", SV: "*SV*Ei", EN: "*EN*Ei"},
      },
      rinnakkaistallennetunversionverkkoosoite: {
        FI: "Rinnakkaistallennetun version verkko-osoite",
        SV: "Den parallellt lagrade versionens webbadress",
        EN: "Website address of the self-archived version",
        tooltip: {
          FI: "Julkaisun organisaatio- tai tieteenalakohtaiseen julkaisuarkistoon rinnakkaistallennetun version verkko-osoite (esim. URN).",
          SV: "Webbadressen (t.ex. URN) på den version av publikationen som har lagrats parallellt i ett organisations- eller vetenskapsområdesspecifikt publikationsarkiv.",
          EN: "The website address of the self-archived version of the publication stored in the organisation- or field-specific archive (e.g. URN)."
        }
      },
      jufoid: {FI: "JUFO-ID", SV: "*SV*JUFO-ID", EN: "*EN*JUFO-ID"},
      jufoluokitus: {FI: "JUFO-luokitus", SV: "*SV*JUFO-luokitus", EN: "*EN*JUFO-luokitus"}
    },
    taytaviela: {
      FI: "Täytä vielä", SV: "*SV*Täytä vielä", EN: "*EN*Täytä vielä",
      korosta: {FI: "korosta", SV: "*SV*korosta", EN: "*EN*korosta"},
      poistakorostus: {FI: "poista korostus", SV: "*SV*poista korostus", EN: "*EN*poista korostus"}
    },
    jatka: {FI: "Tallenna muutokset ja siirry esikatseluun", SV: "*SV*Tallenna muutokset ja siirry esikatseluun", EN: "*EN*Tallenna muutokset ja siirry esikatseluun"},
    tallenna: {FI: "Tallenna tiedot ja palaa omiin tallennuksiin", SV: "*SV*Tallenna tiedot ja palaa omiin tallennuksiin", EN: "*EN*Tallenna tiedot ja palaa omiin tallennuksiin"},
    vaihevuo: {
      julkaisutyyppi: {FI: "Valitse julkaisutyyppi", SV: "Publikationstyp", EN: "Publication type"},
      haku: {FI: "Esitäytä tiedot", SV: "*SV*Esitäytä tiedot", EN: "*EN*Esitäytä tiedot"},
      tietojensyotto: {FI: "Syötä julkaisutiedot", SV: "*SV*Syötä julkaisutiedot", EN: "*EN*Syötä julkaisutiedot"},
      organisaationtekijat: {FI: "SYÖTÄ\nTEKIJÖIDEN TIEDOT", SV: "*SV*SYÖTÄ\nTEKIJÖIDEN TIEDOT", EN: "*EN*SYÖTÄ\nTEKIJÖIDEN TIEDOT"},
      tallennus: {FI: "Tarkista ja tallenna", SV: "*SV*Tarkista ja tallenna", EN: "*EN*Tarkista ja tallenna"}
    },
    yes: {FI: "Kyllä", SV: "Ja", EN: "Yes"},
    no: {FI: "Ei", SV: "Nej", EN: "No"}
  }
};

//export default i18n_fi;
