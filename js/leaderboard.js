$(document).ready(function () {
  const APIKEY = "63d08564a95709597409cf2d";
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
