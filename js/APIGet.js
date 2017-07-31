var jumpstats_string = "https://kztimerglobal.com/api/v1/jumpstats?";
var jsonPlayerName = {};
var playerListLJ = [];
var playerListBHOP = [];
var playerListMBHOP = [];
var playerListWJ = [];
var playerListDBHOP = [];
var playerListCJ = [];
var playerListLAJ = [];
var tableLJ = document.getElementById("myTableLJ");
var tableBHOP = document.getElementById("myTableBHOP");
var tableMBHOP = document.getElementById("myTableMBHOP");
var tableWJ = document.getElementById("myTableWJ");
var tableDBHOP = document.getElementById("myTableDBHOP");
var tableCJ = document.getElementById("myTableCJ");
var tableLAJ = document.getElementById("myTableLAJ");
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;


$(document).ready(function(){
  LoadPlayersLJ();

  $.ajax({
    url: "../js/steamId.js",
    success: function(player) {
      data = JSON.parse(player);
      data[0].players.forEach(function (playerInfo) {
        jsonPlayerName[playerInfo.steam_id] = playerInfo.name;
      });
    }});
  });
