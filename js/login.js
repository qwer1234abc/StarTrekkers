$(document).ready(function () {
    const APIKEY = "63d08564a95709597409cf2d";
    $("#add-update-msg").hide();
    function validateEmail(email) {
      var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
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
      let player_email = $("#player-email").val();
      let player_password = $("#player-password").val();
      let form = $("#add-player-form");
      let inputs = form.find("input");
      let isValid = true;
      let player_confirm_password = $("#player-confirm-password").val();
      var settings = {
        async: true,
        crossDomain: true,
        url: `https://restdb-efce.restdb.io/rest/players${player_email}`,
        method: "GET",
        headers: {
          "content-type": "application/json",
          "x-apikey": "<your CORS apikey here>",
          "cache-control": "no-cache",
        },
      };
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
  
      isValid = validateEmail(player_email);
      isValid = validatePassword(player_password, player_confirm_password);
      for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
          isValid = false;
          break;
        }
      }
      if (!isValid) {
        alert(location.hostname);
        e.preventDefault();
        return;
      } else {
        let jsondata = {
          username: player_username,
          email: player_email,
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
            $("#add-player-form").trigger("reset");
          },
        };
  
        $.ajax(settings).done(function (response) {
          console.log(response);
          $("#player-submit").prop("disabled", false);
          alert("Player record successfully added");
        });
      }
    });
  });
  