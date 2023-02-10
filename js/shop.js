$(document).ready(function () {
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://shops-3ddf.restdb.io/rest/shop",
    method: "GET",
    headers: {
      "content-type": "application/json",
      "x-apikey": "63e5bc3a478852088da67fbe",
      "cache-control": "no-cache",
    },
  };

  $.ajax(settings).done(function (response) {
    if (response.length < 10) {
      PostItems();
    }
    var shopContainer = document.querySelector(".page-content");
    response.slice(0, 4).forEach(function (item, index) {
      var card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-id", item._id);
      var content = document.createElement("div");
      content.classList.add("content");
      var title = document.createElement("h2");
      title.classList.add("title");
      title.textContent = item.name
        .split(" ")
        .filter(function (word) {
          return word.length < 7;
        })
        .map(function (word) {
          return word[0];
        })
        .join("");
      var buyButton = document.createElement("button");
      buyButton.classList.add("buy-btn");
      buyButton.textContent = "buy";
      buyButton.setAttribute("data-price", Math.round(parseInt(item.price)));
      buyButton.addEventListener("mouseover", function () {
        this.textContent = this.getAttribute("data-price");
      });
      buyButton.addEventListener("mouseout", function () {
        this.textContent = "buy";
      });
      content.appendChild(title);
      content.appendChild(buyButton);
      card.appendChild(content);
      card.style.backgroundImage = "url(" + item.image + ")";
      shopContainer.appendChild(card);
    });
  });
  $(".page-content").on("click", ".buy-btn", function () {
    var button = $(this);
    if (!localStorage.getItem("loggedIn")) {
      alert("Please log in to access the shop.");
      return;
    }
    var id = $(this).closest(".card").data("id");
    var price = parseInt($(this).data("price"));
    var userPoints = parseInt(localStorage.getItem("points"));
    if (userPoints < price) {
      alert("You do not have enough points to purchase this item");
      return;
    }
    button.prop("disabled", true);
    if (confirm("Confirm purchase?")) {
      localStorage.setItem("points", userPoints - price);
      alert("Item will soon be sent to your mailbox. Thank you!");
      var settings = {
        async: true,
        crossDomain: true,
        url: `https://shops-3ddf.restdb.io/rest/shop/${id}`,
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "x-apikey": "63e5bc3a478852088da67fbe",
          "cache-control": "no-cache",
        },
      };
      $.ajax(settings).done(function (response) {
        location.reload();
      });
    } else {
      button.prop("disabled", false);
    }
  });

  function PostItems() {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((json) => {
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
      });
  }
});
