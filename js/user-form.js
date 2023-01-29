/*========USER LOGIN AND SIGNUP POP OUT FORM=========*/

// select the button to trigger the login & sign up form
let loginBtn = document.querySelector(".user-login");
const SignupBtn = document.querySelector(".user-signup");

// select the login & sign up form
let loginForm = document.querySelector(".login-box");
let SignupForm = document.querySelector(".signup-box");

// select the exit icon for login and sign up form
let LoginExitIcon = document.querySelector(".exit-icon");
let SignupExitIcon = document.querySelector(".exit-icon-signup");

let menu = document.querySelector(".screen_zoom")
// add a click event listener to the login & sign up button
loginBtn.addEventListener("click", () => {
  // only display the login form
  loginForm.style.display = "block";
  menu.style.display = "none"
  const scriptElement = document.querySelector('script[src="js/index.js"]');
  scriptElement.parentNode.removeChild(scriptElement);
});
SignupBtn.addEventListener("click", () => {
  // only display the login form
  SignupForm.style.display = "block";
  menu.style.display = "none"
});
// add a click event listener to the exit icon for both login and sign up
LoginExitIcon.addEventListener("click", () => {
  // only hide the login form
  loginForm.style.display = "none";
  menu.style.display = "block"
});
SignupExitIcon.addEventListener("click", () => {
  // only hide the login form
  SignupForm.style.display = "none";
  menu.style.display = "block"
});

//Validating
//Close the login form when yser click on sign up form while login form is still on screen
SignupBtn.addEventListener("click", function () {
  loginForm.style.display = "none";
});
