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
// Check if the selected theme is stored in local storage
if (selectedTheme === lightTheme) {
  // If it's stored, activate the light theme
  document.body.classList.add(lightTheme);
  // Check the toggle button
  themeButton.checked = true;
}

function getCurrentTheme() {
  // Check if the light theme is applied
  if (document.body.classList.contains(lightTheme)) {
    return lightTheme;
  }
  // Otherwise, return an empty string
  return "";
}
