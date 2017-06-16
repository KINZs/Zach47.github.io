var jumpstats_string = "https://kztimerglobal.com/api/v1/jumpstats?";
var jsonPlayerName = {};
var jsonPlayerDistance = {};

function get_playersLJPB() {

  var url_string = jumpstats_string;
  var playerName = "";

  if($("#steam_id").val().length > 0) {
    steam_id = encodeURIComponent($("#steam_id").val());
    url_string += "steam_id=" + steam_id + "&" + "jumptype=longjump";

    steam_id_c = steam_id.split("%3A").join(":");
    playerName = jsonPlayerName[steam_id_c];
    console.log(playerName);

    $.ajax({
      type: "GET",
      url: url_string,
      success: function(json) {
        try {
          if (json[0].distance !== undefined) {
            $('#APIPost').text(playerName + "'s best longjump is " + json[0].distance);
          }
        }
        catch(err) {
          $('#APIPost').text("The given steam id is either an invalid steam id or doesn't have a longjump in the database. Message me on Steam and I'll add you to do the steam id database.");
        }
      },
      error: function() {
        console.log("it failed");
      }
    });
  }
}

$(document).ready(function(){

  $.ajax({
    url: "https://zach47.github.io/js/steamId.js",
    success: function(player) {
      data = JSON.parse(player);

      data[0].players.forEach(function (playerInfo) {
        jsonPlayerName[playerInfo.steam_id] = playerInfo.name;
      });
    }});
  });
