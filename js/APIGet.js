// Arrays
let playerList = [];
let TableSelection = "";
// Links
let LJurl = "https://kztimerglobal.com/api/v1.0/jumpstats/longjump/top?is_crouch_boost=false&limit=20";
let BHOPurl = "https://kztimerglobal.com/api/v1.0/jumpstats/bhop/top?is_crouch_boost=false&limit=20";
let MBHOPurl = "https://kztimerglobal.com/api/v1.0/jumpstats/multibhop/top?is_crouch_boost=false&limit=20";
let WJurl = "https://kztimerglobal.com/api/v1.0/jumpstats/weirdjump/top?is_crouch_boost=false&limit=20";
let DBHOPurl = "https://kztimerglobal.com/api/v1.0/jumpstats/dropbhop/top?is_crouch_boost=false&limit=20";
let CJurl = "https://kztimerglobal.com/api/v1.0/jumpstats/countjump/top?is_crouch_boost=false&limit=20";
let LAJurl = "https://kztimerglobal.com/api/v1.0/jumpstats/ladderjump/top?is_crouch_boost=false&limit=20";
// Steam
let steam64;
let steamBigInt;
let playerName;


$(document).ready(function(){
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    TableSelection = "TableLJ";
    url = LJurl;
    LoadTable();
  }

  document.addEventListener('click', (event) => {
    if (event.target.id === "jumptype-button-bind") {
      Bind();
    }
    if (event.target.id === "jumptype-button-lj" || event.target.id === "dropdown-lj") {
      TableSelection = "TableLJ";
      url = LJurl;
      showLJ();
    }
    if (event.target.id === "jumptype-button-bhop" || event.target.id === "dropdown-bhop") {
      TableSelection = "TableBHOP";
      url = BHOPurl;
      showBHOP();
    }
    if (event.target.id === "jumptype-button-mbhop" || event.target.id === "dropdown-mbhop") {
      TableSelection = "TableMBHOP";
      url = MBHOPurl;
      showMBHOP();
    }
    if (event.target.id === "jumptype-button-wj" || event.target.id === "dropdown-wj") {
      TableSelection = "TableWJ";
      url = WJurl;
      showWJ();
    }
    if (event.target.id === "jumptype-button-dbhop" || event.target.id === "dropdown-dbhop") {
      TableSelection = "TableDBHOP";
      url = DBHOPurl;
      showDBHOP();
    }
    if (event.target.id === "jumptype-button-cj" || event.target.id === "dropdown-cj") {
      TableSelection = "TableCJ";
      url = CJurl;
      showCJ();
    }
    if (event.target.id === "jumptype-button-laj" || event.target.id === "dropdown-laj") {
      TableSelection = "TableLAJ";
      url = LAJurl;
      showLAJ();
    }
  });
});
