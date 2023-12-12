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
const Directions = {
  Up: 'up', 
  Down: 'down', 
  Left: 'left',
  Right: 'right'
};
lines.forEach((line, lineIndex) => {
  const nodeMapLine = [];
  line.split('').forEach((ch, chIndex) => {
    nodeMapLine.push({ x: chIndex, y: lineIndex, ch });
  });
  nodeMap.push(nodeMapLine);
});

function nodeLookup (coords = [0, 0]) {
  return nodeMap[coords[1]][coords[0]];
}

function sourceCanMoveToTarget(src, t, direction) {
  const validTargets = [];
  if (src == NodeTypes.NorthSouth) {
    if (direction == Directions.Up) {
      validTargets.push(NodeTypes.NorthSouth);
      validTargets.push(NodeTypes.SouthWest);
      validTargets.push(NodeTypes.SouthEast);
    } else if (direction == Directions.Down) {
      validTargets.push(NodeTypes.NorthSouth);
      validTargets.push(NodeTypes.NorthWest);
      validTargets.push(NodeTypes.NorthEast);
    }
  } else if (src == NodeTypes.EastWest) {
    if (direction == Directions.Right) {
      validTargets.push(NodeTypes.EastWest);
      validTargets.push(NodeTypes.NorthWest);
      validTargets.push(NodeTypes.SouthWest);
    }
  }
  return validTargets.includes(t);
}

function getValidNeighbours(n) {
  const result = [];
  if (n.ch == NodeTypes.NorthSouth) {
    if (n.x > 0) {
      const above = nodeLookup([n.x, n.y]);
      if (above.ch == NodeTypes.NorthSouth ||
    }
  }

  return result;
}
const end = performance.now();
console.log('time taken', end - start, 'ms');
