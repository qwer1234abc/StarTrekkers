$(document).ready(function () {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((json) => {
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
        var inputPassword = prompt("Dont allow giga randoms especially the M:");

        if (inputPassword == expectedHash) {
          if (Array.isArray(json)) {
            json.forEach((item) => {
              var jsondata = {
                name: item.title,
                price: item.price,
                image: item.image,
              };
              var settings = {
                async: true,
                crossDomain: true,
                url: "https://shops-3ddf.restdb.io/rest/shop",
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  "x-apikey": "63e5bc3a478852088da67fbe",
                  "cache-control": "no-cache",
                },
                processData: false,
                data: JSON.stringify(jsondata),
              };
              $.ajax(settings).done(function (response) {
                console.log(response);
              });
            });
          } else {
            var jsondata = {
              name: json.title,
              price: json.price,
              image: json.image,
            };
            var settings = {
              async: true,
              crossDomain: true,
              url: "https://shops-3ddf.restdb.io/rest/shop",
              method: "POST",
              headers: {
                "content-type": "application/json",
                "x-apikey": "63e5bc3a478852088da67fbe",
                "cache-control": "no-cache",
              },
              processData: false,
              data: JSON.stringify(jsondata),
            };
            $.ajax(settings).done(function (response) {
              console.log(response);
            });
          }
        } else {
          alert("GTFO");
        }
      });
    });
});
