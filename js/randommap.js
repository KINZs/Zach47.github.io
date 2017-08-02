var pathTo = 'http://www.kzstats.com/img/map/';
var formatted_time = "";
var VeryEasyMaps = [];
var EasyMaps = [];
var MediumMaps = [];
var HardMaps = [];
var VeryHardMaps = [];
var DeathMaps = [];
var temp_map_array = [];

function getDifficulty(id) {
  switch(id) {
    case 1:
      difficulty = "Very Easy";
      break;
    case 2:
      difficulty = "Easy";
      break;
    case 3:
      difficulty = "Medium"
      break;
    case 4:
      difficulty = "Hard"
      break;
    case 5:
      difficulty = "Very Hard"
      break;
    case 6:
      difficulty = "Death"
      break;
  }
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
  else if (time == "NA") {
    return "NA";
  }
  else {
    minutes = Math.floor(time % 3600 /60);
    seconds = Math.floor(time % 60);
    return str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
  }
}


/* On page load, and random */
function getRandomMap() {
  $.ajax({
    url: "../js/mapListNew.js",
    dataType: "text",
    success: function(Map_info) {
      var data = $.parseJSON(Map_info);
      var mapCount = Object.keys(data).length;
      var randomGet = Math.round(Math.random()*(mapCount - 1));
      var randomMap = data[randomGet];
      /* Gets difficulty title */
      getDifficulty(randomMap.difficulty_id);
      /* Get Time */
      var time_tp = timeConvert(randomMap.Avg_maptime_tp);
      var time_pro = timeConvert(randomMap.Avg_maptime_pro);
      /* HTML Formatting, gets image url */
      var imageUrl = pathTo + randomMap.mapname + ".jpg";
      $('#mapPost').html("<a href='http://steamcommunity.com/sharedfiles/filedetails/?id=" + randomMap.workshop_id + "'>" + randomMap.mapname + "</a>");
      $('#mapDescription').html(randomMap.description);
      $('#mapAvgTP').html("Average TP Time: " + time_tp);
      $('#mapAvgPRO').html("Average Pro Time: " + time_pro);
      $('#mapFilesize').html("File size: " + (randomMap.filesize/1000000).toFixed(2) + "mb");
      $('#mapDifficulty').html("Difficulty: " + difficulty);
      $('#changePicture').attr("src", imageUrl);
    }
  });
}

$(document).ready(function(){
  getRandomMap();

  $("#difficulty-random-desktop").on('click', function(){
    showAny();
  });
  $("#difficulty-ve-desktop").on('click', function(){
    showVeryEasy();
  });
  $("#difficulty-e-desktop").on('click', function(){
    showEasy();
  });
  $("#difficulty-m-desktop").on('click', function(){
    showMedium();
  });
  $("#difficulty-h-desktop").on('click', function(){
    showHard();
  });
  $("#difficulty-vh-desktop").on('click', function(){
    showVeryHard();
  });
  $("#difficulty-d-desktop").on('click', function(){
    showDeath();
  });

  $("#difficulty-random").on('click', function(){
    document.getElementById("difficulty-random").classList.add("active");

    if (document.getElementById("difficulty-random").classList.contains("active")) {
      document.getElementById("difficulty-ve").classList.remove("active");
      document.getElementById("difficulty-e").classList.remove("active");
      document.getElementById("difficulty-m").classList.remove("active");
      document.getElementById("difficulty-h").classList.remove("active");
      document.getElementById("difficulty-vh").classList.remove("active");
      document.getElementById("difficulty-d").classList.remove("active");
    }
    showAny();
  });

  $("#difficulty-ve").on('click', function(){
    document.getElementById("difficulty-ve").classList.add("active");

    if (document.getElementById("difficulty-ve").classList.contains("active")) {
      document.getElementById("difficulty-random").classList.remove("active");
      document.getElementById("difficulty-e").classList.remove("active");
      document.getElementById("difficulty-m").classList.remove("active");
      document.getElementById("difficulty-h").classList.remove("active");
      document.getElementById("difficulty-vh").classList.remove("active");
      document.getElementById("difficulty-d").classList.remove("active");
    }
    showVeryEasy();
  });

  $("#difficulty-e").on('click', function(){
    document.getElementById("difficulty-e").classList.add("active");

    if (document.getElementById("difficulty-e").classList.contains("active")) {
      document.getElementById("difficulty-random").classList.remove("active");
      document.getElementById("difficulty-ve").classList.remove("active");
      document.getElementById("difficulty-m").classList.remove("active");
      document.getElementById("difficulty-h").classList.remove("active");
      document.getElementById("difficulty-vh").classList.remove("active");
      document.getElementById("difficulty-d").classList.remove("active");
    }
    showEasy();
  });

  $("#difficulty-m").on('click', function(){
    document.getElementById("difficulty-m").classList.add("active");

    if (document.getElementById("difficulty-m").classList.contains("active")) {
      document.getElementById("difficulty-random").classList.remove("active");
      document.getElementById("difficulty-ve").classList.remove("active");
      document.getElementById("difficulty-e").classList.remove("active");
      document.getElementById("difficulty-h").classList.remove("active");
      document.getElementById("difficulty-vh").classList.remove("active");
      document.getElementById("difficulty-d").classList.remove("active");
    }
    showMedium();
  });

  $("#difficulty-h").on('click', function(){
    document.getElementById("difficulty-h").classList.add("active");

    if (document.getElementById("difficulty-h").classList.contains("active")) {
      document.getElementById("difficulty-random").classList.remove("active");
      document.getElementById("difficulty-ve").classList.remove("active");
      document.getElementById("difficulty-e").classList.remove("active");
      document.getElementById("difficulty-m").classList.remove("active");
      document.getElementById("difficulty-vh").classList.remove("active");
      document.getElementById("difficulty-d").classList.remove("active");
    }
    showHard();
  });

  $("#difficulty-vh").on('click', function(){
    document.getElementById("difficulty-vh").classList.add("active");

    if (document.getElementById("difficulty-vh").classList.contains("active")) {
      document.getElementById("difficulty-random").classList.remove("active");
      document.getElementById("difficulty-ve").classList.remove("active");
      document.getElementById("difficulty-e").classList.remove("active");
      document.getElementById("difficulty-m").classList.remove("active");
      document.getElementById("difficulty-h").classList.remove("active");
      document.getElementById("difficulty-d").classList.remove("active");
    }
    showVeryHard();
  });

  $("#difficulty-d").on('click', function(){
    document.getElementById("difficulty-d").classList.add("active");

    if (document.getElementById("difficulty-d").classList.contains("active")) {
      document.getElementById("difficulty-random").classList.remove("active");
      document.getElementById("difficulty-ve").classList.remove("active");
      document.getElementById("difficulty-e").classList.remove("active");
      document.getElementById("difficulty-m").classList.remove("active");
      document.getElementById("difficulty-h").classList.remove("active");
      document.getElementById("difficulty-vh").classList.remove("active");
    }
    showDeath();
  });
});
