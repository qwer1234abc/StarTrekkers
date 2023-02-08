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
    for (var i = 0; i < response.length && i < 5; i++) {
      var item = response[i];
      var shortName = item.name
        .split(" ")
        .map(function (word) {
          return word[0];
        })
        .join("");
      $(".shop-container").append(
        '<div class="card">' +
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
});
