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

function getOperandCombos(len = 3) {
  let res = [];
  let pos = 0;
  let amount = 0;
  const invertArr = arr => {
    let res = new Array(arr.length).fill('');
    for (let i = 0; i < arr.length; i++) {
      res[i] = arr[i] == '*' ? '+' : '*';
    }
    return res;
  }
  while (amount < Math.ceil((len + 1) / 2)) {
    let arr = Array(len).fill('*');
    let tmpAmount = 0;
    while (tmpAmount < amount) {
      arr[pos + tmpAmount] = '+';
      tmpAmount++;
    }
    res.push(arr);
    res.push(invertArr(arr))
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
  return res;
}

input.split('\n').forEach((line, lineIndex) => {
  const [testValStr, ...numsStr] = line.split(': ');
  const testVal = Number(testValStr);
  const nums = numsStr[0].split(' ').map(x => Number(x));

  const operandCombos = getOperandCombos(nums.length - 1);
  let testValFound = false;
  for (let i = 0; i < operandCombos.length; i++) {
    let res = nums[0];
    for (let numi = 1; numi < nums.length; numi++) {
      if (operandCombos[i][numi - 1] == '+') {
        res += nums[numi]
      } else {
        res *= nums[numi]
      }
    }
    // console.log(`nums: ${nums}, operands: ${operandCombos[i]}, result: ${res}`);

    if (res == testVal) {
      part1 += testVal;
      testValFound = true;
      break;
    }
  }
});


// 84758389664 too low

const end = performance.now();
console.log('part 1: ', part1);
console.log('time taken', end - start, 'ms');
