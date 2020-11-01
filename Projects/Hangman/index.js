const wordEl = document.querySelector('#word');
const wrongLettersEl = document.querySelector('#wrong-letters');
const playAgainBtn = document.querySelector('#play-button');
const popup = document.querySelector('#popup-container');
const notification = document.querySelector('#notification-container');
const messageTitle = document.querySelector('#message-title');
const messageBody = document.querySelector('#message-body');
const figureParts = document.querySelectorAll('.figure-part');

let selectedWord;
const correctLetters = [];
const wrongLetters = [];

const loadWord = async () => {
  const res = await fetch('words.json');
  const data = await res.json();

  selectedWord = data.nouns[Math.floor(Math.random() * data.nouns.length)];
  displayWord();
};

const displayWord = () => {
  wordEl.innerHTML = `
  ${selectedWord
    .split('')
    .map(
      (letter) => `
        <span class="letter">
          ${correctLetters.includes(letter) ? letter.toUpperCase() : ''}
        </span>
      `,
    )
    .join('')}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, '').toLowerCase();
  console.log(innerWord);
  if (innerWord === selectedWord) {
    messageTitle.innerText = 'Congratulations! You won! 😊';
    messageBody.innerText = `The hidden word was: ${selectedWord}`;
    popup.style.display = 'flex';
  }
};

// Update wrong letters

const updateWrongLettersEl = () => {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map((letter) => `<span>${letter.toUpperCase()}</span>`)}
  `;

  // Display body parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    messageTitle.innerText = 'Game Over 😞';
    messageBody.innerText = `The hidden word was: ${selectedWord}`;
    popup.style.display = 'flex';
  }
};

// Show notification

const showNotification = () => {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
};

// Event Listeners

// Keydown event
window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key.toLowerCase();

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
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game
playAgainBtn.addEventListener('click', () => {
  location.reload();
});

loadWord();
