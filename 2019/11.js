import { getAdventOfCodeData, logTime } from '../node-utils.js';
import IntCode from './IntCode.js';
const input = await getAdventOfCodeData(2019, 11);
const start = performance.now();
const nums = input.split(',').map(x => Number(x));

const currentCoord = [0, 0];
let facing = 0; // 0 up, 1 right, 2 down, 3 left
const dict = {};// k = `${x} ${y}`. value will be 0 for black, 1 for white

// if robot is over black panel, give input as 0 else input is 1
// program will first output value to paint current panel
// then it will output direction to move in
// paint current panel, then move in that dir



let part1 = 0;
const changeFacing = num => {
  if (num == 1) {
    facing = facing == 3 ? 0 : facing + 1;
  } else {
    facing = facing == 0 ? 3 : facing - 1;
  }
}
const moveCoords = () => {
  // + y is up!
  if (facing == 0) {
    currentCoord[1] += 1;
  } else if (facing == 1) {
    currentCoord[0] += 1;
  } else if (facing == 2) {
    currentCoord[1] -= 1;
  } else {
    currentCoord[0] -= 1;
  }

}
const ic = new IntCode(nums, [0]);
ic.compute();
while (!ic.halted) {
  // paint current tile
  let paintColour = ic.output[ic.output.length - 2];
  const key = `${currentCoord[0]} ${currentCoord[1]}`;
  dict[key] = paintColour;

  // move to next tile
  let dir = ic.output[ic.output.length - 1];
  changeFacing(dir);
  moveCoords();

  // get colour of new current tile
  const newTileKey = `${currentCoord[0]} ${currentCoord[1]}`;
  const input = dict[newTileKey] ? dict[newTileKey] : 0// default to 0 for black
  
  ic.pushInputAndContinue([input])
}
part1 = Object.keys(dict).length;


const end = performance.now();
logTime(end - start);
console.log('part1: ', part1);



