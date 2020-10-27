// My Solution

function avg(array) {
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    total += array[i];
  }
  return total / array.length;
}

// Course Solution

function avgV1(arr) {
  let total = 0;
  for (let num of arr) {
    total += num;
  }
  return (res = total / arr.length);
}
