$(document).ready(function () {
    // Replace with your RestDB API endpoint
const restdbUrl = "https://testa-6711.restdb.io/rest/shop";

// Replace with your RestDB API key
const restdbApiKey = "63e29704478852088da67e89";

// Replace with your Google Shopping API key
const googleApiKey = "AIzaSyDT9hqUFv7JoWAVFPwJeEvVELEUq-zS2IE";

// Replace with your Google Shopping API query parameters
const query = "electronics";

// Fetch the products from the Google Shopping API
fetch(`https://www.googleapis.com/shopping/search/v1/public/products?key=${googleApiKey}&country=US&q=${query}&alt=json`)
  .then(response => response.json())
  .then(data => {
    // Extract the product information from the response
    const products = data.items.map(item => ({
      name: item.product.title,
      image: item.product.images[0].link,
      price: item.product.price.value
    }));

    // Store the products in the RestDB database
    products.forEach(product => {
      fetch(restdbUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": restdbApiKey
        },
        body: JSON.stringify(product)
      });
    });
  });

});