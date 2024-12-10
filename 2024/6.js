import { getAdventOfCodeData } from '../node-utils.js';
import { simGuardStepsV2 } from './helpers.js';
import { Worker } from 'node:worker_threads';
import os from 'os';

const input = await getAdventOfCodeData(2024, 6);

// const input = `....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...`;


const start = performance.now();

let lineLength = 0;
while (true) {
  if (input[lineLength] === '\n') {
    break;
  }
  lineLength++;
}

// given x and y: return int8[(y * lineLength) + x]
// get y: Math.floor(i / lineLength)
// get x: i % lineLength
const inputLength = input.length;
const sharedBuffer = new SharedArrayBuffer(inputLength);
const buff = new Uint8Array(sharedBuffer);
let initialSqIndex = 0
let lastY = 0;
for (let i = 0; i < inputLength; i++) {
  const ch = input[i];
  if (ch === '#') {
    buff[i - lastY] = 1;
  } else if (ch === '^') {
    initialSqIndex = i - lastY;
  } else if (ch === '\n') {
    lastY++;
  }
}

let part2 = 0;
let visited = [];
// const x = initialSqIndex % lineLength;
// const y = Math.floor(initialSqIndex / lineLength);
const res = simGuardStepsV2(buff, true, initialSqIndex, lineLength, lastY);


visited = res.visited;
const part1 = visited.length + 1; // + 1 to account for initial cell

const numWorkers = os.cpus().length 
const chunkSize = Math.ceil(visited.length / numWorkers);
let completedWorkers = 0;
for (let i = 0; i < numWorkers; i++) {
  const visitedChunk = visited.slice(i * chunkSize, (i + 1) * chunkSize);
  const worker = new Worker('./2024/6-worker.js');
  worker.postMessage({ sharedBuffer, visited: visitedChunk, startIndex: initialSqIndex, lineLength, lastY });
  worker.on('message', res => {
    completedWorkers++;
    part2 += res;
    worker.terminate();
    if (completedWorkers === numWorkers) {
      const end = performance.now();
      console.log('part 1: ', part1);
      console.log('part 2: ', part2);
      console.log('time taken', end - start, 'ms');
    }
  });
}


