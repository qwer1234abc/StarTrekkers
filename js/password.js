$(document).ready(function () {
  var password = "bingdog";
  var hash = crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password)
  );

  $.when(hash).then(function (result) {
    var hex = Array.prototype.map
      .call(new Uint8Array(result), function (x) {
        return ("00" + x.toString(16)).slice(-2);
      })
      .join("");
    var expectedHash = hex;
    var inputPassword = prompt("Please enter password:");

    if (inputPassword !== expectedHash) {
      alert("Incorrect password");
      // Prevent the page from loading by removing the HTML content
      document.body.innerHTML = "";
    } else {
      var files = [
        "js/apiform.js",
        "js/index.js",
        "js/theme.js",
        "js/user-form.js",
        "js/leaderboard.js",
        "js/shop.js",
      ];
      for (var i = 0; i < files.length; i++) {
        var script = document.createElement("script");
        script.src = files[i];
        $("body").append(script);
      }
    }
  });
});
