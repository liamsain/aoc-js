import { getAdventOfCodeData } from '../node-utils.js';

const start = performance.now();
const input = await getAdventOfCodeData(2023, 8);

const lines = input.split('\n');
const directions = lines[0].split('');
let currentDirectionIndex = 0;
const directionsLength = directions.length;

const nodeLines = lines.slice(2);
let stepsTaken = 0;
let currentNodeIndex = nodeLines.findIndex(line => line.startsWith('AAA'));

// part 1
while(true) {
  const currentNodeSplit = nodeLines[currentNodeIndex].split(' ');
  const currentLocation = currentNodeSplit[0];
  if (currentLocation == 'ZZZ') {
    break;
  }
  stepsTaken += 1;
  const left = currentNodeSplit[2].substring(1, 4);
  const right = currentNodeSplit[3].substring(0, 3);

  const nextDirection = directions[currentDirectionIndex];
  if (nextDirection == 'L') {
    // lookup left in nodeLines
    currentNodeIndex = nodeLines.findIndex(line => line.startsWith(left));
  } else {
    // lookup right in nodeLines
    currentNodeIndex = nodeLines.findIndex(line => line.startsWith(right));
  }
  if (currentDirectionIndex == directionsLength - 1) {
    currentDirectionIndex = 0;
  } else {
    currentDirectionIndex += 1;
  }
}

// part 2
let currentNodes = nodeLines.filter(line => line.split(' ')[0].endsWith('A'));
const currentNodesSteps = [];
let stepsTakenPart2 = 0;
let currentDirectionIndexPart2 = 0;
currentNodes.forEach(node => {
  let nodeStepsTaken = 0;
  let currentNode = node;
  while(true) {
    const currentNodeSplit = currentNode.split(' ');
    if (currentNodeSplit[0].endsWith('Z')) {
      currentNodesSteps.push(nodeStepsTaken);
      currentDirectionIndexPart2 = 0;
      break;
    }
    nodeStepsTaken += 1;
    const left = currentNodeSplit[2].substring(1, 4);
    const right = currentNodeSplit[3].substring(0, 3);
    const nextDirection = directions[currentDirectionIndexPart2];
    let nextNode;
    if (nextDirection == 'L') {
      nextNode = nodeLines.find(line => line.startsWith(left));
    } else {
      nextNode = nodeLines.find(line => line.startsWith(right));
    }
    currentNode = nextNode;
    if (currentDirectionIndexPart2 == directionsLength - 1) {
      currentDirectionIndexPart2 = 0;
    } else {
      currentDirectionIndexPart2 += 1;
    }
  }
});
console.log(currentNodesSteps);
// slow brute force:
// while (true) {
//   if (currentNodes.every(line => line.split(' ')[0].endsWith('Z'))) {
//     break;
//   }
//   const newNodes = []
//   stepsTakenPart2 += 1;
//   if (stepsTakenPart2 % 100_000 == 0) {
//     console.log(stepsTakenPart2);
//   }

//   currentNodes.forEach(node => {
//     const currentNodeSplit = node.split(' ');
//     const left = currentNodeSplit[2].substring(1, 4);
//     const right = currentNodeSplit[3].substring(0, 3);
//     const nextDirection = directions[currentDirectionIndexPart2];
//     if (nextDirection == 'L') {
//       // lookup left in nodeLines
//       const nextNode = nodeLines.find(line => line.startsWith(left));
//       if (nextNode) {
//         newNodes.push(nextNode);
//       }
//     } else {
//       // lookup right in nodeLines
//       const nextNode = nodeLines.find(line => line.startsWith(right));
//       if (nextNode) {
//         newNodes.push(nextNode);
//       }
//     }
//   });
//   currentNodes = newNodes;

//   if (currentDirectionIndexPart2 == directionsLength - 1) {
//     currentDirectionIndexPart2 = 0;
//   } else {
//     currentDirectionIndexPart2 += 1;
//   }
 
// }

const end = performance.now();
console.log('1: ', stepsTaken)
console.log('2: ', stepsTakenPart2) // 22199 is too low
console.log('time taken', end - start, 'ms');
    