import { getAdventOfCodeData, logTime } from '../node-utils.js';
const input = await getAdventOfCodeData(2019, 2);
import IntCode from './IntCode.js';

const start = performance.now();
let part2 = 0;
const ints = input.split(',').map(x => Number(x));
const p1IntCode = new IntCode(ints);
p1IntCode.ints[1] = 12;
p1IntCode.ints[2] = 2;
p1IntCode.compute();

const expectedOutput = 19690720;
let foundExpected = false;
let p2IntCode = new IntCode(ints);
for (let noun = 99; noun > 0; noun -= 1) {
  for (let verb = 99; verb > 0; verb -= 1) {
    p2IntCode.ints[1] = noun;
    p2IntCode.ints[2] = verb;
    p2IntCode.compute();
    foundExpected = expectedOutput === p2IntCode.ints[0];
    if (foundExpected) {
      part2 = 100 * noun + verb;
      break;
    } 
    p2IntCode = new IntCode(ints);
  }
  if (foundExpected) {
    break;
  }
}

const end = performance.now();
logTime(end - start);
console.log('part1: ', p1IntCode.ints[0]);
console.log('part2: ', part2);
