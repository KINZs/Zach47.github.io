// Global Admins
var globalAdmins = [
  {
    "name": "Zach47",
    "steam": 'Zach47',
    "twitch": 'ijjust',
    "youtube": 'Zach47'
  },
  {
    "name": "Sachburger",
    "steam": 'Sachburger',
    "twitch": 'Sachburger',
    "youtube": 'SpeciaIized',
  },
  {
    "name": "Zpamm",
    "steam": 'Zpamm',
    "twitch": 'zpammm',
    "youtube": 'channel/UCxmjF8QocRc_pOfxGFPI4bw'
  },
  {
    "name": "pLekz",
    "steam": 'pLekz',
    "twitch": 'plekkz',
    "youtube": 'channel/UCV-ey-ESmR9dO_KyEqVcQIA'
  },
  {
    "name": "Sikari",
    "steam": 'SikariCSGO',
    "twitch": 'OfficialSikari',
    "youtube": 'SikariCSGO'
  },
  {
    "name": "Klyve",
    "steam": 'officialKlyve',
    "twitch": 'klyve',
  },
  {
    "name": "Chuckles",
    "steam": 'ChucklesHoC',
    "twitch": 'chuckiechuck'
  },
  {
    "name": "Funk",
    "steam": 'uwatm8lelele',
  }
];

// Map Testers
var mapTesters = [
  {
    "name": "Zach47",
    "steam": 'Zach47',
    "twitch": 'ijjust',
    "youtube": 'Zach47'
  },
  {
    "name": "DanZay",
    "steam": 'DanZay',
    "twitch": 'danzayau',
    "youtube": 'channel/UCZs3cFXfMIY6l3yXT3ooHVQ'
  },
  {
    "name" : "Lillen",
    "steam" : "lillencsgo",
    "twitch" : "lillenen",
    "youtube" : "lillencsgo"
  },
  {
    "name": "Sachburger",
    "steam": 'Sachburger',
    "twitch": 'Sachburger',
    "youtube": 'SpeciaIized'
  }
];

// Notable Players
var notablePlayers = [

  {
    "name": "Launders",
    "steam": 'csboxr',
    "twitch": 'launders',
    "youtube": 'csboxr'
  },
  {
    "name": "JWL",
    "steam": 'LucidRainbows',
    "twitch": 'LucidRainbows'
  },
  {
    "name": "So0le",
    "steam": 'so0le',
    "youtube": 'channel/UCK9hSqAXYzIi7u3CS5CZvcQ'
  },
  {
    "name": "1NutWonder",
    "steam": '76561198107281573'
  },
  {
    "name": "Kenneth",
    "steam": 'KennethDota'
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

// My immersive scrolling experience
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
