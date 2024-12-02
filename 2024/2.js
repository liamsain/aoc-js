import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2024, 2);
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

input.split('\n').forEach(l => {
  const nums = l.split(' ').map(x => Number(x));
  let firstPairIncreases = nums[1] > nums[0];

  let safe = true;
  let repaired = false;
  for (let i = 0; i < nums.length - 1; i++) {
    const currentPairIncreases = nums[i + 1] > nums[i];
    const currentPairDiff = Math.abs(nums[i + 1] - nums[i]);

    if (firstPairIncreases !== currentPairIncreases || currentPairDiff < 1 || currentPairDiff > 3) {
      if (safe) {
        let clonedNums = [...nums];
        clonedNums.splice(i, 1);
        if (reportIsSafe(clonedNums)) {
          repaired = true;
        } else {
          clonedNums = [...nums];
          clonedNums.splice(i + 1, 1);
          if (reportIsSafe(clonedNums)) {
            repaired = true;
          }
          if (!repaired && i === 1) {
            clonedNums = [...nums];
            clonedNums.splice(0, 1);
            if (reportIsSafe(clonedNums)) {
              repaired = true;
            }

          }
        }
      }
      safe = false;
    }

  }
  if (safe) {
    safeReports += 1;
  }
  if (repaired) {
    safeReportsWithProblemDampner += 1;
  }
});



const end = performance.now();
console.log('part 1: ', safeReports);
console.log('part 2: ', safeReports + safeReportsWithProblemDampner);
console.log('time taken', end - start, 'ms');
