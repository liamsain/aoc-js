import { getAdventOfCodeData } from '../utils.js';
  const input = await getAdventOfCodeData(2022, 1);
  const start = performance.now();
  // code here

  const end = performance.now();
  console.log('time taken', end - start, 'ms');
    