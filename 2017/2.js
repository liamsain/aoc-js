import { getAdventOfCodeData, logTime } from '../node-utils.js';
const input = await getAdventOfCodeData(2017, 2);
const start = performance.now();

let part1 = 0;
let part2 = 0;

input.split('\n').forEach(line => {
  const numbers = line.split('\t').map(Number);
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  part1 += max - min;

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i !== j) {
        const a = numbers[i], b = numbers[j];
        if (a % b === 0) {
          part2 += a / b;
          break;
        }
      }
    }
  }
});


const end = performance.now();
console.log('part 1: ', part1);
console.log('part 2: ', part2);
logTime(end - start);
    