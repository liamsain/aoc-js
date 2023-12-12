import { getAdventOfCodeData } from '../utils.js';
const input = await getAdventOfCodeData(2023, 10);
const start = performance.now();
const lines = input.split('\n');
const nodeMap = [];
// nodeTypes: ns, ew, ne, nw, sw, se, g, s
const NodeTypes = {
  NorthSouth: '|',
  EastWest: '-',
  NorthEast: 'L',
  NorthWest: 'J',
  SouthWest: '7',
  SouthEast: 'F',
  Ground: '.',
  Start: 'S',
};
lines.forEach((line, lineIndex) => {
  const nodeMapLine = [];
  line.split('').forEach((ch, chIndex) => {
    nodeMapLine.push({ x: chIndex, y: lineIndex, ch });
  });
  nodeMap.push(nodeMapLine);
});

function getValidNeighbours(coord) {
  const result = [];
  const currentNode = nodeMap[coord[1]][coord[0]]


  return result;
}
const end = performance.now();
console.log('time taken', end - start, 'ms');
