import { simGuardStepsV2 } from './helpers.js';
import { parentPort } from 'node:worker_threads';

parentPort.on('message', (data) => {

  let res = 0;
  for (let i = 0; i < data.candidates.length;i++) {
    const curr = data.candidates[i];
    if (part2Fn(curr.nums, curr.testVal, data.comboMap)) {
      res += curr.testVal
    }
  }
  parentPort.postMessage(res);
});



function part2Fn(nums, testVal, comboMap) {
  const operatorCombos = comboMap[`${nums.length - 1} 3`].filter(x => x.includes('2'));
  let result = false;
  for (let i = 0; i < operatorCombos.length; i++) {
    let res = nums[0]
    let res2 = nums[0]
    let res3 = nums[0]
    for (let numi = 1; numi < nums.length; numi++) {
      const op = operatorCombos[i][numi - 1];
      const currStr = nums[numi].toString();
      if (op == '0') {
        res += nums[numi]
        res2 *= nums[numi]
        const res3Str = res3.toString();
        res3 = Number(res3Str + currStr);
      } else if (op == '1') {
        res *= nums[numi]
        const res2Str = res2.toString();
        res2 = Number(res2Str + currStr);
        res3 += nums[numi]

      } else {
        const resStr = res.toString();
        res = Number(resStr + currStr);
        res2 += nums[numi];
        res3 *= nums[numi];
      }
    }
    if (res == testVal || res2 == testVal || res3 == testVal) {
      result = true;
      break;
    }
  }
  return result;
}