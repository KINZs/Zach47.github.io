$.ajax({
     url:'https://api.twitch.tv/kraken/streams/sachburger?client_id=r7cdsjszk0ftywea7pr4jt50z80bvtl',
     dataType:'jsonp',
     success:function(channel) {
          if (channel.stream === null) {
            $('#isLiveNotification').html("<p class='text-center'>Sachburger is offline</p>");
          }
          else if (channel.stream !== null) {
            $('#isLiveNotification').html("<p class='text-center'>" + channel.stream.channel.display_name + " is live!</p>");
            $('#isLiveGame').html("<p class='text-center'>Playing: " + channel.stream.game + "</p>");
          }
     },
 });
