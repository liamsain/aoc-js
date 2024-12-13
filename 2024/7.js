import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2024, 7);

const start = performance.now();
let part1 = 0;

const opComboMap = {};

input.split('\n').forEach((line, lineIndex) => {
  const splitLn = line.split(': ');
  const testVal = Number(splitLn[0]);

  const nums = splitLn[1].split(' ').map(x => Number(x));
  if (atLeastOneEquationMakesTestVal(nums, testVal)) {
    part1 += testVal;
  }
});
const end = performance.now();
console.log('part 1: ', part1);
console.log('time taken', end - start, 'ms');


export function getOperatorCombos(num) {
  if (opComboMap[num]) {
    return opComboMap[num];
  }
  let combos = [];
  let curr = 0;
  let max = 2 ** (num - 1);
  let padding = max.toString(2).length;
  while (curr < max) {
    let str = curr.toString(2).padStart(padding, '0');
    curr++;
    combos.push(str);
  }

  opComboMap[num] = combos;
  return combos;
}
export function atLeastOneEquationMakesTestVal(nums, testVal) {
  const operatorCombos = getOperatorCombos(nums.length - 1);
  let equationsAreTrue = false;
  for (let i = 0; i < operatorCombos.length; i++) {
    let res = nums[0];
    let res2 = nums[0];
    for (let numi = 1; numi < nums.length; numi++) {
      if (operatorCombos[i][numi - 1] == '0') {
        res += nums[numi]
        res2 *= nums[numi]
      } else {
        res *= nums[numi]
        res2 += nums[numi]
      }
    }

    if (res == testVal || res2 == testVal) {
      equationsAreTrue = true;
      break;
    }
  }
  return equationsAreTrue;
}


