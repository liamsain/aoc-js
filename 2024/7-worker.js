import { parentPort } from 'node:worker_threads';
parentPort.on('message', (data) => {

  let res = 0;
  for (let i = 0; i < data.lines.length; i++) {
    const splitLn = data.lines[i].split(': ');
    const testVal = Number(splitLn[0]);

    const nums = splitLn[1].split(' ').map(x => Number(x));
    if (atLeastOneEquationMakesTestVal(nums, testVal)) {
      res += testVal;
    }
  }

  parentPort.postMessage(res);
});
const opComboMap = {};

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