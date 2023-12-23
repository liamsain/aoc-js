import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2023, 15);
// const input ='rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7';
const start = performance.now();
const entries = input.split(',')

function calcHashOfString(str) {
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i);
    result *= 17;
    result %= 256;
  }
  return result;
}
const firstResult = entries.reduce((acc, cur) => acc + calcHashOfString(cur), 0);


const end = performance.now();
console.log(firstResult)
console.log('time taken', end - start, 'ms');
    