import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2024, 9);
// const input = `2333133121414131402`;
const start = performance.now();

const arr = new Array(input.length * 5).fill('.');
let currentFileNumber = 0;
let currArrIndex = 0;
const fileRecords = [];
for (let i = 0; i < input.length; i++) {
  const num = Number(input[i]);
  if (i % 2 == 0) {
    fileRecords.push({fileNumber: currentFileNumber, startIndex: currArrIndex, size: num});
    arr.fill(currentFileNumber, currArrIndex, currArrIndex + num);
    currentFileNumber++;
  } else {
    arr.fill('.', currArrIndex, currArrIndex + num);
  }
  currArrIndex += num;
}
currArrIndex--;

let endIndex = currArrIndex;
let shouldLoop = true;

const part2Arr = [...arr];

while (shouldLoop) {
  for (let i = 0; i < currArrIndex; i++) {
    if (arr.slice(i, i + 10).every(x => x == '.')) {
      shouldLoop = false;
      break;
    }

    if (arr[i] == '.') {
      while (arr[endIndex] == '.') {
        endIndex--;
      }
      const tmp = arr[endIndex];
      arr[i] = tmp;
      arr[endIndex] = '.';
      endIndex--;
    }
  }
}
let part1 = 0;
for (let i = 0; i < arr.length;i++) {
  if (arr[i] == '.') {
    break;
  }
  part1 += i * arr[i];
}
for (let i = fileRecords.length - 1;i > 0;i--) {
  const fileRecord = fileRecords[i];
  for (let ii = 0; ii < fileRecord.startIndex;ii++) {
    if (part2Arr.slice(ii, ii + fileRecord.size).every(x => x == '.')) {
      part2Arr.fill('.', fileRecord.startIndex, fileRecord.startIndex + fileRecord.size);
      part2Arr.fill(fileRecord.fileNumber, ii, ii + fileRecord.size);
      break;
    }
  }
}
let part2 = 0;
for (let i = 0; i < part2Arr.length;i++) {
  if (part2Arr[i] !== '.') {
    part2 += i * part2Arr[i];
  }
}


const end = performance.now();
console.log('part 1: ', part1);
console.log('part 2: ', part2);
console.log('time taken', end - start, 'ms');
