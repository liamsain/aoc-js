import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2024, 9);
// const input = `2333133121414131402`;
const start = performance.now();

const arr = new Array(input.length * 5).fill('.');
let currentFileNumber = 0;
let currArrIndex = 0;
for (let i = 0; i < input.length; i++) {
  const num = Number(input[i]);
  if (i % 2 == 0) {
    arr.fill(currentFileNumber, currArrIndex, currArrIndex + num);
    currentFileNumber++;
  } else {
    arr.fill('.', currArrIndex, currArrIndex + num);
  }
  currArrIndex += num;
}
currArrIndex--;

let endIndex = currArrIndex;
let shouldLoop = true;
while (shouldLoop) {
  for (let i = 0; i < currArrIndex; i++) {
    if (arr.slice(i, i + 10).every(x => x == '.')) {
      shouldLoop = false;
      break;
    }

    if (arr[i] == '.') {
      while (arr[endIndex] == '.') {
        endIndex--;
      }
      const tmp = arr[endIndex];
      arr[i] = tmp;
      arr[endIndex] = '.';
      endIndex--;
    }
  }
}
let part1 = 0;
for (let i = 0; i < arr.length;i++) {
  if (arr[i] == '.') {
    break;
  }
  part1 += i * arr[i];
}


const end = performance.now();
console.log('part 1: ', part1);
console.log('time taken', end - start, 'ms');
