import { getAdventOfCodeData } from '../node-utils.js';
import IntCode from './IntCode.js';
const input = await getAdventOfCodeData(2019, 7);
// const input = `3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0`;
// const input = `3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0`
const start = performance.now();

function allCharsAreUnique(str) {
  let obj = {};
  let result = true;
  for (let i = 0; i < str.length;i++) {
    if (obj[str[i]]) {
      result = false;
      break;
    } else {
      obj[str[i]] = true;
    }
  }
  return result;
}
let part1 = -Infinity;
const ints = input.split(',').map(x => Number(x));

const base = 5;
const max = parseInt('44444', base);
for (let i = 0; i < max;i++) {
  const phaseSettings = i.toString(base).padStart(5, '0');
  if (!allCharsAreUnique(phaseSettings)) {
    continue;
  }

  const ampAInput = [Number(phaseSettings[0]), 0];
  const ampAIC = new IntCode(ints, ampAInput);
  ampAIC.compute();

  const ampBInput = [Number(phaseSettings[1]), ampAIC.output[0]];
  const ampBIC = new IntCode(ints, ampBInput);
  ampBIC.compute();

  const ampCInput = [Number(phaseSettings[2]), ampBIC.output[0]];
  const ampCIC = new IntCode(ints, ampCInput);
  ampCIC.compute();

  const ampDInput = [Number(phaseSettings[3]), ampCIC.output[0]];
  const ampDIC = new IntCode(ints, ampDInput);
  ampDIC.compute();

  const ampEInput = [Number(phaseSettings[4]), ampDIC.output[0]];
  const ampEIC = new IntCode(ints, ampEInput);
  ampEIC.compute();
  const eOutput = ampEIC.output[0];
  if (eOutput > part1) {
    part1 = eOutput;
  }
}

const end = performance.now();
console.log('part1: ', part1);
const timeTaken = Math.round((end - start) * 1000) / 1000
console.log('time taken', timeTaken, 'ms');
    