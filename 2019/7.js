import { getAdventOfCodeData, logTime } from '../node-utils.js';
import IntCode from './IntCode.js';
const input = await getAdventOfCodeData(2019, 7);
const start = performance.now();
let part1 = -Infinity;
let part2 = -Infinity;
const ints = input.split(',').map(x => Number(x));

function allCharsAreUnique(str) {
  let obj = {};
  let result = true;
  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]]) {
      result = false;
      break;
    } else {
      obj[str[i]] = true;
    }
  }
  return result;
}

const base = 5;
const max = parseInt('44444', base);
for (let i = 0; i < max; i++) {
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

for (let i = 0; i < max; i++) {
  const ampStates = [0, 0, 0, 0, 0]; // 1 for halted
  let phaseSettings = i.toString(base).padStart(5, '0');
  if (!allCharsAreUnique(phaseSettings)) {
    continue;
  }
  phaseSettings = phaseSettings.split('').map(x => Number(x) + 5).join('');

  let lastOutput = 0;
  const ampAInput = [Number(phaseSettings[0]), 0];
  const ampA = new IntCode(ints, ampAInput);
  ampA.compute();
  if (ampA.halted) {
    ampStates[0] = 1;
  }

  const ampBInput = [Number(phaseSettings[1]), ampA.output[0]];
  const ampB = new IntCode(ints, ampBInput);
  ampB.compute();
  if (ampB.halted) {
    ampStates[1] = 1;
  }

  const ampCInput = [Number(phaseSettings[2]), ampB.output[0]];
  const ampC = new IntCode(ints, ampCInput);
  ampC.compute();
  if (ampC.halted) {
    ampStates[2] = 1;
  }

  const ampDInput = [Number(phaseSettings[3]), ampC.output[0]];
  const ampD = new IntCode(ints, ampDInput);
  ampD.compute();
  if (ampD.halted) {
    ampStates[3] = 1;
  }

  const ampEInput = [Number(phaseSettings[4]), ampD.output[0]];
  const ampE = new IntCode(ints, ampEInput);
  ampE.compute();
  if (ampE.halted) {
    ampStates[4] = 1;
  }

  lastOutput = ampE.output[0];
  while (ampStates.some(x => x == 0)) {
    if (ampA.halted) {
      ampStates[0] = 1;
    } else {
      ampA.pushInputAndContinue([lastOutput]);
      lastOutput = ampA.lastOutput;
    }
    if (ampB.halted) {
      ampStates[1] = 1;
    } else {
      ampB.pushInputAndContinue([lastOutput]);
      lastOutput = ampB.lastOutput;
    }
    if (ampC.halted) {
      ampStates[2] = 1;
    } else {
      ampC.pushInputAndContinue([lastOutput]);
      lastOutput = ampC.lastOutput;
    }
    if (ampD.halted) {
      ampStates[3] = 1;
    } else {
      ampD.pushInputAndContinue([lastOutput]);
      lastOutput = ampD.lastOutput;
    }
    if (ampE.halted) {
      ampStates[4] = 1;
    } else {
      ampE.pushInputAndContinue([lastOutput]);
      lastOutput = ampE.lastOutput;
    }
  }
  if (lastOutput > part2) {
    part2 = lastOutput;
  }

}

const end = performance.now();
console.log('part1: ', part1);
console.log('part2: ', part2);
logTime(end - start);
