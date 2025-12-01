import { getAdventOfCodeData, logTime } from '../node-utils.js';
// const input = await getAdventOfCodeData(2025, 1);
const input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;
const start = performance.now();
let current = 50;
let part1 = 0;
let part2 = 0;

const lines = input.split('\n');
lines.forEach(ln => {
  const num = Number(ln.substring(1));
  if (ln[0] == 'R') {
    current += num;
  } else {
    current -= num;
  }
  part2 += Math.floor(Math.abs(current) / 100);
  current = (current % 100 + 100) % 100;
  if (current == 0) {
    part1++;
  }
})

const end = performance.now();
console.log('part1', part1)
console.log('part2', part2)
logTime(end - start);
