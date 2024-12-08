import { simGuardStepsV2 } from './helpers.js';
import { parentPort } from 'node:worker_threads';
parentPort.on('message', (data) => {
  // data: {grid, visited, x, y}

  let res = 0;
  for (let i = 0; i < data.visited.length;i++) {
    const buff = new Uint8Array(data.sharedBuffer);
    const localRes = simGuardStepsV2(buff, false, data.startIndex, data.lineLength, data.lastY, data.visited[i]);
    if (localRes.hesStuck) {
      res += 1;
    }
  }


  parentPort.postMessage(res);
});