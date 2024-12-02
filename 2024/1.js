import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2024, 1);

const start = performance.now();
const left = [];
const right = [];
let distances = 0;
let simScore = 0;

input.split('\n').forEach(line => {
  const lineSpl = line.split('  ');
  const leftSide = Number(lineSpl[0]);
  const rightSide = Number(lineSpl[1]);
  left.push(leftSide);
  right.push(rightSide);
});

left.sort((a,b) => a - b);
right.sort((a,b) => a - b);

for (let i = 0; i < left.length;i++) {
  const dist = Math.abs(left[i] - right[i]);
  distances = distances + dist;

  const timeOccurrsInRight = right.filter(x => x === left[i]).length;
  simScore += left[i] * timeOccurrsInRight;
}
const end = performance.now();
console.log('part 1: ', distances);
console.log('part 2: ', simScore);
console.log('time taken', end - start, 'ms');
    