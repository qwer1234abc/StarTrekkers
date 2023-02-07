$(document).ready(function () {
  $("canvas").hide();
  $("#whole-container").hide();
  const loadingAnimation = bodymovin.loadAnimation({
    container: $("#loadingAnimation")[0],
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "https://assets7.lottiefiles.com/packages/lf20_h8lk5ow8.json",
  });

  setTimeout(function () {
    const userLoggedIn = localStorage.getItem("loggedIn");
    if (userLoggedIn === "true") {
      loadingAnimation.destroy();
      $("#loadingContainer").css("display", "none");
      $("canvas").show();
      $("#whole-container").show();
    } else {
      loadingAnimation.destroy();
      $("#loadingAnimation").html("Please log in first");
      setTimeout(function () {
        window.location.href = "../index.html";
      }, 5000);
    }
  }, 6000);
});
