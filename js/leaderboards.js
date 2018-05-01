let jsonMapId = {};
let maplist = [];
let mostRecentTopTimes = [];
let usedTopTimes = [];
let mostRecentTopTimesFiltered = [];
let simplekzwrs = 'https://kztimerglobal.com/api/v1.0/records/top/recent?modes_list_string=kz_simple&place_top_at_least=1&has_teleports=false&stage=0&limit=5000';
let vanillawrs = 'https://kztimerglobal.com/api/v1.0/records/top/recent?modes_list_string=kz_vanilla&place_top_at_least=1&has_teleports=false&stage=0&limit=5000';
let kztimerwrs = 'https://kztimerglobal.com/api/v1.0/records/top/recent?modes_list_string=kz_timer&place_top_at_least=1&has_teleports=false&stage=0&limit=5000';


function sortArray(array) {
  array.sort(function(a,b){
    return Date.parse(b.updated_on) - Date.parse(a.updated_on)
  });
  return array;
}

/* https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds */
function str_pad_left(string,pad,length) {
  return (new Array(length+1).join(pad)+string).slice(-length);
}

function timeConvert(time) {
  ms = time.toString().split(".");
  // API sends a time that ends with ".000" as just a whole number (Discovery: 12.000 is sent as 12). This fixes that.
  if (!ms[1]) {
    ms[1] = "000";
  }
  if (ms[1].length === 1) {
    ms[1] += "0";
  }
  if (time >= 3600.00) {
    hours = Math.floor(time / 3600.00);
    minutes = Math.floor(time % 3600.00 /60.00);
    seconds = Math.floor(time % 60.00);
    return str_pad_left(hours,'',2)+':'+str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2) +'.'+ ms[1].substr(0,2);
  }
  else if (time === "NA") {
    return "NA";
  }
  else if (time < 60) {
    seconds = Math.floor(time % 60.00);
    return str_pad_left(seconds,'0',2)+"."+ms[1].substr(0,2);
  }
  else {
    minutes = Math.floor(time % 3600.00 /60.00);
    seconds = Math.floor(time % 60.00);
    return str_pad_left(minutes,'',2)+':'+str_pad_left(seconds,'0',2)+'.'+ ms[1].substr(0,2); // "time" is milliseconds
  }
}

function test(url) {
  $("tbody tr").remove();
  $.ajax({
    url: url,
    success: function(recordsTop) {
      document.getElementById("SimpleKZLeaderboards").style.display === "flex";
      console.log(maplist.length);

      mostRecentTopTimes = [];
      usedTopTimes = [];
      mostRecentTopTimesFiltered = [];

      for(i=0;i<recordsTop.length;i++) {
        if (recordsTop[i].map_id in jsonMapId) {
          mostRecentTopTimes.push(recordsTop[i]);
        }
      }

      for (i=0;i<mostRecentTopTimes.length;i++) {
        if (usedTopTimes.includes(mostRecentTopTimes[i].map_id)) {
          continue;
        }
        mostRecentTopTimesFiltered.push(mostRecentTopTimes[i]);
        usedTopTimes.push(mostRecentTopTimes[i].map_id);
      }
      mostRecentTopTimesFiltered = sortArray(mostRecentTopTimesFiltered);

      let arrayPlayers = [];
      let records = [];
      for (i=0;i<mostRecentTopTimesFiltered.length;i++) {
        if (!arrayPlayers.includes(mostRecentTopTimesFiltered[i].player_name)) {
          arrayPlayers.push(mostRecentTopTimesFiltered[i].player_name);
          records.push({'name': mostRecentTopTimesFiltered[i].player_name, 'steam_id': mostRecentTopTimesFiltered[i].steam_id});
        }
      }

      let arrayPlayersWRs = [];
      let usedNames = [];
      let countTotal = 0;

      for (i=0;i<arrayPlayers.length;i++) {
        let count = 0;
        let blankarray = [];

        for (j=0;j<mostRecentTopTimesFiltered.length;j++) {
          if (arrayPlayers[i].includes(mostRecentTopTimesFiltered[j].player_name) && !usedNames.includes(mostRecentTopTimesFiltered[j].player_name)) {
            countTotal++;
            count++;
            blankarray.push({'map': jsonMapId[mostRecentTopTimesFiltered[j].map_id][0], 'time': timeConvert(mostRecentTopTimesFiltered[j].time)});
          }
        }
        usedNames.push(records[i].name);

        arrayPlayersWRs.push({'name': records[i].name, 'steam_id': records[i].steam_id, 'world_records': count, 'on maps': blankarray});

      }
      console.log(sortWorldRecords(arrayPlayersWRs));
      for (i=0;i<arrayPlayersWRs.length;i++) {
        let row = document.getElementById("SKZTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);

        cell1.innerHTML = arrayPlayersWRs[i].name;
        cell2.innerHTML = arrayPlayersWRs[i].world_records;
      }
      console.log(countTotal);
    }
  });
}

function sortWorldRecords(array) {
  array.sort(function(a,b){
    return (b.world_records) - (a.world_records)
  });
  return array;
}

$(document).ready(function(){
  $.ajax({
    url: "../js/mapListNew.js",
    dataType: "text",
    success: function(Map_info) {

      data = JSON.parse(Map_info);
      data.forEach(function (Map_info) {
        if (Map_info.Global === "0") {
          return;
        }
        else if (Map_info.id === undefined) {
          return;
        }
        else {
          jsonMapId[Map_info.id] = [Map_info.mapname,Map_info.workshop_id];
          maplist.push(jsonMapId[Map_info.id][0]);
        }
      });
    }});
});
