// My Solution

function getCard() {
  const value = [ 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K' ];
  const suit = [ 'clubs', 'spades', 'hearts', 'diamonds' ];

  const valueIndex = Math.floor(Math.random() * value.length);
  const suitIndex = Math.floor(Math.random() * suit.length);

  return {
    value : value[valueIndex],
    suit  : suit[suitIndex]
  };
}

// Course Solution V1
function getCardV1() {
  const values = [ 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K' ];
  const valIdx = Math.floor(Math.random() * values.length);
  const value = values[valIdx];

  const suits = [ 'clubs', 'spades', 'hearts', 'diamonds' ];
  const suitIdx = Math.floor(Math.random() * suits.length);
  const suit = suits[suitIdx];

  return {
    value : value,
    suit  : suit
  };
}

// Course Solution V2

function getCardV2() {
  const values = [ 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K' ];
  const value = pick(values);

  const suits = [ 'clubs', 'spades', 'hearts', 'diamonds' ];
  const suit = pick(suits);

  return {
    value : value,
    suit  : suit
  };
}

function pick(arr) {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

// Course Solution V3

function getCardV3() {
  const values = [ 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K' ];
  const suits = [ 'clubs', 'spades', 'hearts', 'diamonds' ];

  return {
    value : pick(values),
    suit  : pick(suits)
  };
}
