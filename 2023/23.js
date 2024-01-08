import { getAdventOfCodeData } from '../node-utils.js';
import { NodeMap } from '../utils.js';
// const input = await getAdventOfCodeData(2023, 23);
const start = performance.now();
const input = `#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#`;
const nodeMap = new NodeMap({lines: input.split('\n')});
const pathLengths = []; 
const destNode = nodeMap.rows[nodeMap.rows.length - 1].find(n => n.ch == '.');
const startNode = nodeMap.rows[0].find(n => n.ch == '.');

let currentNode = startNode;
currentNode.distance = 0;
const q = [currentNode];

while(q.length) {
  currentNode = q.shift();
  if (currentNode.x == destNode.x && currentNode.y == destNode.y) {
    pathLengths.push(currentNode.distance);
    break;
  }
  const neighbours = nodeMap.getNodesAround(currentNode.x, currentNode.y).filter(x => x.ch !== '#');
  for (let el of neighbours) { 
    if (!el.distance) {
      q.push(el);
      el.distance = currentNode.distance + 1;
    }
  }
}


nodeMap.drawMap(n => {
  if (n.distance) {
    return 'O'
  } else {
    return n.ch;
  }

});


const end = performance.now();
console.log(pathLengths);
console.log('time taken', end - start, 'ms');