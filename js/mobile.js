var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;


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
function openSearch() {
  document.getElementById("search").style.width = "100%";
  document.getElementById("search-input").style.width = "100%";
  document.getElementById("search-input").style.display = "flex";
  document.getElementById("close-search").style.display = "flex";
}
function closeSearch() {
  document.getElementById("close-search").style.display = "none";
  document.getElementById("search").style.width = "0%";
  document.getElementById("search-input").style.width = "0%";
  document.getElementById("search-input").style.display = "none";
}
