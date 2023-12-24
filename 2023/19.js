import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2023, 19);
const start = performance.now();


const end = performance.now();
console.log('time taken', end - start, 'ms');
    