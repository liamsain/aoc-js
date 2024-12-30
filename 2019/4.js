import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2019, 4);
const start = performance.now();
let part1 = 0;
let part2 = 0;

const from = Number(input.split('-')[0])
const to = Number (input.split('-')[1]);
function hasTwoIdenticalAdjChars(str) {
  let result = false;
  for (let i = 0; i < str.length - 1;i++) {
    if (str[i] == str[i + 1]) {
      result = true;
      break;
    }
  }
  return result;
}
function digitsIncrease(str) {
  let result = true;
  for (let i = 0; i < str.length - 1;i++) {
    if (str[i + 1] < str[i]) {
      result = false;
      break;
    }
  }
  return result;
}
function identicalCharsOccurEvenly(str) {
  let result = true;
  for (let i = 0; i < str.length - 1;i++) {
    if (str[i] == str[i + 1]) {
      const filtered = str.split('').filter(x => x == str[i])
      if (filtered.length % 2 !== 0) {
        result = false;
        break;
      }
    }
  }

  return result;
}
for (let i = from; i < to;i++) {
  const str = i.toString();
  if (!digitsIncrease(str)) {
    continue;
  }
  if (!hasTwoIdenticalAdjChars(str)) {
    continue;
  }
  part1++;
  if (identicalCharsOccurEvenly(str)) {
    part2++;
  }
}

const end = performance.now();
console.log('part1: ', part1);
console.log('part2: ', part2); // 1044 too low
const timeTaken = Math.round((end - start) * 1000) / 1000
console.log('time taken', timeTaken, 'ms');
    