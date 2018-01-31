function showjumptypes() {
  document.getElementById("dropdown").style.display = "flex";
}

function DropDown() {
  if (document.getElementById("dropdown").style.display === "flex") {
    document.getElementById("dropdown").style.display = "none";
  } else if (width >= 770) {
    document.getElementById("dropdown").style.display = "none";
  } else {
    document.getElementById("dropdown").style.display = "flex";
  }
}

function Reset() {
  // Reset everything
  document.getElementById("TableLJ").style.display = "none";
  document.getElementById("jumptype-button-lj").style.color = "#dddfd4";
  document.getElementById("TableBHOP").style.display = "none";
  document.getElementById("jumptype-button-bhop").style.color = "#dddfd4";
  document.getElementById("TableMBHOP").style.display = "none";
  document.getElementById("jumptype-button-mbhop").style.color = "#dddfd4";
  document.getElementById("TableWJ").style.display = "none";
  document.getElementById("jumptype-button-wj").style.color = "#dddfd4";
  document.getElementById("TableDBHOP").style.display = "none";
  document.getElementById("jumptype-button-dbhop").style.color = "#dddfd4";
  document.getElementById("TableCJ").style.display = "none";
  document.getElementById("jumptype-button-cj").style.color = "#dddfd4";
  document.getElementById("TableLAJ").style.display = "none";
  document.getElementById("jumptype-button-laj").style.color = "#dddfd4";
}

function Bind() {
  // if you want bind jumps to show up
  if (document.getElementById("jumptype-button-bind").innerHTML === "Not Binded" || document.getElementById("bindmobile").innerHTML === "Not Binded") {
    document.getElementById("jumptype-button-bind").style.color = "#E45051";
    document.getElementById("jumptype-button-bind").innerHTML = "Binded";
    document.getElementById("bindmobile").style.color = "#E45051";
    document.getElementById("bindmobile").innerHTML = "Binded";
    document.getElementById("jumptype-button-laj").style.display = "none";
    document.getElementById("dropdown-laj").style.display = "none";
    LJurl = "https://staging.kztimerglobal.com/api/v1/jumpstats/longjump/top?is_crouch_boost=true&limit=2000";
    BHOPurl = "https://staging.kztimerglobal.com/api/v1/jumpstats/bhop/top?is_crouch_boost=true&limit=2000";
    MBHOPurl = "https://staging.kztimerglobal.com/api/v1/jumpstats/multibhop/top?is_crouch_boost=true&limit=2000";
    WJurl = "https://staging.kztimerglobal.com/api/v1/jumpstats/weirdjump/top?is_crouch_boost=true&limit=2000";
    DBHOPurl = "https://staging.kztimerglobal.com/api/v1/jumpstats/dropbhop/top?is_crouch_boost=true&limit=2000";
    CJurl = "https://staging.kztimerglobal.com/api/v1/jumpstats/countjump/top?is_crouch_boost=true&limit=2000";
    playerListLJ = [];
    playerListBHOP = [];
    playerListMBHOP = [];
    playerListWJ = [];
    playerListDBHOP = [];
    playerListCJ = [];
    playerListLAJ = [];
    $("#TableLJ tr:not(:first)").remove();
    $("#TableBHOP tr:not(:first)").remove();
    $("#TableMBHOP tr:not(:first)").remove();
    $("#TableWJ tr:not(:first)").remove();
    $("#TableDBHOP tr:not(:first)").remove();
    $("#TableCJ tr:not(:first)").remove();
    $("#TableLAJ tr:not(:first)").remove();

    // Reset everything
    Reset();
  }
  // if you dont want bind jumps to show up
  else if (document.getElementById("jumptype-button-bind").innerHTML === "Binded" || document.getElementById("bindmobile").innerHTML === "Binded") {
    document.getElementById("jumptype-button-bind").style.color = "#DDDFD4";
    document.getElementById("jumptype-button-bind").innerHTML = "Not Binded";
    document.getElementById("bindmobile").style.color = "#DDDFD4";
    document.getElementById("bindmobile").innerHTML = "Not Binded";
    document.getElementById("jumptype-button-laj").style.display = "flex";
    document.getElementById("dropdown-laj").style.display = "flex";
    LJurl = "https://staging.kztimerglobal.com/api/v1.0/jumpstats/longjump/top?is_crouch_boost=false";
    BHOPurl = "https://staging.kztimerglobal.com/api/v1.0/jumpstats?jumptype=bhop&is_crouch_boost=false";
    MBHOPurl = "https://staging.kztimerglobal.com/api/v1.0/jumpstats?jumptype=multibhop&is_crouch_boost=false";
    WJurl = "https://staging.kztimerglobal.com/api/v1.0/jumpstats?jumptype=weirdjump&is_crouch_boost=false";
    DBHOPurl = "https://staging.kztimerglobal.com/api/v1.0/jumpstats?jumptype=dropbhop&is_crouch_boost=false";
    CJurl = "https://staging.kztimerglobal.com/api/v1.0/jumpstats?jumptype=countjump&is_crouch_boost=false";
    LAJurl = "https://staging.kztimerglobal.com/api/v1.0/jumpstats?jumptype=ladderjump&is_crouch_boost=false";
    playerListLJ = [];
    playerListBHOP = [];
    playerListMBHOP = [];
    playerListWJ = [];
    playerListDBHOP = [];
    playerListCJ = [];
    playerListLAJ = [];
    $("#TableLJ tr:not(:first)").remove();
    $("#TableBHOP tr:not(:first)").remove();
    $("#TableMBHOP tr:not(:first)").remove();
    $("#TableWJ tr:not(:first)").remove();
    $("#TableDBHOP tr:not(:first)").remove();
    $("#TableCJ tr:not(:first)").remove();
    $("#TableLAJ tr:not(:first)").remove();

    // Reset everything
    Reset();
  }
}

function showLJ() {
  $("#TableLJ tr:not(:first)").remove();
  LoadTable();
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    document.getElementById("jumptype-button").innerHTML = "Longjump";
    document.getElementById("TableLJ").style.display = "flex";
    document.getElementById("TableBHOP").style.display = "none";
    document.getElementById("TableMBHOP").style.display = "none";
    document.getElementById("TableWJ").style.display = "none";
    document.getElementById("TableDBHOP").style.display = "none";
    document.getElementById("TableCJ").style.display = "none";
    document.getElementById("TableLAJ").style.display = "none";
  } else if (document.getElementById("TableLJ").style.display === "flex") {
    document.getElementById("TableLJ").style.display = "none";
    document.getElementById("jumptype-button-lj").style.color = "#dddfd4";
  } else {
    document.getElementById("TableLJ").style.display = "flex";
    document.getElementById("jumptype-button-lj").style.color = "#E45051";
  }
  DropDown();
}

function showBHOP() {
  $("#TableBHOP tr:not(:first)").remove();
  LoadTable();
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    document.getElementById("jumptype-button").innerHTML = "Bhop";
    document.getElementById("TableLJ").style.display = "none";
    document.getElementById("TableBHOP").style.display = "flex";
    document.getElementById("TableMBHOP").style.display = "none";
    document.getElementById("TableWJ").style.display = "none";
    document.getElementById("TableDBHOP").style.display = "none";
    document.getElementById("TableCJ").style.display = "none";
    document.getElementById("TableLAJ").style.display = "none";
  } else if (document.getElementById("TableBHOP").style.display === "flex") {
    document.getElementById("TableBHOP").style.display = "none";
    document.getElementById("jumptype-button-bhop").style.color = "#dddfd4";
  } else {
    document.getElementById("TableBHOP").style.display = "flex";
    document.getElementById("jumptype-button-bhop").style.color = "#E45051";
  }
  DropDown();
}

function showMBHOP() {
  $("#TableMBHOP tr:not(:first)").remove();
  LoadTable();
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    document.getElementById("jumptype-button").innerHTML = "Multibhop";
    document.getElementById("TableLJ").style.display = "none";
    document.getElementById("TableBHOP").style.display = "none";
    document.getElementById("TableMBHOP").style.display = "flex";
    document.getElementById("TableWJ").style.display = "none";
    document.getElementById("TableDBHOP").style.display = "none";
    document.getElementById("TableCJ").style.display = "none";
    document.getElementById("TableLAJ").style.display = "none";
  } else if(document.getElementById("TableMBHOP").style.display === "flex") {
    document.getElementById("TableMBHOP").style.display = "none";
    document.getElementById("jumptype-button-mbhop").style.color = "#dddfd4";
  } else {
    document.getElementById("TableMBHOP").style.display = "flex";
    document.getElementById("jumptype-button-mbhop").style.color = "#E45051";
  }
  DropDown();
}

function showWJ() {
  $("#TableWJ tr:not(:first)").remove();
  LoadTable();
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    document.getElementById("jumptype-button").innerHTML = "Weirdjump";
    document.getElementById("TableLJ").style.display = "none";
    document.getElementById("TableBHOP").style.display = "none";
    document.getElementById("TableMBHOP").style.display = "none";
    document.getElementById("TableWJ").style.display = "flex";
    document.getElementById("TableDBHOP").style.display = "none";
    document.getElementById("TableCJ").style.display = "none";
    document.getElementById("TableLAJ").style.display = "none";
  } else if (document.getElementById("TableWJ").style.display === "flex") {
    document.getElementById("TableWJ").style.display = "none";
    document.getElementById("jumptype-button-wj").style.color = "#dddfd4";
  } else {
    document.getElementById("TableWJ").style.display = "flex";
    document.getElementById("jumptype-button-wj").style.color = "#E45051";
  }
  DropDown();
}

function showDBHOP() {
  $("#TableDBHOP tr:not(:first)").remove();
  LoadTable();
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    document.getElementById("jumptype-button").innerHTML = "Drop Bhop";
    document.getElementById("TableLJ").style.display = "none";
    document.getElementById("TableBHOP").style.display = "none";
    document.getElementById("TableMBHOP").style.display = "none";
    document.getElementById("TableWJ").style.display = "none";
    document.getElementById("TableDBHOP").style.display = "flex";
    document.getElementById("TableCJ").style.display = "none";
    document.getElementById("TableLAJ").style.display = "none";
  } else if (document.getElementById("TableDBHOP").style.display === "flex") {
    document.getElementById("TableDBHOP").style.display = "none";
    document.getElementById("jumptype-button-dbhop").style.color = "#dddfd4";
  } else {
    document.getElementById("TableDBHOP").style.display = "flex";
    document.getElementById("jumptype-button-dbhop").style.color = "#E45051";
  }
  DropDown();
}

function showCJ() {
  $("#TableCJ tr:not(:first)").remove();
  LoadTable();
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    document.getElementById("jumptype-button").innerHTML = "Countjump";
    document.getElementById("TableLJ").style.display = "none";
    document.getElementById("TableBHOP").style.display = "none";
    document.getElementById("TableMBHOP").style.display = "none";
    document.getElementById("TableWJ").style.display = "none";
    document.getElementById("TableDBHOP").style.display = "none";
    document.getElementById("TableCJ").style.display = "flex";
    document.getElementById("TableLAJ").style.display = "none";
  } else if (document.getElementById("TableCJ").style.display === "flex") {
    document.getElementById("TableCJ").style.display = "none";
    document.getElementById("jumptype-button-cj").style.color = "#dddfd4";
  } else {
    document.getElementById("TableCJ").style.display = "flex";
    document.getElementById("jumptype-button-cj").style.color = "#E45051";
  }
  DropDown();
}

function showLAJ() {
  $("#TableLAJ tr:not(:first)").remove();
  LoadTable();
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    document.getElementById("jumptype-button").innerHTML = "Ladderjump";
    document.getElementById("TableLJ").style.display = "none";
    document.getElementById("TableBHOP").style.display = "none";
    document.getElementById("TableMBHOP").style.display = "none";
    document.getElementById("TableWJ").style.display = "none";
    document.getElementById("TableDBHOP").style.display = "none";
    document.getElementById("TableCJ").style.display = "none";
    document.getElementById("TableLAJ").style.display = "flex";
  } else if (document.getElementById("TableLAJ").style.display === "flex") {
    document.getElementById("TableLAJ").style.display = "none";
    document.getElementById("jumptype-button-laj").style.color = "#dddfd4";
  } else {
    document.getElementById("TableLAJ").style.display = "flex";
    document.getElementById("jumptype-button-laj").style.color = "#E45051";
  }
  DropDown();
}
