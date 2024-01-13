import { WORDS, KEYBOARD_LETTERS, QUESTIONS } from "./consts.js";

const body = document.body;
const gameSection = document.createElement("section");
const logoH1 = document.createElement("h1");
const gameDiv = document.createElement("div");
const btnStart = document.createElement("button");

body.appendChild(gameSection);
gameSection.appendChild(logoH1);
gameSection.appendChild(gameDiv);
gameDiv.appendChild(btnStart)

gameSection.id = "app";
gameDiv.id = "game";
logoH1.id = "logo";
btnStart.id = "startGame";

gameSection.classList.add("app");
gameDiv.classList.add("app__block-btn");
logoH1.classList.add("app__logo");
btnStart.classList.add("app__btn-start");

logoH1.innerText = '[ HANGMAN GAME ]';
btnStart.innerHTML = 'Start game'

let word = generateWord();
let keyboardDiv = createKeyboard();

let winCount, triesLeft;
let flag;

export function startGame(e) {
  keyboardDiv = createKeyboard();

  flag = false;
  btnStart.style.display = "none";
  triesLeft = 6;
  winCount = 0;

  // console.log(winCount,word,word.length);

  logoH1.classList.add("logo-sm");

  const image = createImg();
  gameDiv.prepend(image);

  const questText = generateQuest();
  const questPar = document.createElement("p");
  questPar.classList.add("quest-par");
  questPar.innerText = questText;
  gameDiv.prepend(questPar);

  const secretWord = word;
  console.log(secretWord);

  // const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "button") {
      event.target.disabled = true;

      checkLetter(event.target.id);
    }
  });

  document.addEventListener("keyup", pressKey);

  gameDiv.innerHTML +=
    '<p id="tries" class="">TRIES LEFT: <span id="tries-left" class="">6</span></p>';
  gameDiv.appendChild(keyboardDiv);

  keyboardDiv.insertAdjacentElement("beforebegin", generatePlaceHolders());
}

// keyboard

function pressKey(e) {
  let key = e.key;

  for (const elem of keyboardDiv.children) {
    if (elem.id == e.key.toUpperCase()) {
      if (!elem.disabled) {
        checkLetter(elem.id);
      }
      elem.disabled = true;
    }
  }
}

// generation first image
function createImg() {
  const img = document.createElement("img");
  img.src = "public/image/hg-4.png";
  img.alt = "hangman game";
  img.classList.add("hangman-img");
  img.id = "hangman-img";

  return img;
}

// generate keyboard
function createKeyboard() {
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");
  keyboard.id = "keyboard";

  const keyboardHTML = KEYBOARD_LETTERS.reduce((acc, curr) => {
    return (
      acc +
      `<button class="app__btn-start keyboard-button" id="${curr}">${curr}</button>`
    );
  }, "");

  keyboard.innerHTML = keyboardHTML;
  return keyboard;
}

// generate random word
function generateWord() {
  const randomNumber = Math.floor(Math.random() * WORDS.length);
  const randomWord = WORDS[randomNumber];
  return randomWord;
}

// generate quest
function generateQuest() {
  const randomWord = word;
  const index = WORDS.indexOf(randomWord);
  return QUESTIONS[index];
}

// generate placeholders

function generatePlaceHolders() {
  const wordRand = word;
  const divPlaceHolder = document.createElement("div");

  const wordLength = [...wordRand.toString()];
  const placeholdersHTML = wordLength.reduce((acc, item, i) => {
    return acc + `<h1 id="letter_${i}" class="letter">_</h1>`;
  }, "");
  divPlaceHolder.innerHTML = placeholdersHTML;
  divPlaceHolder.classList.add("placeholder");
  divPlaceHolder.id = "placeholder";
  return divPlaceHolder;
}

// check letter

const checkLetter = (letter) => {
  console.log(
    "winCount",
    winCount,
    "triesLeft",
    triesLeft,
    "length",
    word.length
  );
  const wordRandom = word;
  if (wordRandom.includes(letter.toLowerCase())) {
    const wordArray = Array.from(wordRandom);
    wordArray.forEach((currentLetter, i) => {
      // console.log(wordArray,i);
      if (currentLetter == letter.toLowerCase()) {
        winCount += 1;
        if (winCount === word.length) {
          stopGame("win");
          return;
        }
        document.getElementById(`letter_${i}`).innerText = letter;
      }
    });
  } else {
    triesLeft -= 1;
    document.getElementById("tries-left").innerText = triesLeft;

    const hangmanImg = document.getElementById("hangman-img");
    hangmanImg.src = `public/image/hg-${10 - triesLeft}.png`;
    if (triesLeft == 0) {
      stopGame("lose");
    }
  }
};

function stopGame(status) {
  flag = true;
  if (flag) {
    document.removeEventListener("keyup", pressKey);
  }
  document.getElementById("placeholder").remove();
  document.getElementById("tries").remove();
  document.getElementById("keyboard").remove();
  flag = true;
  // winCount = 0
  // triesLeft = 0
  if (status == "win") {
    // сценарий выигрыша
    document.getElementById("hangman-img").src = "public/image/hg-win.png";
    document.getElementById("game").innerHTML +=
      '<h2 class="result-header win">You won!</h2>';
  } else if (status == "lose") {
    // сценарий проигрыша
    document.getElementById("game").innerHTML +=
      '<h2 class="result-header lose">You lost :(</h2>';
    const hangmanImg = document.getElementById("hangman-img");
    hangmanImg.src = `public/image/hg-${10}.png`;
  }

  document.getElementById(
    "game"
  ).innerHTML += `<p>The word was: <span class="result-word">${word.toUpperCase()}</span></p>`;
  document.getElementById(
    "game"
  ).innerHTML += `<button class='app__btn-start' id='play-again'>Play again</button>`;
  document.getElementById("play-again").addEventListener("click", playAgain);
}

function playAgain() {
  gameDiv.innerHTML = "";
  gameDiv.append(btnStart);
  btnStart.style.display = "block";
  logoH1.classList.remove("logo-sm");
  word = generateWord();
  // Вешаем на кнопку функцию, которая запускает игру – startGame
  btnStart.addEventListener("click", startGame);
}
