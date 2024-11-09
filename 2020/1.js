import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2020, 1);
const start = performance.now();

const numbers = input.split('\n').map(n => Number(n));

let firstResult = 0;
let secondResult = 0;
for (let i = 0; i < numbers.length; i++) {
  if (firstResult !== 0 && secondResult !== 0) {
    break;
  }
  for (let ii = i; ii < numbers.length; ii++) {
    if (numbers[i] + numbers[ii] == 2020) {
      firstResult = numbers[i] * numbers[ii];
    }
    for (let iii = ii; iii < numbers.length; iii++) {
      const attempt = numbers[i] + numbers[ii] + numbers[iii];
      if (attempt === 2020) {
        secondResult = numbers[i] * numbers[ii] * numbers[iii];
        break;
      }
    }
  }
}


const end = performance.now();
console.log('time taken', end - start, 'ms');
console.log('result 1: ', firstResult);
console.log('result 2: ', secondResult);
