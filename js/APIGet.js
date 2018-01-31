// Arrays
let playerList = [];
let TableSelection = "";
// Links
let LJurl = "https://staging.kztimerglobal.com/api/v1/jumpstats/longjump/top?is_crouch_boost=false&limit=2000";
let BHOPurl = "https://staging.kztimerglobal.com/api/v1/jumpstats?jumptype=bhop&is_crouch_boost=false&limit=500";
let MBHOPurl = "https://staging.kztimerglobal.com/api/v1/jumpstats?jumptype=multibhop&is_crouch_boost=false&limit=500";
let WJurl = "https://staging.kztimerglobal.com/api/v1/jumpstats?jumptype=weirdjump&is_crouch_boost=false&limit=500";
let DBHOPurl = "https://staging.kztimerglobal.com/api/v1/jumpstats?jumptype=dropbhop&is_crouch_boost=false&limit=500";
let CJurl = "https://staging.kztimerglobal.com/api/v1/jumpstats?jumptype=countjump&is_crouch_boost=false&limit=500";
let LAJurl = "https://staging.kztimerglobal.com/api/v1/jumpstats?jumptype=ladderjump&is_crouch_boost=false&limit=500";
// Steam
let steam64;
let steamBigInt;
let playerName;


$(document).ready(function(){

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
