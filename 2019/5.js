import { getAdventOfCodeData } from '../node-utils.js';
import IntCode from './IntCode.js';
const input = await getAdventOfCodeData(2019, 5);
const start = performance.now();
const nums = input.split(',').map(x => Number(x));

// const deleteMe = new IntCode([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], 8)

// debugger;
// deleteMe.compute();

const ic = new IntCode(nums, 1);
ic.compute();

const ic2 = new IntCode(nums, 5);
ic2.compute(); // 15110804 too high


const end = performance.now();
console.log('part1: ', ic.output);
console.log('part2: ', ic2.output);
const timeTaken = Math.round((end - start) * 1000) / 1000
console.log('time taken', timeTaken, 'ms');
    