/* Get all maps and randomize. Don't need to create array. */
function showAny() {
  document.getElementById("difficulty-button").innerHTML = "Any Difficulty";
  $("#difficulty-random-desktop").css("color","orange");
  $("a[id$='difficulty-random-mobile']").addClass("active");
  $.ajax({
    url: "../js/mapListNew.js",
    dataType: "text",
    success: function(Map_info) {
      var data = $.parseJSON(Map_info);
      var mapCount = data.length;
      var randomGet = Math.round(Math.random()*(mapCount - 1));
      var randomMap = data[randomGet];
      getDifficulty(randomMap.difficulty_id);
      /* Get Time */
      var time_tp = timeConvert(randomMap.Avg_maptime_tp);
      var time_pro = timeConvert(randomMap.Avg_maptime_pro);
      /* HTML Formatting, gets image url */
      var imageUrl = 'http://www.kzstats.com/img/map/' + randomMap.mapname + ".jpg";
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
  if (document.getElementById("dropdown").style.display === "none") {
    return;
  }
  else if (document.getElementById("dropdown").style.display === "flex") {
    document.getElementById("dropdown").style.display = "none";
  }
}

/* Gets maps that have the 1(Very easy) difficulty_id. */
function showVeryEasy() {
  document.getElementById("difficulty-button").innerHTML = "Very Easy Difficulty";
  $("#difficulty-ve-desktop").css("color","orange");
  $("a[id$='difficulty-ve-mobile']").addClass("active");
  if (width < 769) {
    document.getElementById("mapChoose").style.display = "flex";
  }
  $.ajax({
    url: "../js/mapListNew.js",
    dataType: "text",
    success: function(Map_info) {
      var data = $.parseJSON(Map_info);
      var mapCount = data.length;
      if (VeryEasyMaps.length === 0) {
        for (i=0;i<mapCount;i++) {
          if (data[i].difficulty_id === 1 && data[i].Global == 1) {
            VeryEasyMaps.push({
              workshop_id: data[i].workshop_id,
              description: data[i].description,
              mapname: data[i].mapname,
              filesize: data[i].filesize,
              difficulty_id: data[i].difficulty_id,
              Avg_maptime_pro: data[i].Avg_maptime_pro,
              Avg_maptime_tp: data[i].Avg_maptime_tp
            });
          }
        }
      }

      // Refills Array when 0 is reached
      if (temp_map_array.length >= 1) {
        if (temp_map_array[0].difficulty_id != "1") {
          temp_map_array = [];
        }
      }
      if (temp_map_array.length < 1) {
        temp_map_array = VeryEasyMaps.slice(0);
      }

      var randomGet = Math.round(Math.random()*(temp_map_array.length - 1));
      var randomMap = temp_map_array[randomGet];
      var time_tp = timeConvert(randomMap.Avg_maptime_tp);
      var time_pro = timeConvert(randomMap.Avg_maptime_pro);
      getDifficulty(randomMap.difficulty_id);

      // Removes current map from temp array
      if (randomGet > -1) {
        temp_map_array.splice(randomGet, 1);
      }

      /* HTML Formatting, gets image url */
      var imageUrl = 'http://www.kzstats.com/img/map/' + randomMap.mapname + ".jpg";
      $('#mapPost').html("<a href='http://steamcommunity.com/sharedfiles/filedetails/?id=" + randomMap.workshop_id + "'>" + randomMap.mapname + "</a>");
      $('#mapDescription').html(randomMap.description);
      $('#mapAvgTP').html("Average TP Time: " + time_tp);
      $('#mapAvgPRO').html("Average Pro Time: " + time_pro);
      $('#mapFilesize').html("File size: " + (randomMap.filesize/1000000).toFixed(2) + "mb");
      $('#mapDifficulty').html("Difficulty: " + difficulty);
      $('#changePicture').attr("src", imageUrl);
    }
  });
  if (document.getElementById("dropdown").style.display === "none") {
    return;
  }
  else if (document.getElementById("dropdown").style.display === "flex") {
    document.getElementById("dropdown").style.display = "none";
  }
}

/* Gets maps that have the 2(easy) difficulty_id. */
function showEasy() {
  document.getElementById("difficulty-button").innerHTML = "Easy Difficulty";
  $("#difficulty-e-desktop").css("color","orange");
  $("a[id$='difficulty-e-mobile']").addClass("active");
  if (width < 769) {
    document.getElementById("mapChoose").style.display = "flex";
  }
  $.ajax({
    url: "../js/mapListNew.js",
    dataType: "text",
    success: function(Map_info) {
      var data = $.parseJSON(Map_info);
      var mapCount = data.length;

      if (EasyMaps.length === 0) {
        for (i=0;i<mapCount;i++) {
          if (data[i].difficulty_id === 2 && data[i].Global == 1) {
            EasyMaps.push({
              workshop_id: data[i].workshop_id,
              description: data[i].description,
              mapname: data[i].mapname,
              filesize: data[i].filesize,
              difficulty_id: data[i].difficulty_id,
              Avg_maptime_pro: data[i].Avg_maptime_pro,
              Avg_maptime_tp: data[i].Avg_maptime_tp
            });
          }
        }
      }

      // Refills Array when 0 is reached
      if (temp_map_array.length >= 1) {
        if (temp_map_array[0].difficulty_id != "2") {
          temp_map_array = [];
        }
      }
      if (temp_map_array.length < 1) {
        temp_map_array = EasyMaps.slice(0);
      }

      var randomGet = Math.round(Math.random()*(temp_map_array.length - 1));
      var randomMap = temp_map_array[randomGet];
      var time_tp = timeConvert(randomMap.Avg_maptime_tp);
      var time_pro = timeConvert(randomMap.Avg_maptime_pro);
      getDifficulty(randomMap.difficulty_id);

      // Removes current map from temp array
      if (randomGet > -1) {
        temp_map_array.splice(randomGet, 1);
      }

      /* HTML Formatting, gets image url */
      var imageUrl = 'http://www.kzstats.com/img/map/' + randomMap.mapname + ".jpg";
      $('#mapPost').html("<a href='http://steamcommunity.com/sharedfiles/filedetails/?id=" + randomMap.workshop_id + "'>" + randomMap.mapname + "</a>");
      $('#mapDescription').html(randomMap.description);
      $('#mapAvgTP').html("Average TP Time: " + time_tp);
      $('#mapAvgPRO').html("Average Pro Time: " + time_pro);
      $('#mapFilesize').html("File size: " + (randomMap.filesize/1000000).toFixed(2) + "mb");
      $('#mapDifficulty').html("Difficulty: " + difficulty);
      $('#changePicture').attr("src", imageUrl);
    }
  });
  if (document.getElementById("dropdown").style.display === "none") {
    return;
  }
  else if (document.getElementById("dropdown").style.display === "flex") {
    document.getElementById("dropdown").style.display = "none";
  }
}

/* Gets maps that have the 3(medium) difficulty_id. */
function showMedium() {
  document.getElementById("difficulty-button").innerHTML = "Medium Difficulty";
  $("#difficulty-m-desktop").css("color","orange");
  $("a[id$='difficulty-m-mobile']").addClass("active");
  if (width < 769) {
    document.getElementById("mapChoose").style.display = "flex";
  }
  $.ajax({
    url: "../js/mapListNew.js",
    dataType: "text",
    success: function(Map_info) {
      var data = $.parseJSON(Map_info);
      var mapCount = data.length;

      if (MediumMaps.length === 0) {
        for (i=0;i<mapCount;i++) {
          if (data[i].difficulty_id === 3 && data[i].Global == 1) {
            MediumMaps.push({
              workshop_id: data[i].workshop_id,
              description: data[i].description,
              mapname: data[i].mapname,
              filesize: data[i].filesize,
              difficulty_id: data[i].difficulty_id,
              Avg_maptime_pro: data[i].Avg_maptime_pro,
              Avg_maptime_tp: data[i].Avg_maptime_tp
            });
          }
        }
      }

      // Refills Array when 0 is reached
      if (temp_map_array.length >= 1) {
        if (temp_map_array[0].difficulty_id != "3") {
          temp_map_array = [];
        }
      }
      if (temp_map_array.length < 1) {
        temp_map_array = MediumMaps.slice(0);
      }

      var randomGet = Math.round(Math.random()*(temp_map_array.length - 1));
      var randomMap = temp_map_array[randomGet];
      var time_tp = timeConvert(randomMap.Avg_maptime_tp);
      var time_pro = timeConvert(randomMap.Avg_maptime_pro);
      getDifficulty(randomMap.difficulty_id);

      // Removes current map from temp array
      if (randomGet > -1) {
        temp_map_array.splice(randomGet, 1);
      }

      /* HTML Formatting, gets image url */
      var imageUrl = 'http://www.kzstats.com/img/map/' + randomMap.mapname + ".jpg";
      $('#mapPost').html("<a href='http://steamcommunity.com/sharedfiles/filedetails/?id=" + randomMap.workshop_id + "'>" + randomMap.mapname + "</a>");
      $('#mapDescription').html(randomMap.description);
      $('#mapAvgTP').html("Average TP Time: " + time_tp);
      $('#mapAvgPRO').html("Average Pro Time: " + time_pro);
      $('#mapFilesize').html("File size: " + (randomMap.filesize/1000000).toFixed(2) + "mb");
      $('#mapDifficulty').html("Difficulty: " + difficulty);
      $('#changePicture').attr("src", imageUrl);
    }
  });
  if (document.getElementById("dropdown").style.display === "none") {
    return;
  }
  else if (document.getElementById("dropdown").style.display === "flex") {
    document.getElementById("dropdown").style.display = "none";
  }
}

/* Gets maps that have the 4(hard) difficulty_id. */
function showHard() {
  document.getElementById("difficulty-button").innerHTML = "Hard Difficulty";
  $("#difficulty-h-desktop").css("color","orange");
  $("a[id$='difficulty-h-mobile']").addClass("active");
  if (width < 769) {
    document.getElementById("mapChoose").style.display = "flex";
  }
  $.ajax({
    url: "../js/mapListNew.js",
    dataType: "text",
    success: function(Map_info) {
      var data = $.parseJSON(Map_info);
      var mapCount = data.length;

      if (HardMaps.length === 0) {
        for (i=0;i<mapCount;i++) {
          if (data[i].difficulty_id === 4 && data[i].Global == 1) {
            HardMaps.push({
              workshop_id: data[i].workshop_id,
              description: data[i].description,
              mapname: data[i].mapname,
              filesize: data[i].filesize,
              difficulty_id: data[i].difficulty_id,
              Avg_maptime_pro: data[i].Avg_maptime_pro,
              Avg_maptime_tp: data[i].Avg_maptime_tp
            });
          }
        }
      }

      // Refills Array when 0 is reached
      if (temp_map_array.length >= 1) {
        if (temp_map_array[0].difficulty_id != "4") {
          temp_map_array = [];
        }
      }
      if (temp_map_array.length < 1) {
        temp_map_array = HardMaps.slice(0);
      }

      var randomGet = Math.round(Math.random()*(temp_map_array.length - 1));
      var randomMap = temp_map_array[randomGet];
      var time_tp = timeConvert(randomMap.Avg_maptime_tp);
      var time_pro = timeConvert(randomMap.Avg_maptime_pro);
      getDifficulty(randomMap.difficulty_id);

      // Removes current map from temp array
      if (randomGet > -1) {
        temp_map_array.splice(randomGet, 1);
      }

      /* HTML Formatting, gets image url */
      var imageUrl = 'http://www.kzstats.com/img/map/' + randomMap.mapname + ".jpg";
      $('#mapPost').html("<a href='http://steamcommunity.com/sharedfiles/filedetails/?id=" + randomMap.workshop_id + "'>" + randomMap.mapname + "</a>");
      $('#mapDescription').html(randomMap.description);
      $('#mapAvgTP').html("Average TP Time: " + time_tp);
      $('#mapAvgPRO').html("Average Pro Time: " + time_pro);
      $('#mapFilesize').html("File size: " + (randomMap.filesize/1000000).toFixed(2) + "mb");
      $('#mapDifficulty').html("Difficulty: " + difficulty);
      $('#changePicture').attr("src", imageUrl);
    }
  });
  if (document.getElementById("dropdown").style.display === "none") {
    return;
  }
  else if (document.getElementById("dropdown").style.display === "flex") {
    document.getElementById("dropdown").style.display = "none";
  }
}

/* Gets maps that have the 5(very hard) difficulty_id. */
function showVeryHard() {
  document.getElementById("difficulty-button").innerHTML = "Very Hard Difficulty";
  $("#difficulty-vh-desktop").css("color","orange");
  $("a[id$='difficulty-vh-mobile']").addClass("active");
  if (width < 769) {
    document.getElementById("mapChoose").style.display = "flex";
  }
  $.ajax({
    url: "../js/mapListNew.js",
    dataType: "text",
    success: function(Map_info) {
      var data = $.parseJSON(Map_info);
      var mapCount = data.length;

      if (VeryHardMaps.length === 0) {
        for (i=0;i<mapCount;i++) {
          if (data[i].difficulty_id === 5 && data[i].Global == 1) {
            VeryHardMaps.push({
              workshop_id: data[i].workshop_id,
              description: data[i].description,
              mapname: data[i].mapname,
              filesize: data[i].filesize,
              difficulty_id: data[i].difficulty_id,
              Avg_maptime_pro: data[i].Avg_maptime_pro,
              Avg_maptime_tp: data[i].Avg_maptime_tp
            });
          }
        }
      }

      // Refills Array when 0 is reached
      if (temp_map_array.length >= 1) {
        if (temp_map_array[0].difficulty_id != "5") {
          temp_map_array = [];
        }
      }
      if (temp_map_array.length < 1) {
        temp_map_array = VeryHardMaps.slice(0);
      }

      var randomGet = Math.round(Math.random()*(temp_map_array.length - 1));
      var randomMap = temp_map_array[randomGet];
      var time_tp = timeConvert(randomMap.Avg_maptime_tp);
      var time_pro = timeConvert(randomMap.Avg_maptime_pro);
      getDifficulty(randomMap.difficulty_id);

      // Removes current map from temp array
      if (randomGet > -1) {
        temp_map_array.splice(randomGet, 1);
      }

      /* HTML Formatting, gets image url */
      var imageUrl = 'http://www.kzstats.com/img/map/' + randomMap.mapname + ".jpg";
      $('#mapPost').html("<a href='http://steamcommunity.com/sharedfiles/filedetails/?id=" + randomMap.workshop_id + "'>" + randomMap.mapname + "</a>");
      $('#mapDescription').html(randomMap.description);
      $('#mapAvgTP').html("Average TP Time: " + time_tp);
      $('#mapAvgPRO').html("Average Pro Time: " + time_pro);
      $('#mapFilesize').html("File size: " + (randomMap.filesize/1000000).toFixed(2) + "mb");
      $('#mapDifficulty').html("Difficulty: " + difficulty);
      $('#changePicture').attr("src", imageUrl);
    }
  });
  if (document.getElementById("dropdown").style.display === "none") {
    return;
  }
  else if (document.getElementById("dropdown").style.display === "flex") {
    document.getElementById("dropdown").style.display = "none";
  }
}

/* Gets maps that have the 6(death) difficulty_id. */
function showDeath() {
  document.getElementById("difficulty-button").innerHTML = "Death Difficulty";
  $("#difficulty-d-desktop").css("color","orange");
  $("a[id$='difficulty-d-mobile']").addClass("active");
  if (width < 769) {
    document.getElementById("mapChoose").style.display = "flex";
  }
  $.ajax({
    url: "../js/mapListNew.js",
    dataType: "text",
    success: function(Map_info) {
      var data = $.parseJSON(Map_info);
      var mapCount = data.length;

      if (DeathMaps.length === 0) {
        for (i=0;i<mapCount;i++) {
          if (data[i].difficulty_id === 6 && data[i].Global == 1) {
            DeathMaps.push({
              workshop_id: data[i].workshop_id,
              description: data[i].description,
              mapname: data[i].mapname,
              filesize: data[i].filesize,
              difficulty_id: data[i].difficulty_id,
              Avg_maptime_pro: data[i].Avg_maptime_pro,
              Avg_maptime_tp: data[i].Avg_maptime_tp
            });
          }
        }
      }

      // Refills Array when 0 is reached
      if (temp_map_array.length >= 1) {
        if (temp_map_array[0].difficulty_id != "6") {
          temp_map_array = [];
        }
      }
      if (temp_map_array.length < 1) {
        temp_map_array = DeathMaps.slice(0);
      }

      var randomGet = Math.round(Math.random()*(temp_map_array.length - 1));
      var randomMap = temp_map_array[randomGet];
      var time_tp = timeConvert(randomMap.Avg_maptime_tp);
      var time_pro = timeConvert(randomMap.Avg_maptime_pro);
      getDifficulty(randomMap.difficulty_id);

      // Removes current map from temp array
      if (randomGet > -1) {
        temp_map_array.splice(randomGet, 1);
      }

      /* HTML Formatting, gets image url */
      var imageUrl = 'http://www.kzstats.com/img/map/' + randomMap.mapname + ".jpg";
      $('#mapPost').html("<a href='http://steamcommunity.com/sharedfiles/filedetails/?id=" + randomMap.workshop_id + "'>" + randomMap.mapname + "</a>");
      $('#mapDescription').html(randomMap.description);
      $('#mapAvgTP').html("Average TP Time: " + time_tp);
      $('#mapAvgPRO').html("Average Pro Time: " + time_pro);
      $('#mapFilesize').html("File size: " + (randomMap.filesize/1000000).toFixed(2) + "mb");
      $('#mapDifficulty').html("Difficulty: " + difficulty);
      $('#changePicture').attr("src", imageUrl);
    }
  });
  if (document.getElementById("dropdown").style.display === "none") {
    return;
  }
  else if (document.getElementById("dropdown").style.display === "flex") {
    document.getElementById("dropdown").style.display = "none";
  }
}
