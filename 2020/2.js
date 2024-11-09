import { getAdventOfCodeData } from '../node-utils.js';
const start = performance.now();
const input = await getAdventOfCodeData(2020, 2);

let firstResult = 0;
let secondResult = 0;
input.split('\n').forEach(line => {
  const splitLine = line.split(' ');
  const numberRange = splitLine[0].split('-');
  const numFrom = Number(numberRange[0]);
  const numTo = Number(numberRange[1]);
  const letter = splitLine[1][0];
  const pw = splitLine[2];
  let count = 0;
  for (let i = 0; i < pw.length;i++) {
    if (pw[i] === letter) {
      count += 1;
    }
  }
  let exactMatches = 0;

  if (pw[numFrom - 1] == letter) {
    exactMatches += 1;
  }
  if (pw[numTo - 1] == letter) {
    exactMatches += 1;
  }
  if (exactMatches === 1) {
    secondResult += 1;
  }
  if (count >= numFrom && count <= numTo) {
    firstResult += 1;
  }
});

const end = performance.now();
console.log('time taken', end - start, 'ms');
console.log('first q: ', firstResult);
console.log('second q: ', secondResult);
    