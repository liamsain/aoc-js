import { getAdventOfCodeData } from '../node-utils.js';
// const input = await getAdventOfCodeData(2024, 7);
const input = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`
const start = performance.now();

input.split('\n').forEach(line => {
  const [expectedResStr, ...numsStr] = line.split(': ');
  const expectedRes = Number(expectedResStr);
  const nums = numsStr[0].split(' ').map(x => Number(x));

  for (let i = 0; i < nums.length - 1;i++) {

  }
  // 2 3 4 5

  // 2 * 3 * 4 * 5      
  // 2 + 3 + 4 + 5

  // 2 + 3 * 4 * 5
  // 2 * 3 + 4 + 5

  // 2 * 3 + 4 * 5
  // 2 + 3 * 4 + 5

  // 2 * 3 * 4 + 5
  // 2 + 3 + 4 * 5

  // 2 + 3 + 4 * 5
  // 2 * 3 * 4 + 5

  // 2 * 3 + 4 + 5
  // 2 + 3 * 4 * 5

  // 2 + 3 + 5 + 5
  // 2 * 3 * 4 * 5

  // 2 + 3 * 4 * 5      1 + at [0]
  // 2 * 3 + 4 * 5      1 + at [1]
  // 2 * 3 * 4 + 5      1 + at [2]
  // 2 + 3 + 4 * 5      2 + at [0]
  // 2 * 3 + 4 + 5      2 + at [1]
  // 2 + 3 + 4 + 5      3 + at [0]

  // 2 + 3 + 4 + 5      0 *         - exists
  // 2 * 3 + 4 + 5      1 * at [0]  - exists
  // 2 + 3 * 4 + 5      1 * at [1]   
  // 2 + 3 + 4 * 5      1 * at [2]  - exists
  // 2 * 3 * 4 + 5      2 * at [0]  - exists
  // 2 + 3 * 4 * 5      2 * at [1]  - exists
  // 2 * 3 * 4 * 5      3 * at [0]  - exists
});



const end = performance.now();
console.log('time taken', end - start, 'ms');
    