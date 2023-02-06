$(document).ready(function () {
  function getLeaderBoards() {
    var settings = {
      async: true,
      crossDomain: true,
      url: "https://restdb-efce.restdb.io/rest/players",
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache",
      },
    };

    $.ajax(settings).done(function (response) {
        response.sort((a, b) => b.points - a.points);
        let top5 = response.slice(0, 5);
        console.log(top5);
      });
  }
  getLeaderBoards();
  console.log("XDD");
});
