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
  LoadPlayersLJ();

  $("#Longjump").click(function() {


    // Optimize this later.
    if (document.getElementById("myTableLJ").style.display === "flex") {
      document.getElementById("myTableLJ").style.display = "none";
      document.getElementById("Longjump").style.background = "#FFF";
    } else {
      document.getElementById("myTableLJ").style.display = "flex";
      document.getElementById("Longjump").style.background = "#F39C12";
    }
  });
  $("#Bhop").click(function() {
    if (document.getElementById("myTableBHOP").style.display === "flex") {
      document.getElementById("myTableBHOP").style.display = "none";
      document.getElementById("Bhop").style.background = "#FFF";
    } else {
      document.getElementById("myTableBHOP").style.display = "flex";
      document.getElementById("Bhop").style.background = "#F39C12";
    }
  });
  $("#MultiBhop").click(function() {
    if (document.getElementById("myTableMBHOP").style.display === "flex") {
      document.getElementById("myTableMBHOP").style.display = "none";
      document.getElementById("MultiBhop").style.background = "#FFF";
    } else {
      document.getElementById("myTableMBHOP").style.display = "flex";
      document.getElementById("MultiBhop").style.background = "#F39C12";
    }
  });
  $("#Weirdjump").click(function() {
    if (document.getElementById("myTableWJ").style.display === "flex") {
      document.getElementById("myTableWJ").style.display = "none";
      document.getElementById("Weirdjump").style.background = "#FFF";
    } else {
      document.getElementById("myTableWJ").style.display = "flex";
      document.getElementById("Weirdjump").style.background = "#F39C12";
    }
  });
  $("#DropBhop").click(function() {
    if (document.getElementById("myTableDBHOP").style.display === "flex") {
      document.getElementById("myTableDBHOP").style.display = "none";
      document.getElementById("DropBhop").style.background = "#FFF";
    } else {
      document.getElementById("myTableDBHOP").style.display = "flex";
      document.getElementById("DropBhop").style.background = "#F39C12";
    }
  });
  $("#Countjump").click(function() {
    if (document.getElementById("myTableCJ").style.display === "flex") {
      document.getElementById("myTableCJ").style.display = "none";
      document.getElementById("Countjump").style.background = "#FFF";
    } else {
      document.getElementById("myTableCJ").style.display = "flex";
      document.getElementById("Countjump").style.background = "#F39C12";
    }
  });
  $("#Ladderjump").click(function() {
    if (document.getElementById("myTableLAJ").style.display === "flex") {
      document.getElementById("myTableLAJ").style.display = "none";
      document.getElementById("Ladderjump").style.background = "#FFF";
    } else {
      document.getElementById("myTableLAJ").style.display = "flex";
      document.getElementById("Ladderjump").style.background = "#F39C12";
    }
  });


  $.ajax({
    url: "http://jacobwbarrett.com/js/steamId.js",
    success: function(player) {
      data = JSON.parse(player);
      data[0].players.forEach(function (playerInfo) {
        jsonPlayerName[playerInfo.steam_id] = playerInfo.name;
      });
    }});
  });
