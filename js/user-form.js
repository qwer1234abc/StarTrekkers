/*========USER LOGIN AND SIGNUP POP OUT FORM=========*/

// select the button to trigger the login & sign up form
const loginBtn = document.querySelector(".user-login");
const SignupBtn = document.querySelector(".user-signup");

// select the login & sign up form
const loginForm = document.querySelector(".login-box");
const SignupForm = document.querySelector(".signup-box");

// select the exit icon for login and sign up form
const exitIcon = document.querySelector(".exit-icon");
const SignupIcon = document.querySelector(".exit-icon-signup");

// add a click event listener to the login & sign up button
loginBtn.addEventListener("click", () => {
  // only display the login form
  loginForm.style.display = "block";
});
SignupBtn.addEventListener("click", () => {
  // only display the login form
  SignupForm.style.display = "block";
});

// add a click event listener to the exit icon for both login and sign up
exitIcon.addEventListener("click", () => {
  // only hide the login form
  loginForm.style.display = "none";
});
SignupIcon.addEventListener("click", () => {
  // only hide the login form
  SignupForm.style.display = "none";
});

//Validating
//Close the login form when yser click on sign up form while login form is still on screen
SignupBtn.addEventListener("click", function () {
  loginForm.style.display = "none";
});
