/* GAME FUNCTION:
- Player must guess a number between min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if lose
- Let player choose to play again
*/

// Game Values
let min = 1,
    max = 10,
    winningNum = Math.ceil(Math.random()*(max-min+1)),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    // Validate input
    if (isNaN(guess) || guess < min || guess > max) {
      // Invalid number
      setMessage(`Please enter a number between ${min} and ${max}`, 'red');
      // Clear input
      guessInput.value = '';
      
    } else {
      // Check if won
      if (guess === winningNum) {
        gameOver(true, `${winningNum} is correct, YOU WIN!`);

      // Wrong number
      } else {
        guessesLeft -= 1;
  
        // Game over
        if (guessesLeft === 0) {
          gameOver(false, `Game over, you lost. The correct number was ${winningNum}.`);
    
        // Game continues
        } else {
          // Change border color
          guessInput.style.borderColor = 'red';
          // Clear input
          guessInput.value = '';
          // Set message
          setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');
        }
      }
    }
});

// Game Over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : 'red';

  // Disable input
  guessInput.disabled = true;
  // Change color
  guessInput.style.borderColor = color;
  // Set message
  setMessage(msg, color)
  // PLay again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

