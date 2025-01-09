import { getAdventOfCodeData, logTime } from '../node-utils.js';
import IntCode from './IntCode.js';
const input = await getAdventOfCodeData(2019, 9);

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
    