let site = document.querySelectorAll(".full-screen")[0],
  wrap = document.querySelectorAll(".screen-wrap")[0],
  screen = document.querySelectorAll(".screen"),
  zoom = document.querySelectorAll(".js-zoom"),
  nav_up = document.querySelectorAll(".js-up"),
  nav_left = document.querySelectorAll(".js-left"),
  nav_right = document.querySelectorAll(".js-right"),
  nav_down = document.querySelectorAll(".js-down"),
  animation = document.querySelectorAll(".js-animation"),
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
