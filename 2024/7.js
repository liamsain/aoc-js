import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2024, 7);
// const input = `190: 10 19
// 3267: 81 40 27
// 83: 17 5
// 156: 15 6
// 7290: 6 8 6 15
// 161011: 16 10 13
// 192: 17 8 14
// 21037: 9 7 18 13
// 292: 11 6 16 20`
const start = performance.now();
let part1 = 0;
const opComboMap = {};

export function getOperatorCombos(len = 3) {
  if (opComboMap[len]) {
    return opComboMap[len];
  }
  let res = [];
  let pos = 0;
  let amount = 0;
  const opMap = {};
  const invertArr = arr => {
    let res = new Array(arr.length).fill('');
    for (let i = 0; i < arr.length; i++) {
      res[i] = arr[i] == '*' ? '+' : '*';
    }
    return res.join('');;
  }
  while (amount < len) {
    let arr = Array(len).fill('*');
    let tmpAmount = 0;
    while (tmpAmount < amount) {
      arr[pos + tmpAmount] = '+';
      tmpAmount++;
    }
    const str = arr.join('');
    if (!opMap[str]) {
      res.push(str);
      opMap[str] = true;
    }
    if (amount == 0) {
      amount++;
      continue;
    }
    if (amount + pos == len) {
      pos = 0;
      amount++;
    } else {
      pos++;
    }
  }
  const inverts = [];
  for (const x of res) {
    const inverted = invertArr(x);
    if (!opMap[inverted]) {
      inverts.push(invertArr(x))
      opMap[inverted] = true
    }
  }
  res.push(...inverts);
  opComboMap[len] = res;

  return res;
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

input.split('\n').forEach((line, lineIndex) => {
  const splitLn = line.split(': ');
  const testVal = Number(splitLn[0]);
  const nums = splitLn[1].split(' ').map(x => Number(x));
  // console.log(lineIndex + 1, ':', testVal, ':', nums)
  if (atLeastOneEquationMakesTestVal(nums, testVal)) {
    part1 += testVal;
  }

});


// 162824468978 too low

const end = performance.now();
console.log('part 1: ', part1);
console.log('time taken', end - start, 'ms');
