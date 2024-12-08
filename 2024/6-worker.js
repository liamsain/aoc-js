import { simulateGuardSteps } from './helpers.js';
import { parentPort } from 'node:worker_threads';
parentPort.on('message', (data) => {
  // data: {grid, visited, x, y}
  
  let prevVisited = [];
  let res = 0;
  for (let i = 0; i < data.visited.length; i++) {
    const curr = data.visited[i];
    if (prevVisited.length) {
      data.grid[prevVisited[1]][prevVisited[0]] = '.';
    }
      data.grid[curr[1]][curr[0]] = '#';
      prevVisited = [curr[0], curr[1]];
      const localRes = simulateGuardSteps(data.grid, data.visited, false, data.x, data.y);
      if (localRes.hesStuck) {
        res += 1;
      }

  }

  parentPort.postMessage(res);
});