const main = document.querySelector('#main');
const addUserBtn = document.querySelector('#add-user');
const doubleBtn = document.querySelector('#double');
const filterBtn = document.querySelector('#filter');
const sortBtn = document.querySelector('#sort');
const totalBtn = document.querySelector('#total');

let data = [];

// Fetch users and add money

const getRandomUser = async () => {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
};

// Add new user to data[]

const addData = (obj) => {
  data.push(obj);
  updateDOM();
};

// Update DOM

const updateDOM = (providedData = data) => {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money,
    )}`;
    main.appendChild(element);
  });

  totalBtn.removeAttribute('disabled', '');
};

// Format money

const formatMoney = (number) => {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// Double the money

const doubleMoney = () => {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
};

// Filter millionaires

const filterMillionaires = () => {
  data = data.filter((user) => {
    return user.money > 1000000;
  });
  console.log(data);
  updateDOM();
};

// Sort by richest

const sortByRichest = () => {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
};

// Calculate total wealth

const totalWealth = () => {
  const total = data.reduce((acc, user) => {
    return (acc += user.money);
  }, 0);

  const totalEl = document.createElement('div');
  totalEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    total,
  )}</strong></h3>`;
  main.appendChild(totalEl);
  totalBtn.setAttribute('disabled', '');
};

// Event Listeners

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
filterBtn.addEventListener('click', filterMillionaires);
totalBtn.addEventListener('click', totalWealth);

getRandomUser();
