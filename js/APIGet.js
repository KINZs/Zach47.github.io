// Arrays
var jsonPlayerName = {};
var playerListLJ = [];
var playerListBHOP = [];
var playerListMBHOP = [];
var playerListWJ = [];
var playerListDBHOP = [];
var playerListCJ = [];
var playerListLAJ = [];
// Links
var LJurl = "https://staging.kztimerglobal.com/api/v1/jumpstats/longjump/top?is_crouch_boost=false&limit=2000";
var BHOPurl = "https://staging.kztimerglobal.com/api/v1/jumpstats?jumptype=bhop&is_crouch_boost=false&limit=500";
var MBHOPurl = "https://staging.kztimerglobal.com/api/v1/jumpstats?jumptype=multibhop&is_crouch_boost=false&limit=500";
var WJurl = "https://staging.kztimerglobal.com/api/v1/jumpstats?jumptype=weirdjump&is_crouch_boost=false&limit=500";
var DBHOPurl = "https://staging.kztimerglobal.com/api/v1/jumpstats?jumptype=dropbhop&is_crouch_boost=false&limit=500";
var CJurl = "https://staging.kztimerglobal.com/api/v1/jumpstats?jumptype=countjump&is_crouch_boost=false&limit=500";
var LAJurl = "https://staging.kztimerglobal.com/api/v1/jumpstats?jumptype=ladderjump&is_crouch_boost=false&limit=500";
// Steam
var steam64;
var steamBigInt;
var playerName;


$(document).ready(function(){
  $.ajax({
    url: "../js/steamId.js",
    success: function(player) {
      data = JSON.parse(player);
      data[0].players.forEach(function (playerInfo) {
        jsonPlayerName[playerInfo.steam_id] = playerInfo.name;
      });
    }});

    $("#jumptype-button-bind").on('touchstart click', function() {
      Bind();
    })
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
