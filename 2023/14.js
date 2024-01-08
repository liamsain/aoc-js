import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2023, 14);
let firstResult = 0;
let secondResult = 0;
// const input =
//   `O....#....
// O.OO#....#
// .....##...
// OO.#O....O
// .O.....O#.
// O.#..O.#.#
// ..O..#O..O
// .......O..
// #....###..
// #OO..#....`;
const start = performance.now();

let lines = input.split('\n').map(l => l.split(''));
const linesLength = lines.length;

function getNorthSupportBeamLoad() {
  let result = 0;
  for (let i = 0; i < linesLength; i++) {
    const stonesCount = lines[i].filter(x => x == 'O').length;
    result += (linesLength - i) * stonesCount;
  }
  return result;
}

function tiltItLikeItsHot(direction) {
  let shouldLoopAgain = true;
  while (shouldLoopAgain) {
    shouldLoopAgain = false;
    for (let i = 0; i < linesLength; i++) {
      for (let j = 0; j < lines[0].length; j++) {
        if (lines[i][j] == 'O') {
          if (direction == 'north') {
            if (lines[i - 1] && lines[i - 1][j] == '.') {
              lines[i - 1][j] = 'O';
              lines[i][j] = '.';
              shouldLoopAgain = true;
            }
          } else if (direction == 'east') {
            if (lines[i][j + 1] && lines[i][j + 1] == '.') {
              lines[i][j + 1] = 'O';
              lines[i][j] = '.';
              shouldLoopAgain = true;
            }
          } else if (direction == 'south') {
            if (lines[i + 1] && lines[i + 1][j] == '.') {
              lines[i + 1][j] = 'O';
              lines[i][j] = '.';
              shouldLoopAgain = true;
            }
          } else {
            if (lines[i][j - 1] && lines[i][j - 1] == '.') {
              lines[i][j - 1] = 'O';
              lines[i][j] = '.';
              shouldLoopAgain = true;
            }
          }
        }
      }
    }
  }
}
tiltItLikeItsHot('north');
firstResult = getNorthSupportBeamLoad();
lines = input.split('\n').map(l => l.split(''));
const states = [lines.map(x => x.join('')).reduce((acc, val) => acc + val, '')];

let maxCycles = Infinity;
let foundMax = false;
let currentCycle = 1;
while (currentCycle <= maxCycles) {
  tiltItLikeItsHot('north');
  tiltItLikeItsHot('west');
  tiltItLikeItsHot('south');
  tiltItLikeItsHot('east');
  if (!foundMax) {
    const str = lines.map(x => x.join('')).reduce((acc, val) => acc + val, '')
    if (states.includes(str)) {
      foundMax = true;
      console.log('found a match on cycle', currentCycle)
      maxCycles = currentCycle + (1_000_000 % currentCycle);
      console.log('setting max to ', maxCycles);
    }

    states.push(str);
  }
  currentCycle += 1;

}

secondResult = getNorthSupportBeamLoad();

const end = performance.now();
console.log('first:', firstResult);
console.log('second:', secondResult); // 93103 is too high // 93091 too low
console.log('time taken', end - start, 'ms');
