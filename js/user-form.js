/*========USER LOGIN AND SIGNUP POP OUT FORM=========*/

// select the button to trigger the login & sign up form
let loginBtn = document.querySelector(".user-login");
let SignupBtn = document.querySelector(".user-signup");

// select the login & sign up form
let loginForm = document.querySelector(".login-box");
let SignupForm = document.querySelector(".signup-box");

// select the exit icon for login and sign up form
let LoginExitIcon = document.querySelector(".exit-icon");
let SignupExitIcon = document.querySelector(".exit-icon-signup");

let menu = document.querySelector(".screen_zoom");
// add a click event listener to the login & sign up button
loginBtn.addEventListener("click", () => {
  // only display the login form
  SignupForm.style.display = "none";
  loginForm.style.display = "block";
});
SignupBtn.addEventListener("click", () => {
  // only display the signup form
  loginForm.style.display = "none";
  SignupForm.style.display = "block";
});
// add a click event listener to the exit icon for both login and sign up
LoginExitIcon.addEventListener("click", () => {
  // only hide the login form
  loginForm.style.display = "none";
  menu.style.display = "block";
});
SignupExitIcon.addEventListener("click", () => {
  // only hide the signup form
  SignupForm.style.display = "none";
  menu.style.display = "block";
});
