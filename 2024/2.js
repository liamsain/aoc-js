import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2024, 2);
const start = performance.now();

let safeReports = 0;
let safeReportsWithProblemDampner = 0;

input.split('\n').forEach(l => {
  const nums = l.split(' ').map(x => Number(x));
  if (reportIsSafe(nums)) {
    safeReports += 1;
  } else {
    for (let i = 0; i < nums.length; i++) {
      const clonedNums = [...nums];
      clonedNums.splice(i, 1);
      if (reportIsSafe(clonedNums)) {
        safeReportsWithProblemDampner += 1;
        break;
      }
    }
  }
});

function reportIsSafe(nums) {
  let firstPairIncreases = nums[1] > nums[0];
  let safe = true;
  for (let i = 0; i < nums.length - 1; i++) {
    const currentPairIncreases = nums[i + 1] > nums[i];
    const currentPairDiff = Math.abs(nums[i + 1] - nums[i]);
    if (firstPairIncreases !== currentPairIncreases || currentPairDiff < 1 || currentPairDiff > 3) {
      safe = false;
    }
  }
  return safe;
}


const end = performance.now();
console.log('part 1: ', safeReports);
console.log('part 2: ', safeReports + safeReportsWithProblemDampner);
console.log('time taken', end - start, 'ms');
