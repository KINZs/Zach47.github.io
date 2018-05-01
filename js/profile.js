var jsonPlayerName = {};
var jsonMapId = {};
var jsonMapWorkshopID = {};
var mostRecentTimes = [];
var player = "";
var steamid = "";
var steam64 = "";
var steamAPI = "https://json2jsonp.com/?callback=cbfunc&url=https%3A%2F%2Fapi.steampowered.com%2FISteamUser%2FGetPlayerSummaries%2Fv0002%2F%3Fkey%3D18250C247228A5429D919A4A36CD9A0B%26steamids%3D";

var userInput = document.getElementById("uInput");
document.getElementById("uInput").elements[0].value = localStorage.getItem("steam_id");

function testStorage() {
  player = userInput.elements[0].value;
  localStorage.steam_id = player;

  steamid = localStorage.steam_id.split(":");
  steam64 = BigInteger(steamid[2]);
  steam64 = BigInteger(steam64.multiply(2).toString());
  if (steamid[1] === "1") {
    steammath = BigInteger('76561197960265729');
  } else {
    steammath = BigInteger('76561197960265728');
  }
  steamAPI = steamAPI +  steam64.add(steammath).toString();



  kztimerglobalUrl = "https://kztimerglobal.com/api/v1/records/top?steam_id=" + localStorage.steam_id + "&modes_list_string=kz_timer&limit=5000";
}

function sortArray(array) {
  array.sort(function(a,b){
    return Date.parse(b.updated_on) - Date.parse(a.updated_on)});
    return array;
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

  // https://stackoverflow.com/a/13899011
  function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      time = time.slice (1);
      time[5] = +time[0] < 12 ? ' AM' : ' PM';
      time[0] = +time[0] % 12 || 12;
    }
    return time.join ('');
  }



  function getPlayerInfo() {
    $.ajax({
      url: kztimerglobalUrl,
      dataType: "text",
      success: function(player_info) {
        var data = $.parseJSON(player_info);

        for(i=0;i<data.length;i++) {

          if (data[i].map_id in jsonMapId) {
            mostRecentTimes.push(data[i]);
          }
        }
        mostRecentTimes = sortArray(mostRecentTimes);

        for (j=0;j<mostRecentTimes.length;j++) {
          var ReadableTime = (mostRecentTimes[j].updated_on).split("T");
          $("#addToThis").append("<span id='recentTimes' style='color: white;'><a href=" + "https://steamcommunity.com/sharedfiles/filedetails/?id=" + jsonMapId[mostRecentTimes[j].map_id][1] + "/ alt='map_name'>" + jsonMapId[mostRecentTimes[j].map_id][0] + "</a>" + " <br> " + timeConvert(mostRecentTimes[j].time) + " / " + mostRecentTimes[j].teleports + (mostRecentTimes[j].teleports === 1 ? " teleport" : " teleports") + " <br> " + ReadableTime[0] + " at " + tConvert(ReadableTime[1]) + "</span>" + "<br>" + "<br>");
        }
      }})};



      $(document).ready(function(){
        steamid = localStorage.steam_id.split(":");
        steam64 = BigInteger(steamid[2]);
        steam64 = BigInteger(steam64.multiply(2).toString());
        if (steamid[1] === "1") {
          steammath = BigInteger('76561197960265729');
        } else {
          steammath = BigInteger('76561197960265728');
        }
        steamAPI = steamAPI +  steam64.add(steammath).toString();


        $.ajax({
          url: steamAPI,
          dataType: "jsonp",
          success: function(it_worked) {
            data = JSON.parse(JSON.stringify(it_worked));
            console.log(data);
            $("#playerProfileImg").attr('src', data.response.players[0].avatarfull);
            $("#playerProfilePersona").html(data.response.players[0].personaname);
            $('#playerProfilePersona').wrap("<a href=" + data.response.players[0].profileurl + "/>");
          }
        });



        $.ajax({
          url: "../js/steamId.js",
          success: function(player) {
            data = JSON.parse(player);
            data[0].players.forEach(function (playerInfo) {
              jsonPlayerName[playerInfo.steam_id] = playerInfo.name;
            });
          }});


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
                }
              });
            }});
          });
