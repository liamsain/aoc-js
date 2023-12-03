import { getAdventOfCodeData } from '../utils.js';

const isNumber = v => !isNaN(v);
const t = process.hrtime();
const input = await getAdventOfCodeData(2023, 3);
let part1Result = 0;
let part2Result = 0;
const lines = input.split('\n');
const lineLength = lines[0].length;
lines.forEach((line, lineIndex) => {
  {
    // part 1
    let readingNum = false;
    let numStr = ''
    let numStrStartIndex = 0;

    line.split('').forEach((ch, chIndex) => {
      if (isNaN(ch)) {
        if (readingNum) {
          // end of number reached. do checks!
          readingNum = false;
          const endIndex = chIndex - 1;
          if (numIsPartNum(numStrStartIndex, endIndex, lineIndex)) {
            part1Result += parseInt(numStr);
          }
          numStrStartIndex = 0;
          numStr = '';
        }
      } else {
        if (!readingNum) {
          readingNum = true;
          numStrStartIndex = chIndex;
        }
        numStr += ch;
      }
      if (chIndex == lineLength - 1) {
        // end of line reached, check for number
        if (readingNum) {
          const endIndex = chIndex;
          if (numIsPartNum(numStrStartIndex, endIndex, lineIndex)) {
            part1Result += parseInt(numStr);
          }
        }
      }
    });
  }
  {
    // part 2
    for (let i = 0; i < lineLength; i++) {
      if (line[i] == '*') {
        debugger;
        const numberStrings = [];
        const lineAbove = lines[lineIndex - 1];
        const lineBelow = lines[lineIndex + 1];
        const leftChar = line[i - 1];
        const rightChar = line[i + 1];
        const getNumberStringsFromLine = line => {
          const result = [];
          if (!line) {
            return result;
          }
          const leftChar = line[i - 1];
          const midChar = line[i];
          const rightChar = line[i + 1];
          let currentStr = '';

          if (isNumber(leftChar)) {
            for (let j = i - 1; j >= 0; j--) {
              // go back until non number found
              if (isNumber(line[j])) {
                currentStr = line[j] + currentStr;
              } else {
                break;
              }
            }
          }
          if (isNumber(midChar)) {
            currentStr += midChar;
          } else {
            if (currentStr.length > 0) {
              result.push(currentStr);
              currentStr = '';
            }
          }
          if (isNumber(rightChar)) {
            // go forward until non number found
            for (let j = i + 1; j < lineLength;j++) {
              if (isNumber(line[j])) {
                currentStr += line[j];
              } else {
                break;
              }
            }
            result.push(currentStr);
            currentStr = '';
          } else {
            if (currentStr.length > 0) {
              result.push(currentStr);
              currentStr = '';
            }
          }
          return result;
        }
        numberStrings.push(...getNumberStringsFromLine(lineAbove));
        numberStrings.push(...getNumberStringsFromLine(lineBelow));
        if (isNumber(leftChar)) {
          let leftNumStr = '';
          for (let j = i - 1; j >= 0;j--) {
            if (isNumber(line[j])) {
              leftNumStr = line[j] + leftNumStr;
            } else {
              break;
            }
          }
          numberStrings.push(leftNumStr);
        }
        if (isNumber(rightChar)) {
          let rightNumStr = '';
          for (let j = i + 1; j < lineLength;j++) {
            if (isNumber(line[j])) {
              rightNumStr += line[j];
            } else {
              break;
            }
          }
          numberStrings.push(rightNumStr);
        }
        if (numberStrings.length == 2) {
          part2Result += (parseInt(numberStrings[0]) * parseInt(numberStrings[1]));
        }
      }
    }
  }
});
function numIsPartNum(startIndex, endIndex, lineIndex) {
  const line = lines[lineIndex];
  const lineAbove = lines[lineIndex - 1];
  const lineBelow = lines[lineIndex + 1];
  const leftCh = line[startIndex - 1];
  const rightCh = line[endIndex + 1];
  const strContainsSymbol = str => {
    let result = false;
    for (let i = 0; i < str.length; i++) {
      if (str[i] !== '.' && isNaN(str[i])) {
        result = true;
        break;
      }
    }
    return result;
  };

  if (lineAbove) {
    const subStr = lineAbove.substring(startIndex - 1, endIndex + 2);
    if (strContainsSymbol(subStr)) {
      return true;
    }
  }
  if (leftCh !== undefined && isNaN(leftCh) && leftCh !== '.') {
    return true;
  }
  if (rightCh !== undefined && isNaN(rightCh) && rightCh !== '.') {
    return true;
  }
  if (lineBelow) {
    const subStr = lineBelow.substring(startIndex - 1, endIndex + 2);
    if (strContainsSymbol(subStr)) {
      return true;
    }
  }

  return false;
}


console.log('part 1 result: ', part1Result);
console.log('part 2 result: ', part2Result);
// 470349886171 too high
const t1 = process.hrtime(t);
console.log("%d milliseconds", t1[1] / 1000000);

