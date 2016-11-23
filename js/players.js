// Array of Global admins
var globalAdmins = [
  {
    "name": "<a href='http://zach47.github.io/pages/players/sachburger.html'>Sachburger</a>",
    "steam": 'Sachburger',
    "twitch": 'Sachburger',
    "youtube": '/user/SpeciaIized',
  },
  {
    "name": "Klyve",
    "steam": 'officialKlyve',
    "twitch": 'klyve',
  },
  {
    "name": "Zpamm",
    "steam": 'Zpamm',
    "twitch": 'zpammm',
  },
  {
    "name": "Chuckles",
    "steam": 'ChucklesHoC',
  },
  {
    "name": "Plekz",
    "steam": 'pLekz',
  },
  {
    "name": "Funk",
    "steam": 'uwatm8lelele',
  },
];

// Array of map testers
var mapTesters = [
  {
    "name": "Zach47",
    "steam": 'Zach47',
    "twitch": 'ijjust',
    "youtube": '/c/Zach47'
  },
  {
    "name": "DanZay",
    "steam": 'DanZay',
    "twitch": 'danzayau',
    "youtube": '/channel/UCZs3cFXfMIY6l3yXT3ooHVQ'
  },
  {
    "name": "<a href='http://zach47.github.io/pages/players/sachburger.html'>Sachburger</a>",
    "steam": 'Sachburger',
    "twitch": 'Sachburger',
    "youtube": '/user/SpeciaIized'
  }
];

// Array of notable players
var notablePlayers = [

  {
    "name": "Launders",
    "steam": 'csboxr',
    "twitch": 'launders',
    "youtube": '/user/csboxr'
  },
  {
    "name": "Ruben",
    "steam": 'rrubenlol',
    "twitch": 'rrubenlol',
    "youtube": '/user/rrubencs1'
  },
  {
    "name": "Linus",
    "steam": '76561198004411671',
    "twitch": 'jokkan33'
  },
  {
    "name": "Zza",
    "steam": 'pizzafactory',
    "twitch": 'pizzzzasht'
  },
  {
    "name": "JWL",
    "steam": 'LucidRainbows',
    "twitch": 'LucidRainbows'
  },
  {
    "name": "So0le",
    "steam": 'so0le'
  },
  {
    "name": "Zprince",
    "steam": 'zprince32'
  },
  {
    "name": "1NutWonder",
    "steam": '76561198107281573'
  },
  {
    "name": "Kenneth",
    "steam": 'KennethDota'
  },
  {
    "name": "Supa",
    "steam": 'supa'
  },
  {
    "name": "Haru",
    "steam": 'haruozzie'
  },
  {
    "name": "Sikari",
    "steam": 'SikariCSGO'
  }
];





// Allows opening of select groups
function dropDown() {
    document.getElementById("playerDropdown").classList.toggle("show");
}


function parsePlayer(player) {
  var tr = $('<tr>');

  if(player.steam) {
    tr.append('<a href="https://steamcommunity.com/id/'+player.steam+'"><i class="fa fa-steam-square fa-2x" style="color:black" aria-hidden="true"></i></a>');
  }
  if(player.twitch) {
    tr.append('<a href="https://twitch.tv/'+player.twitch+'"><i class="fa fa-twitch fa-2x" aria-hidden="true"></i></a>');
  }
  if(player.youtube) {
    tr.append('<a href="https://www.youtube.com/'+player.youtube+'"><i class="fa fa-youtube-play fa-2x"></i></a>');
  }
  if(player.name) {
    tr.append('<span>'+player.name+'</span>');
  }

  return tr;
}



// Gets information from array, then fills the tables in html with data
$(document).ready(function() {
  var info = ["Steam", "Twitch", "Youtube", "Name"];


  // Fills Global Admins drop down menu with Global Admin List Array
  var globalList = $('#globalAdminList');

  $.each(globalAdmins, function(i, player) {
    globalList.append(parsePlayer(player));
  });

  // Fills Map Tester drop down menu with Map Testers Array
  var mapTesterList = $('#mapTestersList');

  $.each(mapTesters, function(i, player) {
    mapTesterList.append(parsePlayer(player));
  });

  // Fills Notable Players drop down menu with Notable Players Array
  var notablePlayerList = $('#notablePlayersList');

  $.each(notablePlayers, function(i, player) {
    notablePlayerList.append(parsePlayer(player));
  });
});
