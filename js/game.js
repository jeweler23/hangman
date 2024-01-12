import { WORDS, KEYBOARD_LETTERS } from "./consts.js";

const gameDiv = document.getElementById("game");
const logoH1 = document.getElementById("logo");
const word = generateWord()

export function startGame(e) {
  logoH1.classList.add("logo-sm");
  const image = createImg();
  gameDiv.prepend(image);

  const secretWord = word;
  console.log(secretWord);

  const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "button") {
      event.target.disabled = true;
      console.log(event.target.id);
      //   checkLetter(event.target.id);
    }
  });
  gameDiv.appendChild(keyboardDiv);
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

function generatePlaceHolders(){
  const wordRand = word;
  const divPlaceHolder = document.createElement('div')
  const wordLength = [...wordRand.toString()];
  const placeholdersHTML = wordLength.reduce((acc,item,i)=>{
    return acc + `<h1 id="letter_${i}" class="letter">_</h1>`
  },'')
  divPlaceHolder.innerHTML = placeholdersHTML
  return divPlaceHolder
}
generatePlaceHolders()