function LoadPlayersLJ() {
  // Longjump
  $.ajax({
    type: "GET",
    url: "http://kztimerglobal.com/api/v1/jumpstats?jumptype=longjump&limit=5000",
    success: function(data) {
      $(".se-pre-con").fadeOut("slow");
      var lengthItem = data.length;
      for (i=0;i < lengthItem; i++)  {
        if (tableLJ.rows.length > 20
          && tableBHOP.rows.length > 20
          && tableMBHOP.rows.length > 20
          && tableWJ.rows.length > 20
          && tableDBHOP.rows.length > 20
          && tableCJ.rows.length > 20
          && tableLAJ.rows.length > 10) { // There is literally not 20 unique players with Ladderjumps. What the fuck.

            $(".se-pre-con").fadeOut("slow");
            break;
          }
          if (playerListLJ.includes(jsonPlayerName[data[i].steam_id])) {
            continue;
          }
          else {
            var row = tableLJ.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            if (jsonPlayerName[data[i].steam_id] === undefined) {
              playerListLJ.push(data[i].steam_id);
              cell1.innerHTML = data[i].steam_id;
            } else {
              playerListLJ.push(jsonPlayerName[data[i].steam_id]);
              cell1.innerHTML = jsonPlayerName[data[i].steam_id];
            }
            cell2.innerHTML = data[i].distance;
          }
        }
      },
    });

    $.ajax({
      type: "GET",
      url: "http://kztimerglobal.com/api/v1/jumpstats?jumptype=bhop&limit=5000",
      success: function(data) {
        var lengthItem = data.length;
        for (i=0;i < lengthItem; i++)  {
          if (tableBHOP.rows.length > 20) {
            break;
          }
          if (playerListBHOP.includes(jsonPlayerName[data[i].steam_id])) {
            continue;
          }
          else {
            var row = tableBHOP.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            if (jsonPlayerName[data[i].steam_id] === undefined) {
              playerListBHOP.push(data[i].steam_id);
              cell1.innerHTML = data[i].steam_id;
            } else {
              playerListBHOP.push(jsonPlayerName[data[i].steam_id]);
              cell1.innerHTML = jsonPlayerName[data[i].steam_id];
            }
            cell2.innerHTML = data[i].distance;
          }
        }
      },
    });

    $.ajax({
      type: "GET",
      url: "http://kztimerglobal.com/api/v1/jumpstats?jumptype=multibhop&limit=5000",
      success: function(data) {
        var lengthItem = data.length;
        for (i=0;i < lengthItem; i++)  {
          if (tableMBHOP.rows.length > 20) {
            break;
          }
          if (playerListMBHOP.includes(jsonPlayerName[data[i].steam_id])) {
            continue;
          }
          else {
            var row = tableMBHOP.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            if (jsonPlayerName[data[i].steam_id] === undefined) {
              playerListMBHOP.push(data[i].steam_id);
              cell1.innerHTML = data[i].steam_id;
            } else {
              playerListMBHOP.push(jsonPlayerName[data[i].steam_id]);
              cell1.innerHTML = jsonPlayerName[data[i].steam_id];
            }
            cell2.innerHTML = data[i].distance;
          }
        }
      },
    });

    $.ajax({
      type: "GET",
      url: "http://kztimerglobal.com/api/v1/jumpstats?jumptype=weirdjump&limit=5000",
      success: function(data) {
        var lengthItem = data.length;
        for (i=0;i < lengthItem; i++)  {
          if (tableWJ.rows.length > 20) {
            break;
          }
          if (playerListWJ.includes(jsonPlayerName[data[i].steam_id])) {
            continue;
          }
          else {
            var row = tableWJ.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            if (jsonPlayerName[data[i].steam_id] === undefined) {
              playerListWJ.push(data[i].steam_id);
              cell1.innerHTML = data[i].steam_id;
            } else {
              playerListWJ.push(jsonPlayerName[data[i].steam_id]);
              cell1.innerHTML = jsonPlayerName[data[i].steam_id];
            }
            cell2.innerHTML = data[i].distance;
          }
        }
      },
    });

    $.ajax({
      type: "GET",
      url: "http://kztimerglobal.com/api/v1/jumpstats?jumptype=dropbhop&limit=5000",
      success: function(data) {
        var lengthItem = data.length;
        for (i=0;i < lengthItem; i++)  {
          if (tableDBHOP.rows.length > 20) {
            break;
          }
          if (playerListDBHOP.includes(jsonPlayerName[data[i].steam_id])) {
            continue;
          }
          else {
            var row = tableDBHOP.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            if (jsonPlayerName[data[i].steam_id] === undefined) {
              playerListDBHOP.push(data[i].steam_id);
              cell1.innerHTML = data[i].steam_id;
            } else {
              playerListDBHOP.push(jsonPlayerName[data[i].steam_id]);
              cell1.innerHTML = jsonPlayerName[data[i].steam_id];
            }
            cell2.innerHTML = data[i].distance;
          }
        }
      },
    });

    $.ajax({
      type: "GET",
      url: "http://kztimerglobal.com/api/v1/jumpstats?jumptype=countjump&limit=5000",
      success: function(data) {
        var lengthItem = data.length;
        for (i=0;i < lengthItem; i++)  {
          if (tableCJ.rows.length > 20) {
            break;
          }
          if (playerListCJ.includes(jsonPlayerName[data[i].steam_id])) {
            continue;
          }
          else {
            var row = tableCJ.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            if (jsonPlayerName[data[i].steam_id] === undefined) {
              playerListCJ.push(data[i].steam_id);
              cell1.innerHTML = data[i].steam_id;
            } else {
              playerListCJ.push(jsonPlayerName[data[i].steam_id]);
              cell1.innerHTML = jsonPlayerName[data[i].steam_id];
            }
            cell2.innerHTML = data[i].distance;
          }
        }
      },
    });

    $.ajax({
      type: "GET",
      url: "http://kztimerglobal.com/api/v1/jumpstats?jumptype=ladderjump&limit=5000",
      success: function(data) {
        var lengthItem = data.length;
        for (i=0;i < lengthItem; i++)  {
          if (tableLAJ.rows.length > 20) {
            break;
          }
          if (playerListLAJ.includes(jsonPlayerName[data[i].steam_id])) {
            continue;
          }
          else {
            var row = tableLAJ.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            if (jsonPlayerName[data[i].steam_id] === undefined) {
              playerListLAJ.push(data[i].steam_id);
              cell1.innerHTML = data[i].steam_id;
            } else {
              playerListLAJ.push(jsonPlayerName[data[i].steam_id]);
              cell1.innerHTML = jsonPlayerName[data[i].steam_id];
            }
            cell2.innerHTML = data[i].distance;
          }
        }
      },
    });

  }
