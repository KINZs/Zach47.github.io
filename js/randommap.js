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
  else if (time === "NA") {
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
      var mapCount = data.length;
      var randomGet = Math.round(Math.random()*(mapCount - 1));
      var randomMap = data[randomGet];
      /* Gets difficulty title */
      getDifficulty(randomMap.difficulty_id);
      /* Get Time */
      var time_tp = timeConvert(randomMap.Avg_maptime_tp);
      var time_pro = timeConvert(randomMap.Avg_maptime_pro);
      /* HTML Formatting, gets image url */
      var imageUrl = 'https://s3.us-east-2.amazonaws.com/gokzstats/mapImages/' + randomMap.mapname + ".jpg";
      $('#mapPost').html("<a href='http://steamcommunity.com/sharedfiles/filedetails/?id=" + randomMap.workshop_id + "'>" + randomMap.mapname + "</a>");
      $('#mapDescription').html(randomMap.description);
      $('#mapAvgTP').html("Average TP Time: " + time_tp);
      $('#mapAvgPRO').html("Average Pro Time: " + time_pro);
      $('#mapFilesize').html("File size: " + (randomMap.filesize/1000000).toFixed(2) + "mb");
      $('#mapDifficulty').html("Difficulty: " + difficulty);
      $('#changePicture').attr("src", imageUrl);

      let url = 'http://kztimerglobal.com/api/v1.0/records/top/recent?map_name=' + randomMap.mapname + '&tickrate=128&stage=0&modes_list_string=kz_simple&place_top_at_least=1&place_top_overall_at_least=1&has_teleports=false'
      let xl = []
      let yl = []
      Plotly.d3.json(url, function(figure){
        for (var i=0; i< figure.length; i++){
          xl.push(figure[i].created_on)
          yl.push(figure[i].time)
        }
        let trace = {
          x: xl,
          y: yl
        }
        Plotly.plot(document.getElementById('graph'), [trace]);
      });
    }
  });

}


$(document).ready(function(){
  getRandomMap();

  $('#difficulty-random-desktop,#difficulty-ve-desktop,#difficulty-e-desktop,#difficulty-m-desktop,#difficulty-h-desktop,#difficulty-vh-desktop,#difficulty-d-desktop').on('click', function() {
    $("button[id$='desktop']").css("color","#E45051");
  });
  $('#difficulty-random-mobile,#difficulty-ve-mobile,#difficulty-e-mobile,#difficulty-m-mobile,#difficulty-h-mobile,#difficulty-vh-mobile,#difficulty-d-mobile').on('click', function() {
    $("a[id$='mobile']").removeClass("active");
  });
  $("#difficulty-random-desktop,#difficulty-random-mobile").on('click', function(){
    showAny();
  });
  $("#difficulty-ve-desktop,#difficulty-ve-mobile").on('click', function(){
    showVeryEasy();
  });
  $("#difficulty-e-desktop,#difficulty-e-mobile").on('click', function(){
    showEasy();
  });
  $("#difficulty-m-desktop,#difficulty-m-mobile").on('click', function(){
    showMedium();
  });
  $("#difficulty-h-desktop,#difficulty-h-mobile").on('click', function(){
    showHard();
  });
  $("#difficulty-vh-desktop,#difficulty-vh-mobile").on('click', function(){
    showVeryHard();
  });
  $("#difficulty-d-desktop,#difficulty-d-mobile").on('click', function(){
    showDeath();
  });
  $("#difficulty-button").on('click', function(){
    if (document.getElementById("dropdown").style.display === "flex") {
      document.getElementById("dropdown").style.display = "none";
    } else {
      document.getElementById("dropdown").style.display = "flex";
    }
  });
  $("#mapChoose").on('click', function(){
    if (document.getElementById("difficulty-random-mobile").classList.contains("active")) {
      showAny();
    }
    else if (document.getElementById("difficulty-ve-mobile").classList.contains("active")) {
      showVeryEasy();
    }
    else if (document.getElementById("difficulty-e-mobile").classList.contains("active")) {
      showEasy();
    }
    else if (document.getElementById("difficulty-m-mobile").classList.contains("active")) {
      showMedium();
    }
    else if (document.getElementById("difficulty-h-mobile").classList.contains("active")) {
      showHard();
    }
    else if (document.getElementById("difficulty-vh-mobile").classList.contains("active")) {
      showVeryHard();
    }
    else if (document.getElementById("difficulty-d-mobile").classList.contains("active")) {
      showDeath();
    }
  });
});
