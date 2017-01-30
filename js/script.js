window.onload=function(){

//  var protocol = "http://"
//  var protocol = "//"
  var protocol = "https://"



//  var server = "localhost"
//  var port = "5000"
//  var baseUrl = protocol + server + ":" + port
  var server = "46.101.149.90"
  var baseUrl = protocol + server
  var language = "finnish"
  var mos = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
  var languages = [
    {language: "finnish", icon: "images/Flag_of_Finland.svg.png"},
    {language: "swedish", icon: "images/Flag_of_Sweden.svg.png"},
    {language: "english", icon: "images/320px-Flag_of_the_United_Kingdom.svg.png"}
  ]

  var contentText = {
    "finnish" : {
      "introduction" : "Turun päivittäisen siitepölypitoisuden visualisointi.",
      "monthsNames" : {
        0: "tammi", 1: "helmi", 2: "maalis", 3: "huhti",
        4: "touko", 5: "kesä", 6: "heinä", 7: "elo",
        8: "syys", 9: "loka", 10: "marras", 11: "joulu",
      },
      daysNames: {
        0: "sun", 1: "maa", 2: "tis", 3: "kes",
        4: "tor", 5: "per", 6: "lau",
      }
    },
    "english" : {
      "introduction": "Visualisation of the daily pollen concentration in Turku.",
      "monthsNames" : {
        0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr",
        4: "May", 5: "Jun", 6: "Jul", 7: "Aug",
        8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec",
      },
      daysNames: {
        0: "Sun", 1: "Mon", 2: "Tue", 3: "Wed",
        4: "Thu", 5: "Fri", 6: "Sat",
      }
    },
    "swedish" : {
      "introduction" : "Visualisering av den dagliga pollenkoncentrationen i Åbo",
      "monthsNames" : {
        0: "jan", 1: "feb", 2: "mar", 3: "apr",
        4: "may", 5: "jun", 6: "jul", 7: "aug",
        8: "sep", 9: "oct", 10: "nov", 11: "dec",
      },
      daysNames: {
        0: "sön", 1: "mån", 2: "tis", 3: "ons",
        4: "tor", 5: "fre",6: "lör",
      }
    }
  }




// pitoisuudet korkea, keski, alhainen, ytheismitallisia eri lajikkeiden kesken, suhteutus
// säätiedot, kosteus, lämpötila
// prediktiot?
// alkuun selite mitä voi tehdä, mitä saa irti, miten käyttää

// later - kuvia lehdistä



  var pollenSpecies = [{"short": "Aln", "genus": "Alnus", "finnish": "leppä", "swedish": "al", "english": "alder", "wikipedia_fi": "https://fi.wikipedia.org/wiki/Lep%C3%A4t", "wikipedia_se": "https://sv.wikipedia.org/wiki/Alsl%C3%A4ktet", "wikipedia_en": "https://en.wikipedia.org/wiki/Alder", "wikimedia": "https://commons.wikimedia.org/wiki/Category:Alnus"},
                       {"short": "Bet", "genus": "Betula", "finnish": "koivu", "swedish": "björk", "english": "birch", "wikipedia_fi": "https://fi.wikipedia.org/wiki/Koivut", "wikipedia_se": "https://sv.wikipedia.org/wiki/Bj%C3%B6rkar", "wikipedia_en": "https://en.wikipedia.org/wiki/Birch", "wikimedia": "https://commons.wikimedia.org/wiki/Betula"},
                       {"short": "Art", "genus": "Artemisia", "finnish": "pujo", "swedish": "gråbo", "english": "mugwort", "wikipedia_fi": "https://fi.wikipedia.org/wiki/Pujo", "wikipedia_se": "https://sv.wikipedia.org/wiki/Gr%C3%A5bo", "wikipedia_en": "https://en.wikipedia.org/wiki/Artemisia_vulgaris"},
                       {"short": "Poa", "genus": "Poaceae", "finnish": "heinä", "swedish": "gräs", "english": "grasses", "wikipedia_fi": "https://fi.wikipedia.org/wiki/Hein%C3%A4kasvit", "wikipedia_se": "https://sv.wikipedia.org/wiki/Gr%C3%A4s", "wikipedia_en": "https://en.wikipedia.org/wiki/Poaceae"},
                       {"short": "Che", "genus": "Chenopodium", "finnish": "savikka", "swedish": "ogräsmållor", "english": "goosefoots", "wikipedia_fi": "https://fi.wikipedia.org/wiki/Savikat", "wikipedia_se": "https://sv.wikipedia.org/wiki/Ogr%C3%A4sm%C3%A5llor", "wikipedia_en": "https://en.wikipedia.org/wiki/Chenopodium"},
                       {"short": "Cor", "genus": "Corylus", "finnish": "pähkinäpensas", "swedish": "hassel", "english": "hazel", "wikipedia_fi": "https://fi.wikipedia.org/wiki/P%C3%A4hkin%C3%A4pensaat", "wikipedia_se": "https://sv.wikipedia.org/wiki/Hasselsl%C3%A4ktet", "wikipedia_en": "https://en.wikipedia.org/wiki/Hazel"},
//    in db                   {"short": "Jun", "finnish": "", "swedish": "", "wikipedia_fi": "", "wikipedia_se": "", "wikipedia_en": ""},
                       {"short": "Pic", "genus": "Picea", "finnish": "kuusi", "swedish": "gran", "english": "spruce", "wikipedia_fi": "https://fi.wikipedia.org/wiki/Kuuset", "wikipedia_se": "https://sv.wikipedia.org/wiki/Gran", "wikipedia_en": "https://en.wikipedia.org/wiki/Spruce"},
                       {"short": "Pin", "genus": "Pinus", "finnish": "mänty", "swedish": "tall", "english": "scots pine", "wikipedia_fi": "https://fi.wikipedia.org/wiki/M%C3%A4nty", "wikipedia_se": "https://sv.wikipedia.org/wiki/Tall", "wikipedia_en": "https://en.wikipedia.org/wiki/Scots_pine"},
                       {"short": "Pop", "genus": "Populus ", "finnish": "haapa, poppeli", "swedish": "poppel", "english": "populus", "wikipedia_fi": "https://fi.wikipedia.org/wiki/Populus", "wikipedia_se": "https://sv.wikipedia.org/wiki/Poppelsl%C3%A4ktet", "wikipedia_en": "https://en.wikipedia.org/wiki/Populus"},
                       {"short": "Que", "genus": "Quercus", "finnish": "tammi", "swedish": "ek", "english": "oak", "wikipedia_fi": "https://fi.wikipedia.org/wiki/Tammi", "wikipedia_se": "https://sv.wikipedia.org/wiki/Ek", "wikipedia_en": "https://en.wikipedia.org/wiki/Quercus_robur"},
             //       {"short": "Rum", "genus": "Rumex", "finnish": "hierakka, suolaheinä", "swedish": "skräppa", "english": "rumex", "wikipedia_fi": "https://fi.wikipedia.org/wiki/Hierakat", "wikipedia_se": "https://sv.wikipedia.org/wiki/Skr%C3%A4ppsl%C3%A4ktet", "wikipedia_en": "https://en.wikipedia.org/wiki/Rumex"},
                       {"short": "Sal", "genus": "Salix", "finnish": "paju", "swedish": "vide, pil", "english": "willow", "wikipedia_fi": "https://fi.wikipedia.org/wiki/Pajut", "wikipedia_se": "https://sv.wikipedia.org/wiki/Videsl%C3%A4ktet", "wikipedia_en": "https://en.wikipedia.org/wiki/Willow"},
                       {"short": "Ulm", "genus": "Ulmus", "finnish": "jalava", "swedish": "alm", "english": "elm", "wikipedia_fi": "https://fi.wikipedia.org/wiki/Jalavat", "wikipedia_se": "https://sv.wikipedia.org/wiki/Almsl%C3%A4ktet", "wikipedia_en": "https://en.wikipedia.org/wiki/Elm"},
                       {"short": "Urt", "genus": "Urtica", "finnish": "nokkonen", "swedish": "brännässla", "english": "nettle", "wikipedia_fi": "https://fi.wikipedia.org/wiki/Nokkonen", "wikipedia_se": "https://sv.wikipedia.org/wiki/Br%C3%A4nn%C3%A4ssla", "wikipedia_en": "https://en.wikipedia.org/wiki/Urtica_dioica"}
//                       {"short": "Fer", "wikipedia_fi": "", "wikipedia_se": "", "wikipedia_en": ""},
//                       {"short": "Cla", "wikipedia_fi": "", "wikipedia_se": "", "wikipedia_en": ""},
//                       {"short": "Alt", "wikipedia_fi": "", "wikipedia_se": "", "wikipedia_en": ""}
                     ]


  function initialisePage(){
    fillPollencontainer()
  }

  function setText(){

  }
  // fix this
  function createLanguageMenu(){
    var dropDownContainer = document.getElementById('language')
    for(var i = 0; i < languages.length; i++){
      var languageDiv = document.createElement('div')
      languageDiv.innerHTML = "<src=" + languages[i]['icon'] + ">"
      languageDiv.setAttribute('class', languages[i]['language'])
      dropDownContainer.appendChild(languageDiv)
    }
  }



  createLanguageMenu()

  function fillPollencontainer(){
    var pollencontainer = document.getElementById('pollen-container')
    for(var i = 0; i < pollenSpecies.length; i++){
      var pollenSpeciesDiv = document.createElement('div')
      pollenSpeciesDiv.innerHTML = pollenSpecies[i][language];
      pollenSpeciesDiv.setAttribute('id', pollenSpecies[i]['short'])
      pollenSpeciesDiv.setAttribute('class', pollenSpecies[i]['short'] + " pollen-species")


//      pollenSpeciesDiv.setAttribute('onclick', 'pollenClicked(this)')
//      pollenSpeciesDiv.onClick = pollenClicked;
      pollencontainer.appendChild(pollenSpeciesDiv)
      document.getElementById(pollenSpecies[i]['short']).addEventListener("click", pollenClicked, false);
    }
  }
 // set the start date for the datepicker
 // month indexing starts from 0
 // date indexing starts from 1
  var startDate = new Date(2003, 2, 1)
  var endDate = new Date(2003, 8, 31)

  initialisePage();

  // set the initial date



  //var startDatePicker =
  /*

  $(function () {
//  mobiscroll.date('#start-datepicker',{
mobiscroll.scroller('#start-datepicker', {
  theme: 'mobiscroll-dark',
  display: 'inline',
  language: 'en',
  wheels:[
    [{
      label: 'Days',
      data: ['Mon', 'Tue', 'Wed']
    },
    {
      label: 'Months',
      data: [
        {value: 1, display: 'January'},
        {value: 2, display: 'February'},
        {value: 3, display: 'March'},
        {value: 4, display: 'April'},
        {value: 5, display: 'May'}
      ]
    }
  ]
  ]
})

})
*/

// works
/*
$(function(){
    $('#date').combodate();
});
*/


var startDatepicker = new MtrDatepicker({
      target: "start-datepicker",
      targetElement: null,
      timestamp: startDate,
      defaultValues: {
        dates:        [],
        datesNames:   [],
        months:       [],
        monthsNames:  [],
        years:        [],
      },
      months: {
        min: 0,
        max: 11,
        step: 1,
        maxlength: 2
      },
      years: {
        min: 1974,
        max: 2013,
        step: 1,
        maxlength: 4
      },
      animations: true,
      format: 'DD.MM.YYYY',
      future: false,
      transitionDelay: 100,
      references: { // Used to store references to the main elements
        hours: null
      },
      monthsNames: contentText[language]["monthsNames"],
      daysNames: contentText[language]["daysNames"]
    });
    startDatepicker.monthsNames = contentText[language]["monthsNames"]


    var endDatepicker = new MtrDatepicker({
      target: "end-datepicker",
      targetElement: null,
      timestamp: endDate,
      defaultValues: {
        dates:        [],
        datesNames:   [],
        months:       [],
        years:        [],
      },
      minutes: {
      min: 0,
      max: 50,
      step: 10
    },
      days: {
        min: 1,
        max: 31,
        step: 1,
        maxlength: 1
      },
      months: {
        min: 0,
        max: 11,
        step: 1,
        maxlength: 2
      },
      years: {
        min: 1974,
        max: 2013,
        step: 1,
        maxlength: 4
      },
      animations: true,
      format: 'DD.MM.YYYY',
      future: false,
      transitionDelay: 100,
      references: { // Used to store references to the main elements
        hours: null
      },
      "monthsNames": contentText[language]["monthsNames"],
      daysNames: contentText[language]["daysNames"]
    });

//    endDatepicker.monthsNames = contentText[language]["monthsNames"]

  var startDatepickerElement = $('#start-datepicker');
  var endDatepickerElement = $('#end-datepicker');





  var clickedPollenList = []

  function pollenClicked(el){
    if(!_.contains(clickedPollenList, el.target.id)){
      document.getElementById(el.target.id).setAttribute('class', el.target.id + ' pollen-species clicked-pollen')
      clickedPollenList.push(el.target.id)
      var startString = startDatepicker.format('YYYY-MM-DD');
      var endString = endDatepicker.format('YYYY-MM-DD');
      getTimeData(startString, endString, clickedPollenList);
    }
    else{
      document.getElementById(el.target.id).setAttribute('class', el.target.id + ' pollen-species')
      clickedPollenList = _.without(clickedPollenList, el.target.id)
      var startString = startDatepicker.format('YYYY-MM-DD');
      var endString = endDatepicker.format('YYYY-MM-DD');
      getTimeData(startString, endString, clickedPollenList);
    }
//    console.log(clickedPollenList)
//    console.log(clickedPollenList.join(","))
  }


/*
  function getDatepickerTimeInterval(startelement, startpicker, endelement, endpicker){
    startString = startpicker.format('YYYY-MM-DD');
    endString = endpicker.format('YYYY-MM-DD');
    //  console.log(result);
    getTimeData(startString, endString, clickedPollenList);
  }

  startDatepicker.onChange('all', function(){
    getDatepickerTimeInterval(startDatepickerElement, startDatepicker, endDatepickerElement, endDatepicker);
  });

  endDatepicker.onChange('all', function(){
    getDatepickerTimeInterval(startDatepickerElement, startDatepicker, endDatepickerElement, endDatepicker);
  });
*/
function createGraph(valueField){
  var title;
  for(var i = 0; i < pollenSpecies.length; i++){
    if(pollenSpecies[i].short === valueField){
        title = pollenSpecies[i][language]; // language is a global variable
      break;
    }
  }

  return {"valueField": valueField,
          "bullet": "round",
          "balloonText": title + ": [[value]]",
          "title": title}
}



  function drawChart(data){
    var graphs = []  // initialize array for graphs
    var ks = Object.keys(data[0]) // get keys in object
//    console.log(ks)

    for(var i = 0; i < ks.length; i++){
      if(ks[i].length < 4){ // only want keys shorter than 4 characters (pollen is 3)
//        console.log(ks[i])
        graphs.push(createGraph(ks[i], "english"))
      }
    }

    var chart = AmCharts.makeChart("chartdiv", {
      "type": "serial",
      "theme": "light",
      "responsive": {
        "enabled": true
      },
      "language": "fi",
      "dataDateFormat": "YYYY-MM-DD",
      "categoryField": "Date",
      "categoryAxis": {
          "parseDates": true,
          "dashLength": 1,
          "minorGridEnabled": true
      },
      "valueAxes": [{
          "id": "v1",
          "axisAlpha": 0,
          "position": "left",
          "integersOnly": true,
          "ignoreAxisWidth":false,
          "title": "pitoisuus"
      }],
      "chartScrollbar": {
        "offset":30,
        "oppositeAxis":true,
        "scrollbarHeight": 50,
                "backgroundAlpha": 0,
                "selectedBackgroundAlpha": 0.1,
                "selectedBackgroundColor": "#888888",
                "graphFillAlpha": 0,
                "graphLineAlpha": 0.5,
                "selectedGraphFillAlpha": 0,
                "selectedGraphLineAlpha": 1,
                "autoGridCount":true,
                "color":"#AAAAAA"
      },
     "chartCursor": {
       "cursorPosition": "mouse"
     },
     "legend": {
       "useGraphSettings": true
     },
     "dataProvider": data,
     "graphs": graphs
  });

  }



  function getTimeData(start, end, pollenSpecies){
    if(pollenSpecies.length === 0){
      return
    }
    var url = baseUrl + "/api/query?start=" + start + "&end=" + end + "&species=" + pollenSpecies.join(",");
    console.log(url)

    var counts = {}
    var dates = []
    $.get(url, function(data){
      var data = data.data;
      drawChart(data)
//      console.log(data);


/*
      for(var i = 0; i < data.length; i++){
        dates.push(data[i]['month'])
        for(var property in data[i].pollenAmounts){
          // data[i][property] -> [object Object]
          // data[i].property -> undefined
          if(typeof counts[property] == 'undefined'){
            counts[String(property)] = []
          }
          counts[String(property)].push(data[i]['pollenAmounts'][property]);
        }
      }
      counts['timestamps'] = dates;
*/

    })
    return counts;
  }

  function getTimeData2(start, end){
    var url = baseUrl + "/api/query?start=" + start + "&end=" + end;
    var counts = {}
    var dates = []
    $.get(url, function(data){
//      console.log(data);

/*      var data = data.data;
      var d = {};
      for(var i = 0; i < data.length; i++){
        for(var property in data[i].pollenAmounts){
        }
      }
*/



    });
  }


}
