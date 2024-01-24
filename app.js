let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highscore = 0; // Variable to store the high score

let h2 = document.querySelector("h2");
let highscoreDisplay = document.getElementById("highscore"); // Assuming you have an HTML element with id "highscore"

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game is started.");
    started = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function updateHighscore() {
  if (level > highscore) {
    highscore = level;
    highscoreDisplay.innerHTML = "High Score  " + highscore;
  }
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);

  updateHighscore(); // Update high score after each level
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game over! Your score was <b>${level}</b> <br>Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
    // resetHighscore();
  }
}

function btnPress() {
  // console.log(this);
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

// Call this function whenever you want to reset the high score (e.g., at the beginning of the game)
function resetHighscore() {
  highscore = 0;
  highscoreDisplay.innerHTML = highscore;
}
