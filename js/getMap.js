
// Uses Jquery + JSON to get map list from mapList.js

$(document).ready(function(){

    $("#mapChoose").click(function(){
      $.ajax({
        url: "https://zach47.github.io/js/mapList.js",
        dataType: "text",
        success: function(mapList) {
          var json = $.parseJSON(mapList);
          var mapListCount = Object.keys(json).length;
          var randomGet = Math.round( Math.random() * (mapListCount - 1) );
          $('#mapPost').html(json[randomGet].name);
        }
      });
    });
});
