import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2019, 1);
const start = performance.now();
// const input = `100756`
let part1 = 0;
let part2 = 0;

input.split('\n').forEach(l => {
  let res =  Math.floor(Number(l) / 3) - 2
  part1 += res;
  let cur = res;
  while (cur > 0) {
    part2 += cur;
    cur = Math.floor((cur / 3)) - 2;
  }
})


const end = performance.now();
console.log('part1: ', part1);
console.log('part2: ', part2);
const timeTaken = Math.round((end - start) * 10000) / 10000
console.log('time taken', timeTaken, 'ms');
