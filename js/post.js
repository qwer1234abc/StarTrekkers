fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((json) => {
    var password = prompt("Enter password to post data.");
    if (password === "123") {
      if (Array.isArray(json)) {
        json.forEach((item) => {
          var jsondata = {
            item_name: item.title,
            item_price: item.price,
            item_image: item.image,
          };
          var settings = {
            async: true,
            crossDomain: true,
            url: "https://restdb-efce.restdb.io/rest/shop",
            method: "POST",
            headers: {
              "content-type": "application/json",
              "x-apikey": "63d08564a95709597409cf2d",
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
          item_name: json.title,
          item_price: json.price,
          item_image: json.image,
        };
        var settings = {
          async: true,
          crossDomain: true,
          url: "https://restdb-efce.restdb.io/rest/shop",
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-apikey": "63d08564a95709597409cf2d",
            "cache-control": "no-cache",
          },
          processData: false,
          data: JSON.stringify(jsondata),
        };
        $.ajax(settings).done(function (response) {
          console.log(response);
        });
      }
    }
    else
    {
        alert("Password incorrect")
    }
  });
