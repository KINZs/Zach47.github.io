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

function showLJ() {
  $(".se-pre-con").fadeIn("slow");
  LoadPlayersLJ();
  if (width < 769) {
    document.getElementById("jumptype-button").innerHTML = "Longjump";
    document.getElementById("myTableLJ").style.display = "flex";
    document.getElementById("myTableBHOP").style.display = "none";
    document.getElementById("myTableMBHOP").style.display = "none";
    document.getElementById("myTableWJ").style.display = "none";
    document.getElementById("myTableDBHOP").style.display = "none";
    document.getElementById("myTableCJ").style.display = "none";
    document.getElementById("myTableLAJ").style.display = "none";
  } else if (document.getElementById("myTableLJ").style.display === "flex") {
    document.getElementById("myTableLJ").style.display = "none";
    document.getElementById("jumptype-button-lj").style.color = "#dddfd4";
  } else {
    document.getElementById("myTableLJ").style.display = "flex";
    document.getElementById("jumptype-button-lj").style.color = "#E45051";
  }
  DropDown()
}

function showBHOP() {
  LoadPlayersBHOP();
  if (width < 769) {
    document.getElementById("jumptype-button").innerHTML = "Bhop";
    document.getElementById("myTableLJ").style.display = "none";
    document.getElementById("myTableBHOP").style.display = "flex";
    document.getElementById("myTableMBHOP").style.display = "none";
    document.getElementById("myTableWJ").style.display = "none";
    document.getElementById("myTableDBHOP").style.display = "none";
    document.getElementById("myTableCJ").style.display = "none";
    document.getElementById("myTableLAJ").style.display = "none";
  } else if (document.getElementById("myTableBHOP").style.display === "flex") {
    document.getElementById("myTableBHOP").style.display = "none";
    document.getElementById("jumptype-button-bhop").style.color = "#dddfd4";
  } else {
    document.getElementById("myTableBHOP").style.display = "flex";
    document.getElementById("jumptype-button-bhop").style.color = "#E45051";
  }
  DropDown()
}

function showMBHOP() {
  LoadPlayersMBHOP();
  if (width < 769) {
    document.getElementById("jumptype-button").innerHTML = "Multibhop";
    document.getElementById("myTableLJ").style.display = "none";
    document.getElementById("myTableBHOP").style.display = "none";
    document.getElementById("myTableMBHOP").style.display = "flex";
    document.getElementById("myTableWJ").style.display = "none";
    document.getElementById("myTableDBHOP").style.display = "none";
    document.getElementById("myTableCJ").style.display = "none";
    document.getElementById("myTableLAJ").style.display = "none";
  } else if(document.getElementById("myTableMBHOP").style.display === "flex") {
    document.getElementById("myTableMBHOP").style.display = "none";
    document.getElementById("jumptype-button-mbhop").style.color = "#dddfd4";
  } else {
    document.getElementById("myTableMBHOP").style.display = "flex";
    document.getElementById("jumptype-button-mbhop").style.color = "#E45051";
  }
  DropDown()
}

function showWJ() {
  LoadPlayersWJ();
  if (width < 769) {
    document.getElementById("jumptype-button").innerHTML = "Weirdjump";
    document.getElementById("myTableLJ").style.display = "none";
    document.getElementById("myTableBHOP").style.display = "none";
    document.getElementById("myTableMBHOP").style.display = "none";
    document.getElementById("myTableWJ").style.display = "flex";
    document.getElementById("myTableDBHOP").style.display = "none";
    document.getElementById("myTableCJ").style.display = "none";
    document.getElementById("myTableLAJ").style.display = "none";
  } else if (document.getElementById("myTableWJ").style.display === "flex") {
    document.getElementById("myTableWJ").style.display = "none";
    document.getElementById("jumptype-button-wj").style.color = "#dddfd4";
  } else {
    document.getElementById("myTableWJ").style.display = "flex";
    document.getElementById("jumptype-button-wj").style.color = "#E45051";
  }
  DropDown()
}

function showDBHOP() {
  LoadPlayersDBHOP();
  if (width < 769) {
    document.getElementById("jumptype-button").innerHTML = "Drop Bhop";
    document.getElementById("myTableLJ").style.display = "none";
    document.getElementById("myTableBHOP").style.display = "none";
    document.getElementById("myTableMBHOP").style.display = "none";
    document.getElementById("myTableWJ").style.display = "none";
    document.getElementById("myTableDBHOP").style.display = "flex";
    document.getElementById("myTableCJ").style.display = "none";
    document.getElementById("myTableLAJ").style.display = "none";
  } else if (document.getElementById("myTableDBHOP").style.display === "flex") {
    document.getElementById("myTableDBHOP").style.display = "none";
    document.getElementById("jumptype-button-dbhop").style.color = "#dddfd4";
  } else {
    document.getElementById("myTableDBHOP").style.display = "flex";
    document.getElementById("jumptype-button-dbhop").style.color = "#E45051";
  }
  DropDown()
}

function showCJ() {
  LoadPlayersCJ();
  if (width < 769) {
    document.getElementById("jumptype-button").innerHTML = "Countjump";
    document.getElementById("myTableLJ").style.display = "none";
    document.getElementById("myTableBHOP").style.display = "none";
    document.getElementById("myTableMBHOP").style.display = "none";
    document.getElementById("myTableWJ").style.display = "none";
    document.getElementById("myTableDBHOP").style.display = "none";
    document.getElementById("myTableCJ").style.display = "flex";
    document.getElementById("myTableLAJ").style.display = "none";
  } else if (document.getElementById("myTableCJ").style.display === "flex") {
    document.getElementById("myTableCJ").style.display = "none";
    document.getElementById("jumptype-button-cj").style.color = "#dddfd4";
  } else {
    document.getElementById("myTableCJ").style.display = "flex";
    document.getElementById("jumptype-button-cj").style.color = "#E45051";
  }
  DropDown()
}

function showLAJ() {
  LoadPlayersLAJ();
  if (width < 769) {
    document.getElementById("jumptype-button").innerHTML = "Ladderjump";
    document.getElementById("myTableLJ").style.display = "none";
    document.getElementById("myTableBHOP").style.display = "none";
    document.getElementById("myTableMBHOP").style.display = "none";
    document.getElementById("myTableWJ").style.display = "none";
    document.getElementById("myTableDBHOP").style.display = "none";
    document.getElementById("myTableCJ").style.display = "none";
    document.getElementById("myTableLAJ").style.display = "flex";
  } else if (document.getElementById("myTableLAJ").style.display === "flex") {
    document.getElementById("myTableLAJ").style.display = "none";
    document.getElementById("jumptype-button-laj").style.color = "#dddfd4";
  } else {
    document.getElementById("myTableLAJ").style.display = "flex";
    document.getElementById("jumptype-button-laj").style.color = "#E45051";
  }
  DropDown()
}
