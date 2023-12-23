import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2022, 12);
// const input = `Sabqponm
// abcryxxl
// accszExk
// acctuvwj
// abdefghi`;
const start = performance.now();
const nodeMap = [];
let startNode;
let endNode;

input.split('\n').forEach((line, y) => {
  const nodeLine = [];
  line.split('').forEach((ch, x) => {
    let node = {ch, distance: null, x, y };
    if (ch == 'S') {
      node.ch = 'a';
      node.distance = 0;
      startNode = node;
    } else if (ch == 'E') {
      endNode = node;
    }
    nodeLine.push(node);
  });
  nodeMap.push(nodeLine);
}); 

function drawNodeMap(curNode) {
  const lines = [];
  nodeMap.forEach(line => {
    let lineStr = '';
    line.forEach(node => {
      if (node.x == curNode.x && node.y == curNode.y) {
        lineStr += 'C';
      } else if (node.distance == null) {
        lineStr += node.ch;
      } else {
        lineStr += 'X';
        // lineStr += node.distance;
      }
    });
    lines.push(lineStr);
  });
  console.clear();
  console.log(lines.join('\n'));
}

function getValidNeighbours  (x, y)  {
  const currentChar = nodeMap[y][x].ch;
  const atZ = nodeMap[y][x].ch == 'z';
  const neighbours = [];
  const diffChars = (src, target) => target.charCodeAt(0) - src.charCodeAt(0);
  if (x > 0) {
    const left = nodeMap[y][x - 1];
    const charCodeDiff = diffChars(currentChar, left.ch);
    if (charCodeDiff <= 1) {
      neighbours.push(left);
    }
  }
  if (x < nodeMap[0].length - 1) {
    const right = nodeMap[y][x + 1];
    const charCodeDiff = diffChars(currentChar, right.ch);
    if (charCodeDiff <= 1) {
      neighbours.push(right);
    }
  }
  if (y > 0) {
    const up = nodeMap[y - 1][x];
    const charCodeDiff = diffChars(currentChar, up.ch);
    if (charCodeDiff <= 1) {
      neighbours.push(up);
    }
  }
  if (y < nodeMap.length - 1) {
    const down = nodeMap[y + 1][x];
    const charCodeDiff = diffChars(currentChar, down.ch);
    if (charCodeDiff <= 1) {
      neighbours.push(down);
    }
  }
  const endNodeFound = neighbours.find(n => n.ch == endNode.ch);
  if (endNodeFound && !atZ) {
    return neighbours.filter(n => n.ch !== endNode.ch && n.ch !== startNode.ch);
  }
  return neighbours;
}


const q = [startNode];
while (q.length > 0) {
  const currentNode = q.shift();
  if (currentNode.ch == endNode.ch) {
    console.log(currentNode.distance);
    break;
  }
  // await(delay(0.1));
  // drawNodeMap(currentNode);
  const neighbours = getValidNeighbours(currentNode.x, currentNode.y);
  neighbours.forEach(neighbour => {
    if (neighbour.distance == null) {
      neighbour.distance = currentNode.distance + 1;
      q.push(neighbour);
    }
  });
}

// 530 too high. tried 529. also too high. 528 is correct. still getting 530 from this code
const end = performance.now();
console.log('time taken', end - start, 'ms');
    
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
} 