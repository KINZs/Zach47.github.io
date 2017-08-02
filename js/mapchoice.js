$("#difficulty-button").on('click', function(){
  if (document.getElementById("dropdown").style.display === "flex") {
    document.getElementById("dropdown").style.display = "none";
  } else {
    document.getElementById("dropdown").style.display = "flex";
  }
});

$("#mapChoose").on('click', function(){
  if (document.getElementById("difficulty-random").classList.contains("active")) {
    showAny();
  }
  else if (document.getElementById("difficulty-ve").classList.contains("active")) {
    showVeryEasy();
  }
  else if (document.getElementById("difficulty-e").classList.contains("active")) {
    showEasy();
  }
  else if (document.getElementById("difficulty-m").classList.contains("active")) {
    showMedium();
  }
  else if (document.getElementById("difficulty-h").classList.contains("active")) {
    showHard();
  }
  else if (document.getElementById("difficulty-vh").classList.contains("active")) {
    showVeryHard();
  }
  else if (document.getElementById("difficulty-d").classList.contains("active")) {
    showDeath();
  }
});

/* Get all maps and randomize. Don't need to create array. */
function showAny() {
  document.getElementById("difficulty-button").innerHTML = "Any Difficulty";
  if (width < 769) {
    document.getElementById("mapChoose").style.display = "flex";
  }
  $.ajax({
    url: "../js/mapListNew.js",
    dataType: "text",
    success: function(Map_info) {
      var data = $.parseJSON(Map_info);
      var mapCount = Object.keys(data).length;
      var randomGet = Math.round(Math.random()*(mapCount - 1));
      var randomMap = data[randomGet];
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
  if (document.getElementById("dropdown").style.display === "none") {
    return;
  }
  else if (document.getElementById("dropdown").style.display === "flex") {
    document.getElementById("dropdown").style.display = "none";
  } else if (width < 769) {
    document.getElementById("dropdown").style.display = "flex";
  }
}

/* Gets maps that have the 1(Very easy) difficulty_id. */
function showVeryEasy() {
  document.getElementById("difficulty-button").innerHTML = "Very Easy Difficulty";
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
          if (data[i].difficulty_id === 1) {
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
  if (document.getElementById("dropdown").style.display === "none") {
    return;
  }
  else if (document.getElementById("dropdown").style.display === "flex") {
    document.getElementById("dropdown").style.display = "none";
  } else if (width < 769) {
    document.getElementById("dropdown").style.display = "flex";
  }
}

/* Gets maps that have the 2(easy) difficulty_id. */
function showEasy() {
  document.getElementById("difficulty-button").innerHTML = "Easy Difficulty";
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
          if (data[i].difficulty_id === 2) {
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
  if (document.getElementById("dropdown").style.display === "none") {
    return;
  }
  else if (document.getElementById("dropdown").style.display === "flex") {
    document.getElementById("dropdown").style.display = "none";
  } else if (width < 769) {
    document.getElementById("dropdown").style.display = "flex";
  }
}

/* Gets maps that have the 3(medium) difficulty_id. */
function showMedium() {
  document.getElementById("difficulty-button").innerHTML = "Medium Difficulty";
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
          if (data[i].difficulty_id === 3) {
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
  if (document.getElementById("dropdown").style.display === "none") {
    return;
  }
  else if (document.getElementById("dropdown").style.display === "flex") {
    document.getElementById("dropdown").style.display = "none";
  } else if (width < 769) {
    document.getElementById("dropdown").style.display = "flex";
  }
}

/* Gets maps that have the 4(hard) difficulty_id. */
function showHard() {
  document.getElementById("difficulty-button").innerHTML = "Hard Difficulty";
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
          if (data[i].difficulty_id === 4) {
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
  if (document.getElementById("dropdown").style.display === "none") {
    return;
  }
  else if (document.getElementById("dropdown").style.display === "flex") {
    document.getElementById("dropdown").style.display = "none";
  } else if (width < 769) {
    document.getElementById("dropdown").style.display = "flex";
  }
}

/* Gets maps that have the 5(very hard) difficulty_id. */
function showVeryHard() {
  document.getElementById("difficulty-button").innerHTML = "Very Hard Difficulty";
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
          if (data[i].difficulty_id === 5) {
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
  if (document.getElementById("dropdown").style.display === "none") {
    return;
  }
  else if (document.getElementById("dropdown").style.display === "flex") {
    document.getElementById("dropdown").style.display = "none";
  } else if (width < 769) {
    document.getElementById("dropdown").style.display = "flex";
  }
}

/* Gets maps that have the 6(death) difficulty_id. */
function showDeath() {
  document.getElementById("difficulty-button").innerHTML = "Death Difficulty";
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
          if (data[i].difficulty_id === 6) {
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
  if (document.getElementById("dropdown").style.display === "none") {
    return;
  }
  else if (document.getElementById("dropdown").style.display === "flex") {
    document.getElementById("dropdown").style.display = "none";
  } else if (width < 769) {
    document.getElementById("dropdown").style.display = "flex";
  }
}
