function LoadPlayers() {
  // Longjump
  $.ajax({
    type: "GET",
    url: "https://kztimerglobal.com/api/v1/jumpstats?jumptype=longjump&limit=20000",
    success: function(data) {
      var lengthItem = data.length;
      for (i=0;i < lengthItem; i++)  {
        if (table.rows.length > 20) {
          break;
        }
        if (playerList.includes(jsonPlayerName[data[i].steam_id])/* || jsonPlayerName[data[i].steam_id] === undefined*/) {
          continue;
        }
        else {
          var row = table.insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          playerList.push(jsonPlayerName[data[i].steam_id]);
          cell1.innerHTML = jsonPlayerName[data[i].steam_id];
          cell2.innerHTML = data[i].distance;
        }
      }
    },
  });
}
