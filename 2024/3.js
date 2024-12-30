import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2024, 3);
// const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const start = performance.now();

let part1 = 0;
let part2 = 0;


let shouldMul = true;
for (let i = 0; i < input.length; i++) {
  let ch = input[i];
  switch (ch) {
    case 'm':
      if (input[i + 1] === 'u' && input[i + 2] === 'l' && input[i + 3] === '(') {
        i += 4;
        let firstNum = '';
        let secondNum = '';
        let firstSectionIsNum = false;
        let secondSectionIsNum = false;
        while (true) {
          if (!isNaN(input[i])) {
            firstNum += input[i];
            i++;
          } else if (input[i] === ',') {
            firstSectionIsNum = true;
            i++;
            break;
          } else {
            break;
          }
        }
        if (firstSectionIsNum) {
          while (true) {
            if (!isNaN(input[i])) {
              secondNum += input[i];
              i++;
            } else if (input[i] === ')') {
              secondSectionIsNum = true;
              break;
            } else {
              break;
            }
          }
        }
        if (firstSectionIsNum && secondSectionIsNum) {
          const mulled = (firstNum * secondNum);
          part1 += mulled;
          if (shouldMul) {
            part2 += mulled;
          }
        }
      }
      break;
    case 'd':
      if (input[i + 1] === 'o') {
        if (input[i + 2] === '(' && input[i + 3] === ')') {
          i+= 3;
          shouldMul = true;
        } else if (input[i + 2] === 'n' && input[i + 3] === '\'' && input[i + 4] === 't' && input[i + 5] === '(' && input[i + 6] === ')') {
          shouldMul = false;
          i+=6;
        }
      }
      break;

    default:
      break;
  }

}

const end = performance.now();
console.log('part 1:', part1);
console.log('part 2:', part2);
console.log('time taken', Math.ceil(end - start), 'ms');
