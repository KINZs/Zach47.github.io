function LoadPlayersLJ() {
  $.ajax({
    type: "GET",
    url: LJurl,
    success: function(data) {
      var position = 0;
      for (i=0;i<data.length; i++)  {
        if (document.getElementById("TableLJ").rows.length > 20) { break; }
        if (playerListLJ.includes(jsonPlayerName[data[i].steam_id])) { continue; }
        else {
          steamid = (data[i].steam_id).split(":");
          steam64 = BigInteger(steamid[2]);
          steam64 = BigInteger(steam64.multiply(2).toString());
          if (steamid[1] === "1") {
            steamBigInt = BigInteger('76561197960265729');
          } else {
            steamBigInt = BigInteger('76561197960265728');
          }
          // If name is longer than 20, but not longer than 23, length = 17 + ...
          // If name is longer than 23, length = 15 + ...
          if (data[i].player_name.toString().length > 20) {
            if (data[i].player_name.toString().length > 23) {
              playerName = data[i].player_name.substr(0,15) + "...";
            } else { playerName = data[i].player_name.substr(0,17) + "..."; }
          } else { playerName = data[i].player_name; }
          SteamLink = "http://steamcommunity.com/profiles/" + steam64.add(steamBigInt).toString();
          var row = document.getElementById("TableLJ").insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          position++;
          cell1.innerHTML = "<p style='color:#e45051; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' href=" + SteamLink + ">" + playerName + "</a>";
          playerListLJ.push(jsonPlayerName[data[i].steam_id]);
          cell2.innerHTML = data[i].distance;
        }
      }
    }
  });
}

function LoadPlayersBHOP() {
  $.ajax({
    type: "GET",
    url: BHOPurl,
    success: function(data) {
      var position = 0;
      for (i=0;i<data.length; i++)  {
        if (document.getElementById("TableBHOP").rows.length > 20) { break; }
        if (playerListBHOP.includes(jsonPlayerName[data[i].steam_id])) { continue; }
        else {
          steamid = (data[i].steam_id).split(":");
          steam64 = BigInteger(steamid[2]);
          steam64 = BigInteger(steam64.multiply(2).toString());
          if (steamid[1] === "1") {
            steamBigInt = BigInteger('76561197960265729');
          } else {
            steamBigInt = BigInteger('76561197960265728');
          }
          // If name is longer than 20, but not longer than 23, length = 17 + ...
          // If name is longer than 23, length = 15 + ...
          if (data[i].player_name.toString().length > 20) {
            if (data[i].player_name.toString().length > 23) {
              playerName = data[i].player_name.substr(0,15) + "...";
            } else { playerName = data[i].player_name.substr(0,17) + "..."; }
          } else { playerName = data[i].player_name; }
          SteamLink = "http://steamcommunity.com/profiles/" + steam64.add(steamBigInt).toString();
          var row = document.getElementById("TableBHOP").insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          position++;
          cell1.innerHTML = "<p style='color:#e45051; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' href=" + SteamLink + ">" + playerName + "</a>";
          playerListBHOP.push(jsonPlayerName[data[i].steam_id]);
          cell2.innerHTML = data[i].distance;
        }
      }
    },
  });
}

function LoadPlayersMBHOP() {
  $.ajax({
    type: "GET",
    url: MBHOPurl,
    success: function(data) {
      var position = 0;
      for (i=0;i<data.length; i++)  {
        if (document.getElementById("TableMBHOP").rows.length > 20) { break; }
        if (playerListMBHOP.includes(jsonPlayerName[data[i].steam_id])) { continue; }
        else {
          steamid = (data[i].steam_id).split(":");
          steam64 = BigInteger(steamid[2]);
          steam64 = BigInteger(steam64.multiply(2).toString());
          if (steamid[1] === "1") {
            steamBigInt = BigInteger('76561197960265729');
          } else {
            steamBigInt = BigInteger('76561197960265728');
          }
          // If name is longer than 20, but not longer than 23, length = 17 + ...
          // If name is longer than 23, length = 15 + ...
          if (data[i].player_name.toString().length > 20) {
            if (data[i].player_name.toString().length > 23) {
              playerName = data[i].player_name.substr(0,15) + "...";
            } else { playerName = data[i].player_name.substr(0,17) + "..."; }
          } else { playerName = data[i].player_name; }
          SteamLink = "http://steamcommunity.com/profiles/" + steam64.add(steamBigInt).toString();
          var row = document.getElementById("TableMBHOP").insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          position++;
          cell1.innerHTML = "<p style='color:#e45051; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' href=" + SteamLink + ">" + playerName + "</a>";
          playerListMBHOP.push(jsonPlayerName[data[i].steam_id]);
          cell2.innerHTML = data[i].distance;
        }
      }
    },
  });
}

function LoadPlayersWJ() {
  $.ajax({
    type: "GET",
    url: WJurl,
    success: function(data) {
      var position = 0;
      for (i=0;i<data.length; i++)  {
        if (document.getElementById("TableWJ").rows.length > 20) { break; }
        if (playerListWJ.includes(jsonPlayerName[data[i].steam_id])) { continue; }
        else {
          steamid = (data[i].steam_id).split(":");
          steam64 = BigInteger(steamid[2]);
          steam64 = BigInteger(steam64.multiply(2).toString());
          if (steamid[1] === "1") {
            steamBigInt = BigInteger('76561197960265729');
          } else {
            steamBigInt = BigInteger('76561197960265728');
          }
          // If name is longer than 20, but not longer than 23, length = 17 + ...
          // If name is longer than 23, length = 15 + ...
          if (data[i].player_name.toString().length > 20) {
            if (data[i].player_name.toString().length > 23) {
              playerName = data[i].player_name.substr(0,15) + "...";
            } else { playerName = data[i].player_name.substr(0,17) + "..."; }
          } else { playerName = data[i].player_name; }
          SteamLink = "http://steamcommunity.com/profiles/" + steam64.add(steamBigInt).toString();
          var row = document.getElementById("TableWJ").insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          position++;
          cell1.innerHTML = "<p style='color:#e45051; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' href=" + SteamLink + ">" + playerName + "</a>";
          playerListWJ.push(jsonPlayerName[data[i].steam_id]);
          cell2.innerHTML = data[i].distance;
        }
      }
    },
  });
}

function LoadPlayersDBHOP() {
  $.ajax({
    type: "GET",
    url: DBHOPurl,
    success: function(data) {
      var position = 0;
      for (i=0;i<data.length; i++)  {
        if (document.getElementById("TableDBHOP").rows.length > 20) { break; }
        if (playerListDBHOP.includes(jsonPlayerName[data[i].steam_id])) { continue; }
        else {
          steamid = (data[i].steam_id).split(":");
          steam64 = BigInteger(steamid[2]);
          steam64 = BigInteger(steam64.multiply(2).toString());
          if (steamid[1] === "1") {
            steamBigInt = BigInteger('76561197960265729');
          } else {
            steamBigInt = BigInteger('76561197960265728');
          }
          // If name is longer than 20, but not longer than 23, length = 17 + ...
          // If name is longer than 23, length = 15 + ...
          if (data[i].player_name.toString().length > 20) {
            if (data[i].player_name.toString().length > 23) {
              playerName = data[i].player_name.substr(0,15) + "...";
            } else { playerName = data[i].player_name.substr(0,17) + "..."; }
          } else { playerName = data[i].player_name; }
          SteamLink = "http://steamcommunity.com/profiles/" + steam64.add(steamBigInt).toString();
          var row = document.getElementById("TableDBHOP").insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          position++;
          cell1.innerHTML = "<p style='color:#e45051; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' href=" + SteamLink + ">" + playerName + "</a>";
          playerListDBHOP.push(jsonPlayerName[data[i].steam_id]);
          cell2.innerHTML = data[i].distance;
        }
      }
    },
  });
}

function LoadPlayersCJ() {
  $.ajax({
    type: "GET",
    url: CJurl,
    success: function(data) {
      var position = 0;
      for (i=0;i<data.length; i++)  {
        if (document.getElementById("TableCJ").rows.length > 20) { break; }
        if (playerListCJ.includes(jsonPlayerName[data[i].steam_id])) { continue; }
        else {
          steamid = (data[i].steam_id).split(":");
          steam64 = BigInteger(steamid[2]);
          steam64 = BigInteger(steam64.multiply(2).toString());
          if (steamid[1] === "1") {
            steamBigInt = BigInteger('76561197960265729');
          } else {
            steamBigInt = BigInteger('76561197960265728');
          }
          // If name is longer than 20, but not longer than 23, length = 17 + ...
          // If name is longer than 23, length = 15 + ...
          if (data[i].player_name.toString().length > 20) {
            if (data[i].player_name.toString().length > 23) {
              playerName = data[i].player_name.substr(0,15) + "...";
            } else { playerName = data[i].player_name.substr(0,17) + "..."; }
          } else { playerName = data[i].player_name; }
          SteamLink = "http://steamcommunity.com/profiles/" + steam64.add(steamBigInt).toString();
          var row = document.getElementById("TableCJ").insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          position++;
          cell1.innerHTML = "<p style='color:#e45051; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' href=" + SteamLink + ">" + playerName + "</a>";
          playerListCJ.push(jsonPlayerName[data[i].steam_id]);
          cell2.innerHTML = data[i].distance;
        }
      }
    },
  });
}

function LoadPlayersLAJ() {
  $.ajax({
    type: "GET",
    url: LAJurl,
    success: function(data) {
      var position = 0;
      for (i=0;i<data.length; i++)  {
        if (document.getElementById("TableLAJ").rows.length > 20) { break; }
        if (playerListLAJ.includes(jsonPlayerName[data[i].steam_id])) { continue; }
        else {
          steamid = (data[i].steam_id).split(":");
          steam64 = BigInteger(steamid[2]);
          steam64 = BigInteger(steam64.multiply(2).toString());
          if (steamid[1] === "1") {
            steamBigInt = BigInteger('76561197960265729');
          } else {
            steamBigInt = BigInteger('76561197960265728');
          }
          // If name is longer than 20, but not longer than 23, length = 17 + ...
          // If name is longer than 23, length = 15 + ...
          if (data[i].player_name.toString().length > 20) {
            if (data[i].player_name.toString().length > 23) {
              playerName = data[i].player_name.substr(0,15) + "...";
            } else { playerName = data[i].player_name.substr(0,17) + "..."; }
          } else { playerName = data[i].player_name; }
          SteamLink = "http://steamcommunity.com/profiles/" + steam64.add(steamBigInt).toString();
          var row = document.getElementById("TableLAJ").insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          position++;
          cell1.innerHTML = "<p style='color:#e45051; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' href=" + SteamLink + ">" + playerName + "</a>";
          playerListLAJ.push(jsonPlayerName[data[i].steam_id]);
          cell2.innerHTML = data[i].distance;
        }
      }
    },
  });
}
