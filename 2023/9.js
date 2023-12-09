import { getAdventOfCodeData } from '../utils.js';
  const input = await getAdventOfCodeData(2023, 9);
  const start = performance.now();
  // code here

  const end = performance.now();
  console.log('time taken', end - start, 'ms');
    