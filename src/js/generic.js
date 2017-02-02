// Opintopolku / Koodisto Service:
function getLanguageSpecificValue(fieldArray, fieldName, language) {
  if (fieldArray) {
    for (var i = 0; i < fieldArray.length; i++) {
      if (fieldArray[i].kieli === language) {
        var result = eval("fieldArray[i]." + fieldName);
        return result == null ? "" : result;
      }
    }
  }
  return "";
}
function getLanguageSpecificValueOrValidValue(fieldArray, fieldName, language) {
  var specificValue = getLanguageSpecificValue(fieldArray, fieldName, language);

  if (specificValue == "" && language != "FI"){
    specificValue = getLanguageSpecificValue(fieldArray, fieldName, "FI");
  }
  if (specificValue == "" && language != "SV"){
    specificValue = getLanguageSpecificValue(fieldArray, fieldName, "SV");
  }
  if (specificValue == "" && language != "EN"){
    specificValue = getLanguageSpecificValue(fieldArray, fieldName, "EN");
  }
  return specificValue;
}

// other helping stuff
function htmlEscape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function htmlUnescape(str){
  return str
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

// Credits: http://stackoverflow.com/a/979325
var sort_by = function(field, reverse, primer){
    var key = primer ?
    function(x) {return primer(x[field])} :
    function(x) {return x[field]};
    reverse = !reverse ? 1 : -1;
    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}

// Credits: http://stackoverflow.com/a/951492
var isArray = function(what) {
  return Object.prototype.toString.call(what) === '[object Array]';
}

// Credits: http://stackoverflow.com/a/979995
var QueryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}();
