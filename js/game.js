import { WORDS, KEYBOARD_LETTERS } from "./consts.js";

const gameDiv = document.getElementById("game");
const logoH1 = document.getElementById("logo");
const btnStart = document.querySelector(".app__btn-start");
const word = generateWord();

let winCount, triesLeft;

export function startGame(e) {
  btnStart.style.display = "none";
  triesLeft = 10;
  winCount = 0;
  logoH1.classList.add("logo-sm");
  const image = createImg();
  gameDiv.prepend(image);

  const secretWord = word;
  console.log(secretWord);

  const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "button") {
      event.target.disabled = true;

      checkLetter(event.target.id);
    }
  });
  gameDiv.innerHTML +=
    '<p id="tries" class="">TRIES LEFT: <span id="tries-left" class="">10</span></p>';
  gameDiv.appendChild(keyboardDiv);

  keyboardDiv.insertAdjacentElement("beforebegin", generatePlaceHolders());
}

// generation first image
function createImg() {
  const img = document.createElement("img");
  img.src = "public/image/hg-1.png";
  img.alt = "hangman game";
  img.classList.add("hangman-img");
  img.id = "hangman-img";

  return img;
}

// generate keyboard
const createKeyboard = () => {
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
};

// generate random word
function generateWord() {
  const randomNumber = Math.floor(Math.random() * WORDS.length);
  const randomWord = WORDS[randomNumber];
  return randomWord;
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
  const wordRandom = word;
  if (wordRandom.includes(letter.toLowerCase())) {
    const wordArray = Array.from(wordRandom);
    wordArray.forEach((currentLetter, i) => {
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
    hangmanImg.src = `public/image/hg-${11 - triesLeft}.png`;
    if (triesLeft == 0) {
      stopGame("lose");
    }
  }
};

function stopGame(status) {
  document.getElementById("placeholder").remove();
  document.getElementById("tries").remove();
  document.getElementById("keyboard").remove();

  if (status == "win") {
    // сценарий выигрыша
    document.getElementById("hangman-img").src = "public/image/hg-win.png";
    document.getElementById("game").innerHTML +=
      '<h2 class="result-header win">You won!</h2>';
  }

  else if (status == "lose") {
    // сценарий проигрыша
    document.getElementById('game').innerHTML +=
      '<h2 class="result-header lose">You lost :(</h2>';
      const hangmanImg = document.getElementById("hangman-img");
      hangmanImg.src = `public/image/hg-${10}.png`;
  }

  document.getElementById(
    'game',
  ).innerHTML += `<p>The word was: <span class="result-word">${word.toUpperCase()}</span></p>`;

}
