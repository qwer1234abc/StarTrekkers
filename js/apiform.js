$(document).ready(function () {
  const APIKEY = "63d08564a95709597409cf2d";
  function validatePassword(password, confirmpassword) {
    if (password == confirmpassword) {
      return true;
    } else {
      return false;
    }
  }
  $("#player-submit").on("click", function (e) {
    //prevent default action of the button
    e.preventDefault();
    let player_username = $("#player-username").val();
    let player_password = $("#player-password").val();
    let form = $("#player-signup-form");
    let inputs = form.find("input");
    let isValid = true;
    let player_confirm_password = $("#player-confirm-password").val();
    isValid = validatePassword(player_password, player_confirm_password);
    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        isValid = false;
        break;
      }
    }
    if (!isValid) {
      alert("Please enter matching passwords");
      e.preventDefault();
      return;
    } else {
      let jsondata = {
        username: player_username,
        password: player_password,
      };
      let settings = {
        async: true,
        crossDomain: true,
        url: "https://restdb-efce.restdb.io/rest/players",
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache",
        },
        processData: false,
        data: JSON.stringify(jsondata),
        beforeSend: function () {
          $("#player-submit").prop("disabled", true);
        },
      };
      $.ajax(settings).done(function (response) {
        console.log(response);
        $("#player-submit").prop("disabled", false);
        alert("Player record successfully added");
        $("#player-signup-form").trigger("reset");

      });
    }
  });
});
