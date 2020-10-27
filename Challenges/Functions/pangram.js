// My Solution

function isPangram(string) {
  string = string.toLowerCase().replace(/\W/g, '');
  set = new Set(Array.from(string));
  return set.size === 26;
}

// Course Solution V1

function isPangramV1(sentence) {
  let lowerCased = sentence.toLowerCase();
  for (let char of 'abcdefghiljklmnopqrstuvwxyz') {
    if (lowerCased.indexOf(char) === -1) {
      return false;
    }
  }
  return true;
}

// Course Solution V2

function isPangramV2(sentence) {
  let lowerCased = sentence.toLowerCase();
  for (let char of 'abcdefghiljklmnopqrstuvwxyz') {
    if (!lowerCased.includes(char)) {
      return false;
    }
  }
  return true;
}
