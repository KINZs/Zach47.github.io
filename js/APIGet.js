var jumpstats_string = "http://kztimerglobal.com/api/v1/jumpstats?";
var jsonPlayerName = {};
var jsonPlayerLJDistance = {};
var playerList = [];
var playerLongjump;
var playerBhop;
var playerMbhop;
var table = document.getElementById("myTable");

$(document).ready(function(){
  LoadPlayers();

  $.ajax({
    url: "http://jacobwbarrett.com/js/steamId.js",
    success: function(player) {
      data = JSON.parse(player);
      data[0].players.forEach(function (playerInfo) {
        jsonPlayerName[playerInfo.steam_id] = playerInfo.name;
      });
    }});
  });
