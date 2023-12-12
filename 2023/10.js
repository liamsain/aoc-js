import { getAdventOfCodeData } from '../utils.js';
const input = await getAdventOfCodeData(2023, 10);
const start = performance.now();
const lines = input.split('\n');
let startNode;
const nodeMap = [];

const Directions = {
  Up: 'up', 
  Down: 'down', 
  Left: 'left',
  Right: 'right'
};
lines.forEach((line, lineIndex) => {
  const nodeMapLine = [];
  line.split('').forEach((ch, chIndex) => {
    const n = { x: chIndex, y: lineIndex, ch, distance: null }
    nodeMapLine.push(n);
    if (ch == 'S') {
      startNode = n;
      startNode.distance = 0;
    }
  });
  nodeMap.push(nodeMapLine);
});

function nodeLookup (coords = [0, 0]) {
  return nodeMap[coords[1]][coords[0]];
}

function sourceCanMoveToTarget(src, t, direction) {
  if (direction == Directions.Up) {
    return (src == '|' || src == 'L' || src == 'J' || src == 'S') && (t == '|' || t == '7' || t == 'F');
  } else if (direction == Directions.Right) {
    return (src == '-' || src == 'L' || src == 'F' || src == 'S') && (t == '-' || t == 'J' || t == '7');
  } else if (direction == Directions.Down) {
    return (src == '|' || src == '7' || src == 'F' || src == 'S') && (t == '|' || t == 'L' || t == 'J');
  } else if (direction == Directions.Left) {
    return (src == '-' || src == 'J' || src == '7' || src == 'S') && (t == '-' || t == 'L' || t == 'F');
  }
  return false;
}

function getValidNeighbours(n) {
  const targets = [];
  if (n.x > 0) {
    targets.push({ n: nodeLookup([n.x - 1, n.y]), direction: Directions.Left});
  }
  if (n.x < nodeMap[0].length - 1) {
    targets.push({n: nodeLookup([n.x + 1, n.y]), direction: Directions.Right});
  }
  if (n.y > 0) {
    targets.push({ n: nodeLookup([n.x, n.y - 1]), direction: Directions.Up});
  }
  if (n.y < nodeMap.length - 1) {
    targets.push({ n: nodeLookup([n.x, n.y + 1]), direction: Directions.Down});
  }
  const result = targets.filter(t => sourceCanMoveToTarget(n.ch, t.n.ch, t.direction)).map(t => t.n);
  return result;
}
function drawNodeMap(cur) {
  const lines = [];
  nodeMap.forEach((line, y) => {
    let lineStr = '';
    line.forEach((node, x) => {
      if (node.distance == null) {
        lineStr += node.ch;
      } else {
        lineStr += node.distance;
      }
    });
    lines.push(lineStr);
  });
  console.clear();
  console.log(lines.join('\n'));
}

const q = [startNode];
let longestPath = 0;
while(q.length) {
  const currentNode = q.shift();
  const neighbours = getValidNeighbours(currentNode);
  for (let i = 0; i < neighbours.length; i++) {
    const n = neighbours[i];
    if (n.distance == null) {
      n.distance = currentNode.distance + 1;
      q.push(n);
    }
  }
  longestPath = currentNode.distance;
}
const end = performance.now();
console.log('first result:', longestPath) 
console.log('time taken', end - start, 'ms');
