const word = document.querySelector('#word');
const text = document.querySelector('#text');
const scoreEl = document.querySelector('#score');
const timeEl = document.querySelector('#time');
const timeContainer = document.querySelector('#time-container');
const endgameEl = document.querySelector('#end-game-container');
const settingsForm = document.querySelector('#settings-form');
const difficultySelect = document.querySelector('#difficulty');

// Init variables
let selectedWord;
let score = 0;
let time = 10;
let difficulty = localStorage.getItem('difficulty')
  ? localStorage.getItem('difficulty')
  : 'medium';

// Set difficulty
difficultySelect.value = difficulty;

// Load words from JSON
const loadWords = async () => {
  const res = await fetch('words.json');
  const data = await res.json();

  return data.nouns;
};

// Generate random word
const generateWord = async () => {
  wordsArr = await loadWords();
  const randomIndex = Math.floor(Math.random() * wordsArr.length);
  selectedWord = wordsArr[randomIndex].toLowerCase();

  addWord();
};

// Add word to DOM
const addWord = () => {
  word.innerHTML = selectedWord;
};

// Update score
const updateScore = () => {
  score++;
  scoreEl.innerHTML = score;
};

// Update time
const updateTime = () => {
  time--;
  mins = Math.floor(time / 60);
  secs = ('0' + (time % 60)).slice(-2);
  timeEl.innerHTML = `${mins}:${secs}`;

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }

  if (time <= 3) {
    timeContainer.classList.add('low');
  }

  if (time > 3) {
    timeContainer.classList.remove('low');
  }
};

// Start countdown
const timeInterval = setInterval(updateTime, 1000);

// Game over
const gameOver = () => {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button> 
  `;
  endgameEl.style.display = 'flex';
};

// Event Listeners
text.addEventListener('input', (e) => {
  const typedText = e.target.value.toLowerCase();

  if (typedText === selectedWord) {
    generateWord();
    updateScore();

    // Clear input
    e.target.value = '';

    // Add time
    if (difficulty === 'hard') {
      time += 3;
    } else if (difficulty === 'medium') {
      time += 4;
    } else {
      time += 5;
    }
    updateTime();
  }
});
settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});

// Focus on input
text.focus();

generateWord();
updateTime();
