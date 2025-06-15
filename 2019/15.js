import { getAdventOfCodeData, logTime } from '../node-utils.js';
import IntCode from './IntCode.js';
const input = await getAdventOfCodeData(2019, 15);
const start = performance.now();
const nums = input.split(',').map(Number);
const ic = new IntCode(nums);

const hashMap = {'0,0': 1};
let currentCoord = [0, 0];
const directionsTaken = []; // LIFO. if you go east, push Dirs.E. Pop them when backtracking
const Dirs = { // numbers to give program
  N: 1,
  S: 2,
  W: 3,
  E: 4
}
const DirsReversed = {
  // useful for backtracking
  // e.g. popped Dirs.N off the list, so you need to go S
  1: Dirs.S,
  2: Dirs.N,
  3: Dirs.E,
  4: Dirs.W
};


function getPrevCoord(lastDirTaken, currentCoord) {
  // call this function when backtracking
  // e.g. if you last went east, this function will return the coord that is west
  const cc = currentCoord;
  if (lastDirTaken == Dirs.N) {
    return [cc[0], cc[1] - 1];
  } else if (lastDirTaken == Dirs.S) {
    return [cc[0], cc[1] + 1];
  } else if (lastDirTaken == Dirs.W) {
    return [cc[0] + 1, cc[1]]
  } else {
    return [cc[0] - 1, cc[1]]
  }
}
function getNeighbouringCoordsFromHash(coord) {
  const result = [];
  const key = `${coord[0]},${coord[1]}`;
  const coordData = hashMap[key];
  if (!coordData) {
    return result;
  }
}
function getNewCoord(cur, dir) {
  const result = [cur[0], cur[1]]
  if (dir == Dirs.N) {
    result[1] = result[1] + 1;
  } else if (dir == Dirs.S) {
    result[1] = result[1] - 1;
  } else if (dir == Dirs.W) {
    result[0] = result[0] - 1;
  } else {
    result[0] = result[0] + 1;
  }
  return result;
}
let backtracking = false;
const q = [1, 2, 3, 4];
while (c.length > 0) {
  debugger;
  const currentDir = q.pop();
  const coord = getNewCoord(coord, currentDir);
  const key = `${coord[0]},${coord[1]}`;
  ic.pushInputAndContinue([currentDir]);
  /* val = 0: wall, 1: floor, 2: oxygen system! */
  hashMap[key] = { visited: true, val: ic.lastOutput };
  if (ic.lastOutput == 2) {
    // found!
    console.log('found');
    break;
  } else if (ic.lastOutput == 1) {
    currentCoord = getNewCoord(currentCoord, currentDir);
    directionsTaken.push(currentDir);
    q.push(...[1,2,3,4]);
  } else {

  }

}
//     hashMap[key] = { 1: false, 2: false, 3: false, 4: false, val: 1, visited: true};




const end = performance.now();
logTime(end - start);
