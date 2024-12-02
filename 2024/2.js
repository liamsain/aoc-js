import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2024, 2);
// const input = `7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9`;
const start = performance.now();

let safeReports = 0;
let safeReportsWithProblemDampner = 0;
function reportIsSafe(nums) {
  let firstPairIncreases = nums[1] > nums[0];
  let firstPairDiff = Math.abs(nums[0] - nums[1]);

  let safe = firstPairDiff >= 1 && firstPairDiff <= 3;
  if (safe) {
    for (let i = 2; i < nums.length; i++) {
      const currentPairIncreases = nums[i] > nums[i - 1];
      const currentPairDiff = Math.abs(nums[i] - nums[i - 1]);
      if (firstPairIncreases !== currentPairIncreases) {
        safe = false;
      }
      if (currentPairDiff < 1 || currentPairDiff > 3) {
        safe = false;
      }
    }
  }
  return safe;
}
const pair = {first: 1, next: 3, diff: 2, increases: true }
input.split('\n').forEach(l => {
  const nums = l.split(' ').map(x => Number(x));
  let firstPairIncreases = nums[1] > nums[0];

  let safe = true;
  for (let i = 1; i < nums.length; i++) {
    const currentPairIncreases = nums[i] > nums[i - 1];
    const currentPairDiff = Math.abs(nums[i] - nums[i - 1]);
    if (firstPairIncreases !== currentPairIncreases) {
      safe = false;
    }
    if (currentPairDiff < 1 || currentPairDiff > 3) {
      safe = false;
    }

  }
  if (safe) {
    safeReports += 1;
  }
});



const end = performance.now();
console.log('part 1: ', safeReports);
console.log('part 2: ', safeReports + safeReportsWithProblemDampner);
console.log('time taken', end - start, 'ms');
