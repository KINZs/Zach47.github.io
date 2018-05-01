var jsonPlayerName = {};
var toplist = [];
var times = [];
var x = document.getElementById("uInput");
map = x.elements[0].value;

function getInput() {
  var x = document.getElementById("uInput");
  map = x.elements[0].value;
  limit = parseInt(x.elements[1].value) + 1;
  kztimerglobalUrl = "https://kztimerglobal.com/api/v1/records/top?map_name=" + map + "&tickrate=128&modes_list_string=kz_simple&limit=" + limit;
}


/* On page load, and random */
function getTop() {
  var toplist = [];
  var times = [];
  $.ajax({
    url: kztimerglobalUrl,
    dataType: "text",
    success: function(Map_info) {
      var data = $.parseJSON(Map_info);
      var j = 1;

      for(i=0;i<data.length;i++) {

        if (toplist.includes(jsonPlayerName[data[i].steam_id]) || toplist.includes(data[i].steam_id)) {
          continue;
        }

        var time = data[i].time;
        times.push(time);
        var steamid = (data[i].steam_id).split(":");
        var steam64 = BigInteger(steamid[2]);
        var steam64 = BigInteger(steam64.multiply(2).toString());
        if (steamid[1] === "1") {
          steammath = BigInteger('76561197960265729');
        } else {
          steammath = BigInteger('76561197960265728');
        }





        SteamLink = "http://steamcommunity.com/profiles/" + steam64.add(steammath).toString()

        if (jsonPlayerName[data[i].steam_id] === undefined) {
          toplist.push(data[i].steam_id);
          $("#addToThis").append("<span style='color: white;'>" + j + "." + data[i].steam_id + " " + timeConvert(time) + "</span>" + "<br>" + "<br>");
          j++;
        } else {
          toplist.push(jsonPlayerName[data[i].steam_id]);
          $("#addToThis").append("<span style='color: white;'>" + j + "." + jsonPlayerName[data[i].steam_id] + " " + timeConvert(time) + "</span>" + "<br>" + "<br>");
          j++;
        }
      }
    }
  });

  var trace1 = {
    x: times.length,
  	y: times,
    name: 'spline',
    type: 'scatter'
};


var data = [ trace1 ];

var layout = {
  title:'Top Times on ' + map,
  xaxis: {
    title: 'Position',
  },
  yaxis: {
    title: 'Time (in seconds)',
    showline: false
  },
  hoverlabel: {
    bgcolor: 'pink'
  }
};

Plotly.newPlot('TopTimesGraph', data, layout);
}




/* https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript */
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds */
function str_pad_left(string,pad,length) {
  return (new Array(length+1).join(pad)+string).slice(-length);
}


function timeConvert(time) {
  if (time >= 3600) {
    hours = Math.floor(time / 3600);
    minutes = Math.floor(time % 3600 /60);
    seconds = Math.floor(time % 60);
    return str_pad_left(hours, '0',2)+':'+str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
  }
  else if (time === "NA") {
    return "NA";
  }
  else {
    minutes = Math.floor(time % 3600 /60);
    seconds = Math.floor(time % 60);
    return str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
  }
}



$(document).ready(function(){

  $.ajax({
    url: "../js/steamId.js",
    success: function(player) {
      data = JSON.parse(player);
      data[0].players.forEach(function (playerInfo) {
        jsonPlayerName[playerInfo.steam_id] = playerInfo.name;
      });
    }});
  });
