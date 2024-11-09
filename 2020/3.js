import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2020, 3);

const start = performance.now();
const lines = input.split('\n');
const lineLength = lines[0].length;
let x = -3;
let right3down1 = 0;
const results = {
  r1d1: {x: 0, r: 1, d: 1, trees: 0},
  r3d1: {x: 0, r: 3, d: 1, trees: 0},
  r5d1: {x: 0, r: 5, d: 1, trees: 0},
  r7d1: {x: 0, r: 7, d: 1, trees: 0},
  r1d2: {x: 0, r: 1, d: 2, trees: 0}
};
debugger;
for(let i =0; i < lines.length;i++) {
  x += 3;
  const mod = x % lineLength;
  if (lines[i][mod] === '#') {
    right3down1 += 1;
  }

}

const end = performance.now();
console.log('right3down1:', right3down1);
console.log('time taken', end - start, 'ms');
    