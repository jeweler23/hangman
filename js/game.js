import { WORDS, KEYBOARD_LETTERS } from "./consts.js";

const gameDiv = document.getElementById("game");
const logoH1 = document.getElementById("logo");

export function startGame(e) {
  logoH1.classList.add("logo-sm");
  const image = createImg();
  gameDiv.prepend(image);

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
