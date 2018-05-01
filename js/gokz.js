let jsonMapId = {};
let maplist = [];

// Main Page
let mostRecentTimes = [];
let mostRecentTopTimes = [];

// Map Page
let mapRecentTimes = [];
let mapProTimes = [];

let usedTopTimes = [];
let mostRecentTopTimesFiltered = [];
let usedTimes = [];
let postTimes = [];
let kztimerglobalUrl = "https://kztimerglobal.com/api/v1/records/top?map_name=";
let mapname = "";
const kz_simpleRecords = "https://kztimerglobal.com/api/v1.0/records/top/recent?stage=0&tickrate=128&modes_list_string=kz_simple&limit=100";
const kz_timerRecords = "https://kztimerglobal.com/api/v1.0/records/top/recent?stage=0&tickrate=128&modes_list_string=kz_timer&limit=100";
const kz_vanillaRecords = "https://kztimerglobal.com/api/v1.0/records/top/recent?stage=0&tickrate=128&modes_list_string=kz_vanilla&limit=100";
const kz_simpleTopRecords = "https://kztimerglobal.com/api/v1.0/records/top/recent?modes_list_string=kz_simple&place_top_at_least=1&has_teleports=false&stage=0&limit=300&tickrate=128";
const kz_timerTopRecords = "https://kztimerglobal.com/api/v1.0/records/top/recent?modes_list_string=kz_timer&place_top_at_least=1&has_teleports=false&stage=0&limit=300&tickrate=128";
const kz_vanillaTopRecords = "https://kztimerglobal.com/api/v1.0/records/top/recent?modes_list_string=kz_vanilla&place_top_at_least=1&has_teleports=false&stage=0&limit=300&tickrate=128";
const kz_simpleLoadMap = "https://kztimerglobal.com/api/v1/records/top?modes_list_string=kz_simple";
const kz_timerLoadMap = "https://kztimerglobal.com/api/v1/records/top?modes_list_string=kz_timer";
const kz_vanillaLoadMap = "https://kztimerglobal.com/api/v1/records/top?modes_list_string=kz_vanilla";
let kz_loadmap;
let recordsUrl;
let recordsTopUrl;
let currentpage = 0;
let currentmode;

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

function dateConvert(time) {

  time = new Date(time);
  time = new Date(time - time.getTimezoneOffset()*60000);

  let day = time.getDate();
  let month = time.getMonth() + 1;
  let year = time.getFullYear();
  let hour = time.getHours();
  let minutes = time.getMinutes();

  if (parseInt(hour) > 12) {
    hour = parseInt(hour) - 12;
    time = month + "." + day + "." + year + "  " + hour + ":" + (parseInt(minutes) < 10 ? "0" + minutes : minutes) + "pm";
  }
  else if (hour === 0) {
    time = month + "." + day + "." + year + "  " + 12 + ":" + (parseInt(minutes) < 10 ? "0" + minutes : minutes) + "am";
  }
  else if (hour == 12) {
    time = month + "." + day + "." + year + "  " + 12 + ":" + (parseInt(minutes) < 10 ? "0" + minutes : minutes) + "pm";
  }
  else {
    time = month + "." + day + "." + year + "  " +  hour + ":" + (parseInt(minutes) < 10 ? "0" + minutes : minutes) + "am";
  }
  return time;
}

function checkLength(name) {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    if (name.player_name.toString().length > 13) {
      if (name.player_name.toString().length > 16) {
        playerName = name.player_name.substr(0,8) + "...";
      } else { playerName = name.player_name.substr(0,10) + "..."; }
    } else { playerName = name.player_name; }
  } else {
    if (name.player_name.toString().length > 14) {
      if (name.player_name.toString().length > 17) {
        playerName = name.player_name.substr(0,9) + "...";
      } else { playerName = name.player_name.substr(0,11) + "..."; }
    } else { playerName = name.player_name; }
  }
}

function getTimeDifference(time) {
  timeAchieved = new Date(time);
  timeAchieved = timeAchieved - timeAchieved.getTimezoneOffset()*60000;
  timeNow = new Date().toUTCString();
  let timeDifference = (Date.parse(timeNow) - timeAchieved) / (1000 * 60 * 60);

  if (timeDifference < 1) {
    return Math.ceil(timeDifference*60) + " minutes ago";
  }
  if (timeDifference < 24) {
    return Math.ceil(timeDifference) + " hours ago";
  }
  else if (timeDifference >= 24) {
    return Math.ceil((timeDifference / 24)) + " days ago";
  }
}

function getPlayerInfo(url) {
  currentpage = 0;
  document.getElementById("displayTimes").style.display = "none";
  document.getElementById("displayMapTimes").style.display = "none";
  usedTimes = [];
  postTimes = [];
  worldRecordCount = 0;
  $("#TableTimes td").remove();
  $("#playerInfo div").remove();
  $("#playerName a").remove();

  $.ajax({
    url: url,
    success: function(playerInfo) {
      window.history.replaceState('map', 'Map', '/?name=' + playerInfo[0].steam_id);
      if (playerInfo.length === 0) {
        $("#TableTimes tr").remove();
        let row = document.getElementById("TableTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        cell1.innerHTML = "No Records Found";
        if (document.getElementById("playerName").innerHTML !== "Name Unavailable") {
          return;
        } else {
          document.getElementById("playerName").innerHTML = "Name Unavailable";
          return;
        }
      }
      for (i=0;i<playerInfo.length;i++) {
        if (usedTimes.includes(playerInfo[i].map_id)) {
          continue;
        }
        usedTimes.push(playerInfo[i].map_id);
        postTimes.push(playerInfo[i]);
      }
      document.getElementById("playerName").innerHTML = postTimes[0].player_name;
      document.getElementById("playerSteamID").innerHTML = postTimes[0].steam_id;

      // Steam64. 64 bit JS magic. Takes from getPlayerStats.js
      steamid = (playerInfo[0].steam_id).split(":");
      steam64 = BigInteger(steamid[2]);
      steam64 = BigInteger(steam64.multiply(2).toString());
      if (steamid[1] === "1") {
        steamBigInt = BigInteger('76561197960265729');
      } else {
        steamBigInt = BigInteger('76561197960265728');
      }
      document.getElementById("playerName").setAttribute("href", "https://steamcommunity.com/profiles/" + steam64.add(steamBigInt).toString());
      document.getElementById("playerName").setAttribute("target", "_blank");

      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        $('br').remove();
        $('#playerInfo').append("<br><div>" + postTimes.length + " / " + maplist.length + " Pro Times</div>");
      } else {
        $('#playerInfo').append("<div>" + postTimes.length + " / " + maplist.length + " Pro Times</div>");
      }


      for (i=0;i<postTimes.length;i++) {
        if (postTimes[i].top_100 === 1) {
          worldRecordCount++;
        }
      }

      let row = document.getElementById("TableTimes").insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);

      row.id = "TableTitle";
      cell1.innerHTML = "Map Name";
      cell2.innerHTML = "Time";
      cell3.innerHTML = "Date";

      let count = 0;
      for (i=0;i<postTimes.length;i++) {
        if (postTimes[i].map_id === -1) {
          continue;
        }
        if (count === 20) {
          count = 0;
          break;
        }

        let row = document.getElementById("TableTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.parentNode.id = jsonMapId[postTimes[i].map_id][0];
        cell1.innerHTML = jsonMapId[postTimes[i].map_id][0];
        cell2.innerHTML = timeConvert(postTimes[i].time);
        cell3.innerHTML = dateConvert(postTimes[i].created_on);

        $('td').click(function(event){
          if (event.target.parentNode.id === "TableTitle") {
            return;
          }
          $("#searchMap").val(event.target.parentNode.id);
          loadMap($("#searchMap").val());
        });
        count++;
      }
    }
  });
  document.getElementById("playerName").style.display = "flex";
  document.getElementById("displayTimes").style.display = "none";
  document.getElementById("displayMapTimes").style.display = "none";
  document.getElementById("playerName").style.display = "flex";
  document.getElementById("pagination").style.display = "flex";
  document.getElementById("displayPlayerProfile").style.display = "flex";
}


function loadMap(map) {
  currentpage = 0;
  document.getElementById("previous").style.background = "#cb6f6c";
  document.getElementById("next").style.background = "#222831";
  document.getElementById("pagination").style.display = "flex";
  document.getElementById("playerName").style.display = "none";
  document.getElementById("displayPlayerProfile").style.display = "none";
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
    let searchUrlPro = kz_loadmap + "&map_name=" + searchMapName + "&stage=0&has_teleports=false&limit=3000&tickrate=128";
    let searchUrlTP = kz_loadmap + "&map_name=" + searchMapName + "&stage=0&limit=3000&tickrate=128";
    window.history.replaceState('map', 'Map', '/?map=' + searchMapName);
    $.ajax({
      url: searchUrlTP,
      success: function(mapTP) {
        $("#TableOverallTimes tr").remove();
        mapRecentTimes = mapTP.slice();

        let position = 0;
        for (i=0;i<maplist.length;i++) {
          if (maplist[i].includes(searchMapName)) {
            searchMapName = maplist[i];
            break;
          }
        }
        if (mapTP.length === 0) {
          let row = document.getElementById("TableOverallTimes").insertRow(-1);
          let cell1 = row.insertCell(0);
          cell1.innerHTML = "No Records Found";
          document.getElementById("displayTimes").style.display = "none";
          document.getElementById("displayMapTimes").style.display = "flex";
          return;
        }
        let numberOfTPTimes = (mapTP.length < 20 ? mapTP.length : 20)
        for (i=0;i<numberOfTPTimes;i++) {
          if (jsonMapId[mapTP[i].map_id][0] !== searchMapName) {
            let row = document.getElementById("TableOverallTimes").insertRow(-1);
            let cell1 = row.insertCell(0);
            cell1.innerHTML = "Invalid Map Name";
            document.getElementById("displayTimes").style.display = "none";
            document.getElementById("displayMapTimes").style.display = "flex";
            break;
          }
          position++;

          checkLength(mapTP[i]);

          let row = document.getElementById("TableOverallTimes").insertRow(-1);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          let cell4 = row.insertCell(3);
          let cell5 = row.insertCell(4);

          row.id = mapTP[i].steam_id;
          cell2.id = "name";
          cell2.innerHTML = playerName;
          cell3.innerHTML = timeConvert(mapTP[i].time);

          if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))) {
            cell1.innerHTML = position;
            cell4.innerHTML = mapTP[i].teleports + " TPs";
            cell5.innerHTML = dateConvert(mapTP[i].created_on);
          } else {
            cell4.innerHTML = mapTP[i].teleports;

          }

          document.getElementById("displayTimes").style.display = "none";
          document.getElementById("displayMapTimes").style.display = "flex";

        }
        $('td').click(function(event){
          if (event.target.parentNode.id.includes("STEAM_")) {
            $("#searchMap").val(event.target.parentNode.id);
            getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top/recent?steam_id=" + event.target.parentNode.id + "&tickrate=128&stage=0&has_teleports=false&limit=500&&place_top_at_least=20&modes_list_string=" + currentmode);
          }
        });
      }
    });
    $.ajax({
      url: searchUrlPro,
      success: function(mapPro) {

        $("#TableProTimes tr").remove();
        mapProTimes = mapPro.slice();

        let position = 0;
        for (i=0;i<maplist.length;i++) {
          if (maplist[i].includes(searchMapName)) {
            searchMapName = maplist[i];
            break;
          }
        }
        if (mapPro.length === 0) {
          let row = document.getElementById("TableProTimes").insertRow(-1);
          let cell1 = row.insertCell(0);
          cell1.innerHTML = "No Records Found";
          document.getElementById("displayTimes").style.display = "none";
          document.getElementById("displayMapTimes").style.display = "flex";
          return;
        }
        let numberOfProTimes = (mapPro.length < 20 ? mapPro.length : 20);
        for (i=0;i<numberOfProTimes;i++) {
          if (jsonMapId[mapPro[i].map_id][0] !== searchMapName) {
            let row = document.getElementById("TableProTimes").insertRow(-1);
            let cell1 = row.insertCell(0);
            cell1.innerHTML = "Invalid Map Name";
            document.getElementById("displayTimes").style.display = "none";
            document.getElementById("displayMapTimes").style.display = "flex";
            break;
          }
          position++;

          checkLength(mapPro[i]);

          let row = document.getElementById("TableProTimes").insertRow(-1);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);


          row.id = mapPro[i].steam_id;
          cell1.innerHTML = position;
          cell2.id = "name";
          cell2.innerHTML = playerName;
          cell3.innerHTML = timeConvert(mapPro[i].time);

          if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))) {
            let cell4 = row.insertCell(3);
            cell4.innerHTML = dateConvert(mapPro[i].created_on);
          }

          document.getElementById("displayTimes").style.display = "none";
          document.getElementById("displayMapTimes").style.display = "flex";
        }
      }
    });
  }
}

function recentAndLatest() {
  currentpage = 0;
  document.getElementById("previous").style.background = "#cb6f6c";
  document.getElementById("next").style.background = "#222831";
  window.history.pushState('home', 'Home', '/');
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    document.getElementById("pagination").style.display = "flex";
  } else {
    document.getElementById("pagination").style.display = "flex";
  }

  $.ajax({
    url: recordsUrl,
    success: function(records) {
      document.getElementById("displayTimes").style.display === "flex";

      mostRecentTimes = [];
      for(i=0;i<records.length;i++) {
        if (records[i].map_id in jsonMapId) {
          mostRecentTimes.push(records[i]);
        }
      }

      mostRecentTimes = sortArray(mostRecentTimes);

      for (i=0;i<5;i++) {
        checkLength(mostRecentTimes[i])

        const ReadableTime = (mostRecentTimes[i].updated_on).split("T");
        const $map_div = $("<div>", {id: jsonMapId[mostRecentTimes[i].map_id][0], "class": "map_div"});

        $map_div.append("<img src=" + "https://d2u7y93d5eagqt.cloudfront.net/mapImages/thumbs/tn_" + jsonMapId[mostRecentTimes[i].map_id][0] + ".jpg>" + "<span style='color: white;'>" + jsonMapId[mostRecentTimes[i].map_id][0] + " <br>" + playerName + "<br>" + "<div>" + (mostRecentTimes[i].top_100_overall === 0 ? "NA" : '#' + mostRecentTimes[i].top_100_overall) + "</div>" + " | " + "<div>" + timeConvert(mostRecentTimes[i].time) + "</div><br>" + mostRecentTimes[i].teleports + " TPs" + "</span>");
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

      for (m=0;m<5;m++) {
        if (m >= mostRecentTopTimesFiltered.length) {
          break;
        }

        checkLength(mostRecentTopTimesFiltered[m])



        const ReadableTime = (mostRecentTopTimesFiltered[m].updated_on).split("T");
        const $map_div = $("<div>", {id: jsonMapId[mostRecentTopTimesFiltered[m].map_id][0], "class": "map_div"});

        $map_div.append("<img src=" + "https://d2u7y93d5eagqt.cloudfront.net/mapImages/thumbs/tn_" + jsonMapId[mostRecentTopTimesFiltered[m].map_id][0] + ".jpg>" + "<span style='color: white;'>" + jsonMapId[mostRecentTopTimesFiltered[m].map_id][0] + "<br>" + playerName + "<br>" + "<div>" + timeConvert(mostRecentTopTimesFiltered[m].time) + "</div>" + "<br>" + "<div style='color: white; font-size: 90%; font-style: italic'>" + getTimeDifference(mostRecentTopTimesFiltered[m].created_on) + "</div>" + "</span>");
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

/**************************************************************************************************************************
**************************************************************************************************************************
**************************************************************************************************************************
**************************************************************************************************************************
**************************************************************************************************************************
**************************************************************************************************************************
**************************************************************************************************************************
**************************************************************************************************************************
**************************************************************************************************************************
**************************************************************************************************************************
**************************************************************************************************************************
**************************************************************************************************************************
**************************************************************************************************************************
**************************************************************************************************************************
**************************************************************************************************************************
**************************************************************************************************************************/

function toggle(object) {
  object.disabled = true;
  setTimeout(function() {
    object.disabled = false;
  }, 500);
}

$(document).ready(function(){


  // This allows a user to link to a direct map. Used in the discord bot.
  // Example: gokzstats.com/?map=kz_beginnerblock_go
  if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))) {

  }
  else if (/Edge\/\d./i.test(navigator.userAgent)){
    // Microsoft Edge does not support searchParams.get. This just skips everything if you're on edge.
  } else {
    const url = new URL(document.location);
    const name = url.searchParams.get("name") || "empty";
    const map = url.searchParams.get("map") || "empty";
    if (map !== "empty") {
      document.getElementById("searchMap").value = map;
      setTimeout(function() {
        loadMap($("#searchMap").val());
        document.getElementById("displayMapTimes").style.display = "flex";
        document.getElementById("displayTimes").style.display = "none";
      }, 500);
    }
    if (name !== "empty") {
      document.getElementById("searchMap").value = name;
      setTimeout(function() {
        getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top/recent?steam_id=" + $("#searchMap").val() + "&tickrate=128&stage=0&has_teleports=false&limit=500&modes_list_string=" + currentmode);
        document.getElementById("displayPlayerTimes").style.display = "flex";
        document.getElementById("displayMapTimes").style.display = "none";
        document.getElementById("displayTimes").style.display = "none";
      });
    }
  }


  $('#mode-kz_vanilla-desktop,#mode-kz_simple-desktop,#mode-kz_timer-desktop').on('click', function() {
    $("button[id$='desktop']").css("color","#E45051");
  });

  $("#searchMap").on('input', function() {
    if (!this.value && document.getElementById("displayMapTimes").style.display === "flex") {
      document.getElementById("displayMapTimes").style.display = "none";
      document.getElementById("displayTimes").style.display = "flex";
      document.getElementById("playerName").style.display = "none";
      document.getElementById("displayPlayerProfile").style.display = "none";
      $(".map_div").remove();
      recentAndLatest();
    }

  });


  // Vanilla
  $("#mode-kz_vanilla-desktop").on('click', function(){
    document.getElementById("mode-kz_vanilla-desktop").style.color = "orange";
    if (currentmode === "kz_vanilla" && document.getElementById("displayPlayerProfile").style.display === "flex") {
      recentAndLatest();
      document.getElementById("displayMapTimes").style.display = "none";
      document.getElementById("displayTimes").style.display = "flex";
      document.getElementById("playerName").style.display = "none";
      document.getElementById("displayPlayerProfile").style.display = "none";
      document.getElementById("searchMap").value = "";
      $("#TableTimes tr").remove();
      $("#TableTimes td").remove();
      $(".map_div").remove();
      return;
    }
    if (currentmode === "kz_vanilla" && document.getElementById("displayMapTimes").style.display === "flex") {
      recentAndLatest();
      document.getElementById("displayMapTimes").style.display = "none";
      document.getElementById("displayTimes").style.display = "flex";
      document.getElementById("playerName").style.display = "none";
      document.getElementById("displayPlayerProfile").style.display = "none";
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
      if ($("#searchMap").val().startsWith("STEAM")) {
        getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top/recent?steam_id=" + $("#searchMap").val() + "&tickrate=128&stage=0&has_teleports=false&limit=500&modes_list_string=" + currentmode);
        $("#TableTimes tr").remove();
        $("#TableTimes td").remove();
        return;
      }
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
    if (currentmode === "kz_simple" && document.getElementById("displayPlayerProfile").style.display === "flex") {
      recentAndLatest();
      document.getElementById("displayMapTimes").style.display = "none";
      document.getElementById("displayTimes").style.display = "flex";
      document.getElementById("playerName").style.display = "none";
      document.getElementById("displayPlayerProfile").style.display = "none";
      document.getElementById("searchMap").value = "";
      $("#TableTimes tr").remove();
      $("#TableTimes td").remove();
      $(".map_div").remove();
      return;
    }
    if (currentmode === "kz_simple" && document.getElementById("displayMapTimes").style.display === "flex") {
      recentAndLatest();
      document.getElementById("displayMapTimes").style.display = "none";
      document.getElementById("displayTimes").style.display = "flex";
      document.getElementById("playerName").style.display = "none";
      document.getElementById("displayPlayerProfile").style.display = "none";
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
      if ($("#searchMap").val().startsWith("STEAM")) {
        getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top/recent?steam_id=" + $("#searchMap").val() + "&tickrate=128&stage=0&has_teleports=false&limit=500&modes_list_string=" + currentmode);
        return;
      }
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
    if (currentmode === "kz_timer" && document.getElementById("displayPlayerProfile").style.display === "flex") {
      recentAndLatest();
      document.getElementById("displayMapTimes").style.display = "none";
      document.getElementById("displayTimes").style.display = "flex";
      document.getElementById("playerName").style.display = "none";
      document.getElementById("displayPlayerProfile").style.display = "none";
      document.getElementById("searchMap").value = "";
      $("#TableTimes tr").remove();
      $("#TableTimes td").remove();
      $(".map_div").remove();
      return;
    }
    if (currentmode === "kz_timer" && document.getElementById("displayMapTimes").style.display === "flex") {
      recentAndLatest();
      document.getElementById("displayMapTimes").style.display = "none";
      document.getElementById("displayTimes").style.display = "flex";
      document.getElementById("playerName").style.display = "none";
      document.getElementById("displayPlayerProfile").style.display = "none";
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
      if ($("#searchMap").val().startsWith("STEAM")) {
        getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top/recent?steam_id=" + $("#searchMap").val() + "&tickrate=128&stage=0&has_teleports=false&limit=500&modes_list_string=" + currentmode);
        return;
      }
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
        if ($("#searchMap").val().toLowerCase().startsWith("steam")) {
          getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top/recent?steam_id=" + $("#searchMap").val() + "&tickrate=128&stage=0&has_teleports=false&limit=500&modes_list_string=" + currentmode);
          return;
        }
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

    if (document.getElementById("displayMapTimes").style.display !== "none") {
      if (document.getElementById("next").style.background === "#cb6f6c") {
        return;
      }
      currentpage -= 20;
      if (currentpage <= 0) {
        currentpage = 0;
        document.getElementById("previous").style.background = "#cb6f6c";
      }
      let mapOverallPosition = currentpage;
      let mapProPosition = currentpage;
      mostPositions = (mapRecentTimes >= mapProTimes ? mapRecentTimes : mapProTimes);
      if (currentpage >= mostPositions.length) {
        currentpage = Math.floor(mostPositions.length);
        document.getElementById("previous").style.background = "#222831";
        document.getElementById("next").style.background = "#cb6f6c";
      } else {
        document.getElementById("next").style.background = "#222831";
      }
      $("#TableOverallTimes tr").remove();
      $("#TableProTimes tr").remove();
      if (mostPositions.length <= currentpage) {
        let row = document.getElementById("TableOverallTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        cell1.innerHTML = "No Other Records Found";
        let row2 = document.getElementById("TableProTimes").insertRow(-1);
        let cell2 = row2.insertCell(0);
        cell2.innerHTML = "No Other Records Found";
        return;
      } else {
        for (i=currentpage;i<currentpage+20;i++) {
          if (mapRecentTimes.length === i) {
            return;
          }
          mapOverallPosition++;
          checkLength(mapRecentTimes[i]);
          let row = document.getElementById("TableOverallTimes").insertRow(-1);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          let cell4 = row.insertCell(3);
          let cell5 = row.insertCell(4);
          row.id = mapRecentTimes[i].steam_id;
          cell2.id = "name";
          cell2.innerHTML = playerName;
          cell3.innerHTML = timeConvert(mapRecentTimes[i].time);
          if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))) {
            cell1.innerHTML = mapOverallPosition;
            cell4.innerHTML = mapRecentTimes[i].teleports + " TPs";
            cell5.innerHTML = dateConvert(mapRecentTimes[i].created_on);
          } else {
            cell4.innerHTML = mapRecentTimes[i].teleports;
          }
        }
        $('td').click(function(event){
          if (event.target.parentNode.id.includes("STEAM_")) {
            $("#searchMap").val(event.target.parentNode.id);
            getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top/recent?steam_id=" + event.target.parentNode.id + "&tickrate=128&stage=0&has_teleports=false&limit=500&&place_top_at_least=20&modes_list_string=" + currentmode);
          }
        });
      }

      if (mapProTimes.length <= currentpage) {
        let row = document.getElementById("TableProTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        cell1.innerHTML = "No Other Records Found";
      } else {
        for (i=currentpage;i<currentpage+20;i++) {
          if (mapProTimes.length === i) {
            return;
          }
          mapProPosition++;
          checkLength(mapProTimes[i]);
          let row = document.getElementById("TableProTimes").insertRow(-1);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);

          row.id = mapProTimes[i].steam_id;
          cell2.id = "name";
          cell2.innerHTML = playerName;
          cell3.innerHTML = timeConvert(mapProTimes[i].time);
          if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))) {
            let cell4 = row.insertCell(3);
            cell1.innerHTML = mapProPosition;
            cell4.innerHTML = dateConvert(mapProTimes[i].created_on);
          } else {
            cell1.innerHTML = mapProPosition;
          }
        }
      }
    }

    if (document.getElementById("displayPlayerProfile").style.display !== "none") {
      if (document.getElementById("previous").style.background === "#cb6f6c") {
        return;
      }
      currentpage -= 20;
      if (currentpage <= 0) {
        currentpage = 0;
        document.getElementById("previous").style.background = "#cb6f6c";
      }
      if (currentpage < 80) {
        document.getElementById("next").style.background = "#222831";
      }
      $("#TableTimes tr").remove();
      let count = 0;

      if (postTimes.length <= (currentpage + count)) {
        let row = document.getElementById("TableTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        cell1.innerHTML = "No Other Records Found";
      } else {

        let row = document.getElementById("TableTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        row.id = "TableTitle";
        cell1.innerHTML = "Map Name";
        cell2.innerHTML = "Time";
        cell3.innerHTML = "Date";

      }


      for (i=currentpage;i<currentpage+20;i++) {
        if (postTimes.length <= (currentpage + count)) {
          return;
        }
        if (count === 20) {
          count = 0;
          break;
        }

        let row = document.getElementById("TableTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.parentNode.id = jsonMapId[postTimes[i].map_id][0];
        cell1.innerHTML = jsonMapId[postTimes[i].map_id][0];
        cell2.innerHTML = timeConvert(postTimes[i].time);
        cell3.innerHTML = dateConvert(postTimes[i].created_on);

        $('td').click(function(event){
          if (event.target.parentNode.id === "TableTitle") {
            return;
          }
          $("#searchMap").val(event.target.parentNode.id);
          loadMap($("#searchMap").val());
        });
        count++;
      }
    }

    if (document.getElementById("displayTimes").style.display !== "none") {
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

      for (i=currentpage;i<currentpage+5;i++) {

        checkLength(mostRecentTimes[i]);

        const ReadableTime = (mostRecentTimes[i].updated_on).split("T");
        const $map_div = $("<div>", {id: jsonMapId[mostRecentTimes[i].map_id][0], "class": "map_div"});

        $map_div.append("<img src=" + "https://d2u7y93d5eagqt.cloudfront.net/mapImages/thumbs/tn_" + jsonMapId[mostRecentTimes[i].map_id][0] + ".jpg>" + "<span style='color: white;'>" + jsonMapId[mostRecentTimes[i].map_id][0] + " <br>" + playerName + "<br>" + "<div>" + (mostRecentTimes[i].top_100_overall === 0 ? "NA" : '#' + mostRecentTimes[i].top_100_overall) + "</div>" + " | " + "<div>" + timeConvert(mostRecentTimes[i].time) + "</div><br>" + (mostRecentTimes[i].teleports > 0 ? mostRecentTimes[i].teleports + " TPs" : "") + "</span>");
        // This was created by Chuckles to help with selecting maps for users. Extremely useful as most users tend to not use their keyboard in 18.
        $map_div.click(function(event){
          if (event.target.parentNode.id.includes("_")) {
            $("#searchMap").val(event.target.parentNode.id);
            loadMap($("#searchMap").val());
          }
        });
        $("#recentTimes").append($map_div);
      }

      for (m=currentpage;m<currentpage+5;m++) {
        if (m >= mostRecentTopTimesFiltered.length) {
          break;
        }

        checkLength(mostRecentTopTimesFiltered[m]);

        const ReadableTime = (mostRecentTopTimesFiltered[m].updated_on).split("T");
        const $map_div = $("<div>", {id: jsonMapId[mostRecentTopTimesFiltered[m].map_id][0], "class": "map_div"});
        $map_div.append("<img src=" + "https://d2u7y93d5eagqt.cloudfront.net/mapImages/thumbs/tn_" + jsonMapId[mostRecentTopTimesFiltered[m].map_id][0] + ".jpg>" + "<span style='color: white;'>" + jsonMapId[mostRecentTopTimesFiltered[m].map_id][0] + "<br>" + playerName + "<br>" + "<div>" + timeConvert(mostRecentTopTimesFiltered[m].time) + "</div>" + "<br>" + "<div style='color: white; font-size: 90%; font-style: italic'>" + getTimeDifference(mostRecentTopTimesFiltered[m].created_on) + "</div>" + "</span>");
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


  $("#next").on('click', function() {

    if (document.getElementById("displayMapTimes").style.display !== "none") {
      if (document.getElementById("next").style.background === "#cb6f6c") {
        return;
      }
      currentpage += 20;
      if (currentpage > 0) {
        document.getElementById("previous").style.background = "#222831";
      }
      let mapOverallPosition = currentpage;
      let mapProPosition = currentpage;
      mostPositions = (mapRecentTimes >= mapProTimes ? mapRecentTimes : mapProTimes);
      if (currentpage >= mostPositions.length) {
        currentpage = Math.floor(mostPositions.length);
        document.getElementById("previous").style.background = "#222831";
        document.getElementById("next").style.background = "#cb6f6c";
      } else {
        document.getElementById("next").style.background = "#222831";
      }
      $("#TableOverallTimes tr").remove();
      $("#TableProTimes tr").remove();
      if (mostPositions.length <= currentpage) {
        let row = document.getElementById("TableOverallTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        cell1.innerHTML = "No Other Records Found";
        let row2 = document.getElementById("TableProTimes").insertRow(-1);
        let cell2 = row2.insertCell(0);
        cell2.innerHTML = "No Other Records Found";
        return;
      } else {
        for (i=currentpage;i<currentpage+20;i++) {
          if (mapRecentTimes.length === i) {
            return;
          }
          mapOverallPosition++;
          checkLength(mapRecentTimes[i]);
          let row = document.getElementById("TableOverallTimes").insertRow(-1);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          let cell4 = row.insertCell(3);
          let cell5 = row.insertCell(4);
          row.id = mapRecentTimes[i].steam_id;
          cell2.id = "name";
          cell2.innerHTML = playerName;
          cell3.innerHTML = timeConvert(mapRecentTimes[i].time);
          if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))) {
            cell1.innerHTML = mapOverallPosition;
            cell4.innerHTML = mapRecentTimes[i].teleports + " TPs";
            cell5.innerHTML = dateConvert(mapRecentTimes[i].created_on);
          } else {
            cell4.innerHTML = mapRecentTimes[i].teleports;
          }
        }
      }

      if (mapProTimes.length <= currentpage) {
        let row = document.getElementById("TableProTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        cell1.innerHTML = "No Other Records Found";
      } else {
        for (i=currentpage;i<currentpage+20;i++) {
          if (mapProTimes.length === i) {
            return;
          }
          mapProPosition++;
          checkLength(mapProTimes[i]);
          let row = document.getElementById("TableProTimes").insertRow(-1);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);

          row.id = mapProTimes[i].steam_id;
          cell2.id = "name";
          cell2.innerHTML = playerName;
          cell3.innerHTML = timeConvert(mapProTimes[i].time);
          if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))) {
            let cell5 = row.insertCell(3);
            cell1.innerHTML = mapProPosition;
            cell5.innerHTML = dateConvert(mapProTimes[i].created_on);
          } else {
            cell1.innerHTML = mapProPosition;
          }
        }
        $('td').click(function(event){
          if (event.target.parentNode.id.includes("STEAM_")) {
            $("#searchMap").val(event.target.parentNode.id);
            getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top/recent?steam_id=" + event.target.parentNode.id + "&tickrate=128&stage=0&has_teleports=false&limit=500&&place_top_at_least=20&modes_list_string=" + currentmode);
          }
        });
      }
    }

    if (document.getElementById("displayPlayerProfile").style.display !== "none") {
      if (document.getElementById("next").style.background === "#cb6f6c") {
        return;
      }
      currentpage += 20;
      if (currentpage > 0) {
        document.getElementById("previous").style.background = "#222831";
      }
      if (currentpage >= jsonMapId.length) {
        currentpage = Math.floor(jsonMapId.length);
        document.getElementById("previous").style.background = "#222831";
        document.getElementById("next").style.background = "#cb6f6c";
      }
      $("#TableTimes tr").remove();
      let count = 0;
      if (postTimes.length <= (currentpage + count)) {
        let row = document.getElementById("TableTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        cell1.innerHTML = "No Other Records Found";
      } else {
        let row = document.getElementById("TableTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        row.id = "TableTitle";
        cell1.innerHTML = "Map Name";
        cell2.innerHTML = "Time";
        cell3.innerHTML = "Date";
      }
      for (i=currentpage;i<currentpage+20;i++) {
        if (postTimes.length <= (currentpage + count)) {
          return;
        }
        if (count === 20) {
          count = 0;
          break;
        }
        let row = document.getElementById("TableTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.parentNode.id = jsonMapId[postTimes[i].map_id][0];
        cell1.innerHTML = jsonMapId[postTimes[i].map_id][0];
        cell2.innerHTML = timeConvert(postTimes[i].time);
        cell3.innerHTML = dateConvert(postTimes[i].created_on);
        $('td').click(function(event){
          if (event.target.parentNode.id === "TableTitle") {
            return;
          }
          $("#searchMap").val(event.target.parentNode.id);
          loadMap($("#searchMap").val());
        });
        count++;
      }
    }


    if (document.getElementById("displayTimes").style.display !== "none") {
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
      for (i=currentpage;i<currentpage+5;i++) {
        checkLength(mostRecentTimes[i]);
        const ReadableTime = (mostRecentTimes[i].updated_on).split("T");
        const $map_div = $("<div>", {id: jsonMapId[mostRecentTimes[i].map_id][0], "class": "map_div"});
        $map_div.append("<img src=" + "https://d2u7y93d5eagqt.cloudfront.net/mapImages/thumbs/tn_" + jsonMapId[mostRecentTimes[i].map_id][0] + ".jpg>" + "<span style='color: white;'>" + jsonMapId[mostRecentTimes[i].map_id][0] + " <br>" + playerName + "<br>" + "<div>" + (mostRecentTimes[i].top_100_overall === 0 ? "NA" : '#' + mostRecentTimes[i].top_100_overall) + "</div>" + " | " + "<div>" + timeConvert(mostRecentTimes[i].time) + "</div><br>" + (mostRecentTimes[i].teleports > 0 ? mostRecentTimes[i].teleports + " TPs" : "") + "</span>");
        // This was created by Chuckles to help with selecting maps for users. Extremely useful as most users tend to not use their keyboard in 2018.
        $map_div.click(function(event){
          if (event.target.parentNode.id.includes("_")) {
            $("#searchMap").val(event.target.parentNode.id);
            loadMap($("#searchMap").val());
          }
        });
        $("#recentTimes").append($map_div);
      }
      for (m=currentpage;m<currentpage+5;m++) {
        if (m >= mostRecentTopTimesFiltered.length) {
          break;
        }
        checkLength(mostRecentTopTimesFiltered[m])
        const ReadableTime = (mostRecentTopTimesFiltered[m].updated_on).split("T");
        const $map_div = $("<div>", {id: jsonMapId[mostRecentTopTimesFiltered[m].map_id][0], "class": "map_div"});
        $map_div.append("<img src=" + "https://d2u7y93d5eagqt.cloudfront.net/mapImages/thumbs/tn_" + jsonMapId[mostRecentTopTimesFiltered[m].map_id][0] + ".jpg>" + "<span style='color: white;'>" + jsonMapId[mostRecentTopTimesFiltered[m].map_id][0] + "<br>" + playerName + "<br>" + "<div>" + timeConvert(mostRecentTopTimesFiltered[m].time) + "</div>" + "<br>" + "<div style='color: white; font-size: 90%; font-style: italic'>" + getTimeDifference(mostRecentTopTimesFiltered[m].created_on) + "</div>" + "</span>");
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
    // On load show recent and latest
    recordsUrl = kz_simpleRecords;
    recordsTopUrl = kz_simpleTopRecords;
    kz_loadmap = kz_simpleLoadMap;
    currentmode = "kz_simple";

    document.getElementById("displayPlayerProfile").style.display = "none";
    document.getElementById("displayMapTimes").style.display = "none";

    recentAndLatest();
  });
