$.ajax({
     url:'https://api.twitch.tv/kraken/streams/ijjust?client_id=r7cdsjszk0ftywea7pr4jt50z80bvtl',
     dataType:'jsonp',
     success:function(channel) {
          if (channel.stream === null) {
            $('#isLiveNotification').html("<p class='text-center'>I'm offline</p>");
          }
          else if (channel.stream !== null) {
            $('#isLiveNotification').html("<p class='text-center'>I'm online on Twitch!</p>");
            $('#isLiveGame').html("<p class='text-center'>Playing: " + channel.stream.game + "</p>");
          }
     },
 });
