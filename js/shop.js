$(document).ready(function () {
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://testa-6711.restdb.io/rest/shop",
    method: "GET",
    headers: {
      "content-type": "application/json",
      "x-apikey": "63e29704478852088da67e89",
      "cache-control": "no-cache",
    },
  };

  $.ajax(settings).done(function (response) {
    for (var i = 0; i < response.length; i++) {
      var item = response[i];
      var shortName = item.name
        .split(" ")
        .map(function (word) {
          return word[0];
        })
        .join("");
      $(".shop-container").append(
        `<div class="card" data-id="${item._id}">` +
          '<h3 class="title">' +
          shortName +
          "</h3>" +
          '<div class="bar">' +
          '<div class="emptybar"></div>' +
          '<div class="filledbar"></div>' +
          '<img src="' +
          item.image +
          '" alt="product pic" class="product-pic"/>' +
          '<button class="buy buy-btn">' +
          Math.round(item.price * 10) +
          "</button>" +
          "</div>" +
          "</div>"
      );
    }
  });
  $(".shop-container").on("click", ".buy-btn", function () {
    var button = $(this);
    if (!localStorage.getItem("loggedIn")) {
      alert("Please log in to access the shop.");
      return;
    }
    var id = $(this).closest(".card").data("id");
    console.log(id);
    button.prop("disabled", true);
    if (confirm("Confirm purchase?")) {
      alert("Item will soon be sent to your mailbox. Thank you!")
      var settings = {
        async: true,
        crossDomain: true,
        url: "https://testa-6711.restdb.io/rest/shop/" + id,
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "x-apikey": "63e29704478852088da67e89",
          "cache-control": "no-cache",
        },
      };
      $.ajax(settings).done(function (response) {
        console.log(response);
        location.reload();
      });
    } else {
      button.prop("disabled", false);
    }
  });
});
