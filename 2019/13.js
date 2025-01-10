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

const end = performance.now();
console.log(blockCount);
logTime(end - start);
    