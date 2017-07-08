function openNav() {
  document.getElementById("nav-leftside").style.width = "100%";
}

function closeNav() {
  document.getElementById("nav-leftside").style.width = "0%";
}

function openSettings() {
  document.getElementById("nav-rightside").style.width = "100%";
}

function closeSettings() {
  document.getElementById("nav-rightside").style.width = "0%";
}

function showjumptypes() {
  document.getElementById("dropdown").classList.toggle("show");
}

function DropDown() {
  if (!(document.getElementById("dropdown").classList.toggle("show"))) {
    return;
  }
  else {
    document.getElementById("dropdown").classList.toggle("show");
  }
}



function showLJ() {
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
    document.getElementById("jumptype-button-lj").style.color = "#FF7F50";
  }
  DropDown()
}

function showBHOP() {
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
    document.getElementById("jumptype-button-bhop").style.color = "#FF7F50";
  }
  DropDown()
}

function showMBHOP() {
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
    document.getElementById("jumptype-button-mbhop").style.color = "#FF7F50";
  }
  DropDown()
}

function showWJ() {
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
    document.getElementById("jumptype-button-wj").style.color = "#FF7F50";
  }
  DropDown()
}

function showDBHOP() {
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
    document.getElementById("jumptype-button-dbhop").style.color = "#FF7F50";
  }
  DropDown()
}

function showCJ() {
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
    document.getElementById("jumptype-button-cj").style.color = "#FF7F50";
  }
  DropDown()
}

function showLAJ() {
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
    document.getElementById("jumptype-button-laj").style.color = "#FF7F50";
  }
  DropDown()
}
