var jsonMapId = {};
var maplist = [];
var mostRecentTimes = [];
var mostRecentTopTimes = [];
var usedTopTimes = [];
var mostRecentTopTimesFiltered = [];
var kztimerglobalUrl = "https://kztimerglobal.com/api/v1/records/top?map_name=";
var mapname = "";
const kz_simpleRecords = "https://kztimerglobal.com/api/v1.0/records/top/recent?stage=0&tickrate=128&modes_list_string=kz_simple&limit=100";
const kz_timerRecords = "https://kztimerglobal.com/api/v1.0/records/top/recent?stage=0&tickrate=128&modes_list_string=kz_timer&limit=100";
const kz_vanillaRecords = "https://kztimerglobal.com/api/v1.0/records/top/recent?stage=0&tickrate=128&modes_list_string=kz_vanilla&limit=100";
const kz_simpleTopRecords = "https://kztimerglobal.com/api/v1.0/records/top?tickrate=128&stage=0&modes_list_string=kz_simple&has_teleports=false&limit=10000";
const kz_timerTopRecords = "https://kztimerglobal.com/api/v1.0/records/top?tickrate=128&stage=0&modes_list_string=kz_timer&has_teleports=false&limit=10000";
const kz_vanillaTopRecords = "https://kztimerglobal.com/api/v1.0/records/top?tickrate=128&stage=0&modes_list_string=kz_vanilla&has_teleports=false&limit=10000";

// These are to not be used until the API resolves the issue with missing records/times.
//var kz_simpleTopRecords = "https://kztimerglobal.com/api/v1.0/records/top/recent?stage=0&modes_list_string=kz_simple&place_top_at_least=1&place_top_overall_at_least=1&has_teleports=false";
//var kz_timerTopRecords = "https://kztimerglobal.com/api/v1.0/records/top/recent?stage=0&modes_list_string=kz_timer&place_top_at_least=1&place_top_overall_at_least=1&has_teleports=false";
//var kz_vanillaTopRecords = "https://kztimerglobal.com/api/v1.0/records/top/recent?stage=0&modes_list_string=kz_vanilla&place_top_at_least=1&place_top_overall_at_least=1&has_teleports=false";
const kz_simpleLoadMap = "https://kztimerglobal.com/api/v1/records/top?modes_list_string=kz_simple";
const kz_timerLoadMap = "https://kztimerglobal.com/api/v1/records/top?modes_list_string=kz_timer";
const kz_vanillaLoadMap = "https://kztimerglobal.com/api/v1/records/top?modes_list_string=kz_vanilla";
var kz_loadmap;
var recordsUrl;
var recordsTopUrl;
var currentpage = 0;
var currentmode;

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

function getPlayerInfo(url) {
  $.ajax({
    url: url,
    success: function(playerInfo) {
      console.log(playerInfo[0].player_name + " has " + playerInfo.length + " " + currentmode + " records");
      for (i=0;i<playerInfo.length;i++) {
        console.log(jsonMapId[playerInfo[i].map_id][0] + " | " + timeConvert(playerInfo[i].time));
      }
    }
  });
}



function loadMap(map) {
  document.getElementById("pagination").style.display = "none";
  searchMapName = map.toLowerCase();
  $("#searchMap").val(searchMapName);
  if ($("#searchMap").val().length > 0) {

    for (i=0;i<maplist.length;i++) {
      if (maplist[i].includes(searchMapName)) {
        searchMapName = maplist[i];
        $("#searchMap").val(searchMapName);
        break;
      }
    }
    var searchUrlPro = kz_loadmap + "&map_name=" + searchMapName + "&stage=0&has_teleports=false&limit=20&tickrate=128";
    var searchUrlTP = kz_loadmap + "&map_name=" + searchMapName + "&stage=0&limit=20&tickrate=128";
    $.ajax({
      url: searchUrlPro,
      success: function(mapPro) {
        var position = 0;
        $("#PROMapTimesAjax").html("");
        for (i=0;i<maplist.length;i++) {
          if (maplist[i].includes(searchMapName)) {
            searchMapName = maplist[i];
            break;
          }
        }
        if (mapPro.length === 0) {
          $("#PROMapTimesAjax").append("<span id='errorMessage' style='color: white;'>" + "No records recorded.</span>");
          return;
        }
        for (i=0;i<mapPro.length;i++) {
          if (jsonMapId[mapPro[i].map_id][0] !== searchMapName) {
            $("#PROMapTimesAjax").append("<span id='errorMessage' style='color: white;'>" + "Invalid map name.</span>");
            break;
          }
          position++;
          // If name is longer than 20, but not longer than 23, length = 17 + ...
          // If name is longer than 23, length = 15 + ...
          console.log(mapPro[i]);
          if (mapPro[i].player_name.toString().length > 20) {
            if (mapPro[i].player_name.toString().length > 23) {
              playerName = mapPro[i].player_name.substr(0,15) + "...";
            } else { playerName = mapPro[i].player_name.substr(0,17) + "..."; }
          } else { playerName = mapPro[i].player_name; }

          const $player_div = $("<div>", {id: mapPro[i].steam_id, "class": "map_record"});

          $player_div.append("<span class='map_record' id=" + mapPro[i].steam_id + " style='color: #E45051;'>" + "#" + position + "<span style='color: white;'> | " + "</span>" + timeConvert(mapPro[i].time) + "<span style='color: white;'> " + playerName + "<br>");

          $player_div.click(function(event){
            if (event.target.parentNode.id.includes("STEAM_")) {
              $("#searchMap").val(event.target.parentNode.id);
              //getPlayerInfo("http://kztimerglobal.com/api/v1.0/records/top?steam_id=" + event.target.parentNode.id + "&tickrate=128&stage=0&modes_list_string=" + currentmode + "&has_teleports=false");
              getPlayerInfo("http://kztimerglobal.com/api/v1.0/records/top/recent?steam_id=" + event.target.parentNode.id + "&tickrate=128&stage=0&modes_list_string=" + currentmode + "&place_top_at_least=1&place_top_overall_at_least=1&has_teleports=false");
            }
          });

          $("#PROMapTimesAjax").append($player_div);

        }
      }
    });

    $.ajax({
      url: searchUrlTP,
      success: function(mapTP) {
        var position = 0;
        $("#TPMapTimesAjax").html("");
        if (mapTP.length === 0) {
          $("#TPMapTimesAjax").append("<span id='errorMessage' style='color: white;'>" + "No records recorded.</span>");
          return;
        }
        for (i=0;i<mapTP.length;i++) {
          if (jsonMapId[mapTP[i].map_id][0] !== searchMapName) {
            $("#TPMapTimesAjax").append("<span id='errorMessage' style='color: white;'>" + "Invalid map name.</span>");
            break;
          }
          position++;
          // If name is longer than 20, but not longer than 23, length = 17 + ...
          // If name is longer than 23, length = 15 + ...
          if (mapTP[i].player_name.toString().length > 20) {
            if (mapTP[i].player_name.toString().length > 23) {
              playerName = mapTP[i].player_name.substr(0,15) + "...";
            } else { playerName = mapTP[i].player_name.substr(0,17) + "..."; }
          } else { playerName = mapTP[i].player_name; }

          const $player_div = $("<div>", {id: mapTP[i].steam_id, "class": "map_record"});

          $player_div.append("<span class='map_record' id=" + mapTP[i].steam_id + " style='color: #E45051;'><span>" + "#" + position + "</span><span style='color: white;'> | " + "</span><span>" + timeConvert(mapTP[i].time) + "</span><span style='color: white;'> " + playerName + "<span style='color: #E45051;'> (</span><span style='color: white;'>" + mapTP[i].teleports + (mapTP[i].teleports === 1 ? " TP" : " TPs") + "</span><span style='color: #E45051;'>)</span>" + "<br>");

          $player_div.click(function(event){
            if (event.target.parentNode.id.includes("STEAM_")) {
              $("#searchMap").val(event.target.parentNode.id);
              //getPlayerInfo("http://kztimerglobal.com/api/v1.0/records/top?steam_id=" + event.target.parentNode.id + "&tickrate=128&stage=0&modes_list_string=" + currentmode + "&has_teleports=false");
              getPlayerInfo("http://kztimerglobal.com/api/v1.0/records/top/recent?steam_id=" + event.target.parentNode.id + "&tickrate=128&stage=0&modes_list_string=" + currentmode + "&place_top_at_least=1&place_top_overall_at_least=1&has_teleports=false");

            }
          });

          $("#TPMapTimesAjax").append($player_div);
        }
        document.getElementById("displayTimes").style.display = "none";
        document.getElementById("displayMapTimes").style.display = "flex";
      }
    });
  }
}








function recentAndLatest() {
  document.getElementById("pagination").style.display = "flex";
  $.ajax({
    url: recordsUrl,
    success: function(records) {

      // Creates a new array and then runs a for loop getting the most recent times (stops at 20)
      // Why does it stop at 20? Because the ajax request has a set limit of 20.
      mostRecentTimes = [];
      for(i=0;i<records.length;i++) {
        if (records[i].map_id in jsonMapId) {
          mostRecentTimes.push(records[i]);
        }
      }

      // It then sorts the array of times so that they're in order by time.
      mostRecentTimes = sortArray(mostRecentTimes);

      // Gives us all the informmation we need for a record (image, player, map, time) and formats it into a div.
      for (i=0;i<5;i++) {
        // This is a fail safe and should never run. If it does, it skips whatever map has a 0 has a map_id.
        // It exists to prevent errors that existed/happened during the API's beta period.
        if (mostRecentTimes[i].map_id === 0){
          continue;
        }
        // This prevents very long names from appearing as they are.
        // This method is also used to prevent players with URLs after their names from appearing.
        // If name is longer than 20, but not longer than 23, length = 17 + ...
        // If name is longer than 23, length = 15 + ...
        if (mostRecentTimes[i].player_name.toString().length > 20) {
          if (mostRecentTimes[i].player_name.toString().length > 23) {
            playerName = mostRecentTimes[i].player_name.substr(0,15) + "...";
          } else { playerName = mostRecentTimes[i].player_name.substr(0,17) + "..."; }
        } else { playerName = mostRecentTimes[i].player_name; }
        // Constant is used because we do not want to manipulate ReadableTime past this point, as this gives us a date and time.
        const ReadableTime = (mostRecentTimes[i].updated_on).split("T");
        // Constant is used because we DO intend on manipulating $map_div but we do not want to reassign it.
        const $map_div = $("<div>", {id: jsonMapId[mostRecentTimes[i].map_id][0], "class": "map_div"});
        // This is a disaster piece of code that needs to be fixed. Appending in this size is slow.
        $map_div.append("<img src=" + "http://www.kzstats.com/img/map/" + jsonMapId[mostRecentTimes[i].map_id][0] + ".jpg>" + "<span style='color: white;'>" + jsonMapId[mostRecentTimes[i].map_id][0] + " <br>" + playerName + "<br>" + "<div>" + (mostRecentTimes[i].top_100_overall === 0 ? "NA" : '#' + mostRecentTimes[i].top_100_overall) + "</div>" + " | " + "<div>" + timeConvert(mostRecentTimes[i].time) + "</div></span>");
        // This was created by Chuckles to help with selecting maps for users. Extremely useful as most users tend to not use their keyboard in 2018.
        $map_div.click(function(event){
          if (event.target.parentNode.id.includes("_")) {
            $("#searchMap").val(event.target.parentNode.id);
            loadMap($("#searchMap").val());
          }
        });
        $("#recentTimes").append($map_div);
      }
    }
  });

  $.ajax({
    url: recordsTopUrl,
    success: function(recordsTop) {

      // Create empty arrays.
      mostRecentTopTimes = [];
      usedTopTimes = [];
      mostRecentTopTimesFiltered = [];

      // Runs a for loop and gets the records that are in jsonMapId (web server's global list vs. API list)
      // This is unnecessary except in times when the API and web server's global list do not match.
      // If the API has a map that doesn't exist in the web server's list, the entire block breaks and errors out.
      for(i=0;i<recordsTop.length;i++) {
        if (recordsTop[i].map_id in jsonMapId) {
          mostRecentTopTimes.push(recordsTop[i]);
        }
      }

      // This for loop is used to get the #1 times on maps.
      // Eventually this will be removed as the API will do this for me.
      for (i=0;i<mostRecentTopTimes.length;i++) {
        if (usedTopTimes.includes(mostRecentTopTimes[i].map_id)) {
          continue;
        }
        mostRecentTopTimesFiltered.push(mostRecentTopTimes[i]);
        usedTopTimes.push(mostRecentTopTimes[i].map_id);
      }
      // Filters the records by date and time.
      mostRecentTopTimesFiltered = sortArray(mostRecentTopTimesFiltered);

      // Gives us all the informmation we need for a record (image, player, map, time) and formats it into a div.
      for (m=0;m<5;m++) {
        if (m >= mostRecentTopTimesFiltered.length) {
          break;
        }
        // If name is longer than 20, but not longer than 23, length = 17 + ...
        // If name is longer than 23, length = 15 + ...
        if (mostRecentTopTimesFiltered[m].player_name.toString().length > 20) {
          if (mostRecentTopTimesFiltered[m].player_name.toString().length > 23) {
            playerName = mostRecentTopTimesFiltered[m].player_name.substr(0,15) + "...";
          } else { playerName = mostRecentTopTimesFiltered[m].player_name.substr(0,17) + "..."; }
        } else { playerName = mostRecentTopTimesFiltered[m].player_name; }

        const ReadableTime = (mostRecentTopTimesFiltered[m].updated_on).split("T");
        const $map_div = $("<div>", {id: jsonMapId[mostRecentTopTimesFiltered[m].map_id][0], "class": "map_div"});
        $map_div.append("<img src=" + "http://www.kzstats.com/img/map/" + jsonMapId[mostRecentTopTimesFiltered[m].map_id][0] + ".jpg>" + "<span style='color: white;'>" + jsonMapId[mostRecentTopTimesFiltered[m].map_id][0] + "<br>" + playerName + "<br>" + "<div>" + timeConvert(mostRecentTopTimesFiltered[m].time) + "</div></span>");
        $map_div.click(function(event){
          if (event.target.parentNode.id.includes("_")) {
            $("#searchMap").val(event.target.parentNode.id);
            loadMap($("#searchMap").val());
          }
        });
        $("#topTimes").append($map_div);
      }
    }
  });
}


$(document).ready(function(){

  // This allows a user to link to a direct map. Used in the discord bot.
  // Example: gokzstats.com/?map=kz_beginnerblock_go
  const url = new URL(document.location);
  const foo = url.searchParams.get("map") || "bar";
  if (foo !== "bar") {
    document.getElementById("searchMap").value = foo;
    setTimeout(function() {
      loadMap($("#searchMap").val());
      document.getElementById("displayMapTimes").style.display = "flex";
      document.getElementById("displayTimes").style.display = "none";
    });
  } else { console.log("hey");
}


$('#mode-kz_vanilla-desktop,#mode-kz_simple-desktop,#mode-kz_timer-desktop').on('click', function() {
  $("button[id$='desktop']").css("color","#E45051");
});

$("#searchMap").on('input', function() {
  if (!this.value && document.getElementById("displayMapTimes").style.display === "flex") {
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    $(".map_div").remove();
    recentAndLatest();
  }

});


// Vanilla
$("#mode-kz_vanilla-desktop").on('click', function(){
  document.getElementById("mode-kz_vanilla-desktop").style.color = "orange";
  if (currentmode === "kz_vanilla" && document.getElementById("displayMapTimes").style.display === "flex") {
    recentAndLatest();
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    $(".map_div").remove();
    document.getElementById("searchMap").value = "";
    return;
  }
  $("#displayTimes").find("img, span, br, .map_div").remove();
  recordsUrl = kz_vanillaRecords;
  recordsTopUrl = kz_vanillaTopRecords;
  kz_loadmap = kz_vanillaLoadMap;
  // Pagination
  currentmode = "kz_vanilla";
  currentpage = 0;
  document.getElementById("previous").style.background = "#cb6f6c";
  if ($("#searchMap").val().length > 0) {
    loadMap($("#searchMap").val());
    document.getElementById("displayMapTimes").style.display = "flex";
    document.getElementById("displayTimes").style.display = "none";
    return;
  } else {
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    recentAndLatest();
  }
});

// Simple KZ
$("#mode-kz_simple-desktop").on('click', function(){
  document.getElementById("mode-kz_simple-desktop").style.color = "orange";
  if (currentmode === "kz_simple" && document.getElementById("displayMapTimes").style.display === "flex") {
    recentAndLatest();
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    $(".map_div").remove();
    document.getElementById("searchMap").value = "";
    return;
  }
  $("#displayTimes").find("img, span, br, .map_div").remove();
  recordsUrl = kz_simpleRecords;
  recordsTopUrl = kz_simpleTopRecords;
  kz_loadmap = kz_simpleLoadMap;
  // Pagination
  currentmode = "kz_simple";
  currentpage = 0;
  document.getElementById("previous").style.background = "#cb6f6c";
  if ($("#searchMap").val().length > 0) {
    loadMap($("#searchMap").val());
    document.getElementById("displayMapTimes").style.display = "flex";
    document.getElementById("displayTimes").style.display = "none";
    return;
  } else {
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    recentAndLatest();
  }
});

// KZTimer
$("#mode-kz_timer-desktop").on('click', function(){
  document.getElementById("mode-kz_timer-desktop").style.color = "orange";
  if (currentmode === "kz_timer" && document.getElementById("displayMapTimes").style.display === "flex") {
    recentAndLatest();
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    $(".map_div").remove();
    document.getElementById("searchMap").value = "";
    return;
  }
  $("#displayTimes").find("img, span, br, .map_div").remove();
  recordsUrl = kz_timerRecords;
  recordsTopUrl = kz_timerTopRecords;
  kz_loadmap = kz_timerLoadMap;
  // Pagination
  currentmode = "kz_timer";
  currentpage = 0;
  document.getElementById("previous").style.background = "#cb6f6c";
  if ($("#searchMap").val().length > 0) {
    loadMap($("#searchMap").val());
    document.getElementById("displayMapTimes").style.display = "flex";
    document.getElementById("displayTimes").style.display = "none";
    return;
  } else {
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    recentAndLatest();
  }
});


// If enter is pressed while there is text in the search bar, it searches. If no text, it switches back to the normal view.
document.getElementById("searchMap").addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    if ($("#searchMap").val().length > 0) {
      loadMap($("#searchMap").val());
      document.getElementById("displayMapTimes").style.display = "flex";
      document.getElementById("displayTimes").style.display = "none";
    } else {
      document.getElementById("displayMapTimes").style.display = "none";
      document.getElementById("displayTimes").style.display = "flex";
    }
  }
});



$("#previous").on('click', function() {
  if (document.getElementById("previous").style.background === "#cb6f6c") {
    return;
  }
  currentpage -= 5;
  if (currentpage <= 0) {
    currentpage = 0;
    document.getElementById("previous").style.background = "#cb6f6c";
  }
  if (currentpage < 95) {
    document.getElementById("next").style.background = "#222831";
  }
  $(".map_div").remove();
  // For Recent Times
  // Gives us all the informmation we need for a record (image, player, map, time) and formats it into a div.
  for (i=currentpage;i<currentpage+5;i++) {
    // This is a fail safe and should never run. If it does, it skips whatever map has a 0 has a map_id.
    // It exists to prevent errors that existed/happened during the API's beta period.
    if (mostRecentTimes[i].map_id === 0){
      continue;
    }
    // This prevents very long names from appearing as they are.
    // This method is also used to prevent players with URLs after their names from appearing.
    // If name is longer than 20, but not longer than 23, length = 17 + ...
    // If name is longer than 23, length = 15 + ...
    if (mostRecentTimes[i].player_name.toString().length > 20) {
      if (mostRecentTimes[i].player_name.toString().length > 23) {
        playerName = mostRecentTimes[i].player_name.substr(0,15) + "...";
      } else { playerName = mostRecentTimes[i].player_name.substr(0,17) + "..."; }
    } else { playerName = mostRecentTimes[i].player_name; }
    // Constant is used because we do not want to manipulate ReadableTime past this point, as this gives us a date and time.
    const ReadableTime = (mostRecentTimes[i].updated_on).split("T");
    // Constant is used because we DO intend on manipulating $map_div but we do not want to reassign it.
    const $map_div = $("<div>", {id: jsonMapId[mostRecentTimes[i].map_id][0], "class": "map_div"});
    // This is a disaster piece of code that needs to be fixed. Appending in this size is slow.
    $map_div.append("<img src=" + "http://www.kzstats.com/img/map/" + jsonMapId[mostRecentTimes[i].map_id][0] + ".jpg>" + "<span style='color: white;'>" + jsonMapId[mostRecentTimes[i].map_id][0] + " <br>" + playerName + "<br>" + "<div>" + (mostRecentTimes[i].top_100_overall === 0 ? "NA" : '#' + mostRecentTimes[i].top_100_overall) + "</div>" + " | " + "<div>" + timeConvert(mostRecentTimes[i].time) + "</div></span>");
    // This was created by Chuckles to help with selecting maps for users. Extremely useful as most users tend to not use their keyboard in 2018.
    $map_div.click(function(event){
      if (event.target.parentNode.id.includes("_")) {
        $("#searchMap").val(event.target.parentNode.id);
        loadMap($("#searchMap").val());
      }
    });
    $("#recentTimes").append($map_div);
  }

  // For World Records.
  // This runs the part of recentAndLatest() that fills the data
  for (m=currentpage;m<currentpage+5;m++) {
    if (m >= mostRecentTopTimesFiltered.length) {
      break;
    }

    // If name is longer than 20, but not longer than 23, length = 17 + ...
    // If name is longer than 23, length = 15 + ...
    if (mostRecentTopTimesFiltered[m].player_name.toString().length > 20) {
      if (mostRecentTopTimesFiltered[m].player_name.toString().length > 23) {
        playerName = mostRecentTopTimesFiltered[m].player_name.substr(0,15) + "...";
      } else { playerName = mostRecentTopTimesFiltered[m].player_name.substr(0,17) + "..."; }
    } else { playerName = mostRecentTopTimesFiltered[m].player_name; }

    const ReadableTime = (mostRecentTopTimesFiltered[m].updated_on).split("T");
    const $map_div = $("<div>", {id: jsonMapId[mostRecentTopTimesFiltered[m].map_id][0], "class": "map_div"});
    $map_div.append("<img src=" + "http://www.kzstats.com/img/map/" + jsonMapId[mostRecentTopTimesFiltered[m].map_id][0] + ".jpg>" + "<span style='color: white;'>" + jsonMapId[mostRecentTopTimesFiltered[m].map_id][0] + "<br>" + playerName + "<br>" + "<div>" + timeConvert(mostRecentTopTimesFiltered[m].time) + "</div></span>");
    $map_div.click(function(event){
      if (event.target.parentNode.id.includes("_")) {
        $("#searchMap").val(event.target.parentNode.id);
        loadMap($("#searchMap").val());
      }
    });
    $("#topTimes").append($map_div);
  }
});


$("#next").on('click', function() {
  if (document.getElementById("next").style.background === "#cb6f6c") {
    return;
  }
  currentpage += 5;
  if (currentpage > 0) {
    document.getElementById("previous").style.background = "#222831";
  }
  if (currentpage >= 95) {
    currentpage = 95;
    document.getElementById("previous").style.background = "#222831";
    document.getElementById("next").style.background = "#cb6f6c";
  }
  $(".map_div").remove();

  // For Recent Times
  // Gives us all the informmation we need for a record (image, player, map, time) and formats it into a div.
  for (i=currentpage;i<currentpage+5;i++) {
    // This is a fail safe and should never run. If it does, it skips whatever map has a 0 has a map_id.
    // It exists to prevent errors that existed/happened during the API's beta period.
    if (mostRecentTimes[i].map_id === 0){
      continue;
    }
    // This prevents very long names from appearing as they are.
    // This method is also used to prevent players with URLs after their names from appearing.
    // If name is longer than 20, but not longer than 23, length = 17 + ...
    // If name is longer than 23, length = 15 + ...
    if (mostRecentTimes[i].player_name.toString().length > 20) {
      if (mostRecentTimes[i].player_name.toString().length > 23) {
        playerName = mostRecentTimes[i].player_name.substr(0,15) + "...";
      } else { playerName = mostRecentTimes[i].player_name.substr(0,17) + "..."; }
    } else { playerName = mostRecentTimes[i].player_name; }
    // Constant is used because we do not want to manipulate ReadableTime past this point, as this gives us a date and time.
    const ReadableTime = (mostRecentTimes[i].updated_on).split("T");
    // Constant is used because we DO intend on manipulating $map_div but we do not want to reassign it.
    const $map_div = $("<div>", {id: jsonMapId[mostRecentTimes[i].map_id][0], "class": "map_div"});
    // This is a disaster piece of code that needs to be fixed. Appending in this size is slow.
    $map_div.append("<img src=" + "http://www.kzstats.com/img/map/" + jsonMapId[mostRecentTimes[i].map_id][0] + ".jpg>" + "<span style='color: white;'>" + jsonMapId[mostRecentTimes[i].map_id][0] + " <br>" + playerName + "<br>" + "<div>" + (mostRecentTimes[i].top_100_overall === 0 ? "NA" : '#' + mostRecentTimes[i].top_100_overall) + "</div>" + " | " + "<div>" + timeConvert(mostRecentTimes[i].time) + "</div></span>");
    // This was created by Chuckles to help with selecting maps for users. Extremely useful as most users tend to not use their keyboard in 2018.
    $map_div.click(function(event){
      if (event.target.parentNode.id.includes("_")) {
        $("#searchMap").val(event.target.parentNode.id);
        loadMap($("#searchMap").val());
      }
    });
    $("#recentTimes").append($map_div);
  }

  // For World Records.
  // This runs the part of recentAndLatest() that fills the data
  for (m=currentpage;m<currentpage+5;m++) {
    if (m >= mostRecentTopTimesFiltered.length) {
      break;
    }
    // If name is longer than 20, but not longer than 23, length = 17 + ...
    // If name is longer than 23, length = 15 + ...
    if (mostRecentTopTimesFiltered[m].player_name.toString().length > 20) {
      if (mostRecentTopTimesFiltered[m].player_name.toString().length > 23) {
        playerName = mostRecentTopTimesFiltered[m].player_name.substr(0,15) + "...";
      } else { playerName = mostRecentTopTimesFiltered[m].player_name.substr(0,17) + "..."; }
    } else { playerName = mostRecentTopTimesFiltered[m].player_name; }

    const ReadableTime = (mostRecentTopTimesFiltered[m].updated_on).split("T");
    const $map_div = $("<div>", {id: jsonMapId[mostRecentTopTimesFiltered[m].map_id][0], "class": "map_div"});
    $map_div.append("<img src=" + "http://www.kzstats.com/img/map/" + jsonMapId[mostRecentTopTimesFiltered[m].map_id][0] + ".jpg>" + "<span style='color: white;'>" + jsonMapId[mostRecentTopTimesFiltered[m].map_id][0] + "<br>" + playerName + "<br>" + "<div>" + timeConvert(mostRecentTopTimesFiltered[m].time) + "</div></span>");
    $map_div.click(function(event){
      if (event.target.parentNode.id.includes("_")) {
        $("#searchMap").val(event.target.parentNode.id);
        loadMap($("#searchMap").val());
      }
    });
    $("#topTimes").append($map_div);
  }
});



$.ajax({
  url: "../js/mapListNew.js",
  dataType: "text",
  success: function(Map_info) {
    data = JSON.parse(Map_info);
    data.forEach(function (Map_info) {
      if (Map_info.Global === 0) {
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
  // On load show recent and latest
  recordsUrl = kz_simpleRecords;
  recordsTopUrl = kz_simpleTopRecords;
  kz_loadmap = kz_simpleLoadMap;
  currentmode = "kz_simple";
  recentAndLatest();
});
