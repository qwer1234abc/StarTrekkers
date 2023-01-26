/*=============== LIGHT DARK THEME ===============*/
const themeButton = document.getElementById("toggle_checkbox");
const lightTheme = "light-theme";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the light / icon theme
  document.body.classList.toggle(lightTheme);

  // Save the theme that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
});
