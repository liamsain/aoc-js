import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2024, 7);
import { Worker } from 'node:worker_threads';
import os from 'os';
// const input = `190: 10 19
// 3267: 81 40 27
// 83: 17 5
// 156: 15 6
// 7290: 6 8 6 15
// 161011: 16 10 13
// 192: 17 8 14
// 21037: 9 7 18 13
// 292: 11 6 16 20`;

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
    let combo = new Array(str.length).fill('');
    let combo2 = new Array(str.length).fill('');
    for (let i = 0; i < str.length; i++) {
      combo[i] = str[i] == '0' ? '*' : '+'
      combo2[i] = str[i] == '1' ? '*' : '+'
    }
    combos.push(combo.join(''));
    combos.push(combo2.join(''));
    curr += 1;
  }
  opComboMap[num] = combos;
  return combos;
}
export function atLeastOneEquationMakesTestVal(nums, testVal) {
  const operatorCombos = getOperatorCombos(nums.length - 1);
  let equationsAreTrue = false;
  for (let i = 0; i < operatorCombos.length; i++) {
    let res = nums[0];
    for (let numi = 1; numi < nums.length; numi++) {
      if (operatorCombos[i][numi - 1] == '+') {
        res += nums[numi]
      } else {
        res *= nums[numi]
      }
    }

    if (res == testVal) {
      equationsAreTrue = true;
      break;
    }
  }
  return equationsAreTrue;
}


