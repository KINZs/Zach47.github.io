
function movehtml() {
    var elem = document.getElementById("myBarHTML");
    var width = 10;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 85) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = width * 1 + '%';
        }
    }
}

function movecss() {
    var elem = document.getElementById("myBarCSS");
    var width = 10;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 85) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = width * 1 + '%';
        }
    }
}

function movejs() {
    var elem = document.getElementById("myBarJS");
    var width = 10;
    var id = setInterval(frame, 29);
    function frame() {
        if (width >= 40) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = width * 1 + '%';
        }
    }
}

function movesp() {
    var elem = document.getElementById("myBarSP");
    var width = 10;
    var id = setInterval(frame, 75);
    function frame() {
        if (width >= 20) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = width * 1 + '%';
        }
    }
}

$(document).ready(function(){
  // 40% javascript skils shown here
  movehtml();
  movecss();
  movejs();
  movesp();
});
