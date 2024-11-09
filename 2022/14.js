import { getAdventOfCodeData } from '../node-utils.js';
import assert from 'node:assert';
// const input = await getAdventOfCodeData(2022, 14);
const input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;
const start = performance.now();

// lowest x is 473
// lowest x is 494 in test data
// const yLength = 200;
// const xLength = 100;
const yLength = 20;
const xLength = 20;

const grid = [...new Array(yLength).fill([...new Array(xLength).fill('.')])];


// const lowestX = 494;
const lowestX = 494;
let highestY = 0;
input.split('\n').forEach(l => {
  l.split(' -> ').forEach(entry => {
    const x = Number(entry.split(',')[0]) - lowestX;
    const y = Number(entry.split(',')[1]);
    console.log(`${x} ${y}`);
    grid[y][x] = '#';

  });
  console.log('\n');
});
console.log(grid);

function drawGrid() {
  let lines = '';
  for(let y = 0; y < yLength;y++) {
    lines += `${grid[y].join('')}\n`;
    // for(let x = 0; x < xLength;x++) {
      
    // }
  }
  console.log(lines);
}
drawGrid();
const end = performance.now();
console.log('time taken', end - start, 'ms');
    