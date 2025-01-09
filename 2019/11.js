import { getAdventOfCodeData, logTime } from '../node-utils.js';
import IntCode from './IntCode.js';
const input = await getAdventOfCodeData(2019, 11);

const start = performance.now();

const nums = input.split(',').map(x => Number(x));
let part1 = 0;

function runProgram(input = [], dict = {}) {
  // const dict = {};// k = `${x} ${y}`. value will be 0 for black, 1 for white
  let lowestx = 0;
  let highesty = 0;
  const currentCoord = [0, 0];
  let facing = 0; // 0 up, 1 right, 2 down, 3 left
  const changeFacing = (num, currentFacing) => {
    let result = 0;
    if (num == 1) {
      result = currentFacing == 3 ? 0 : currentFacing + 1;
    } else {
      result = currentFacing == 0 ? 3 : currentFacing - 1;
    }
    return result
  }
  const moveCoords = (currentFacing, currentCoords) => {
    const result = [...currentCoords];
    // + y is up!
    if (currentFacing == 0) {
      result[1] += 1;
    } else if (currentFacing == 1) {
      result[0] += 1;
    } else if (currentFacing == 2) {
      result[1] -= 1;
    } else {
      result[0] -= 1;
    }
    return result;
  }
  const initialArg = dict['0 0'] == 1 ? 1 : 0;
  const ic = new IntCode(nums, [initialArg]);
  ic.compute();
  while (!ic.halted) {
    // paint current tile
    const paintColour = ic.output[ic.output.length - 2];
    const key = `${currentCoord[0]} ${currentCoord[1]}`;
    dict[key] = paintColour;

    // move to next tile
    let dir = ic.output[ic.output.length - 1];
    facing = changeFacing(dir, facing);
    const newCoords = moveCoords(facing, currentCoord);
    currentCoord[0] = newCoords[0];
    currentCoord[1] = newCoords[1];
    if (currentCoord[0] < lowestx) {
      lowestx = currentCoord[0]
    }
    if (currentCoord[1] > highesty) {
      highesty = currentCoord[1]
    }

    // get colour of new current tile
    const newTileKey = `${currentCoord[0]} ${currentCoord[1]}`;
    const input = dict[newTileKey] ? dict[newTileKey] : 0// default to 0 for black

    ic.pushInputAndContinue([input])
  }
  return { dict, lowestx, highesty };
}
const result = runProgram([0]);
part1 = Object.keys(result.dict).length;

const part2Dict = {};
part2Dict['0 0'] = 1;
const result2 = runProgram([1], part2Dict);
let str = '';
for (let y = result2.highesty;y > (result2.highesty - 6);y--) {
  let rowStr = '';
  for (let x = result2.lowestx; x < (result2.lowestx + 42);x++) {
    const key = `${x} ${y}`;
    let ch = '';
    if (result2.dict[key] == 0) {
      ch = '.';
    } else if (result2.dict[key] == 1) {
      ch = '#';
    } else {
      ch = '.';
    }
    rowStr += ch;
  }
  str += rowStr;
  str += '\n';
}
console.log(str);



const end = performance.now();
logTime(end - start);
console.log('part1: ', part1);



