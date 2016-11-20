
// Uses Jquery + JSON to get map list from mapList.js

$(document).ready(function(){

    $("#mapChoose").click(function(){
      // Change 285 to map length -1
      var randomGet = Math.round( Math.random() * (285) );
      $.ajax({
        url: "https://zach47.github.io/js/mapList.js",
        dataType: "text",
        success: function(mapList) {
          var json = $.parseJSON(mapList);
          $('#mapPost').html('Map name: ' + json[randomGet].name);
        }
      });
    });
});
