import { getAdventOfCodeData } from '../node-utils.js';
import { NodeMap } from '../utils.js';
// const input = await getAdventOfCodeData(2023, 21);
const input = `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`;

const start = performance.now();

const nodeMap = new NodeMap({ lines: input.split('\n')});

function bfs() {
  const startNode = nodeMap.getNodeByChar('S');
  startNode.distance = 0;
  const q = [startNode];
  const maxSteps = 6;
  let total = 0;
  let currentNode;
  while(q.length) {
    nodeMap.drawMap();
    debugger;
    currentNode = q.shift();
    const neighbours = nodeMap.getNodesAround(currentNode.x, currentNode.y).filter(n => n.ch !== '#');
    if (neighbours[0].distance && neighbours[0].distance >= maxSteps) {
      break;
    }
    neighbours.forEach(n => {
      if (!n.distance) {
        n.distance = currentNode.distance + 1;
        n.ch = 'O';
        total += 1;
        q.push(n);
      }
    });

  }
  return total;
}

const end = performance.now();
console.log(bfs());
console.log('time taken', end - start, 'ms');
    