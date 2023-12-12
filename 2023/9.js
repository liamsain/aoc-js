import { getAdventOfCodeData } from '../utils.js';
const input = await getAdventOfCodeData(2023, 9);
let firstResult = 0;
let secondResult = 0;
// const input = '10 13 16 21 30 45';
const start = performance.now();
input.split('\n').forEach(line => {
  let currentArr = line.split(' ').map(x => parseInt(x));
  const arrHolder = [[...currentArr]];
  let nextArr = [];
  while (true) {
    const lastArr = arrHolder[arrHolder.length - 1];
    if (lastArr.every(el => el === lastArr[0])) {
      break;
    }
// <<<<<<< HEAD
//     for (let i = 0;i < lastArr.length - 1;i++) {
//       const result = lastArr[i + 1] - lastArr[i];
//       nextArr.push(result);
// =======
//     for (let i = arrHolder.length - 2; i >= 0;i--) {
//       const prev = arrHolder[i + 1];
//       const current = arrHolder[i];
//       current.push(current[current.length - 1] + prev[prev.length -1]);
// // >>>>>>> f48f711190f78dbf7961e95a1252a6d085d08eea
//     }
    // arrHolder.push([...nextArr]);
    // nextArr = []
  // }
  for (let i = arrHolder.length - 2; i >= 0;i--) {
    const prev = arrHolder[i + 1];
    const current = arrHolder[i];
    current.push(current[current.length - 1] + prev[prev.length -1]);
    current.unshift(current[0] - prev[0])
    
  }
  const firstArr = arrHolder[0];
  firstResult += firstArr[firstArr.length - 1];
  secondResult += firstArr[0];

}});

const end = performance.now();
console.log('first: ', firstResult);
console.log('second result', secondResult) // 21022 too high
console.log('time taken', end - start, 'ms');
  