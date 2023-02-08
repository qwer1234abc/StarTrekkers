$(document).ready(function () {
  const APIKEY = "63d08564a95709597409cf2d";
  $(".afterCheckIn").hide();

  let loginBtn = $(".user-login"),
    SignupBtn = $(".user-signup"),
    loginForm = $(".login-box"),
    SignupForm = $(".signup-box");

  function checkLoggedIn(checkedUser, checkedPoints) {
    let logInCheck = localStorage.getItem("loggedIn");
    if (logInCheck) {
      $(".beforeCheckIn").hide();
      $(".afterCheckIn").show();
      $(".checkedname").html(checkedUser);
      $(".points").html(checkedPoints);
    }
  }
  if (
    localStorage.getItem("loggedIn") ||
    localStorage.getItem("loggedIn") != undefined
  ) {
    $(window).on("load", function () {
      var settings = {
        async: true,
        crossDomain: true,
        url: `https://restdb-efce.restdb.io/rest/players?q={"username":"${localStorage.getItem(
          "username"
        )}"}`,
        method: "GET",
        headers: {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache",
        },
      };

      $.ajax(settings).done(function (response) {
        let = originalPass = response[0].password;
        var jsondata = {
          username: localStorage.getItem("username"),
          password: originalPass,
          points: localStorage.getItem("points"),
        };
        var settings = {
          async: true,
          crossDomain: true,
          url: `https://restdb-efce.restdb.io/rest/players/${localStorage.getItem(
            "id"
          )}`,
          method: "PUT",
          headers: {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache",
          },
          processData: false,
          data: JSON.stringify(jsondata),
        };
        $.ajax(settings).done(function (response) {
          console.log(response);
        });
      });
    });
  }

  checkLoggedIn(
    localStorage.getItem("username"),
    localStorage.getItem("points"),
    localStorage.getItem("id"),
    localStorage.getItem("password")
  );

  $("#signout").on("click", function (e) {
    e.preventDefault();
    console.log(localStorage);
    localStorage.clear();
    $(".beforeCheckIn").show();
    $(".afterCheckIn").hide();
  });
  loginBtn.click(function (e) {
    e.preventDefault();
    loginForm.show();
  });

  SignupBtn.click(function (e) {
    e.preventDefault();
    SignupForm.show();
  });

  function validatePassword(password, confirmpassword) {
    if (password == confirmpassword) {
      return true;
    } else {
      return false;
    }
  }
  $("#login-submit").on("click", function (e) {
    e.preventDefault();
    $("#login-submit").prop("disabled", true);
    let login_username = $("#player-login-username").val();
    let login_password = $("#player-login-password").val();
    let form = $("#player-login-form");
    let inputs = form.find("input");
    let isValid = true;
    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        isValid = false;
        break;
      }
    }
    if (!isValid) {
      alert("Please field in all inputs");
      e.preventDefault();
      return;
    } else {
      var settings = {
        async: true,
        crossDomain: true,
        url: `https://restdb-efce.restdb.io/rest/players?q={"username":"${login_username}"}`,
        method: "GET",
        headers: {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache",
        },
      };
      $.ajax(settings).done(function (response) {
        if (response.length === 0) {
          // Show an error message if the username does not exist
          alert("Username does not exist");
        } else if (response[0].password !== login_password) {
          // Show an error message if the password is incorrect
          alert("Password is incorrect");
        } else {
          alert("Successfully signed in");
          $("#login-submit").prop("disabled", false);
          $("#player-login-form").trigger("reset");
          loginForm.hide();
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("username", response[0].username);
          localStorage.setItem("points", response[0].points);
          localStorage.setItem("id", response[0]._id);
          checkLoggedIn(response[0].username, response[0].points);
        }
      });
    }
  });

  $("#signup-submit").on("click", function (e) {
    //prevent default action of the button
    e.preventDefault();
    let player_username = $("#player-username").val();
    let player_password = $("#player-password").val();
    let player_points = 0;
    let form = $("#player-signup-form");
    let inputs = form.find("input");
    let passwordCheck = true;
    let formCheck = true;
    let player_confirm_password = $("#player-confirm-password").val();
    passwordCheck = validatePassword(player_password, player_confirm_password);
    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        formCheck = false;
        break;
      }
    }
    if (!formCheck) {
      alert("Please field in all inputs");
      e.preventDefault();
      return;
    } else {
      if (!passwordCheck) {
        alert("Please enter matching passwords");
        e.preventDefault();
        return;
      } else {
        var settings = {
          async: true,
          crossDomain: true,
          url: `https://restdb-efce.restdb.io/rest/players?q={"username":"${player_username}"}`,
          method: "GET",
          headers: {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache",
          },
        };
        $.ajax(settings).done(function (response) {
          if (response.length > 0) {
            alert("Username taken already taken, please choose another one");
          } else {
            let jsondata = {
              username: player_username,
              password: player_password,
              points: player_points,
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
                e.preventDefault();
              },
            };
            $.ajax(settings).done(function (response) {
              console.log(response);
              $("#signup-submit").prop("disabled", false);
              alert("Registration successful!");
              $("#player-signup-form").trigger("reset");
              SignupForm.hide();
              localStorage.setItem("loggedIn", true);
              localStorage.setItem("username", player_username);
              localStorage.setItem("points", player_points);
              var settings = {
                async: true,
                crossDomain: true,
                url: `https://restdb-efce.restdb.io/rest/players?q={"username":"${player_username}"}`,
                method: "GET",
                headers: {
                  "content-type": "application/json",
                  "x-apikey": APIKEY,
                  "cache-control": "no-cache",
                },
              };
              $.ajax(settings).done(function (response) {
                localStorage.setItem("id", response[0]._id);
              });
              checkLoggedIn(player_username, player_points);
            });
          }
        });
      }
    }
  });
});
