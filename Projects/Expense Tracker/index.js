const balance = document.querySelector('#balance');
const money_plus = document.querySelector('#money-plus');
const money_minus = document.querySelector('#money-minus');
const list = document.querySelector('#list');
const form = document.querySelector('#form');
const text = document.querySelector('#text');
const amount = document.querySelector('#amount');

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions'),
);

let transactions =
  localStorageTransactions !== null ? localStorageTransactions : [];

// Add transaction

const addTransaction = (e) => {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generatedID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLS();

    text.value = '';
    amount.value = '';
  }
};

// Remove transaction

const removeTransaction = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLS();
  init();
};

// Generate random ID

const generatedID = () => {
  return Math.floor(Math.random() * 100000000);
};

// Add transactions to DOM list

const addTransactionDOM = (transaction) => {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  // Create li item
  const item = document.createElement('li');
  item.classList.add(sign === '-' ? 'minus' : 'plus');
  item.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount,
  )}</span><button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;
  list.appendChild(item);
};

// Update the balance, income, and expense

const updateValues = () => {
  // Get values
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  // Update DOM
  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
};

// Update LS

const updateLS = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

// Event Listeners

form.addEventListener('submit', addTransaction);

// Init app

const init = () => {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
};

init();
