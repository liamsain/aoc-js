import { getAdventOfCodeData } from '../node-utils.js';
const start = performance.now();
const input = await getAdventOfCodeData(2023, 1);

let firstResult = 0;
let secondResult = 0;
const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const numStrMap = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
};

input.split('\n').forEach((line) => {
  {
    // first part
    let numStr = '';
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (!isNaN(char)) {
        numStr += char;
        break;
      }
    }
    for (let i = line.length - 1; i >= 0; i--) {
      const char = line[i];
      if (!isNaN(char)) {
        numStr += char;
        break;
      }
    }
    firstResult += parseInt(numStr);
  }
  {
    // second part
    const numsIndexes = [];
    nums.forEach((numStr) => {
      const index = line.indexOf(numStr);
      if (index !== -1) {
        numsIndexes.push({index, value: numStr});
      }
      const lastIndex = line.lastIndexOf(numStr);
      if (lastIndex !== -1 && lastIndex !== index) {
        numsIndexes.push({index: lastIndex, value: numStr});
      }
    });
    numsIndexes.sort((a, b) => a.index - b.index);
    let twoNumStr = '';
    const firstNumStr = numsIndexes[0].value;
    const lastNumStr = numsIndexes[numsIndexes.length - 1].value;
    if (firstNumStr.length === 1) {
      twoNumStr = firstNumStr;
    } else {
      twoNumStr = numStrMap[firstNumStr];
    }
    if (lastNumStr.length === 1) {
      twoNumStr += lastNumStr;
    } else {
      twoNumStr += numStrMap[lastNumStr];
    }
    secondResult += parseInt(twoNumStr);
  }
});
const end = performance.now();

console.log('first result', firstResult);
console.log('secondResult', secondResult)
console.log('time taken', end - start, 'ms');