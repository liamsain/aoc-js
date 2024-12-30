import { getAdventOfCodeData } from '../node-utils.js';
import { Worker } from 'node:worker_threads';
import assert from 'node:assert'
import os from 'os';

const input = await getAdventOfCodeData(2024, 7);
const start = performance.now();

let part1 = 0;
let part2 = 0;
const opComboMap = {};
const part2Candidates = [];
for (let i = 1; i < 13;i++) {
  getOperatorCombosFromColumnNumber(i, 2);
  getOperatorCombosFromColumnNumber(i, 3);
}


input.split('\n').forEach((line, lineIndex) => {
  const splitLn = line.split(': ');
  const testVal = Number(splitLn[0]);

  const nums = splitLn[1].split(' ').map(x => Number(x));
  if (atLeastOneEquationMakesTestVal(nums, testVal)) {
    part1 += testVal;
  } else {
    part2Candidates.push({ nums, testVal });
  }
});

const numWorkers = os.cpus().length;
const chunkSize = Math.ceil(part2Candidates.length / numWorkers);
let completedWorkers = 0;
for (let i = 0; i < numWorkers; i++) {
  const chunk = part2Candidates.slice(i * chunkSize, (i + 1) * chunkSize);

  const worker = new Worker('./2024/7-worker.js');
  worker.postMessage({ candidates: chunk, comboMap: opComboMap });
  worker.on('message', res => {

    completedWorkers++;
    part2 += res;
    worker.terminate();
    if (completedWorkers == numWorkers) {
      const end = performance.now();
      assert(part1 == 267566105056);
      assert(part2 + part1 == 116094961956019)
      console.log('part 1: ', part1);
      console.log('part 2: ', part2 + part1);
      console.log('time taken', end - start, 'ms');
    }
  });
}

function getOperatorCombosFromColumnNumber(cols, base) {
  const mapKey = `${cols} ${base}`;
  if (opComboMap[mapKey]) {
    return opComboMap[mapKey];
  }
  const maxBaseStr = new Array(cols).fill(base - 1).join('');
  const max = parseInt(maxBaseStr, base);
  const combos = [];
  let curr = 0;
  const padding = maxBaseStr.length;
  while (curr <= max) {
    let str = curr.toString(base).padStart(padding, '0');
    combos.push(str);
    curr++;
  }
  opComboMap[mapKey] = combos;
  return combos;
}



export function atLeastOneEquationMakesTestVal(nums, testVal) {
  const operatorCombos = getOperatorCombosFromColumnNumber(nums.length - 1, 2);
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


