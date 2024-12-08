import { getAdventOfCodeData } from '../node-utils.js';
import { simulateGuardSteps } from './helpers.js';
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


let part2 = 0;
let grid = [];
let visited = [];
input.split('\n').forEach(l => { 
  grid.push(l.split(''));
  
});
let y = grid.findIndex(l => l.includes('^'));
let x = grid[y].findIndex(ch => ch == '^');
visited.push([x, y]);
const res = simulateGuardSteps(grid, visited, true, x, y);


const part1 = res.visited.length;
visited = res.visited.slice(1, res.visited.length);

const numWorkers = os.cpus().length * 2;
const chunkSize = Math.ceil(visited.length / numWorkers);
let completedWorkers = 0;
for (let i = 0; i < numWorkers; i++) {
  const visitedChunk = visited.slice(i * chunkSize, (i + 1) * chunkSize);
  const worker = new Worker('./2024/6-worker.js');
  worker.postMessage({ grid, visited: visitedChunk, x, y });
  worker.on('message', res => {
    completedWorkers++;
    part2 += res;
    worker.terminate();
    if (completedWorkers == numWorkers) {
      const end = performance.now();
      console.log('part 1: ', part1);
      console.log('part 2: ', part2);
      console.log('time taken', end - start, 'ms');
    }
  });
}



