import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2024, 5);

const start = performance.now();
const splitIn = input.split('\n\n');
const orderingRules = splitIn[0].split('\n').map(l => {
  const splitL = l.split('|');
  return [Number(splitL[0]), Number(splitL[1])];
});
let part1 = 0;
let part2 = 0;

function orderNums(nums) {
  let adjustmentMade = false;
  let checked = false;
  const clonedNums = [...nums];
  while (!checked || adjustmentMade) {
    adjustmentMade = false;
    checked = true;
    for (let i =0; i < clonedNums.length;i++) {
      const relevantOrderRules = orderingRules.filter(x => x[0] == clonedNums[i] || x[1] == clonedNums[i]);
      for (let ii = 0; ii < relevantOrderRules.length;ii++) {
        const first = relevantOrderRules[ii][0];
        const second = relevantOrderRules[ii][1];
        if (first == clonedNums[i]) {
          const beforeFirst = clonedNums.slice(0, i);
          const indy = beforeFirst.findIndex(x => x == second); 
          if (indy > -1) {
            const a = clonedNums[i];
            const b = clonedNums[indy];
            clonedNums[i] = b;
            clonedNums[indy] = a;
            adjustmentMade = true;
          }
        } else {
          const afterSecond = clonedNums.slice(i + 1, clonedNums.length);
          const indy = afterSecond.findIndex(x => x === first);
          if (indy > -1) {
            const a = clonedNums[i];
            const b = clonedNums[indy];
            clonedNums[i] = b;
            clonedNums[indy] = a;
            adjustmentMade = true;
          }
        }
      }
    }
  }
  return clonedNums;
}

function isCorrectOrder(nums) {
  let correctOrder = true;
  for (let i =0; i < nums.length;i++) {
    const relevantOrderRules = orderingRules.filter(x => x[0] == nums[i] || x[1] == nums[i]);
    for (let ii = 0; ii < relevantOrderRules.length;ii++) {
      const first = relevantOrderRules[ii][0];
      const second = relevantOrderRules[ii][1];
      if (first == nums[i]) {
        const beforeFirst = nums.slice(0, i);
        const indy = beforeFirst.findIndex(x => x == second); 
        if (indy > -1) {
          correctOrder = false;
          break;
        }
      } else {
        const afterSecond = nums.slice(i, nums.length);
        const indy = afterSecond.findIndex(x => x === first);
        if (indy > -1) {
          correctOrder = false;
          break;
        }
      }
    }
  }
  return correctOrder;
}

splitIn[1].split('\n').forEach((line, lineIndex) => {
  const nums = line.split(',').map(n => Number(n));

  if (isCorrectOrder(nums)) {
    const middleInd = Math.floor(nums.length / 2);
    part1 += nums[middleInd];
  }  else {
    const orderedNums = orderNums(nums);
    const middleInd = Math.floor(orderedNums.length / 2);
    part2 += orderedNums[middleInd];
  }
});


const end = performance.now();
console.log('part1: ', part1);
console.log('part2: ', part2);

console.log('time taken', end - start, 'ms');
    