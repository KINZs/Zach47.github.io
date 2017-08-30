var jumpstats_string = "http://kztimerglobal.com/api/v1/jumpstats?";
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


$(document).ready(function(){

  $.ajax({
    url: "../js/steamId.js",
    success: function(player) {
      data = JSON.parse(player);
      data[0].players.forEach(function (playerInfo) {
        jsonPlayerName[playerInfo.steam_id] = playerInfo.name;
      });
    }});

    $("#jumptype-button-lj").on('touchstart click', function(){
      showLJ();
    });

    $("#jumptype-button-bhop").on('touchstart click', function(){
      showBHOP();
    });

    $("#jumptype-button-mbhop").on('touchstart click', function(){
      showMBHOP();
    });

    $("#jumptype-button-wj").on('touchstart click', function(){
      showWJ();
    });

    $("#jumptype-button-dbhop").on('touchstart click', function(){
      showDBHOP();
    });

    $("#jumptype-button-cj").on('touchstart click', function(){
      showCJ();
    });

    $("#jumptype-button-laj").on('touchstart click', function(){
      showLAJ();
    });

    $("#dropdown-lj").on('touchstart click', function(){
      showLJ();
    });

    $("#dropdown-bhop").on('touchstart click', function(){
      showBHOP();
    });

    $("#dropdown-mbhop").on('touchstart click', function(){
      showMBHOP();
    });

    $("#dropdown-wj").on('touchstart click', function(){
      showWJ();
    });

    $("#dropdown-dbhop").on('touchstart click', function(){
      showDBHOP();
    });

    $("#dropdown-cj").on('touchstart click', function(){
      showCJ();
    });

    $("#dropdown-laj").on('touchstart click', function(){
      showLAJ();
    });
  });
