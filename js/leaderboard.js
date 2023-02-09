$(document).ready(function () {
  const APIKEY = "63e4fe5d478852088da67f49";
  function getLeaderBoards() {
    var settings = {
      async: true,
      crossDomain: true,
      url: "https://player-7ddd.restdb.io/rest/player",
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache",
      },
    };

    $.ajax(settings).done(function (response) {
      // sort the players by score in descending order
      response.sort(function (a, b) {
        return a.points - b.points;
      });

      // take the top 5 players
      let topPlayers = response.slice(0, 5);
      // insert the data into the table
      for (let i = 0; i < topPlayers.length; i++) {
        let player = topPlayers[i];
        $("#header_leaderboard").after(`
          <tr>                
            <td>${player.username}</td>
            <td>${player.points}</td>
          </tr>
        `);
      }
    });
  }
  getLeaderBoards();
});
