const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Current card
let currentCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const getCardsData = () => {
  const cards = JSON.parse(localStorage.getItem('cards'));
  if (cards !== null && cards.length > 1) {
    nextBtn.removeAttribute('disabled', '');
  }
  return cards === null ? [] : cards;
};

// Add cards to LS
const setCardsData = (cards) => {
  localStorage.setItem('cards', JSON.stringify(cards));
  if (cards.length > 1) {
    nextBtn.removeAttribute('disabled', '');
  }
  window.location.reload();
};

// Cards data
const cardsData = getCardsData();

// Create cards
const createCards = () => {
  cardsData.forEach((data, index) => {
    createCard(data, index);
  });
};

const createCard = (data, index) => {
  const card = document.createElement('div');
  card.classList.add('card');

  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>${data.question}</p>
      </div>
      <div class="inner-card-back">
        <p>${data.answer}</p>
      </div>
    </div>
  `;

  card.addEventListener('click', () => {
    card.classList.toggle('show-answer');
  });

  cardsEl.push(card);
  cardsContainer.appendChild(card);

  updateCurrentText();
};

// Show number of cards
const updateCurrentText = () => {
  currentEl.innerText = `${currentCard + 1} / ${cardsEl.length}`;
};

// Event Listeners
nextBtn.addEventListener('click', () => {
  cardsEl[currentCard].className = 'card left';
  prevBtn.removeAttribute('disabled', '');
  currentCard = currentCard + 1;

  if (currentCard > cardsEl.length - 2) {
    nextBtn.setAttribute('disabled', '');
  }

  cardsEl[currentCard].className = 'card active';
  updateCurrentText();
});

prevBtn.addEventListener('click', () => {
  cardsEl[currentCard].className = 'card right';
  nextBtn.removeAttribute('disabled', '');
  currentCard = currentCard - 1;

  if (currentCard === 0) {
    prevBtn.setAttribute('disabled', '');
  }

  cardsEl[currentCard].className = 'card active';
  updateCurrentText();
});

showBtn.addEventListener('click', () => {
  addContainer.classList.add('show');
});

hideBtn.addEventListener('click', () => {
  addContainer.classList.remove('show');
});

addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
});

createCards();
