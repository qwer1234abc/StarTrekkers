const lightTheme = "light-theme";

if (localStorage.getItem("selected-theme") === lightTheme) {
  // If it's stored, activate the light theme
  document.body.classList.add(lightTheme);
  // Check the toggle button
}
