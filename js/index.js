let site = document.querySelectorAll(".full-screen")[0],
  wrap = document.querySelectorAll(".screen-wrap")[0],
  screen = document.querySelectorAll(".screen"),
  zoom = document.querySelectorAll(".js-zoom"),
  nav_up = document.querySelectorAll(".js-up"),
  nav_left = document.querySelectorAll(".js-left"),
  nav_right = document.querySelectorAll(".js-right"),
  nav_down = document.querySelectorAll(".js-down"),
  animation = document.querySelectorAll(".js-animation"),
  notClickableElements = document.querySelectorAll("*"),
  clickableElement = document.querySelectorAll(".screen"),
  pos_x = 0,
  pos_y = 0;

function hasClass(cls, attr) {
  return cls.className.match(new RegExp("(\\s|^)" + attr + "(\\s|$)"));
}

function addClass(cls, attr) {
  if (!this.hasClass(cls, attr)) {
    cls.className += "  " + attr;
  }
}

function removeClass(cls, attr) {
  if (this.hasClass(cls, attr)) {
    let reg = new RegExp("(\\s|^)" + attr + "(\\s|$)");
    cls.className = cls.className.replace(reg, " ");
  }
}

function setPos() {
  wrap.style.transform =
    "translateX(" + pos_x + "00%) translateY(" + pos_y + "00%)";
  setTimeout(function () {
    removeClass(wrap, "animate");
    SignupForm.style.display = "none";
    loginForm.style.display = "none";
  }, 600);
}
function oriPos() {
  wrap.style.transform = "translateX(" + 0 + "00%) translateY(" + 0 + "00%)";
  setTimeout(function () {
    removeClass(wrap, "animate");
  }, 600);
}

setPos();

function moveUp() {
  addClass(wrap, "animate");
  pos_y++;
  setPos();
}

function moveLeft() {
  addClass(wrap, "animate");
  pos_x++;
  setPos();
}

function moveRight() {
  addClass(wrap, "animate");
  pos_x--;
  setPos();
}

function moveDown() {
  addClass(wrap, "animate-scale");
  pos_y--;
  setPos();
}

for (let x = 0; x < nav_up.length; x++) {
  nav_up[x].addEventListener("click", moveUp);
}

for (let x = 0; x < nav_left.length; x++) {
  nav_left[x].addEventListener("click", moveLeft);
}

for (let x = 0; x < nav_right.length; x++) {
  nav_right[x].addEventListener("click", moveRight);
}

for (let x = 0; x < nav_down.length; x++) {
  nav_down[x].addEventListener("click", moveDown);
}

for (let x = 0; x < zoom.length; x++) {
  zoom[x].addEventListener("click", zoomOut);
}

function zoomOut(e) {
  e.stopPropagation();
  addClass(site, "show-all");
  for (let x = 0; x < screen.length; x++) {
    (function (_x) {
      screen[_x].addEventListener("click", setScreenAndZoom);
    })(x);
  }
  notClickableElements.forEach(element => {
    element.style.pointerEvents = "none";
  });
  clickableElement.forEach(element => {
    element.style.pointerEvents = "fill";
  });
  SignupForm.style.display = "none";
  loginForm.style.display = "none";
  oriPos();
}

function setScreenAndZoom(e) {
  (pos_x = -e.target.getAttribute("data-x-pos")),
    (pos_y = e.target.getAttribute("data-y-pos"));
  setPos();
  zoomIn();
}

function zoomIn() {
  for (let x = 0; x < screen.length; x++) {
    screen[x].removeEventListener("click", setScreenAndZoom);
  }
  notClickableElements.forEach(element => {
    element.style.pointerEvents = "fill";
  });
  removeClass(site, "show-all");
}

window.onmouseover = function () {
  let bgMusic = document.getElementById("bg-music");
  bgMusic.volume = 0.05;
  bgMusic.play();
};

$(document).ready(function () {
  $(document).keydown(function (e) {
    if (e.keyCode == 9) {
      //tab pressed
      e.preventDefault(); // stops its action
    }
  });
  // press esc to show all
  $(document).on("keydown", function (event) {
    if (event.key == "Escape") {
      addClass(site, "show-all");
      for (let x = 0; x < screen.length; x++) {
        (function (_x) {
          screen[_x].addEventListener("click", setScreenAndZoom);
        })(x);
      }
      SignupForm.style.display = "none";
      loginForm.style.display = "none";
      oriPos();
    }
  });
});
