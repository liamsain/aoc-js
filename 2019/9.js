import { getAdventOfCodeData, logTime } from '../node-utils.js';
import IntCode from './IntCode.js';
const input = await getAdventOfCodeData(2019, 9);
// const input = `109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99`;
// const input = `1102,34915192,34915192,7,4,7,99,0`
// const input = `104,1125899906842624,99`;
const start = performance.now();
const nums = input.split(',').map(x => Number(x))
const ic = new IntCode(nums, [1]);
ic.compute();
const ic2 = new IntCode(nums, [2]);
ic2.compute();


const end = performance.now();
console.log('part1: ',  ic.output);
console.log('part2: ', ic2.output);
logTime(end - start);
    