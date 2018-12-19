let maplist = [];
let xhr;
let xhr2;

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
let globalTimes = [];

const kz_simpleRecords =      "https://kztimerglobal.com/api/v1.0/records/top/recent?stage=0&tickrate=128&modes_list_string=kz_simple&limit=30";
const kz_timerRecords =       "https://kztimerglobal.com/api/v1.0/records/top/recent?stage=0&tickrate=128&modes_list_string=kz_timer&limit=30";
const kz_vanillaRecords =     "https://kztimerglobal.com/api/v1.0/records/top/recent?stage=0&tickrate=128&modes_list_string=kz_vanilla&limit=30";
const kz_simpleTopRecords =   "https://kztimerglobal.com/api/v1.0/records/top/recent?modes_list_string=kz_simple&place_top_at_least=1&has_teleports=false&stage=0&limit=100&tickrate=128";
const kz_timerTopRecords =    "https://kztimerglobal.com/api/v1.0/records/top/recent?modes_list_string=kz_timer&place_top_at_least=1&has_teleports=false&stage=0&limit=100&tickrate=128";
const kz_vanillaTopRecords =  "https://kztimerglobal.com/api/v1.0/records/top/recent?modes_list_string=kz_vanilla&place_top_at_least=1&has_teleports=false&stage=0&limit=100&tickrate=128";
const kz_simpleLoadMap =      "https://kztimerglobal.com/api/v1.0/records/top?modes_list_string=kz_simple";
const kz_timerLoadMap =       "https://kztimerglobal.com/api/v1.0/records/top?modes_list_string=kz_timer";
const kz_vanillaLoadMap =     "https://kztimerglobal.com/api/v1.0/records/top?modes_list_string=kz_vanilla";

const Leaderboard_points_simplekz =   "https://kztimerglobal.com/api/v1.0/player_ranks?finishes_greater_than=0&mode_ids=201&stages=0&tickrates=128&has_teleports=false&limit=20";
let leaderboardmode_points = Leaderboard_points_simplekz;
const Leaderboard_points_vanilla =    "https://kztimerglobal.com/api/v1.0/player_ranks?finishes_greater_than=0&mode_ids=202&stages=0&tickrates=128&has_teleports=false&limit=20";
const Leaderboard_points_kztimer =    "https://kztimerglobal.com/api/v1.0/player_ranks?finishes_greater_than=10&mode_ids=200&stages=0&tickrates=128&has_teleports=false&limit=20";
const Leaderboard_records_simplekz =  "https://kztimerglobal.com/api/v1.0/records/top/world_records?stages=0&mode_ids=201&tickrates=128&has_teleports=false&limit=20";
let leaderboardmode_records = Leaderboard_records_simplekz;
const Leaderboard_records_vanilla =   "https://kztimerglobal.com/api/v1.0/records/top/world_records?stages=0&mode_ids=202&tickrates=128&has_teleports=false&limit=20";
const Leaderboard_records_kztimer =   "https://kztimerglobal.com/api/v1.0/records/top/world_records?stages=0&mode_ids=200&tickrates=128&has_teleports=false&limit=20";

let page;
let name;
let map;
let currenttype;

let kz_loadmap;
let recordsUrl;
let recordsTopUrl;
let currentpage = 0;
let currentmode;

// Gets list of global maps
fetch("https://kztimerglobal.com/api/v1.0/maps?is_validated=true&limit=400")
.then(function(response) {
  return response.json();
})
.then(function(maps) {
  for (i=0;i<maps.length;i++) {
    maplist.push(maps[i]);
  }
});

function sortArray(array) {
  array.sort(function(a,b){
    return Date.parse(b.updated_on) - Date.parse(a.updated_on)
  });
  return array;
}

function getmode_id(mode) {
  if (mode === "kz_timer") {
    return 200;
  }
  else if (mode === "kz_simple") {
    return 201;
  }
  else if (mode === "kz_vanilla") {
    return 202;
  }
}

//https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
function disableScrolling(){
  var x=window.scrollX;
  var y=window.scrollY;
  window.onscroll=function(){window.scrollTo(x, y);};
}

function enableScrolling(){
  window.onscroll=function(){};
}

/* https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds */
function str_pad_left(string,pad,length) {
  return (new Array(length+1).join(pad)+string).slice(-length);
}

/* https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript */
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

function sortWorldRecords(array) {
  array.sort(function(a,b){
    return (b.world_records) - (a.world_records)
  });
  return array;
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
  if (name.player_name === null) {
    playerName = "null";
    return;
  }
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    if (name.player_name.toString().length > 13) {
      if (name.player_name.toString().length > 16) {
        playerName = name.player_name.substr(0,8).toLowerCase() + "...";
      } else { playerName = name.player_name.substr(0,10).toLowerCase() + "..."; }
    } else { playerName = name.player_name.substr(0).toLowerCase() }
  } else {
    if (name.player_name.toString().length > 14) {
      if (name.player_name.toString().length > 17) {
        playerName = name.player_name.substr(0,9).toLowerCase() + "...";
      } else { playerName = name.player_name.substr(0,11).toLowerCase() + "..."; }
    } else { playerName = name.player_name.substr(0).toLowerCase() }
  }
}

function getDifficulty(difficulty) {
  if (difficulty === 1) {
    return "Very Easy";
  }
  else if (difficulty === 2) {
    return "Easy";
  }
  else if (difficulty === 3) {
    return "Medium";
  }
  else if (difficulty === 4) {
    return "Hard";
  }
  else if (difficulty === 5) {
    return "Very Hard";
  }
  else if (difficulty === 6) {
    return "Death";
  }
  else {
    return "NA";
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

function getMaps(offset) {
  delete_maps_from_map_list();
  document.getElementById("loading").style.opacity = 1;
  document.getElementById("loading").style.zIndex = 1;
  let countmaps = 0;
  for (i=offset;i<maplist.length;i++) {
    if (countmaps >= 18) {
      break;
    }
    const $map_div = $("<div>", {id: maplist[i].name, "class": "maps_page_list"});
    $map_div.append("<img style='width: 150px; height: 84px;' src=" + "https://d2u7y93d5eagqt.cloudfront.net/mapImages/thumbs/tn_" + maplist[i].name + ".jpg>" + "<span style='color: white; padding-left: 15px;'>" + maplist[i].name + "<br>" + "<div>" + getDifficulty(maplist[i].difficulty) + "</div>" + "</span>");
    $("#list_of_maps").append($map_div);
    $map_div.click(function(event){
      if (event.target.parentNode.id.includes("_")) {
        document.getElementById("searchMap").value = event.target.parentNode.id;
        loadMap(document.getElementById("searchMap").value);
      }
    });
    countmaps++;
  }
  document.getElementById("pagination").style.display = "flex";
  document.getElementById("pagination").style.opacity = "1";
  document.getElementById("loading").style.opacity = 0;
  document.getElementById("loading").style.zIndex = -1;
}

function getPlayerBanInfo(url) {
  $("#playerBanInfo td").remove();
  document.getElementById("TablesBans").style.display = "none";
  document.getElementById("playerBanInfo").style.display = "flex";
  //console.log(url);
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(playerban) {
    //console.log(playerban.length);
    if (playerban.length === 0) {
      document.getElementById("gokz_api_player_ban_title").innerHTML = "This Steam ID is not banned";
      return;
    }
    document.getElementById("gokz_api_player_ban_title").innerHTML = playerban[0].steam_id;
    let row = document.getElementById("gokz_api_player_ban").insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    row.id = "TableTitle";
    cell1.innerHTML = "Steam ID";
    cell2.innerHTML = "Ban Type";
    cell3.innerHTML = "Stats";
    cell4.innerHTML = "Expires on";

    row = document.getElementById("gokz_api_player_ban").insertRow(-1);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell3 = row.insertCell(2);
    cell4 = row.insertCell(3);
    cell5 = row.insertCell(4);

    row.id = playerban[0].steam_id;
    //cell1.innerHTML = bans[i].player_name;
    cell1.innerHTML = playerban[0].steam_id;
    cell2.innerHTML = playerban[0].ban_type;
    cell3.innerHTML = playerban[0].stats;
    cell4.innerHTML = dateConvert(playerban[0].expires_on);
  });
}

function getBans(offset) {
  disableScrolling();
  document.getElementById("loading").style.opacity = 1;
  document.getElementById("loading").style.zIndex = 1;
  $("#TablesBans td").remove();
  document.getElementById("playerBans").style.display = "flex";
  document.getElementById("TablesBans").style.display = "flex";
  document.getElementById("playerBanInfo").style.display = "none";
  fetch('https://kztimerglobal.com/api/v1.0/bans?offset=' + offset + '&limit=20')
  .then(function(response) {
    return response.json();
  })
  .then(function(bans) {
    let row = document.getElementById('gokz_api_bans').insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    row.id = "TableTitle";
    //cell1.innerHTML = "Player Name";
    cell1.innerHTML = "Steam ID";
    cell2.innerHTML = "Ban Type";
    cell3.innerHTML = "Stats";
    cell4.innerHTML = "Expires on";
    //console.log(bans);
    for (i=0;i<20;i++) {
      let row = document.getElementById("gokz_api_bans").insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);

      row.id = bans[i].steam_id;
      //cell1.innerHTML = bans[i].player_name;
      cell1.innerHTML = bans[i].steam_id;
      cell2.innerHTML = bans[i].ban_type;
      cell3.innerHTML = bans[i].stats;
      cell4.innerHTML = dateConvert(bans[i].expires_on);
    }
    document.getElementById("loading").style.opacity = 0;
    document.getElementById("loading").style.zIndex = -1;
    enableScrolling();
  });
}

function getPlayerPoints(url) {
  let player_points = 0;
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(player) {
    if (player.length === 0) {
      player_points = 0;
    }
    else {
      player_points = player[0].points;
    }
    document.getElementById("playerPoints").innerHTML = numberWithCommas(player_points) + " Points";
    enableScrolling();
    if (document.getElementById("playerPoints").style.display === "none") {
      document.getElementById("playerPoints").style.display = "flex";
    }
  })
}

function getPlayerInfo_table_globals_only(postTimes) {
  $("#TableTimes td").remove();
  let row = document.getElementById("TableTimes").insertRow(-1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  let cell5 = row.insertCell(4);
  row.id = "TableTitle";
  cell1.innerHTML = "Map Name";
  cell2.innerHTML = "Time";
  cell3.innerHTML = "Points";
  cell4.innerHTML = "Server";
  cell5.innerHTML = "Date";
  count = 0;
  document.getElementById("showTimes").innerHTML = "TP Times";
  document.getElementById("showGlobalTimes").innerHTML = "Show All Times";
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
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    cell1.parentNode.id = postTimes[i].map_name;
    cell1.innerHTML = "🏆 " + postTimes[i].map_name;
    cell2.innerHTML = timeConvert(postTimes[i].time);
    cell3.innerHTML = postTimes[i].points;
    if (postTimes[i].server_name === null) {
      cell4.innerHTML = "NA";
    }
    else if (postTimes[i].server_name.length > 18) {
      cell4.innerHTML = postTimes[i].server_name.substr(0,15) + "...";
    } else {
      cell4.innerHTML = postTimes[i].server_name;
    }
    cell4.style.color = "#E45051";
    cell5.innerHTML = dateConvert(postTimes[i].created_on);
    count++;
  }
  enableScrolling();
  document.getElementById("pagination").style.display = "flex";
  $('td').click(function(event){
    if (event.target.parentNode.id === "TableTitle") {
      return;
    }
    document.getElementById("searchMap").value = event.target.parentNode.id;
    loadMap(document.getElementById("searchMap").value);
  });
}

function getPlayerInfo_table(postTimes) {
  $("#TableTimes td").remove();
  let row = document.getElementById("TableTimes").insertRow(-1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);

  if (postTimes[0].teleports > 0) {
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    row.id = "TableTitle";
    cell1.innerHTML = "Map Name";
    cell2.innerHTML = "Time";
    cell3.innerHTML = "TPs";
    cell4.innerHTML = "Server";
    cell5.innerHTML = "Date";
  } else {
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    row.id = "TableTitle";
    cell1.innerHTML = "Map Name";
    cell2.innerHTML = "Time";
    cell3.innerHTML = "Points";
    cell4.innerHTML = "Server";
    cell5.innerHTML = "Date";
  }
  let count = 0;
  document.getElementById("showGlobalTimes").innerHTML = "Global Times";
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

    if (postTimes[0].teleports > 0) {
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);

      cell1.parentNode.id = postTimes[i].map_name;
      cell1.innerHTML = postTimes[i].map_name;
      cell2.innerHTML = timeConvert(postTimes[i].time);
      cell3.innerHTML = postTimes[i].teleports;
      if(postTimes[i].server_name === null) {
        cell4.innerHTML = "null";
      }
      else if (postTimes[i].server_name.length > 18) {
        cell4.innerHTML = postTimes[i].server_name.substr(0,15) + "...";
      } else {
        cell4.innerHTML = postTimes[i].server_name;
      }
      cell4.style.color = "#E45051"
      cell5.innerHTML = dateConvert(postTimes[i].created_on);
    }
    else {
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      cell1.parentNode.id = postTimes[i].map_name;
      if (postTimes[i].points === 1000) {
        cell1.innerHTML = "🏆 " + postTimes[i].map_name;
      }
      else {
        cell1.innerHTML = postTimes[i].map_name;
      }
      cell2.innerHTML = timeConvert(postTimes[i].time);
      if (postTimes[i].points === 0) {
        cell3.innerHTML = "-";
      }
      else {
        cell3.innerHTML = postTimes[i].points;
      }
      if(postTimes[i].server_name === null) {
        cell4.innerHTML = "null";
      }
      else if (postTimes[i].server_name.length > 18) {
        cell4.innerHTML = postTimes[i].server_name.substr(0,15) + "...";
      } else {
        cell4.innerHTML = postTimes[i].server_name;
      }
      cell4.style.color = "#E45051"
      cell5.innerHTML = dateConvert(postTimes[i].created_on);
    }
    count++;
  }
  enableScrolling();
  document.getElementById("pagination").style.display = "flex";
  $('td').click(function(event){
    if (event.target.parentNode.id === "TableTitle") {
      return;
    }
    document.getElementById("searchMap").value = event.target.parentNode.id;
    loadMap(document.getElementById("searchMap").value);
  });
}

// Player Profile Function. Gets all the information for the player profile page.
function getPlayerInfo(url) {
  disableScrolling();
  currentpage = 0;
  document.getElementById("playerName").innerHTML = "";
  document.getElementById("playerPoints").style.display = "none";
  document.getElementById("displayTimes").style.display = "none";
  document.getElementById("displayMapTimes").style.display = "none";
  document.getElementById("loading").style.opacity = 1;
  document.getElementById("loading").style.zIndex = 1;
  usedTimes = [];
  postTimes = [];

  $("#TableTimes td").remove();
  $("#playerInfo div").remove();
  $("#playerName a").remove();

  if (mode === "kz_simple") {
    document.getElementById("TitleLeaderboards").innerHTML = "Top 20 Players for SimpleKZ";
    document.getElementById("mode-kz_simple-desktop").style.color = "orange";
    document.getElementById("mode-kz_timer-desktop").style.color = "#E45051";
    document.getElementById("mode-kz_vanilla-desktop").style.color = "#E45051";

  }
  else if (mode === "kz_timer") {
    document.getElementById("TitleLeaderboards").innerHTML = "Top 20 Players for KZTimer";
    document.getElementById("mode-kz_simple-desktop").style.color = "#E45051";
    document.getElementById("mode-kz_timer-desktop").style.color = "orange";
    document.getElementById("mode-kz_vanilla-desktop").style.color = "#E45051";
  }
  else if (mode === "kz_vanilla") {
    document.getElementById("TitleLeaderboards").innerHTML = "Top 20 Players for Vanilla";
    document.getElementById("mode-kz_simple-desktop").style.color = "#E45051";
    document.getElementById("mode-kz_timer-desktop").style.color = "#E45051";
    document.getElementById("mode-kz_vanilla-desktop").style.color = "orange";
  }

  $.ajax({
    url: url,
    success: function(playerInfo) {
      document.getElementById("loading").style.opacity = 0;
      document.getElementById("loading").style.zIndex = -1;
      if (playerInfo.length === 0) {
        $("#TableTimes tr").remove();
        let row = document.getElementById("TableTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        cell1.innerHTML = "No Records Found";
        document.getElementById("playerName").innerHTML = "No Player Found";
        return;
      }
      window.history.replaceState('map', 'Map', '/?name=' + playerInfo[0].steam_id + '&mode=' + currentmode);
      document.getElementById("searchMap").value = playerInfo[0].steam_id;

      // Filters already seen maps
      for (i=0;i<playerInfo.length;i++) {
        if (playerInfo[i].steam_id !== playerInfo[0].steam_id) {
          continue;
        }
        if (usedTimes.includes(playerInfo[i].map_id)) {
          continue;
        }
        usedTimes.push(playerInfo[i].map_id);
        postTimes.push(playerInfo[i]);
      }
      checkLength(playerInfo[0]);
      document.getElementById("playerName").innerHTML = playerName;
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
      }
      if (url.includes("teleports=true")) {
        $('#playerInfo').append("<div id='playerProTimes'>" + postTimes.length + " / " + maplist.length + " TP Times</div>");
        $('#playerInfo').append("<div id='showTimes'>Pro Times</div>");
        $('#playerInfo').append("<div id='showGlobalTimes'>Global Times</div>");
        document.getElementById("showGlobalTimes").style.display = "none";
      }
      else {
        $('#playerInfo').append("<div id='playerProTimes'>" + postTimes.length + " / " + maplist.length + " Pro Times</div>");
        $('#playerInfo').append("<div id='showTimes'>TP Times</div>");
        $('#playerInfo').append("<div id='showGlobalTimes'>Global Times</div>");
        document.getElementById("showGlobalTimes").style.display = "block";
      }
      postTimes = sortArray(postTimes);
      getPlayerInfo_table(postTimes);

      steamid = (playerInfo[0].steam_id).split(":");
      steam64 = BigInteger(steamid[2]);
      steam64 = BigInteger(steam64.multiply(2).toString());
      if (steamid[1] === "1") {
        steamBigInt = BigInteger('76561197960265729');
      } else {
        steamBigInt = BigInteger('76561197960265728');
      }
      if (currentmode === "kz_timer") {
        map_mode = 200;
      }
      else if (currentmode === "kz_simple") {
        map_mode = 201;
      }
      else if (currentmode === "kz_vanilla") {
        map_mode = 202;
      }
      getPlayerPoints("https://kztimerglobal.com/api/v1.0/player_ranks?steamid64s=" + steam64.add(steamBigInt).toString() + "&stages=0&mode_ids=" + map_mode + "&has_teleports=false&finishes_greater_than=0");
      document.getElementById("showTimes").addEventListener("click", function() {
        // If on pro, swap to TP. Else go to pro.
        if(url.includes("teleports=false")) {
          getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top?steam_id=" + postTimes[0].steam_id + "&tickrate=128&stage=0&has_teleports=true&limit=1200&&place_top_at_least=20&modes_list_string=" + currentmode);
        }
        else {
          getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top?steam_id=" + postTimes[0].steam_id + "&tickrate=128&stage=0&has_teleports=false&limit=1200&&place_top_at_least=20&modes_list_string=" + currentmode);
        }
      });

      document.getElementById("showGlobalTimes").addEventListener("click", function() {
        if (document.getElementById("showGlobalTimes").innerHTML === "Show All Times") {
          getPlayerInfo_table(postTimes);
        }
        else {
          globalTimes = [];
          for (i=0;i<postTimes.length;i++) {
            if (postTimes[i].points !== 1000) {
              continue;
            }
            globalTimes.push(postTimes[i]);
          }
          getPlayerInfo_table_globals_only(globalTimes);
        }
      });
    },
    timeout: 8000,
    error: function(jqXHR, textStatus, errorThrown) {
      if(textStatus==="timeout") {
        console.log("Request has timed out.");
        getPlayerInfo(url); //Handle the timeout
      } else {
        console.log(errorThrown); //Handle other error type
        document.getElementById("errorloading").style.display = "flex";
      }
    }
  });
  document.getElementById("playerName").style.display = "flex";
  document.getElementById("displayTimes").style.display = "none";
  document.getElementById("displayMapTimes").style.display = "none";
  document.getElementById("playerName").style.display = "flex";
  document.getElementById("pagination").style.display = "flex";
  document.getElementById("pagination").style.opacity = 1;
  document.getElementById("displayPlayerProfile").style.display = "flex";
  document.getElementById("maps").style.display = "none";
  document.getElementById("playerLeaderboards").style.display = "none";
  document.getElementById("graph_container").style.display = "none";
  document.getElementById("button_container").style.display = "none";
  document.getElementById("map_search").style.display = "none";
  document.getElementById("map_graph").style.display = "none";
}

// https://stackoverflow.com/questions/10015027/javascript-tofixed-not-rounding
function toFixed(num, precision) {
  return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
}





function Leaderboard(mode, type) {
  disableScrolling();
  document.getElementById("loading").style.opacity = 1;
  document.getElementById("loading").style.zIndex = 1;
  document.getElementById("graph_container").style.display = "none";
  document.getElementById("button_container").style.display = "none";
  document.getElementById("map_search").style.display = "none";

  $("tbody tr").remove();

  leaderboardmode_points = "https://kztimerglobal.com/api/v1.0/player_ranks?finishes_greater_than=0&stages=0&mode_ids=" + getmode_id(mode) + "&has_teleports=false&limit=20&mapTag=" + type;
  leaderboardmode_records = "https://kztimerglobal.com/api/v1.0/records/top/world_records?stages=0&mode_ids=" + getmode_id(mode) + "&tickrates=128&has_teleports=false&limit=20&mapTag=" + type;

  if (mode === "kz_simple") {
    document.getElementById("TitleLeaderboards").innerHTML = "Top 20 Players for SimpleKZ";
    document.getElementById("mode-kz_simple-desktop").style.color = "orange";
    document.getElementById("mode-kz_timer-desktop").style.color = "#E45051";
    document.getElementById("mode-kz_vanilla-desktop").style.color = "#E45051";

  }
  else if (mode === "kz_timer") {
    document.getElementById("TitleLeaderboards").innerHTML = "Top 20 Players for KZTimer";
    document.getElementById("mode-kz_simple-desktop").style.color = "#E45051";
    document.getElementById("mode-kz_timer-desktop").style.color = "orange";
    document.getElementById("mode-kz_vanilla-desktop").style.color = "#E45051";
  }
  else if (mode === "kz_vanilla") {
    document.getElementById("TitleLeaderboards").innerHTML = "Top 20 Players for Vanilla";
    document.getElementById("mode-kz_simple-desktop").style.color = "#E45051";
    document.getElementById("mode-kz_timer-desktop").style.color = "#E45051";
    document.getElementById("mode-kz_vanilla-desktop").style.color = "orange";
  }

  window.history.replaceState('page', 'Page', '/?page=leaderboards' + '&mode=' + mode + '&type=' + type);

  $.ajax({
    url: leaderboardmode_points,
    success: function(recordsTop) {

      let row = document.getElementById("LeaderboardTables_points").insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);

      row.id = "TableTitle";
      cell1.innerHTML = "Rank";
      cell2.innerHTML = "Player Name";
      cell3.innerHTML = "Average";
      cell4.innerHTML = "Points";

      let for_loop_length = (recordsTop.length > 20 ? 20 : recordsTop.length);

      for (i=0;i<for_loop_length;i++) {
        let row = document.getElementById("LeaderboardTables_points").insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        cell1.innerHTML = (i+1);
        cell2.id = recordsTop[i].steamid;
        checkLength(recordsTop[i]);
        cell2.innerHTML = playerName; //.player_name;
        cell3.innerHTML = toFixed(recordsTop[i].average,1);
        cell4.innerHTML = numberWithCommas(recordsTop[i].points);
      }

      $.ajax({
        url: leaderboardmode_records,
        success: function(recordsTop) {

          let row = document.getElementById("LeaderboardTables_records").insertRow(-1);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);

          row.id = "TableTitle";
          cell1.innerHTML = "Rank";
          cell2.innerHTML = "Player Name"
          cell3.innerHTML = "Records";

          let for_loop_length = (recordsTop.length > 20 ? 20 : recordsTop.length);

          for (i=0;i<for_loop_length;i++) {
            let row = document.getElementById("LeaderboardTables_records").insertRow(-1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);

            cell1.innerHTML = (i+1);
            cell2.id = recordsTop[i].steam_id;
            checkLength(recordsTop[i]);
            cell2.innerHTML = playerName; //.player_name;
            cell3.innerHTML = recordsTop[i].count;
          }
          enableScrolling();
          document.getElementById("loading").style.opacity = 0;
          document.getElementById("loading").style.zIndex = -1;
          $('td').click(function(event){
            if (event.target.id.includes("STEAM_")) {
              document.getElementById("searchMap").value = event.target.id;
              getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top?steam_id=" + event.target.id + "&tickrate=128&stage=0&has_teleports=false&limit=1200&&place_top_at_least=20&modes_list_string=" + currentmode);
            }
          });
        }
      });
    }
  });
}

// Map Times
function loadMap(map) {
  let nocompleteTP;
  let nocompletePro;
  disableScrolling();
  $("#TableProTimes tr").remove();
  $("#TableOverallTimes tr").remove();
  currentpage = 0;
  document.getElementById("maps").style.display = "none";
  document.getElementById("loading").style.opacity = 1;
  document.getElementById("loading").style.zIndex = 1;
  document.getElementById("previous").style.background = "#cb6f6c";
  document.getElementById("next").style.background = "#222831";
  document.getElementById("playerName").style.display = "none";
  document.getElementById("maps").style.display = "none";
  document.getElementById("displayPlayerProfile").style.display = "none";
  document.getElementById("playerLeaderboards").style.display = "none";
  document.getElementById("graph_container").style.display = "flex";
  document.getElementById("button_container").style.display = "flex";
  if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))) {
    document.getElementById("map_search").style.display = "flex";
  }
  searchMapName = map.toLowerCase();
  document.getElementById("searchMap").value = searchMapName;

  let searchUrlPro;
  let searchUrlTP;

  if (document.getElementById("searchMap").value.length > 0) {
    for (i=0;i<maplist.length;i++) {
      if (maplist[i].name.includes(searchMapName)) {
        searchMapName = maplist[i].name;
        document.getElementById("searchMap").value = maplist[i].name;
        searchUrlPro = kz_loadmap + "&map_id=" + maplist[i].id + "&stage=0&has_teleports=false&limit=100&tickrate=128";
        searchUrlTP = kz_loadmap + "&map_id=" + maplist[i].id + "&stage=0&has_teleports=true&limit=100&tickrate=128";
        break;
      }
    }
    window.history.replaceState('map', 'Map', '/?map=' + searchMapName + '&mode=' + currentmode);

    if (mode === "kz_simple") {
      document.getElementById("mode-kz_simple-desktop").style.color = "orange";
      document.getElementById("mode-kz_timer-desktop").style.color = "#E45051";
      document.getElementById("mode-kz_vanilla-desktop").style.color = "#E45051";

    }
    else if (mode === "kz_timer") {
      document.getElementById("mode-kz_simple-desktop").style.color = "#E45051";
      document.getElementById("mode-kz_timer-desktop").style.color = "orange";
      document.getElementById("mode-kz_vanilla-desktop").style.color = "#E45051";
    }
    else if (mode === "kz_vanilla") {
      document.getElementById("mode-kz_simple-desktop").style.color = "#E45051";
      document.getElementById("mode-kz_timer-desktop").style.color = "#E45051";
      document.getElementById("mode-kz_vanilla-desktop").style.color = "orange";
    }

    $.ajax({
      url: searchUrlTP,
      success: function(mapTP) {
        mapRecentTimes = mapTP.slice();
        let position = 0;

        if (mapTP.length === 0) {
          let row = document.getElementById("TableOverallTimes").insertRow(-1);
          let cell1 = row.insertCell(0);
          cell1.id = "DisableRight";
          cell1.innerHTML = "No Records Found";
          document.getElementById("displayTimes").style.display = "none";
          document.getElementById("displayMapTimes").style.display = "flex";
          document.getElementById("loading").style.zIndex = -1;
          document.getElementById("loading").style.opacity = 0;
          return;
        }
        let numberOfTPTimes = (mapTP.length < 20 ? mapTP.length : 20)

        let row = document.getElementById("TableOverallTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        row.id = "TableTitle";
        cell1.innerHTML = "#";
        cell2.innerHTML = "Player";
        cell3.innerHTML = "Time";
        cell4.innerHTML = "Teleports";
        cell5.innerHTML = "Server";
        cell6.innerHTML = "Date";

        for (i=0;i<numberOfTPTimes;i++) {
          if (mapTP[i].map_name !== searchMapName) {
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
          let cell6 = row.insertCell(5);

          row.id = mapTP[i].steam_id;
          cell2.id = "name";
          cell2.innerHTML = playerName;
          cell3.innerHTML = timeConvert(mapTP[i].time);

          if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))) {
            cell1.innerHTML = position;
            cell4.innerHTML = mapTP[i].teleports + " TPs";
            if (mapTP[i].server_name === null) {
              cell5.innerHTML = "null";
            }
            else if (mapTP[i].server_name.length > 18) {
              cell5.innerHTML = mapTP[i].server_name.substr(0,15) + "...";
            } else {
              cell5.innerHTML = mapTP[i].server_name;
            }
            cell6.innerHTML = dateConvert(mapTP[i].created_on);
          } else {
            cell4.innerHTML = mapTP[i].teleports;
          }
          document.getElementById("displayTimes").style.display = "none";
          document.getElementById("displayMapTimes").style.display = "flex";

        }
        enableScrolling();
        document.getElementById("pagination").style.display = "flex";
        setTimeout(function(){
          document.getElementById("loading").style.zIndex = -1;
          document.getElementById("loading").style.opacity = 0;
        }, 500);
        $('td').click(function(event){
          if (event.target.parentNode.id.includes("STEAM_") && event.target.parentNode.parentNode.parentNode.id === "TableOverallTimes") {
            document.getElementById("searchMap").value = event.target.parentNode.id;
            getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top?steam_id=" + event.target.parentNode.id + "&tickrate=128&stage=0&has_teleports=false&limit=1200&place_top_at_least=20&modes_list_string=" + currentmode);
          }
        });
      }
    });
    $.ajax({
      url: searchUrlPro,
      success: function(mapPro) {
        mapProTimes = mapPro.slice();
        let position = 0;

        if (mapPro.length === 0) {
          let row = document.getElementById("TableProTimes").insertRow(-1);
          let cell1 = row.insertCell(0);
          cell1.id = "DisableRight";
          cell1.innerHTML = "No Records Found";
          document.getElementById("displayTimes").style.display = "none";
          document.getElementById("displayMapTimes").style.display = "flex";
          document.getElementById("loading").style.zIndex = -1;
          document.getElementById("loading").style.opacity = 0;
          return;
        }
        let numberOfProTimes = (mapPro.length < 20 ? mapPro.length : 20);

        let row = document.getElementById("TableProTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        row.id = "TableTitle";
        cell1.innerHTML = "#";
        cell2.innerHTML = "Player";
        cell3.innerHTML = "Time";
        cell4.innerHTML = "Points";
        cell5.innerHTML = "Server";
        cell6.innerHTML = "Date";

        for (i=0;i<numberOfProTimes;i++) {
          if (mapPro[i].map_name !== searchMapName) {
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
          let cell4 = row.insertCell(3);
          let cell5 = row.insertCell(4);
          row.id = mapPro[i].steam_id;
          cell1.innerHTML = position;
          cell2.id = "name";
          cell2.innerHTML = playerName;
          cell3.innerHTML = timeConvert(mapPro[i].time);
          if (mapPro[i].points === 0) {
            cell4.innerHTML = "-";
          }
          else {
            cell4.innerHTML = mapPro[i].points;
          }
          if (mapPro[i].server_name === null) {
            cell5.innerHTML = "null";
          }
          else if (mapPro[i].server_name.length > 18) {
            cell5.innerHTML = mapPro[i].server_name.substr(0,15) + "...";
          } else {
            cell5.innerHTML = mapPro[i].server_name;
          }
          let cell6 = row.insertCell(5);
          cell6.innerHTML = dateConvert(mapPro[i].created_on);
          document.getElementById("displayTimes").style.display = "none";
          document.getElementById("displayMapTimes").style.display = "flex";
        }
        setTimeout(function(){
          document.getElementById("loading").style.zIndex = -1;
          document.getElementById("loading").style.opacity = 0;
        }, 500);
        document.getElementById("pagination").style.display = "flex";
        $('td').click(function(event){
          if (event.target.parentNode.id.includes("STEAM_") && event.target.parentNode.parentNode.parentNode.id === "TableProTimes") {
            document.getElementById("searchMap").value = event.target.parentNode.id;
            getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top?steam_id=" + event.target.parentNode.id + "&tickrate=128&stage=0&has_teleports=false&limit=1200&place_top_at_least=20&modes_list_string=" + currentmode);
          }
        });
      }
    });
  }
}

function getRecent() {
  let records;
  /*if (localStorage.getItem('records_' + currentmode) !== null) {
  a = localStorage.getItem('records_lastCheck_' + currentmode);
  let differenceB = (Date.now() - a)/60000;

  if (differenceB > 5000000) {
  //console.log("LocalStorage Used - Recent Records: " + currentmode);
  document.getElementById("loading").style.opacity = 1;
  document.getElementById("loading").style.zindex = 1;
  records = JSON.parse(localStorage['records_' + currentmode]);
  mostRecentTimes = [];
  // Hides broken times
  for(i=0;i<records.length;i++) {
  if(records[i].time < 14) { continue; }
  mostRecentTimes.push(records[i]);
}
mostRecentTimes = sortArray(mostRecentTimes);
forSize = (records.length < 5 ? records.length : 5);
for (i=0;i<forSize;i++) {
if (document.getElementsByClassName("recent_runs").length >= 5) {
break;
}
checkLength(mostRecentTimes[i])
const ReadableTime = (mostRecentTimes[i].updated_on).split("T");
const $map_div = $("<div>", {id: mostRecentTimes[i].map_name, "class": "map_div recent_runs"});

$map_div.append("<img src=" + "https://d2u7y93d5eagqt.cloudfront.net/mapImages/thumbs/tn_" + mostRecentTimes[i].map_name + ".jpg>" + "<span style='color: white;'>" + mostRecentTimes[i].map_name + " <br>" + playerName + "<br>" + "<div>" + (mostRecentTimes[i].top_100 === 0 ? "NA" : '#' + mostRecentTimes[i].top_100) + "</div>" + " / " + "<div>" + timeConvert(mostRecentTimes[i].time) + "</div><br>" + mostRecentTimes[i].teleports + " TPs" + "</span>");
// This was created by Chuckles to help with selecting maps for users. Extremely useful as most users tend to not use their keyboard in 2018.
$map_div.click(function(event){
if (event.target.parentNode.id.includes("_")) {
document.getElementById("searchMap").value = event.target.parentNode.id;
loadMap(document.getElementById("searchMap").value);
}
});
$("#recentTimes").append($map_div);
if (document.getElementsByClassName("pro_runs").length == 5 && document.getElementsByClassName("recent_runs").length == 5) {
setTimeout(function(){
document.getElementById("loading").style.zIndex = -1;
document.getElementById("loading").style.opacity = 0;
document.getElementById("pagination").style.opacity = 1;
}, 500);
}
}
enableScrolling();
}
else {
localStorage.setItem('records_lastCheck_' + currentmode,new Date().getTime());
localStorage.removeItem('records_' + currentmode);
document.getElementById("loading").style.opacity = 1;
document.getElementById("loading").style.zIndex = 1;
getRecent();
}
}
else {*/
xhr2 = $.ajax({
  url: recordsUrl,
  success: function(records) {
    //  console.log("API Used - Recent Records: " + currentmode);
    document.getElementById("displayTimes").style.display === "flex";
    mostRecentTimes = [];
    //localStorage.setItem('records_' + currentmode,JSON.stringify(records));
    // Hides broken times
    for(i=0;i<records.length;i++) {
      if(records[i].time < 14) { continue; }
      mostRecentTimes.push(records[i]);
    }

    mostRecentTimes = sortArray(mostRecentTimes);
    forSize = (records.length < 5 ? records.length : 5);

    for (i=0;i<forSize;i++) {
      if (document.getElementsByClassName("recent_runs").length >= 5) {
        break;
      }
      checkLength(mostRecentTimes[i])
      const ReadableTime = (mostRecentTimes[i].updated_on).split("T");
      const $map_div = $("<div>", {id: mostRecentTimes[i].map_name, "class": "map_div recent_runs"});

      $map_div.append("<img src=" + "https://d2u7y93d5eagqt.cloudfront.net/mapImages/thumbs/tn_" + mostRecentTimes[i].map_name + ".jpg>" + "<span style='color: white;'>" + mostRecentTimes[i].map_name + " <br>" + playerName + "<br>" + "<div>" + (mostRecentTimes[i].top_100 === 0 ? "NA" : '#' + mostRecentTimes[i].top_100) + "</div>" + " | " + "<div>" + timeConvert(mostRecentTimes[i].time) + "</div><br>" + mostRecentTimes[i].teleports + " TPs" + "</span>");
      // This was created by Chuckles to help with selecting maps for users. Extremely useful as most users tend to not use their keyboard in 2018.
      $map_div.click(function(event){
        if (event.target.parentNode.id.includes("_")) {
          document.getElementById("searchMap").value = event.target.parentNode.id;
          loadMap(document.getElementById("searchMap").value);
        }
      });
      $("#recentTimes").append($map_div);
      if (document.getElementsByClassName("pro_runs").length == 5 && document.getElementsByClassName("recent_runs").length == 5) {
        document.getElementById("loading").style.zIndex = -1;
        document.getElementById("loading").style.opacity = 0;
        document.getElementById("pagination").style.opacity = 1;
      }
    }
    enableScrolling();
  },
  timeout: 16000,
  error: function(jqXHR, textStatus, errorThrown) {
    if(textStatus==="timeout") {
      console.log("Request has timed out.");
      xhr2.abort();
      getRecent(); //Handle the timeout
    }
    else if (errorThrown === "abort") {
    }
    else {
      console.log(errorThrown); //Handle other error type
      document.getElementById("errorloading").innerHTML = errorThrown + ". Please try again in a few minutes.";
      document.getElementById("errorloading").style.display = "flex";
    }
  }
});
//}
}

function getLatest() {

  let recordsTop;
  /*if (localStorage.getItem('recordsTop_' + currentmode) !== null) {
  a = localStorage.getItem('recordsTop_lastCheck_' + currentmode);
  let differenceA = (Date.now() - a)/60000;

  if (differenceA > 5000000) {
  //console.log("LocalStorage Used - World Records: " + currentmode);
  document.getElementById("loading").style.opacity = 1;
  recordsTop = JSON.parse(localStorage['recordsTop_' + currentmode]);

  mostRecentTopTimes = [];
  usedTopTimes = [];
  mostRecentTopTimesFiltered = [];

  for(i=0;i<recordsTop.length;i++) {
  mostRecentTopTimes.push(recordsTop[i]);
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
if (document.getElementsByClassName("pro_runs").length >= 5) {
break;
}
if (m >= mostRecentTopTimesFiltered.length) {
break;
}

checkLength(mostRecentTopTimesFiltered[m]);
const ReadableTime = (mostRecentTopTimesFiltered[m].updated_on).split("T");
const $map_div = $("<div>", {id: mostRecentTopTimesFiltered[m].map_name, "class": "map_div pro_runs"});

$map_div.append("<img src=" + "https://d2u7y93d5eagqt.cloudfront.net/mapImages/thumbs/tn_" + mostRecentTopTimesFiltered[m].map_name + ".jpg>" + "<span style='color: white;'>" + mostRecentTopTimesFiltered[m].map_name + "<br>" + playerName + "<br>" + "<div>" + timeConvert(mostRecentTopTimesFiltered[m].time) + "</div>" + "<br>" + "<div style='color: white; font-size: 90%; font-style: italic'>" + getTimeDifference(mostRecentTopTimesFiltered[m].created_on) + "</div>" + "</span>");
$map_div.click(function(event){
if (event.target.parentNode.id.includes("_")) {
document.getElementById("searchMap").value = event.target.parentNode.id;
loadMap(document.getElementById("searchMap").value);
}
});
$("#topTimes").append($map_div);
if (document.getElementsByClassName("pro_runs").length == 5 && document.getElementsByClassName("recent_runs").length == 5) {
document.getElementById("loading").style.zIndex = -1;
document.getElementById("loading").style.opacity = 0;
document.getElementById("pagination").style.opacity = 1;
}
}
enableScrolling();
}
else {
localStorage.setItem('recordsTop_lastCheck_' + currentmode,new Date().getTime());
localStorage.removeItem('recordsTop_' + currentmode);
document.getElementById("loading").style.opacity = 1;
document.getElementById("loading").style.zIndex = 1;
getLatest();
}
}
else {*/
xhr = $.ajax({
  url: recordsTopUrl,
  success: function(response) {
    //console.log("API Used - World Records: " + currentmode);
    recordsTop = response;

    mostRecentTopTimes = [];
    usedTopTimes = [];
    mostRecentTopTimesFiltered = [];

    //localStorage.setItem('recordsTop_' + currentmode,JSON.stringify(recordsTop));

    for(i=0;i<recordsTop.length;i++) {
      mostRecentTopTimes.push(recordsTop[i]);
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
      if (document.getElementsByClassName("pro_runs").length >= 5) {
        break;
      }
      if (m >= mostRecentTopTimesFiltered.length) {
        break;
      }

      checkLength(mostRecentTopTimesFiltered[m]);
      const ReadableTime = (mostRecentTopTimesFiltered[m].updated_on).split("T");
      const $map_div = $("<div>", {id: mostRecentTopTimesFiltered[m].map_name, "class": "map_div pro_runs"});

      $map_div.append("<img src=" + "https://d2u7y93d5eagqt.cloudfront.net/mapImages/thumbs/tn_" + mostRecentTopTimesFiltered[m].map_name + ".jpg>" + "<span style='color: white;'>" + mostRecentTopTimesFiltered[m].map_name + "<br>" + playerName + "<br>" + "<div>" + timeConvert(mostRecentTopTimesFiltered[m].time) + "</div>" + "<br>" + "<div style='color: white; font-size: 90%; font-style: italic'>" + getTimeDifference(mostRecentTopTimesFiltered[m].created_on) + "</div>" + "</span>");
      $map_div.click(function(event){
        if (event.target.parentNode.id.includes("_")) {
          document.getElementById("searchMap").value = event.target.parentNode.id;
          loadMap(document.getElementById("searchMap").value);
        }
      });
      $("#topTimes").append($map_div);
      if (document.getElementsByClassName("pro_runs").length == 5 && document.getElementsByClassName("recent_runs").length == 5) {
        setTimeout(function(){ document.getElementById("loading").style.zIndex = -1; }, 500);
        document.getElementById("loading").style.opacity = 0;
        document.getElementById("pagination").style.opacity = 1;
      }
    }
    enableScrolling();
  },
  timeout: 16000,
  error: function(jqXHR, textStatus, errorThrown) {
    if(textStatus==="timeout") {
      console.log("Request has timed out.");
      xhr.abort();
      getLatest(); //Handle the timeout
    }
    else if (errorThrown === "abort") {
    }
    else {
      console.log(errorThrown); //Handle other error type
      document.getElementById("errorloading").innerHTML = errorThrown + ". Please try again in a few minutes.";
      document.getElementById("errorloading").style.display = "flex";
    }
  }
});
//}
}

function recentAndLatest() {
  disableScrolling();

  document.getElementById("loading").style.opacity = 1;
  document.getElementById("loading").style.zIndex = 1;

  document.getElementById("graph_container").style.display = "none";
  document.getElementById("button_container").style.display = "none";
  document.getElementById("maps").style.display = "none";
  document.getElementById("map_search").style.display = "none";
  document.getElementById("map_graph").style.display = "none";
  document.getElementById("loading").style.opacity = 1;
  document.getElementById("loading").style.zIndex = 1;
  currentpage = 0;
  document.getElementById("previous").style.background = "#cb6f6c";
  document.getElementById("next").style.background = "#222831";
  window.history.pushState('home', 'Home', '/');
  getRecent();
  getLatest();
}



/* Burr stuff */

let c,d,loc,scale;
arrayX = [];
arrayY = [];
arrayX2 = [];
arrayY2 = [];
maplist = [];
let map_id;
let trace1;
let trace2;
let minPoints = 0.1;

function mapSearch(map) {
  arrayX = [];
  arrayY = [];
  arrayX2 = [];
  arrayY2 = [];


  fetch('https://kztimerglobal.com/api/v1.0/maps?name=' + map)
  .then(function(response) {
    return response.json();
  })
  .then(function(map) {
    map_id = map[0].id;
  })
  .then(() => {
    if (currentmode === "kz_timer") {
      map_mode = 200;
    }
    else if (currentmode === "kz_simple") {
      map_mode = 201;
    }
    else if (currentmode === "kz_vanilla") {
      map_mode = 202;
    }
    fetch('https://kztimerglobal.com/api/v1.0/record_filters/distributions?map_ids=' + map_id + '&stages=0&mode_ids=' + map_mode + '&tickrates=128&has_teleports=false')
    .then(function(response) {
      return response.json();
    })
    .then(function(map_distribution) {
      c = map_distribution[0].c;
      d = map_distribution[0].d;
      loc = map_distribution[0].loc;
      scale = map_distribution[0].scale;
      top_scale = map_distribution[0].top_scale;
    })
    .then(() => {
      burr(c,d);
      perc(c,scale,top_scale);
    })
    .then(() => {
      var data = [trace1, trace2];
      var layout = {
        title: 'Burr12 Data Distribution for ' + document.getElementById("map_search").value,
        yaxis: {
          title: 'Burr',
          autotick: false,
          ticks: 'outside',
          tick0: 0,
          dtick: 0.002,
          ticklen: 8,
          tickwidth: 2,
          autorange: true,
          tickcolor: '#000'
        },
        yaxis2: {
          title: 'Percentile',
          titlefont: {color: 'rgb(148, 103, 189)'},
          tickfont: {color: 'rgb(148, 103, 189)'},
          overlaying: 'y',
          side: 'right',
          autotick: false,
          ticks: 'outside',
          tick0: 0,
          dtick: 0.2,
          ticklen: 8,
          tickwidth: 2,
          autorange: true,
          tickcolor: '#000'
        },
        xaxis: {
          title: 'Time (in seconds)',
          autorange: true
        }
      };

      Plotly.newPlot('map_graph', data, layout);
      document.getElementById('map_search').style.display = "none";
      document.getElementById("button_container").style.display = "flex";
      document.getElementById('graph_container').style.display = "flex";
      document.getElementById('map_graph').style.display = "flex";
    });
  });
}


function burr(c,d) {
  for (i=0;i<10000;i++) {
    t = ((i - loc) / scale)

    //We're doing this calc twice, which is bad.  Once in perc and once here.  combine
    var score = Math.pow(1 + Math.pow(t,c),-d);
    if(score < minPoints){
      break;
    }

    arrayX2.push(i);
    arrayY2.push((c*d*Math.pow(t,c-1)) * Math.pow(1+Math.pow(t,c),-d-1) / scale)
  }

  trace1 = {
    x: arrayX2,
    y: arrayY2,
    name: "burr",
    type: "scatter"
  }
}

function perc(c,k,top_scale) {
  for (i=0;i<10000;i++) {
    t = ((i - loc) / scale);

    var percentile = Math.pow(1 + Math.pow(t,c),-d);
    if(percentile < minPoints){
      break;
    }
    arrayX.push(i);
    top_scale_fix = Math.pow(1 + Math.pow(t,c),-d)*top_scale;
    bigger_top_scale_fix = (top_scale_fix > 1 ? top_scale_fix = 1 : top_scale_fix);
    arrayY.push(bigger_top_scale_fix);
    //arrayY.push(Math.pow(1 + Math.pow(t,c),-d))
  }
  trace2 = {
    x: arrayX,
    y: arrayY,
    name: "percentile",
    yaxis: 'y2',
    type: "scatter"
  };
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

function showLeaderboards() {
  document.getElementById("maps").style.display = "none";
  document.getElementById("searchMap").value = "";
  document.getElementById("playerLeaderboards").style.display = "flex";
  document.getElementById("playerBanInfo").style.display = "none";
  document.getElementById("playerBans").style.display = "none";
  document.getElementById("displayMapTimes").style.display = "none";
  document.getElementById("displayTimes").style.display = "none";
  document.getElementById("playerName").style.display = "none";
  document.getElementById("displayPlayerProfile").style.display = "none";
  document.getElementById("pagination").style.display = "none";
  document.getElementById("graph_container").style.display = "none";
  document.getElementById("button_container").style.display = "none";
  document.getElementById("map_search").style.display = "none";
  if (typeof(currenttype) === "undefined") {
    currenttype = "overall";
    window.history.replaceState('page', 'Page', '/?page=leaderboards' + '&mode=' + currentmode + '&type=' + currenttype);
    Leaderboard(currentmode,currenttype);
  }
  else {
    window.history.replaceState('page', 'Page', '/?page=leaderboards' + '&mode=' + currentmode + '&type=' + currenttype);
    Leaderboard(currentmode,currenttype);
  }
}

function showBans() {
  document.getElementById("searchMap").value = "";
  document.getElementById("playerBans").style.display = "flex";
  document.getElementById("playerBanInfo").style.display = "none";
  document.getElementById("maps").style.display = "none";
  document.getElementById("playerLeaderboards").style.display = "none";
  document.getElementById("displayMapTimes").style.display = "none";
  document.getElementById("displayTimes").style.display = "none";
  document.getElementById("playerName").style.display = "none";
  document.getElementById("displayPlayerProfile").style.display = "none";
  document.getElementById("pagination").style.display = "none";
  document.getElementById("graph_container").style.display = "none";
  document.getElementById("button_container").style.display = "none";
  document.getElementById("map_search").style.display = "none";
  window.history.replaceState('page', 'Page', '/?page=bans');
  getBans();
}

function showMaps() {
  document.getElementById("searchMap").value = "";
  document.getElementById("playerBans").style.display = "none";
  document.getElementById("playerBanInfo").style.display = "none";
  document.getElementById("playerLeaderboards").style.display = "none";
  document.getElementById("displayMapTimes").style.display = "none";
  document.getElementById("displayTimes").style.display = "none";
  document.getElementById("playerName").style.display = "none";
  document.getElementById("displayPlayerProfile").style.display = "none";
  document.getElementById("maps").style.display = "flex";
  document.getElementById("pagination").style.display = "flex";
  document.getElementById("graph_container").style.display = "none";
  document.getElementById("button_container").style.display = "none";
  document.getElementById("map_search").style.display = "none";
  window.history.replaceState('page', 'Page', '/?page=maps');
  getMaps(0);
}

function toggle(object) {
  object.disabled = true;
  setTimeout(function() {
    object.disabled = false;
  }, 500);
}

function delete_recent_and_wr() {
  let recentTimesNodes = document.getElementById("recentTimes")
  let worldRecordsNodes = document.getElementById("topTimes");
  while (recentTimesNodes.childNodes.length !== 3) {
    recentTimesNodes.removeChild(recentTimesNodes.lastChild);
  }
  while (worldRecordsNodes.childNodes.length !== 3) {
    worldRecordsNodes.removeChild(worldRecordsNodes.lastChild);
  }
}

function delete_maps_from_map_list() {
  let listofmaps = document.getElementsByClassName("maps_page_list");
  while (listofmaps[0]) {
    listofmaps[0].parentNode.removeChild(listofmaps[0]);
  }
}

window.onload = function() {

  // Gets list of global maps
  /*fetch("https://kztimerglobal.com/api/v1.0/maps?is_validated=true&limit=400")
  .then(function(response) {
  return response.json();
})
.then(function(maps) {
for (i=0;i<maps.length;i++) {
maplist.push(maps[i]);
}
});*/

// This allows a user to link to a direct map. Used in the discord bot.
// Example: gokzstats.com/?map=kz_beginnerblock_go
if (/Edge\/\d./i.test(navigator.userAgent)){
  // Microsoft Edge does not support searchParams.get. This just skips everything if you're on edge.
} else {
  const url = new URL(document.location);
  page = url.searchParams.get("page") || "empty";
  name = url.searchParams.get("name") || "empty";
  map = url.searchParams.get("map") || "empty";
  mode = url.searchParams.get("mode") || "empty";
  type = url.searchParams.get("type") || "empty";

  if (mode !== "empty") {
    currentmode = mode;
  }
  if (type !== "empty") {
    currenttype = type;

    document.getElementById("LeaderBoardOptions_overall").style.color = '#E45051';
    document.getElementById("LeaderBoardOptions_" + currenttype).style.color = "orange";
  }
  else if (type === "empty") {
    document.getElementById("LeaderBoardOptions_overall").style.color = 'orange';
  }
  if (page !== "empty") {
    if (page === "leaderboards" || page === "leaderboard") {
      window.history.replaceState('page', 'Page', '/?page=leaderboards' + '&mode=' + currentmode + '&type=' + type);
      showLeaderboards();
    }
    if (page === "bans" || page === "Bans") {
      window.history.replaceState('page', 'Page', '/?page=bans');
      showBans();
    }
    if (page === "maps" || page === "Maps") {
      window.history.replaceState('page', 'Page', '/?page=maps');
      setTimeout(function() {
        showMaps();
      }, 1000);
    }
  }
  if (map !== "empty") {
    document.getElementById("searchMap").value = map;
    setTimeout(function() {
      loadMap(document.getElementById("searchMap").value);
      document.getElementById("displayMapTimes").style.display = "flex";
      document.getElementById("displayTimes").style.display = "none";
    }, 500);
  }
  if (name !== "empty") {
    document.getElementById("searchMap").value = name;
    setTimeout(function() {
      if (name.startsWith("STEAM")) {
        getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top?steam_id=" + document.getElementById("searchMap").value + "&tickrate=128&stage=0&has_teleports=false&limit=1200&modes_list_string=" + currentmode);
      }
      else {
        getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top?player_name=" + document.getElementById("searchMap").value + "&tickrate=128&stage=0&has_teleports=false&limit=1200&modes_list_string=" + currentmode);
      }
      document.getElementById("displayPlayerTimes").style.display = "flex";
      document.getElementById("displayMapTimes").style.display = "none";
      document.getElementById("displayTimes").style.display = "none";
    });
  }
}

// Resets to main page if no text being searched.
document.getElementById("searchMap").addEventListener("input", function() {
  if (!this.value && document.getElementById("displayMapTimes").style.display === "flex") {
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    document.getElementById("playerName").style.display = "none";
    document.getElementById("displayPlayerProfile").style.display = "none";
    document.getElementById("playerLeaderboards").style.display = "none";
    // This deletes every .map_div on the page
    delete_recent_and_wr();
  }
});

document.getElementById("LeaderBoardOptions_tech").addEventListener("click", function() {
  document.getElementById("LeaderBoardOptions_tech").style.color = "orange";
  document.getElementById("LeaderBoardOptions_bhop").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_climb").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_combo").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_overall").style.color = '#E45051';
  currenttype = "tech";
  Leaderboard(currentmode,currenttype);
});
document.getElementById("LeaderBoardOptions_bhop").addEventListener("click", function() {
  document.getElementById("LeaderBoardOptions_tech").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_bhop").style.color = "orange";
  document.getElementById("LeaderBoardOptions_climb").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_combo").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_overall").style.color = '#E45051';
  currenttype = "bhop";
  Leaderboard(currentmode,currenttype);
});
document.getElementById("LeaderBoardOptions_climb").addEventListener("click", function() {
  document.getElementById("LeaderBoardOptions_tech").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_bhop").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_climb").style.color = "orange";
  document.getElementById("LeaderBoardOptions_combo").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_overall").style.color = '#E45051';
  currenttype = "climb";
  Leaderboard(currentmode,currenttype);
});
document.getElementById("LeaderBoardOptions_combo").addEventListener("click", function() {
  document.getElementById("LeaderBoardOptions_tech").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_bhop").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_climb").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_combo").style.color = "orange";
  document.getElementById("LeaderBoardOptions_overall").style.color = '#E45051';
  currenttype = "combo";
  Leaderboard(currentmode,currenttype);
});
document.getElementById("LeaderBoardOptions_overall").addEventListener("click", function() {
  document.getElementById("LeaderBoardOptions_tech").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_bhop").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_climb").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_combo").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_overall").style.color = 'orange';
  currenttype = "overall";
  Leaderboard(currentmode,currenttype);
});



// Vanilla
document.getElementById("mode-kz_vanilla-desktop").addEventListener("click", function() {
  if (xhr !== undefined) {
    xhr.abort();
  }

  if (xhr2 !== undefined) {
    xhr2.abort();
  }

  recordsUrl = kz_vanillaRecords;
  recordsTopUrl = kz_vanillaTopRecords;
  kz_loadmap = kz_vanillaLoadMap;
  currenttype = "overall";

  // Sets Vanilla color, reset other modes
  document.getElementById("mode-kz_vanilla-desktop").style.color = "orange";
  document.getElementById("mode-kz_simple-desktop").style.color = "#E45051";
  document.getElementById("mode-kz_timer-desktop").style.color = "#E45051";

  document.getElementById("LeaderBoardOptions_tech").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_bhop").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_climb").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_combo").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_overall").style.color = 'orange';
  window.history.replaceState('page', 'Page', '/?page=leaderboards' + '&mode=' + currentmode + '&type=' + currenttype);

  // Leaderboards (Vanilla)
  if (document.getElementById("playerBans").style.display === "flex") {
    document.getElementById("playerBans").style.display = "none";
    document.getElementById("pagination").style.display = "flex";
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    document.getElementById("playerName").style.display = "none";
    document.getElementById("displayPlayerProfile").style.display = "none";
    document.getElementById("playerLeaderboards").style.display = "none";
    document.getElementById("searchMap").value = "";
    $("#TableTimes tr").remove();
    $("#TableTimes td").remove();
    delete_recent_and_wr();
    recentAndLatest();
    return;
  }


  if (currentmode === "kz_vanilla" && document.getElementById("playerLeaderboards").style.display === "flex") {
    document.getElementById("pagination").style.display = "flex";
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    document.getElementById("playerName").style.display = "none";
    document.getElementById("displayPlayerProfile").style.display = "none";
    document.getElementById("playerLeaderboards").style.display = "none";
    document.getElementById("searchMap").value = "";
    $("#TableTimes tr").remove();
    $("#TableTimes td").remove();
    delete_recent_and_wr();
    recentAndLatest();
    return;
  } else if (currentmode !== "kz_vanilla" && document.getElementById("playerLeaderboards").style.display === "flex") {
    currentmode = "kz_vanilla";
    showLeaderboards();
    return;
  }

  // Player Profiles (Vanilla)
  if (currentmode === "kz_vanilla" && document.getElementById("displayPlayerProfile").style.display === "flex") {
    document.getElementById("pagination").style.display = "flex";
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    document.getElementById("playerName").style.display = "none";
    document.getElementById("displayPlayerProfile").style.display = "none";
    document.getElementById("playerLeaderboards").style.display = "none";
    document.getElementById("searchMap").value = "";
    $("#TableTimes tr").remove();
    $("#TableTimes td").remove();
    delete_recent_and_wr();
    recentAndLatest();
    return;
  }

  // Map Times (Vanilla)
  if (currentmode === "kz_vanilla" && document.getElementById("displayMapTimes").style.display === "flex") {
    document.getElementById("pagination").style.display = "flex";
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    document.getElementById("playerLeaderboards").style.display = "none";
    document.getElementById("playerName").style.display = "none";
    document.getElementById("displayPlayerProfile").style.display = "none";
    delete_recent_and_wr();
    recentAndLatest();
    document.getElementById("searchMap").value = "";
    return;
  }
  delete_recent_and_wr();

  // Pagination
  currentmode = "kz_vanilla";
  currentpage = 0;
  document.getElementById('graph_container').style.display = "none";
  document.getElementById('map_graph').style.display = "none";
  document.getElementById("previous").style.background = "#cb6f6c";

  if (document.getElementById("searchMap").value.length > 0) {
    if (document.getElementById("searchMap").value.startsWith("kz_") ||
    document.getElementById("searchMap").value.startsWith("bkz_") ||
    document.getElementById("searchMap").value.startsWith("xc_") ||
    document.getElementById("searchMap").value.startsWith("skz_"))
    {
      loadMap(document.getElementById("searchMap").value);
      document.getElementById("displayMapTimes").style.display = "flex";
      document.getElementById("displayTimes").style.display = "none";
    }
    else if (document.getElementById("searchMap").value.toLowerCase().startsWith("steam")) {
      getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top?steam_id=" + document.getElementById("searchMap").value + "&tickrate=128&stage=0&has_teleports=false&limit=1200&modes_list_string=" + currentmode);
      return;
    }
    else {
      getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top?player_name=" + document.getElementById("searchMap").value + "&tickrate=128&stage=0&has_teleports=false&limit=1200&modes_list_string=" + currentmode);
      return;
    }
  } else {
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    recentAndLatest();
  }
});

// SimpleKZ
document.getElementById("mode-kz_simple-desktop").addEventListener("click", function() {
  if (xhr !== undefined) {
    xhr.abort();
  }

  if (xhr2 !== undefined) {
    xhr2.abort();
  }

  recordsUrl = kz_simpleRecords;
  recordsTopUrl = kz_simpleTopRecords;
  kz_loadmap = kz_simpleLoadMap;
  currenttype = "overall";

  // Sets SimpleKZ color, reset other modes
  document.getElementById("mode-kz_vanilla-desktop").style.color = "#E45051";
  document.getElementById("mode-kz_simple-desktop").style.color = "orange";
  document.getElementById("mode-kz_timer-desktop").style.color = "#E45051";

  document.getElementById("LeaderBoardOptions_tech").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_bhop").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_climb").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_combo").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_overall").style.color = 'orange';
  window.history.replaceState('page', 'Page', '/?page=leaderboards' + '&mode=' + currentmode + '&type=' + currenttype);

  // Leaderboards (SimpleKZ)
  if (document.getElementById("playerBans").style.display === "flex") {
    document.getElementById("playerBans").style.display = "none";
    document.getElementById("pagination").style.display = "flex";
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    document.getElementById("playerName").style.display = "none";
    document.getElementById("displayPlayerProfile").style.display = "none";
    document.getElementById("playerLeaderboards").style.display = "none";
    document.getElementById("searchMap").value = "";
    $("#TableTimes tr").remove();
    $("#TableTimes td").remove();
    delete_recent_and_wr();
    recentAndLatest();
    return;
  }


  if (currentmode === "kz_simple" && document.getElementById("playerLeaderboards").style.display === "flex") {
    document.getElementById("pagination").style.display = "flex";
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    document.getElementById("playerName").style.display = "none";
    document.getElementById("displayPlayerProfile").style.display = "none";
    document.getElementById("playerLeaderboards").style.display = "none";
    document.getElementById("searchMap").value = "";
    $("#TableTimes tr").remove();
    $("#TableTimes td").remove();
    delete_recent_and_wr();
    recentAndLatest();
    return;
  } else if (currentmode !== "kz_simple" && document.getElementById("playerLeaderboards").style.display === "flex") {
    currentmode = "kz_simple";
    showLeaderboards();
    return;
  }

  // Player Profiles (SimpleKZ)
  if (currentmode === "kz_simple" && document.getElementById("displayPlayerProfile").style.display === "flex") {
    document.getElementById("pagination").style.display = "flex";
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    document.getElementById("playerLeaderboards").style.display = "none";
    document.getElementById("playerName").style.display = "none";
    document.getElementById("displayPlayerProfile").style.display = "none";
    document.getElementById("searchMap").value = "";
    $("#TableTimes tr").remove();
    $("#TableTimes td").remove();
    delete_recent_and_wr();
    recentAndLatest();
    return;
  }

  // Map Times (SimpleKZ)
  if (currentmode === "kz_simple" && document.getElementById("displayMapTimes").style.display === "flex") {
    document.getElementById("pagination").style.display = "flex";
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    document.getElementById("playerLeaderboards").style.display = "none";
    document.getElementById("playerName").style.display = "none";
    document.getElementById("displayPlayerProfile").style.display = "none";
    document.getElementById("loading").style.opacity = 1;
    delete_recent_and_wr();
    recentAndLatest();
    document.getElementById("searchMap").value = "";
    return;
  }
  delete_recent_and_wr();

  // Pagination
  currentmode = "kz_simple";
  currentpage = 0;
  document.getElementById('graph_container').style.display = "none";
  document.getElementById('map_graph').style.display = "none";
  document.getElementById("previous").style.background = "#cb6f6c";
  if (document.getElementById("searchMap").value.length > 0) {
    if (document.getElementById("searchMap").value.startsWith("kz_") ||
    document.getElementById("searchMap").value.startsWith("bkz_") ||
    document.getElementById("searchMap").value.startsWith("xc_") ||
    document.getElementById("searchMap").value.startsWith("skz_"))
    {
      loadMap(document.getElementById("searchMap").value);
      document.getElementById("displayMapTimes").style.display = "flex";
      document.getElementById("displayTimes").style.display = "none";
    }
    else if (document.getElementById("searchMap").value.toLowerCase().startsWith("steam")) {
      getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top?steam_id=" + document.getElementById("searchMap").value + "&tickrate=128&stage=0&has_teleports=false&limit=1200&modes_list_string=" + currentmode);
      return;
    }
    else {
      getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top?player_name=" + document.getElementById("searchMap").value + "&tickrate=128&stage=0&has_teleports=false&limit=1200&modes_list_string=" + currentmode);
      return;
    }
  } else {
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    recentAndLatest();
  }
});

// KZTimer
document.getElementById("mode-kz_timer-desktop").addEventListener("click", function() {
  if (xhr !== undefined) {
    xhr.abort();
  }

  if (xhr2 !== undefined) {
    xhr2.abort();
  }
  recordsUrl = kz_timerRecords;
  recordsTopUrl = kz_timerTopRecords;
  kz_loadmap = kz_timerLoadMap;
  currenttype = "overall";

  // Sets KZTimer color, reset other modes
  document.getElementById("mode-kz_vanilla-desktop").style.color = "#E45051";
  document.getElementById("mode-kz_simple-desktop").style.color = "#E45051";
  document.getElementById("mode-kz_timer-desktop").style.color = "orange";

  document.getElementById("LeaderBoardOptions_tech").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_bhop").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_climb").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_combo").style.color = "#E45051";
  document.getElementById("LeaderBoardOptions_overall").style.color = 'orange';
  window.history.replaceState('page', 'Page', '/?page=leaderboards' + '&mode=' + currentmode + '&type=' + currenttype);

  // Leaderboards (KZTimer)
  if (document.getElementById("playerBans").style.display === "flex") {
    document.getElementById("playerBans").style.display = "none";
    document.getElementById("pagination").style.display = "flex";
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    document.getElementById("playerName").style.display = "none";
    document.getElementById("displayPlayerProfile").style.display = "none";
    document.getElementById("playerLeaderboards").style.display = "none";
    document.getElementById("searchMap").value = "";
    $("#TableTimes tr").remove();
    $("#TableTimes td").remove();
    delete_recent_and_wr();
    recentAndLatest();
    return;
  }


  if (currentmode === "kz_timer" && document.getElementById("playerLeaderboards").style.display === "flex") {
    document.getElementById("pagination").style.display = "flex";
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    document.getElementById("playerLeaderboards").style.display = "none";
    document.getElementById("playerName").style.display = "none";
    document.getElementById("displayPlayerProfile").style.display = "none";
    document.getElementById("searchMap").value = "";
    $("#TableTimes tr").remove();
    $("#TableTimes td").remove();
    delete_recent_and_wr();
    recentAndLatest();
    return;
  } else if (currentmode !== "kz_timer" && document.getElementById("playerLeaderboards").style.display === "flex") {
    currentmode = "kz_timer";
    showLeaderboards();
    return;
  }

  // Player Profiles (KZTimer)
  if (currentmode === "kz_timer" && document.getElementById("displayPlayerProfile").style.display === "flex") {
    document.getElementById("pagination").style.display = "flex";
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    document.getElementById("playerLeaderboards").style.display = "none";
    document.getElementById("playerName").style.display = "none";
    document.getElementById("displayPlayerProfile").style.display = "none";
    document.getElementById("searchMap").value = "";
    $("#TableTimes tr").remove();
    $("#TableTimes td").remove();
    delete_recent_and_wr();
    recentAndLatest();
    return;
  }

  // Map Times (KZTimer)
  if (currentmode === "kz_timer" && document.getElementById("displayMapTimes").style.display === "flex") {
    document.getElementById("pagination").style.display = "flex";
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    document.getElementById("playerLeaderboards").style.display = "none";
    document.getElementById("playerName").style.display = "none";
    document.getElementById("displayPlayerProfile").style.display = "none";
    delete_recent_and_wr();
    recentAndLatest();
    document.getElementById("searchMap").value = "";
    return;
  }
  delete_recent_and_wr();

  // Pagination
  currentmode = "kz_timer";
  currentpage = 0;
  document.getElementById('graph_container').style.display = "none";
  document.getElementById('map_graph').style.display = "none";
  document.getElementById("previous").style.background = "#cb6f6c";
  if (document.getElementById("searchMap").value.length > 0) {
    if (document.getElementById("searchMap").value.startsWith("kz_") ||
    document.getElementById("searchMap").value.startsWith("bkz_") ||
    document.getElementById("searchMap").value.startsWith("xc_") ||
    document.getElementById("searchMap").value.startsWith("skz_"))
    {
      loadMap(document.getElementById("searchMap").value);
      document.getElementById("displayMapTimes").style.display = "flex";
      document.getElementById("displayTimes").style.display = "none";
    }
    else if (document.getElementById("searchMap").value.toLowerCase().startsWith("steam")) {
      getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top?steam_id=" + document.getElementById("searchMap").value + "&tickrate=128&stage=0&has_teleports=false&limit=1200&modes_list_string=" + currentmode);
      return;
    }
    else {
      getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top?player_name=" + document.getElementById("searchMap").value + "&tickrate=128&stage=0&has_teleports=false&limit=1200&modes_list_string=" + currentmode);
      return;
    }
  } else {
    document.getElementById("displayMapTimes").style.display = "none";
    document.getElementById("displayTimes").style.display = "flex";
    recentAndLatest();
  }
});


// If enter is pressed while there is text in the search bar, it searches. If no text, it switches back to the normal view.
document.getElementById("searchMap").addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    if (document.getElementById("searchMap").value.length > 0) {
      for (i=0;i<maplist.length;i++) {
        if (maplist[i].name === document.getElementById("searchMap").value) {
          break;
        }
        if (maplist[i].name.includes(document.getElementById("searchMap").value)) {
          document.getElementById("searchMap").value = maplist[i].name;
        }
      }

      if (document.getElementById("searchMap").value.startsWith("kz_") ||
      document.getElementById("searchMap").value.startsWith("bkz_") ||
      document.getElementById("searchMap").value.startsWith("xc_") ||
      document.getElementById("searchMap").value.startsWith("skz_"))
      {
        loadMap(document.getElementById("searchMap").value);
        document.getElementById("displayMapTimes").style.display = "flex";
        document.getElementById("displayTimes").style.display = "none";
      }
      else if (document.getElementById("searchMap").value.toLowerCase().startsWith("steam")) {
        if (document.getElementById("playerBans").style.display === "flex") {
          getPlayerBanInfo("https://kztimerglobal.com/api/v1.0/bans?steam_id=" + document.getElementById("searchMap").value);
        }
        else {
          getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top?steam_id=" + document.getElementById("searchMap").value + "&tickrate=128&stage=0&has_teleports=false&limit=1200&modes_list_string=" + currentmode);
        }
        return;
      }
      else {
        getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top?player_name=" + document.getElementById("searchMap").value + "&tickrate=128&stage=0&has_teleports=false&limit=1200&modes_list_string=" + currentmode);
        return;
      }
    } else {
      document.getElementById("displayMapTimes").style.display = "none";
      document.getElementById("displayTimes").style.display = "flex";
    }
  }
});



// Previous Navigation Button
document.getElementById("previous").addEventListener("click", function() {

  if (document.getElementById("maps").style.display === "flex") {
    if (document.getElementById("previous").style.background === "#cb6f6c") {
      return;
    }
    currentpage -= 18;
    if (currentpage <= 0) {
      currentpage = 0;
      document.getElementById("previous").style.background = "#cb6f6c";
    }
    if (currentpage < maplist.length) {
      document.getElementById("next").style.background = "#222831";
    }
    getMaps(currentpage);
  }

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

      let row = document.getElementById("TableOverallTimes").insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      let cell6 = row.insertCell(5);
      row.id = "TableTitle";
      cell1.innerHTML = "#";
      cell2.innerHTML = "Player";
      cell3.innerHTML = "Time";
      cell4.innerHTML = "Teleports";
      cell5.innerHTML = "Server";
      cell6.innerHTML = "Date";

      for (i=currentpage;i<currentpage+20;i++) {
        if (mapRecentTimes.length === i) {
          break;
        }
        mapOverallPosition++;
        checkLength(mapRecentTimes[i]);
        let row = document.getElementById("TableOverallTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);

        row.id = mapRecentTimes[i].steam_id;
        cell2.id = "name";
        cell2.innerHTML = playerName;
        cell3.innerHTML = timeConvert(mapRecentTimes[i].time);

        if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))) {
          cell1.innerHTML = mapOverallPosition;
          cell4.innerHTML = mapRecentTimes[i].teleports + " TPs";
          if (mapRecentTimes[i].server_name == null) {
            cell5.innerHTML = "NA";
          }
          else if (mapRecentTimes[i].server_name.length > 18) {
            cell5.innerHTML = mapRecentTimes[i].server_name.substr(0,15) + "...";
          } else {
            cell5.innerHTML = mapRecentTimes[i].server_name;
          }
          cell6.innerHTML = dateConvert(mapRecentTimes[i].created_on);
        } else {
          cell4.innerHTML = mapRecentTimes[i].teleports;
        }
      }
      $('td').click(function(event){
        if (event.target.parentNode.id.includes("STEAM_")) {
          document.getElementById("searchMap").value = event.target.parentNode.id;
          getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top?steam_id=" + event.target.parentNode.id + "&tickrate=128&stage=0&has_teleports=false&limit=1200&&place_top_at_least=20&modes_list_string=" + currentmode);
        }
      });
    }


    if (mapProTimes.length <= currentpage) {
      let row = document.getElementById("TableProTimes").insertRow(-1);
      let cell1 = row.insertCell(0);
      cell1.innerHTML = "No Other Records Found";
    }

    else {

      let row = document.getElementById("TableProTimes").insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      let cell6 = row.insertCell(5);
      row.id = "TableTitle";
      cell1.innerHTML = "#";
      cell2.innerHTML = "Player";
      cell3.innerHTML = "Time";
      cell4.innerHTML = "Points";
      cell5.innerHTML = "Server";
      cell6.innerHTML = "Date";

      for (i=currentpage;i<currentpage+20;i++) {
        if (mapProTimes.length === i) {
          break;
        }
        mapProPosition++;
        checkLength(mapProTimes[i]);
        let row = document.getElementById("TableProTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        row.id = mapProTimes[i].steam_id;
        cell1.innerHTML = mapProPosition;
        cell2.id = "name";
        cell2.innerHTML = playerName;
        if (mapProTimes[i].points === 0) {
          cell4.innerHTML = "-";
        }
        else {
          cell4.innerHTML = mapProTimes[i].points;
        }
        cell3.innerHTML = timeConvert(mapProTimes[i].time);
        if (mapProTimes[i].server_name == null) {
          cell5.innerHTML = "NA";
        }
        else if (mapProTimes[i].server_name.length > 18) {
          cell5.innerHTML = mapProTimes[i].server_name.substr(0,15) + "...";
        } else {
          cell5.innerHTML = mapProTimes[i].server_name;
        }
        let cell6 = row.insertCell(5);
        cell6.innerHTML = dateConvert(mapProTimes[i].created_on);
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
      return;
    }
    if (document.getElementById("showGlobalTimes").innerHTML === "Show All Times") {
      if (globalTimes.length < currentpage) {
        let row = document.getElementById("TableTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        cell1.innerHTML = "No Other Records Found";
        return;
      }
      else {
        let temparray = [];
        count = 0;
        for (i=currentpage;i<currentpage+20;i++) {
          if (globalTimes.length <= (currentpage + count)) {
            break;
          }
          if (globalTimes[i].points !== 1000) {
            continue;
          }
          else {
            temparray.push(globalTimes[i]);
          }
          count++;
        }
        getPlayerInfo_table_globals_only(temparray);
      }
    }
    else {
      let temparray = [];
      for (i=currentpage;i<currentpage+20;i++) {
        if (postTimes.length <= (currentpage + count)) {
          break;
        }
        if (count === 20) {
          count = 0;
          break;
        }
        temparray.push(postTimes[i]);
        count++;
      }
      getPlayerInfo_table(temparray);
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
    if (currentpage < 25) {
      document.getElementById("next").style.background = "#222831";
    }

    // Deletes the current shown times
    delete_recent_and_wr();

    for (i=currentpage;i<currentpage+5;i++) {

      checkLength(mostRecentTimes[i]);

      const ReadableTime = (mostRecentTimes[i].updated_on).split("T");
      const $map_div = $("<div>", {id: mostRecentTimes[i].map_name, "class": "map_div"});

      $map_div.append("<img src=" + "https://d2u7y93d5eagqt.cloudfront.net/mapImages/thumbs/tn_" + mostRecentTimes[i].map_name + ".jpg>" + "<span style='color: white;'>" + mostRecentTimes[i].map_name + " <br>" + playerName + "<br>" + "<div>" + (mostRecentTimes[i].top_100 === 0 ? "NA" : '#' + mostRecentTimes[i].top_100) + "</div>" + " | " + "<div>" + timeConvert(mostRecentTimes[i].time) + "</div><br>" + mostRecentTimes[i].teleports + " TPs</span>");
      // This was created by Chuckles to help with selecting maps for users. Extremely useful as most users tend to not use their keyboard in 18.
      $map_div.click(function(event){
        if (event.target.parentNode.id.includes("_")) {
          document.getElementById("searchMap").value = event.target.parentNode.id;
          loadMap(document.getElementById("searchMap").value);
        }
      });
      $("#recentTimes").append($map_div);
    }

    for (m=currentpage;m<currentpage+5;m++) {
      if (m > mostRecentTopTimesFiltered.length) {
        $("#topTimes").append("<div style='color:#E45051'>No other records found</div>");
        break;
      }
      if (m >= mostRecentTopTimesFiltered.length) {
        break;
      }

      checkLength(mostRecentTopTimesFiltered[m]);

      const ReadableTime = (mostRecentTopTimesFiltered[m].updated_on).split("T");
      const $map_div = $("<div>", {id: mostRecentTopTimesFiltered[m].map_name, "class": "map_div"});
      $map_div.append("<img src=" + "https://d2u7y93d5eagqt.cloudfront.net/mapImages/thumbs/tn_" + mostRecentTopTimesFiltered[m].map_name + ".jpg>" + "<span style='color: white;'>" + mostRecentTopTimesFiltered[m].map_name + "<br>" + playerName + "<br>" + "<div>" + timeConvert(mostRecentTopTimesFiltered[m].time) + "</div>" + "<br>" + "<div style='color: white; font-size: 90%; font-style: italic'>" + getTimeDifference(mostRecentTopTimesFiltered[m].created_on) + "</div>" + "</span>");
      $map_div.click(function(event){
        if (event.target.parentNode.id.includes("_")) {
          document.getElementById("searchMap").value = event.target.parentNode.id;
          loadMap(document.getElementById("searchMap").value);
        }
      });
      $("#topTimes").append($map_div);
    }
  }
});


// Next Navigation Button
document.getElementById("next").addEventListener("click", function() {

  if (document.getElementById("maps").style.display === "flex") {
    if (document.getElementById("previous").style.background === "#cb6f6c") {
      return;
    }
    currentpage += 18;
    if (currentpage >= maplist.length) {
      currentpage = maplist.length-18;
      document.getElementById("next").style.background = "#cb6f6c";
    }
    if (currentpage > 0) {
      document.getElementById("previous").style.background = "#222831";
    }
    getMaps(currentpage);
  }


  if (document.getElementById("displayMapTimes").style.display !== "none") {
    if (document.getElementById("next").style.background === "#cb6f6c") {
      return;
    }
    currentpage += 20;
    if (currentpage > 0) {
      document.getElementById("previous").style.background = "#222831";
    }
    if (currentpage >= 80) {
      document.getElementById("next").style.background = "#cb6f6c";
    }
    if (currentpage >= 100) {
      return;
    }
    let mapOverallPosition = currentpage;
    let mapProPosition = currentpage;
    mostPositions = (mapRecentTimes >= mapProTimes ? mapRecentTimes : mapProTimes);
    if (currentpage >= mostPositions.length) {
      currentpage = Math.floor(mostPositions.length);
      document.getElementById("previous").style.background = "#222831";
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
      currentpage = Math.ceil(currentpage / 10) * 10
      return;
    } else {

      let row = document.getElementById("TableOverallTimes").insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      let cell6 = row.insertCell(5);
      row.id = "TableTitle";
      cell1.innerHTML = "#";
      cell2.innerHTML = "Player";
      cell3.innerHTML = "Time";
      cell4.innerHTML = "Teleports";
      cell5.innerHTML = "Server";
      cell6.innerHTML = "Date";

      for (i=currentpage;i<currentpage+20;i++) {
        if (mapRecentTimes.length === i) {
          break;
        }
        mapOverallPosition++;
        checkLength(mapRecentTimes[i]);
        let row = document.getElementById("TableOverallTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        row.id = mapRecentTimes[i].steam_id;
        cell2.id = "name";
        cell2.innerHTML = playerName;
        cell3.innerHTML = timeConvert(mapRecentTimes[i].time);
        if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))) {
          cell1.innerHTML = mapOverallPosition;
          cell4.innerHTML = mapRecentTimes[i].teleports + " TPs";
          if (mapRecentTimes[i].server_name == null) {
            cell5.innerHTML = "NA";
          }
          else if (mapRecentTimes[i].server_name.length > 18) {
            cell5.innerHTML = mapRecentTimes[i].server_name.substr(0,15) + "...";
          } else {
            cell5.innerHTML = mapRecentTimes[i].server_name;
          }
          cell6.innerHTML = dateConvert(mapRecentTimes[i].created_on);
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

      let row = document.getElementById("TableProTimes").insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      let cell6 = row.insertCell(5);
      row.id = "TableTitle";
      cell1.innerHTML = "#";
      cell2.innerHTML = "Player";
      cell3.innerHTML = "Time";
      cell4.innerHTML = "Points";
      cell5.innerHTML = "Server";
      cell6.innerHTML = "Date";

      for (i=currentpage;i<currentpage+20;i++) {
        if (mapProTimes.length === i) {
          break;
        }
        mapProPosition++;
        checkLength(mapProTimes[i]);
        let row = document.getElementById("TableProTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        row.id = mapProTimes[i].steam_id;
        cell1.innerHTML = mapProPosition;
        cell2.id = "name";
        cell2.innerHTML = playerName;
        cell3.innerHTML = timeConvert(mapProTimes[i].time);
        if (mapProTimes[i].points === 0) {
          cell4.innerHTML = "-";
        }
        else {
          cell4.innerHTML = mapProTimes[i].points;
        }
        if (mapProTimes[i].server_name == null) {
          cell5.innerHTML = "NA";
        }
        else if (mapProTimes[i].server_name.length > 18) {
          cell5.innerHTML = mapProTimes[i].server_name.substr(0,15) + "...";
        } else {
          cell5.innerHTML = mapProTimes[i].server_name;
        }
        let cell6 = row.insertCell(5);
        cell6.innerHTML = dateConvert(mapProTimes[i].created_on);
      }
    }
    $('td').click(function(event){
      if (event.target.parentNode.id.includes("STEAM_")) {
        document.getElementById("searchMap").value = event.target.parentNode.id;
        getPlayerInfo("https://kztimerglobal.com/api/v1.0/records/top?steam_id=" + event.target.parentNode.id + "&tickrate=128&stage=0&has_teleports=false&limit=1200&&place_top_at_least=20&modes_list_string=" + currentmode);
      }
    });
  }

  if (document.getElementById("displayPlayerProfile").style.display !== "none") {
    if (document.getElementById("next").style.background === "#cb6f6c") {
      return;
    }
    currentpage += 20;
    if (currentpage > 0) {
      document.getElementById("previous").style.background = "#222831";
    }
    if (currentpage >= maplist.length) {
      currentpage = Math.floor(maplist.length);
      document.getElementById("previous").style.background = "#222831";
      document.getElementById("next").style.background = "#cb6f6c";
    }
    $("#TableTimes tr").remove();
    let count = 0;
    if (postTimes.length <= (currentpage + count)) {
      let row = document.getElementById("TableTimes").insertRow(-1);
      let cell1 = row.insertCell(0);
      cell1.innerHTML = "No Other Records Found";
      return;
    }
    if (document.getElementById("showGlobalTimes").innerHTML === "Show All Times") {
      if (globalTimes.length < currentpage) {
        let row = document.getElementById("TableTimes").insertRow(-1);
        let cell1 = row.insertCell(0);
        cell1.innerHTML = "No Other Records Found";
        return;
      }
      else {
        let temparray = [];
        count = 0;
        for (i=currentpage;i<currentpage+20;i++) {
          if (globalTimes.length <= (currentpage + count)) {
            break;
          }
          if (globalTimes[i].points !== 1000) {
            continue;
          }
          else {
            temparray.push(globalTimes[i]);
          }
          count++;
        }
        getPlayerInfo_table_globals_only(temparray);
      }
    }
    else {
      let temparray = [];
      for (i=currentpage;i<currentpage+20;i++) {
        if (postTimes.length <= (currentpage + count)) {
          break;
        }
        if (count === 20) {
          count = 0;
          break;
        }
        else {
          temparray.push(postTimes[i]);
        }
        count++;
      }
      getPlayerInfo_table(temparray);
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
    if (currentpage >= 25) {
      currentpage = 25;
      document.getElementById("previous").style.background = "#222831";
      document.getElementById("next").style.background = "#cb6f6c";
    }

    // Deletes the current shown times
    delete_recent_and_wr();

    for (i=currentpage;i<currentpage+5;i++) {
      checkLength(mostRecentTimes[i]);
      const ReadableTime = (mostRecentTimes[i].updated_on).split("T");
      const $map_div = $("<div>", {id: mostRecentTimes[i].map_name, "class": "map_div"});
      $map_div.append("<img src=" + "https://d2u7y93d5eagqt.cloudfront.net/mapImages/thumbs/tn_" + mostRecentTimes[i].map_name + ".jpg>" + "<span style='color: white;'>" + mostRecentTimes[i].map_name + " <br>" + playerName + "<br>" + "<div>" + (mostRecentTimes[i].top_100 === 0 ? "NA" : '#' + mostRecentTimes[i].top_100) + "</div>" + " | " + "<div>" + timeConvert(mostRecentTimes[i].time) + "</div><br>" + mostRecentTimes[i].teleports + " TPs</span>");
      // This was created by Chuckles to help with selecting maps for users. Extremely useful as most users tend to not use their keyboard in 2018.
      $map_div.click(function(event){
        if (event.target.parentNode.id.includes("_")) {
          document.getElementById("searchMap").value = event.target.parentNode.id;
          loadMap(document.getElementById("searchMap").value);
        }
      });
      $("#recentTimes").append($map_div);
    }
    for (m=currentpage;m<currentpage+5;m++) {
      if (m > mostRecentTopTimesFiltered.length) {
        $("#topTimes").append("<div style='color:#E45051'>No other records found</div>");
        break;
      }
      if (m >= mostRecentTopTimesFiltered.length) {
        break;
      }
      checkLength(mostRecentTopTimesFiltered[m])
      const ReadableTime = (mostRecentTopTimesFiltered[m].updated_on).split("T");
      const $map_div = $("<div>", {id: mostRecentTopTimesFiltered[m].map_name, "class": "map_div"});
      $map_div.append("<img src=" + "https://d2u7y93d5eagqt.cloudfront.net/mapImages/thumbs/tn_" + mostRecentTopTimesFiltered[m].map_name + ".jpg>" + "<span style='color: white;'>" + mostRecentTopTimesFiltered[m].map_name + "<br>" + playerName + "<br>" + "<div>" + timeConvert(mostRecentTopTimesFiltered[m].time) + "</div>" + "<br>" + "<div style='color: white; font-size: 90%; font-style: italic'>" + getTimeDifference(mostRecentTopTimesFiltered[m].created_on) + "</div>" + "</span>");
      $map_div.click(function(event){
        if (event.target.parentNode.id.includes("_")) {
          document.getElementById("searchMap").value = event.target.parentNode.id;
          loadMap(document.getElementById("searchMap").value);
        }
      });
      $("#topTimes").append($map_div);
    }
  }
  if (document.getElementById("playerLeaderboards").style.display !== "none") {
  }
});

// If enter is pressed while there is text in the search bar, it searches. If no text, it switches back to the normal view.
document.getElementById("map_search").addEventListener("click", function () {
  if (document.getElementById("searchMap").value.length > 0) {
    for (i=0;i<maplist.length;i++) {
      if (maplist[i].name.includes(document.getElementById("searchMap").value)) {
        document.getElementById("map_search").value = maplist[i].name;
        mapSearch(document.getElementById("map_search").value);
      }
    }
  }
});


// On load show recent and latest
if (mode === "empty") {
  currentmode = "kz_simple";
  recordsUrl = kz_simpleRecords;
  recordsTopUrl = kz_simpleTopRecords;
  kz_loadmap = kz_simpleLoadMap;
  document.getElementById("mode-kz_simple-desktop").style.color = "orange";
}
else if (mode === "kz_simple") {
  recordsUrl = kz_simpleRecords;
  recordsTopUrl = kz_simpleTopRecords;
  kz_loadmap = kz_simpleLoadMap;
  document.getElementById("mode-kz_simple-desktop").style.color = "orange";
}
else if (mode === "kz_timer") {
  recordsUrl = kz_timerRecords;
  recordsTopUrl = kz_timerTopRecords;
  kz_loadmap = kz_timerLoadMap;
  document.getElementById("mode-kz_timer-desktop").style.color = "orange";
}
else if (mode === "kz_vanilla") {
  recordsUrl = kz_vanillaRecords;
  recordsTopUrl = kz_vanillaTopRecords;
  kz_loadmap = kz_vanillaLoadMap;
  document.getElementById("mode-kz_vanilla-desktop").style.color = "orange";
}


document.getElementById("displayPlayerProfile").style.display = "none";
document.getElementById("displayMapTimes").style.display = "none";
document.getElementById("next").style.background = "#222831";

if((/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))) {
  //console.log("Hey");
  recentAndLatest();
}

if (page === "empty" && map === "empty" && name === "empty") {
  recentAndLatest();
}
}
