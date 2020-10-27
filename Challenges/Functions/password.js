// My Solution

function isValidPassword(username, password) {
  if (password.length < 8 || password.indexOf(' ') !== -1 || password.includes(username)) {
    return false;
  }
  return true;
}

// Course Solution V1

function isValidPasswordV1(password, username) {
  if (password.length < 8) {
    return false;
  }
  if (password.indexOf(' ') !== -1) {
    return false;
  }
  if (password.indexOf(username) !== -1) {
    return false;
  }
  return true;
}

// Course Solution V2

function isValidPasswordV2(password, username) {
  if (password.length < 8 || password.indexOf(' ') !== -1 || password.indexOf(username) !== -1) {
    return false;
  }
  return true;
}

// Course Solution V3

function isValidPasswordV3(password, username) {
  const tooShort = password.length < 8;
  const hasSpace = password.indexOf(' ') !== -1;
  const tooSimilar = password.indexOf(username) !== -1;

  if (tooShort || hasSpace || tooSimilar) {
    return false;
  }
  return true;
}

// Course Solution V4

function isValidPasswordV4(password, username) {
  const tooShort = password.length < 8;
  const hasSpace = password.indexOf(' ') !== -1;
  const tooSimilar = password.indexOf(username) !== -1;
  return !tooShort && !hasSpace && !tooSimilar;
}
