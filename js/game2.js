document.getElementById("username").innerText =
  localStorage.getItem("username");
document.getElementById("user-points").innerText =
  localStorage.getItem("points");
var currentCategory = ["HTML", "CSS", "HTML & CSS"];
var Questions = [
  //Store questions and answers
  {
    category: "HTML", //Question 1
    question: "HTML is a programming language.",
    answer: false,
  },
  {
    category: "CSS", //Question 2
    question: "CSS can change the font and color of text on a web page.",
    answer: true,
  },
  {
    category: "HTML", //Question 3
    question: "HTML is used to create the structure of a web page.",
    answer: true,
  },
  {
    category: "CSS", //Question 4
    question: "CSS can be used to control the layout and design of a web page.",
    answer: true,
  },
  {
    category: "HTML", //Question 5
    question:
      "The head section of an HTML document contains the main content of the page.",
    answer: false,
  },
  {
    category: "CSS", //Question 6
    question:
      "It is not possible to use CSS to create animations on a web page.",
    answer: false,
  },
  {
    category: "HTML & CSS", //Question 7
    question: "CSS styles can only be applied to HTML elements. ",
    answer: true,
  },
  {
    category: "CSS", //Question 8
    question: "CSS can only be written in JavaScript.",
    answer: false,
  },
  {
    category: "HTML & CSS", //Question 9
    question:
      "Inline styles in HTML take priority over styles defined in an external CSS file.",
    answer: true,
  },
  {
    category: "HTML & CSS", //Question 10
    question:
      "The background-color property in CSS can be used to set the background color of an HTML element.",
    answer: true,
  },
  {
    category: "HTML", //Question 11
    question: "The div tag is used to create a line break in an HTML document.",
    answer: false,
  },
  {
    category: "CSS", //Question 12
    question:
      "CSS can be used to create responsive designs for different screen sizes.",
    answer: true,
  },
  {
    category: "HTML ", //Question 13
    question: "HTML tags are case-sensitive.",
    answer: false,
  },
  {
    category: "HTML & CSS", //Question 14
    question:
      "CSS has the ability to override the default styles of HTML elements.",
    answer: true,
  },
  {
    category: "HTML & CSS", //Question 15
    question:
      "The font-size property in CSS can be used to set the font size of text in an HTML document.",
    answer: true,
  },
  {
    category: "HTML", //Question 16
    question:
      "The class attribute in HTML can be used to assign a specific style to an element.",
    answer: true,
  },
  {
    category: "HTML", //Question 17
    question: "HTML5 is the latest version of HTML.",
    answer: true,
  },
  {
    category: "HTML & CSS", //Question 18
    question: "CSS can be used to control the visibility of HTML elements.",
    answer: true,
  },
  {
    category: "HTML & CSS", //Question 19
    question:
      "The padding property in CSS sets the space outside an HTML element.",
    answer: false,
  },
  {
    category: "HTML & CSS", //Question 20
    question:
      "The text-align property in CSS can be used to center text within an HTML element.",
    answer: true,
  },
  {
    category: "HTML & CSS", //Question 21
    question:
      "The border property in CSS sets the border around an HTML element.",
    answer: true,
  },
  {
    category: "HTML & CSS", //Question 22
    question: "HTML and CSS can only be used to create static web pages.",
    answer: false,
  },
  {
    category: "HTML & CSS", //Question 23
    question:
      "The display property in CSS can be used to hide an HTML element.",
    answer: true,
  },
  {
    category: "HTML & CSS", //Question 24
    question:
      "The background-image property in CSS can be used to set a background image for an HTML element.",
    answer: true,
  },
  {
    category: "HTML", //Question 25
    question:
      "The a tag in HTML can be used to create a hyperlink to another page.",
    answer: true,
  },
  {
    category: "HTML & CSS", //Question 26
    question:
      "The float property in CSS can be used to wrap text around an HTML element.",
    answer: true,
  },
  {
    category: "HTML & CSS", //Question 27
    question: "HTML and CSS cannot be used to create interactive web pages.",
    answer: false,
  },
];

var count = 0;
var points = 0;
var category;
var question;

//show answer buttons after clicking start button
function showButtons() {
  document.getElementById("answerT").style.display = "";
  document.getElementById("answerF").style.display = "";
}

//category and questions
function catAndQuest() {
  start.style.display = "none";
  showButtons();

  document.getElementById("points").innerHTML = "Points: " + points;
  document.getElementById("count").innerHTML = "Question " + ++count + " / 27";

  currentCategory = Questions.map(function (question) {
    return question.category;
  });
  category =
    currentCategory[Math.floor(Math.random() * currentCategory.length)];
  document.getElementById("category").innerHTML = "Category: " + category;

  var questionList = Questions.filter(function (question) {
    return question.category === category;
  });

  question = questionList[Math.floor(Math.random() * questionList.length)];
  document.getElementById("quest").innerHTML = question.question;
}

// create a copy of Questions
var copy = [].concat(Questions);

// delete used question out of the copy
function deleteUsed() {
  if (Questions.length > 1) {
    Questions.splice(Questions.indexOf(question), 1);
  } else {
    document.getElementById("answerT").style.display = "none";
    document.getElementById("answerF").style.display = "none";
    document.getElementById("questions").style.display = "none";
    document.getElementById("looser").style.display = "";
    document.getElementById("reset").style.display = "";
  }
}

//player answered question
function answer(value) {
  deleteUsed();
  if (value === question.answer) {
    points += 5;
    if (points == 75) {
      document.getElementById("answerT").style.display = "none";
      document.getElementById("answerF").style.display = "none";
      document.getElementById("questions").style.display = "none";
      document.getElementById("winner").style.display = "";
      document.getElementById("reset").style.display = "";
    }
  }
  catAndQuest();
}

//restart the game
function restart() {
  let gainedPoints = parseInt(localStorage.getItem("points"), 10);
  gainedPoints += points;
  localStorage.setItem("points", gainedPoints);
  document.location.href = "";
}

//Background Audio
window.onmouseover = function () {
  document.getElementById("game2-music").play();
};

//Exit button redirect homepage
document.getElementById("exit-btn").addEventListener("click", function () {
  window.location.href = "../index.html";
});

//Restart the game when click on restart button
document.getElementById("restart-btn").addEventListener("click", function () {
  restart();
});
