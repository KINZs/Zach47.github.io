function LoadTable() {
  $.ajax({
    type: "GET",
    url: url,
    success: function(data) {
      let position = 0;
      playerList = [];
      if (data.length === 0) {
        let row = document.getElementById(TableSelection).insertRow(-1);
        let cell1 = row.insertCell(0);
        cell1.innerHTML = "No jumps recorded";
        cell1.style = "color: white;";
        return;
      }
      for (i=0;i<data.length; i++)  {
        if (document.getElementById(TableSelection).rows.length > 20) { break; }
        if (playerList.includes(data[i].player_name)) { continue; }
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
          if (data[i].player_name.toString().length > 15) {
            if (data[i].player_name.toString().length > 18) {
              playerName = data[i].player_name.substr(0,11) + "...";
            } else { playerName = data[i].player_name.substr(0,14) + "..."; }
          } else { playerName = data[i].player_name; }
          SteamLink = "https://steamcommunity.com/profiles/" + steam64.add(steamBigInt).toString();
          let row = document.getElementById(TableSelection).insertRow(-1);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          position++;
          cell1.innerHTML = "<p style='color:#e45051; display:inline;'>" + position + "</p>" + ". " + "<a class='profile' target='_blank' href=" + SteamLink + ">" + playerName + "</a>";
          playerList.push(data[i].player_name);
          cell2.innerHTML = data[i].distance;
        }
      }
    }
  });
}
