import { getAdventOfCodeData } from '../utils.js';
  const input = await getAdventOfCodeData(2020, 5);
  const start = performance.now();
  // code here

  const end = performance.now();
  console.log('time taken', end - start, 'ms');
    