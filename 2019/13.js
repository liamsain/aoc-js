import { getAdventOfCodeData, logTime } from '../node-utils.js';
import IntCode from './IntCode.js';

const input = await getAdventOfCodeData(2019, 13);
const start = performance.now();
const nums = input.split(',').map(Number);
const ic = new IntCode(nums);
ic.compute();
const icMap = {};
for (let i = 0; i < ic.output.length; i += 3) {
  const x = ic.output[i];
  const y = ic.output[i + 1];
  const tile = ic.output[i + 2];
  icMap[`${x},${y}`] = tile;
}

let blockCount = 0;
Object.values(icMap).forEach(tile => {
  if (tile === 2) {
    blockCount++;
  }
});

function updateIc2Map() {
  for (let i = 0; i < ic2.output.length; i += 3) {
    const x = ic2.output[i];
    const y = ic2.output[i + 1];
    const tile = ic2.output[i + 2];
    if (tile == 3) {
      paddlex = x;
    } else if (tile == 4) {
      ballx = x;
    }
    ic2Map[`${x},${y}`] = tile;
  }
}

const ic2 = new IntCode(nums);
ic2.ints[0] = 2;
ic2.compute();
const ic2Map = {};
let paddlex = 0;
let ballx = 0;
let score = 0;

updateIc2Map();
let blocks = Object.values(ic2Map).filter(x => x == 2).length;

while (blocks > 0) {
  let input = [0];
  if (paddlex < ballx) {
    input[0] = 1
  } else if (paddlex > ballx) {
    input[0] = -1;
  }
  ic2.pushInputAndContinue(input);
  updateIc2Map();
  score = ic2Map['-1,0'];
  blocks = Object.values(ic2Map).filter(x => x == 2).length;
}

function drawIc2() {
  console.clear();
  let str = '';
  for (let y = 0; y < 25; y++) {
    let lineStr = '';
    for (let x = 0; x < 42; x++) {
      const t = ic2Map[`${x},${y}`]
      if (t == 0) {
        lineStr += ' ';
      } else if (t == 1) {
        lineStr += ' ';
      } else if (t == 2) {
        lineStr += '\u25A2';
      } else if (t == 3) {
        lineStr += '\u25AD';
        paddlex = x;
      } else if (t == 4) {
        lineStr += '\u25C9';
        ballx = x;
      }
    }
    str += lineStr;
    str += '\n'
  }
  const score = ic2Map['-1,0'];
  console.log(`\tSCORE: ${score}\n${str}`);
}
// Draw the game:
// setInterval(() => {
//   updateIc2Map();
//   drawIc2();
//   let input = [0];
//   if (paddlex < ballx) {
//     input[0] = 1
//   } else if (paddlex > ballx) {
//     input[0] = -1;
//   }
//   ic2.pushInputAndContinue(input);
// }, 32);
// updateIc2Map();
// drawIc2();
// ic2.pushInputAndContinue([-1]);

// updateIc2Map();
// drawIc2();

const end = performance.now();
console.log(blockCount);
console.log('part2: ', score);
logTime(end - start);
