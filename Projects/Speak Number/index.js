const msg = document.querySelector('#msg');

// Generate random number
const getRandomNumber = () => {
  return Math.ceil(Math.random() * 100);
};
const randNumber = getRandomNumber();

// Start recognition and game
let recognition = new window.webkitSpeechRecognition();
recognition.start();

// Capture user speech
const onSpeak = (e) => {
  const guess = e.results[0][0].transcript;

  writeMessage(guess);
  checkNumber(guess);
};

// Show guess on DOM
const writeMessage = (guess) => {
  msg.innerHTML = `
    <div>You said:</div>
      <span class="box">${guess}</span>
    <div id="hint"></div>
  `;
};

// Check guess
const checkNumber = (guess) => {
  const num = +guess;

  // Check if valid number
  if (Number.isNaN(num)) {
    msg.innerHTML += `<div>This is not a valid number</div>`;
    return;
  }

  // Check in range
  if (num > 100 || num < 1) {
    msg.innerHTML = `<div>Number must between 1 and 100</div>`;
    return;
  }

  // Check number
  if (num === randNumber) {
    document.body.innerHTML = `
      <h2>Congrats you have guessed the number! <br><br>
      The number was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randNumber) {
    msg.innerHTML = `
    <div>You said:</div>
      <span class="box">${guess}</span>
    <div>Go Lower</div>
  `;
  } else {
    msg.innerHTML = `
    <div>You said:</div>
      <span class="box">${guess}</span>
    <div>Go Higher</div>
  `;
  }
};

// Event Listeners
recognition.addEventListener('result', onSpeak);
recognition.addEventListener('end', () => {
  recognition.start();
});
document.body.addEventListener('click', (e) => {
  if (e.target.id === 'play-again') {
    window.location.reload();
  }
});

console.log(randNumber);
