import { getAdventOfCodeData, logTime } from '../node-utils.js';
import IntCode from './IntCode.js';
const input = await getAdventOfCodeData(2019, 13);
const start = performance.now();
const nums = input.split(',').map(Number);
const ic = new IntCode(nums);
ic.compute();
const icMap = {};
let smallestx = 0;
let biggesty = 0;
for (let i = 0; i < ic.output.length; i += 3) {
    const x = ic.output[i];
    const y = ic.output[i + 1];
    if (x < smallestx) {
        smallestx = x;
    }
    if (y > biggesty) {
        biggesty = y;
    }
    const tile = ic.output[i + 2];
    icMap[`${x},${y}`] = tile;
}
console.log('biggesty', biggesty);
console.log('smallestx', smallestx);

let blockCount = 0;
Object.values(icMap).forEach(tile => {
    if (tile === 2) {
        blockCount++;
    }
});
/*
const readline = require('readline');

// Enable raw mode to listen for individual key presses
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

// State for the game
let position = 0;

// Function to render the "game screen"
function drawScreen() {
  console.clear();
  console.log("Use Left (←) and Right (→) arrow keys to move.");
  console.log("Press 'q' to quit.");
  console.log(`Position: ${position}`);
}

// Listen for keypress events
process.stdin.on('keypress', (str, key) => {
  if (key.name === 'q') {
    console.log('Exiting game...');
    process.exit();
  } else if (key.name === 'left') {
    position--;
    drawScreen();
  } else if (key.name === 'right') {
    position++;
    drawScreen();
  }
});

// Initial screen draw
drawScreen();
*/
const end = performance.now();
console.log(blockCount);
logTime(end - start);
    