var steam64 = 0;
var steammath = 0;

function LoadPlayersLJ() {
  // Longjump
  $.ajax({
    type: "GET",
    url: "https://kztimerglobal.com/api/v1/jumpstats?jumptype=longjump&limit=5000",
    success: function(data) {

      $(".se-pre-con").fadeOut("slow");

      var position = 0;
      var lengthItem = data.length;
      for (i=0;i < lengthItem; i++)  {
        if (tableLJ.rows.length > 20) {
          break;
        }
        if (playerListLJ.includes(jsonPlayerName[data[i].steam_id])) {
          continue;
        }
        else {

          // 64-bit Integer (Lets Steam64 work for profile linking)
          var steamid = (data[i].steam_id).split(":");
          var steam64 = BigInteger(steamid[2]);
          var steam64 = BigInteger(steam64.multiply(2).toString());
          if (steamid[1] === "1") {
            steammath = BigInteger('76561197960265729');
          } else {
            steammath = BigInteger('76561197960265728');
          }
          SteamLink = "http://steamcommunity.com/profiles/" + steam64.add(steammath).toString()

          var row = tableLJ.insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);

          if (jsonPlayerName[data[i].steam_id] === undefined) {
            position++;
            playerListLJ.push(data[i].steam_id);
            cell1.innerHTML = "<p style='color:#ff7f50; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' href=" + SteamLink + ">" + data[i].steam_id + "</a>";

          } else {
            position++;
            playerListLJ.push(jsonPlayerName[data[i].steam_id]);
            cell1.innerHTML = "<p style='color:#ff7f50; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' href=" + SteamLink + ">" + jsonPlayerName[data[i].steam_id] + "</a>";
          }
          cell2.innerHTML = data[i].distance;
        }
      }
      if (tableLJ.rows.length > 20
        && tableBHOP.rows.length > 20
        && tableMBHOP.rows.length > 20
        && tableWJ.rows.length > 20
        && tableDBHOP.rows.length > 20
        && tableCJ.rows.length > 20
        && tableLAJ.rows.length > 20) { // There is literally not 20 unique players with Ladderjumps. What the fuck.
        }
      },
    });

    $.ajax({
      type: "GET",
      url: "https://kztimerglobal.com/api/v1/jumpstats?jumptype=bhop&limit=5000",
      success: function(data) {

        var position = 0;
        var lengthItem = data.length;
        for (i=0;i < lengthItem; i++)  {
          if (tableBHOP.rows.length > 20) {
            break;
          }
          if (playerListBHOP.includes(jsonPlayerName[data[i].steam_id])) {
            continue;
          }
          else {

            // 64-bit Integer (Lets Steam64 work for profile linking)
            var steamid = (data[i].steam_id).split(":");
            steam64 = BigInteger(steamid[2]);
            steam64 = BigInteger(steam64.multiply(2).toString());
            if (steamid[1] === "1") {
              steammath = BigInteger('76561197960265729');
            } else {
              steammath = BigInteger('76561197960265728');
            }
            SteamLink = "http://steamcommunity.com/profiles/" + steam64.add(steammath).toString()

            var row = tableBHOP.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            if (jsonPlayerName[data[i].steam_id] === undefined) {
              position++;
              playerListBHOP.push(data[i].steam_id);
              cell1.innerHTML = "<p style='color:#ff7f50; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' href=" + SteamLink + ">" + data[i].steam_id + "</a>";
            } else {
              position++;
              playerListBHOP.push(jsonPlayerName[data[i].steam_id]);
              cell1.innerHTML = "<p style='color:#ff7f50; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' href=" + SteamLink + ">" + jsonPlayerName[data[i].steam_id] + "</a>";
            }
            cell2.innerHTML = data[i].distance;
          }
        }
      },
    });

    $.ajax({
      type: "GET",
      url: "https://kztimerglobal.com/api/v1/jumpstats?jumptype=multibhop&limit=5000",
      success: function(data) {

        var position = 0;
        var lengthItem = data.length;
        for (i=0;i < lengthItem; i++)  {
          if (tableMBHOP.rows.length > 20) {
            break;
          }
          if (playerListMBHOP.includes(jsonPlayerName[data[i].steam_id])) {
            continue;
          }
          else {

            // 64-bit Integer (Lets Steam64 work for profile linking)
            var steamid = (data[i].steam_id).split(":");
            var steam64 = BigInteger(steamid[2]);
            var steam64 = BigInteger(steam64.multiply(2).toString());
            if (steamid[1] === "1") {
              steammath = BigInteger('76561197960265729');
            } else {
              steammath = BigInteger('76561197960265728');
            }
            SteamLink = "http://steamcommunity.com/profiles/" + steam64.add(steammath).toString()

            var row = tableMBHOP.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            if (jsonPlayerName[data[i].steam_id] === undefined) {
              position++;
              playerListMBHOP.push(data[i].steam_id);
              cell1.innerHTML = "<p style='color:#ff7f50; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' href=" + SteamLink + ">" + data[i].steam_id + "</a>";
            } else {
              position++;
              playerListMBHOP.push(jsonPlayerName[data[i].steam_id]);
              cell1.innerHTML = "<p style='color:#ff7f50; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' href=" + SteamLink + ">" + jsonPlayerName[data[i].steam_id] + "</a>";
            }
            cell2.innerHTML = data[i].distance;
          }
        }
      },
    });

    $.ajax({
      type: "GET",
      url: "https://kztimerglobal.com/api/v1/jumpstats?jumptype=weirdjump&limit=5000",
      success: function(data) {

        var position = 0;
        var lengthItem = data.length;
        for (i=0;i < lengthItem; i++)  {
          if (tableWJ.rows.length > 20) {
            break;
          }
          if (playerListWJ.includes(jsonPlayerName[data[i].steam_id])) {
            continue;
          }
          else {

            // 64-bit Integer (Lets Steam64 work for profile linking)
            var steamid = (data[i].steam_id).split(":");
            var steam64 = BigInteger(steamid[2]);
            var steam64 = BigInteger(steam64.multiply(2).toString());
            if (steamid[1] === "1") {
              steammath = BigInteger('76561197960265729');
            } else {
              steammath = BigInteger('76561197960265728');
            }
            SteamLink = "http://steamcommunity.com/profiles/" + steam64.add(steammath).toString()

            var row = tableWJ.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            if (jsonPlayerName[data[i].steam_id] === undefined) {
              position++;
              playerListWJ.push(data[i].steam_id);
              cell1.innerHTML = "<p style='color:#ff7f50; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' href=" + SteamLink + ">" + data[i].steam_id + "</a>";
            } else {
              position++;
              playerListWJ.push(jsonPlayerName[data[i].steam_id]);
              cell1.innerHTML = "<p style='color:#ff7f50; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' href=" + SteamLink + ">" + jsonPlayerName[data[i].steam_id] + "</a>";
            }
            cell2.innerHTML = data[i].distance;
          }
        }
      },
    });

    $.ajax({
      type: "GET",
      url: "https://kztimerglobal.com/api/v1/jumpstats?jumptype=dropbhop&limit=5000",
      success: function(data) {

        var position = 0;
        var lengthItem = data.length;
        for (i=0;i < lengthItem; i++)  {
          if (tableDBHOP.rows.length > 20) {
            break;
          }
          if (playerListDBHOP.includes(jsonPlayerName[data[i].steam_id])) {
            continue;
          }
          else {

            // 64-bit Integer (Lets Steam64 work for profile linking)
            var steamid = (data[i].steam_id).split(":");
            var steam64 = BigInteger(steamid[2]);
            var steam64 = BigInteger(steam64.multiply(2).toString());
            if (steamid[1] === "1") {
              steammath = BigInteger('76561197960265729');
            } else {
              steammath = BigInteger('76561197960265728');
            }
            SteamLink = "http://steamcommunity.com/profiles/" + steam64.add(steammath).toString()

            var row = tableDBHOP.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            if (jsonPlayerName[data[i].steam_id] === undefined) {
              position++;
              playerListDBHOP.push(data[i].steam_id);
              cell1.innerHTML = "<p style='color:#ff7f50; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' href=" + SteamLink + ">" + data[i].steam_id + "</a>";
            } else {
              position++;
              playerListDBHOP.push(jsonPlayerName[data[i].steam_id]);
              cell1.innerHTML = "<p style='color:#ff7f50; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' href=" + SteamLink + ">" + jsonPlayerName[data[i].steam_id] + "</a>";
            }
            cell2.innerHTML = data[i].distance;
          }
        }
      },
    });

    $.ajax({
      type: "GET",
      url: "https://kztimerglobal.com/api/v1/jumpstats?jumptype=countjump&limit=5000",
      success: function(data) {

        var position = 0;
        var lengthItem = data.length;
        for (i=0;i < lengthItem; i++)  {
          if (tableCJ.rows.length > 20) {
            break;
          }
          if (playerListCJ.includes(jsonPlayerName[data[i].steam_id])) {
            continue;
          }
          else {

            // 64-bit Integer (Lets Steam64 work for profile linking)
            var steamid = (data[i].steam_id).split(":");
            var steam64 = BigInteger(steamid[2]);
            var steam64 = BigInteger(steam64.multiply(2).toString());
            if (steamid[1] === "1") {
              steammath = BigInteger('76561197960265729');
            } else {
              steammath = BigInteger('76561197960265728');
            }
            SteamLink = "http://steamcommunity.com/profiles/" + steam64.add(steammath).toString()

            var row = tableCJ.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            if (jsonPlayerName[data[i].steam_id] === undefined) {
              position++;
              playerListCJ.push(data[i].steam_id);
              cell1.innerHTML = "<p style='color:#ff7f50; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' href=" + SteamLink + ">" + data[i].steam_id + "</a>";
            } else {
              position++;
              playerListCJ.push(jsonPlayerName[data[i].steam_id]);
              cell1.innerHTML = "<p style='color:#ff7f50; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' href=" + SteamLink + ">" + jsonPlayerName[data[i].steam_id] + "</a>";
            }
            cell2.innerHTML = data[i].distance;
          }
        }
      },
    });

    $.ajax({
      type: "GET",
      url: "https://kztimerglobal.com/api/v1/jumpstats?jumptype=ladderjump&limit=5000",
      success: function(data) {

        var position = 0;
        var lengthItem = data.length;
        for (i=0;i < lengthItem; i++)  {
          if (tableLAJ.rows.length > 20) {
            break;
          }
          if (playerListLAJ.includes(jsonPlayerName[data[i].steam_id])) {
            continue;
          }
          else {

            // 64-bit Integer (Lets Steam64 work for profile linking)
            var steamid = (data[i].steam_id).split(":");
            var steam64 = BigInteger(steamid[2]);
            var steam64 = BigInteger(steam64.multiply(2).toString());
            if (steamid[1] === "1") {
              steammath = BigInteger('76561197960265729');
            } else {
              steammath = BigInteger('76561197960265728');
            }
            SteamLink = "http://steamcommunity.com/profiles/" + steam64.add(steammath).toString()

            var row = tableLAJ.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            if (jsonPlayerName[data[i].steam_id] === undefined) {
              position++;
              playerListLAJ.push(data[i].steam_id);
              cell1.innerHTML = "<p style='color:#ff7f50; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' href=" + SteamLink + ">" + data[i].steam_id + "</a>";
            } else {
              position++;
              playerListLAJ.push(jsonPlayerName[data[i].steam_id]);
              cell1.innerHTML = "<p style='color:#ff7f50; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' href=" + SteamLink + ">" + jsonPlayerName[data[i].steam_id] + "</a>";
            }
            cell2.innerHTML = data[i].distance;
          }
        }
      },
    });

  }
