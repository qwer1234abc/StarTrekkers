$(document).ready(function () {
  $("#username").html(localStorage.getItem("username"));
  $("#user-points").html(localStorage.getItem("points"));

  $.get("https://random-word-api.herokuapp.com/word?number=1", function (data) {
    let selectedWord = data[0];
    console.log(selectedWord);
    let $wordE1 = $("#word");
    let $wrongLettersE1 = $("#wrong-letters");
    let $playAgainBtn = $("#play-button");
    let $popup = $("#popup-container");
    let $notification = $("#notification-container");
    let $finalMessage = $("#final-message");
    let $figureParts = $(".figure-part");

    let correctLetters = [];
    let wrongLetters = [];

    function displayWord() {
      $wordE1.html(
        `${selectedWord
          .split("")
          .map(
            (letter) =>
              `<span class="letter">${
                correctLetters.includes(letter) ? letter : ""
              }</span>`
          )
          .join("")}`
      );

      let innerWord = $wordE1.text().replace(/\n/g, "");

      if (innerWord === selectedWord) {
        let gainedPoints = parseInt(localStorage.getItem("points"), 10);
        gainedPoints += 500;
        localStorage.setItem("points", gainedPoints);
        let updatedPoints = localStorage.getItem("points");
        $("#user-points").text(updatedPoints);
        $finalMessage.text("500 points 💰");
        $popup.css("display", "flex");
      }
    }

    function updateWrongLetterE1() {
      $wrongLettersE1.html(
        `${
          wrongLetters.length > 0
            ? "<p style='font-size: 1.5em;'>Wrong</p>"
            : ""
        }${wrongLetters.map((letter) => `<span>${letter}</span>`)}`
      );

      $figureParts.each(function (index) {
        let errors = wrongLetters.length;

        if (index < errors) {
          $(this).css("display", "block");
        } else {
          $(this).css("display", "none");
        }
      });
      if (wrongLetters.length === 3) {
        let hint = "";
        for (let i = 0; i < selectedWord.length; i++) {
          if (!correctLetters.includes(selectedWord[i])) {
            hint += selectedWord[i];
            break;
          }
        }
        alert(
          `Come on it's not that hard: The word contains the letter "${hint}"`
        );
      }
      if (wrongLetters.length === 5) {
        let hint = "";
        for (let i = 0; i < selectedWord.length; i++) {
          if (!correctLetters.includes(selectedWord[i])) {
            hint += selectedWord[i];
            break;
          }
        }
        alert(`Your saving grace: The word contains the letter "${hint}"`);
      }
      if (wrongLetters.length === $figureParts.length) {
        $finalMessage.text("Try harder next time!");
        $popup.css("display", "flex");
      }
    }

    function showNotification() {
      $notification.addClass("show");

      setTimeout(() => {
        $notification.removeClass("show");
      }, 2000);
    }

    $(window).on("keydown", function (e) {
      if ($popup.css("display") === "flex") {
        return;
      }
      if (e.keyCode >= 65 && e.keyCode <= 90) {
        let letter = e.key;

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);

            displayWord();
          } else {
            showNotification();
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);

            updateWrongLetterE1();
          } else {
            showNotification();
          }
        }
      }
    });

    //Restart game and play again
    $playAgainBtn.click(function () {
      correctLetters.splice(0);
      wrongLetters.splice(0);
      $.get(
        "https://random-word-api.herokuapp.com/word?number=1",
        function (data) {
          selectedWord = data[0];
          console.log(selectedWord);
          displayWord();
          updateWrongLetterE1();
        }
      );
      $("#popup-container").hide();
    });
    displayWord();
  });
  $("#exit-btn").click(function (e) {
    e.preventDefault();
    window.location.href = "../index.html";
  });
});

//Background Audio
window.onmouseover = function () {
  document.getElementById("game3-music").play();
};
