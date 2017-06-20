
// Uses Jquery + JSON to get map list from mapList.js
$.ajax({
  url: "http://jacobwbarrett.com/js/mapList.js",
  dataType: "text",
  success: function(mapList) {
    var path = 'http://www.kzstats.com/img/map/';
    var json = $.parseJSON(mapList);
    var mapListCount = Object.keys(json).length;
    var randomGet = Math.round( Math.random() * (mapListCount - 1) );
    var imageUrl = path + json[randomGet].name + ".jpg";
    $('#mapPost').html(json[randomGet].name);
    $('#changePicture').attr("src", imageUrl);
  }});

$(document).ready(function(){

    $("#mapChoose").click(function(){
      $.ajax({
        url: "http://jacobwbarrett.com/js/mapList.js",
        dataType: "text",
        success: function(mapList) {
          var path = 'http://www.kzstats.com/img/map/';
          var json = $.parseJSON(mapList);
          var mapListCount = Object.keys(json).length;
          var randomGet = Math.round( Math.random() * (mapListCount - 1) );
          var imageUrl = path + json[randomGet].name + ".jpg";
          $('#mapPost').html(json[randomGet].name);
          $('#changePicture').attr("src", imageUrl);
        }

      });
    });
});
