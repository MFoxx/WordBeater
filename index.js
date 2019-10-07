window.addEventListener("load", init); //Pri reloadnuti okna zapne init

//Vytvorenie premmených
let currentLevel;
let time = currentLevel;
let score = 0;
let isPlaying;
let difficulty;
let highscore = 0;

// DOM Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const currenctHighscore = document.querySelector("#highscore");

//Selection of words
const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition',
  'goal',
  'programmer',
  'Elon Musk'
];

// Initialize game
function init() {
  // Load word from array
  showWord(words);
  //Start matching on word input
  wordInput.addEventListener("input", startMatch);
  console.log("asd");
  currenctHighscore.innerHTML = localStorage.getItem("highscore");
  //Call countdown every seconds
  setInterval(countdown, 1000); //každú sekudnu sa spustí countdown funkcia

  setInterval(checkStatus, 50); //každých 50ms sa spustí checkStatus funcia
}

function getHighscore () {
  if (score > localStorage.getItem("highscore")) {
  highscore = score;
  localStorage.setItem("highscore", highscore);
  currenctHighscore.innerHTML = localStorage.getItem("highscore");
  } else {
    highscore = highscore;
  }
}

function getDifficulty() {
  difficulty = document.getElementById("form").value;
  if(difficulty == "easy"){
      time = 5 + 1;
      seconds.innerHTML = 5;
    } else if (difficulty == "medium") {
      time = 3 + 1;
      seconds.innerHTML = 3;
    }else if (difficulty == "hard") {
      time = 1 + 1;
      seconds.innerHTML = 2;
  };
}

//Start match function
function startMatch() {
  if(matchWords()){
    isPlaying = true;
    // time = difficulty + 1;
    showWord(words);
    wordInput.value = "";
    score++;
}
  if (score < 0) {
    scoreDisplay.innerHTML = 0;
  }else{
  scoreDisplay.innerHTML = score;
  }
}
//Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) { //pokiaľ je zadane slovo === slovu v arrayi
    message.innerHTML = "Correct!" //Vypíše correct
    return true;
  } else {
    message.innerHTML = ""; //Ak nie, pokračuje ďalej
    return false;
  }
}

//Pick & show random words
function showWord(words) {
  const randIndex = Math.floor(Math.random() * words.length); //Vytvorí random v rozdemdzí slov v random array
  currentWord.innerHTML = words[randIndex]; //Vytvorí random slovo z arrayu a vloží ho do currentWord, ktoré ho displayne
  getDifficulty();
}

//Funkcia na odpočet zostávajúceho času
function countdown() {
  //Check for time is not run
  if(time > 0) {
    //Decrement time
    time--; //Odpočíta z timu
  }else if(time === 0){
    //Game over
    isPlaying = false;
  }

  //Show time
  timeDisplay.innerHTML = time;
}


//Chceck game status
function checkStatus() {
  if(!isPlaying && time === 0){ //Pokiaľ je čas nula a zároveň(&&) isPlaying je false, displayne Game Over!
    getHighscore();
    message.innerHTML = "Game over!"
    score = -1; //Resetuje skore
    }
}
