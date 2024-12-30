import { getAdventOfCodeData } from '../node-utils.js';
// const input = await getAdventOfCodeData(2019, 3);
// const input = `R75,D30,R83,U83,L12,D49,R71,U7,L72
// U62,R66,U55,R34,D71,R55,D58,R83`

const input = `R8,U5,L5,D3
U7,R6,D4,L4`;
const start = performance.now();
let part1 = Infinity;
function getIntersectingLinesManhattanDistance(p1Origin = [], p1Dest = [], p2Origin = [], p2Dest = []) {
  // todo: check if this works when x or y is negative
  let result = undefined;
  const xChange = Math.abs(p1Origin[0] - p1Dest[0]);
  const p2XChange = Math.abs(p2Origin[0] - p2Dest[0]);
  const smallestP1X = Math.min(...[p1Origin[x], p1Dest[x]]);
  const largestP1X = Math.max(...[p1Origin[x], p1Dest[x]]);
  const smallestP1Y = Math.min(...[p1Origin[1], p1Dest[1]]);
  const largestP1Y = Math.max(...[p1Origin[1], p1Dest[1]]);

  const smallestP2X = Math.min(...[p2Origin[0], p2Dest[0]]);
  const largestP2X = Math.max(...[p2Origin[0], p2Dest[0]]);
  const smallestP2Y = Math.min(...[p2Origin[1], p2Dest[1]]);
  const largestP2Y = Math.max(...[p2Origin[1], p2Dest[1]]);

  if (xChange) {
    // xChange in p1!
    // assume that we need a vertical p2 line
    if (p2XChange === 0) {
      // assume y in p1 does not change, so can use y val from origin or dest
      const p1y = p1Origin[1];
      if (p1y >= smallestP2Y && p1y <= largestP2Y) {
        // check that p2 x is inside p1 xo - xd
        // assume p2 is a y change, so x from origin and dest is same
        const p2x = p2Origin[0];
        if (p2x >= smallestP1X && p2x <= largestP1X) {
          // intersection!!!!
          // get manhatten distance from intersection
          // x of p2 and y of p1
          result = p2x + p1y;
        }
      }
    }
  } else {
    // yChange in p1!
    if (p2XChange > 0) {
      // xChange in p2!
      // assume x in p1 does not change, so use x val from origin or dest
      const p1x = p1Origin[0];
      if (p1x >= smallestP2X && p1x <= largestP2X) {
        const p2y = p2Origin[1];
        if (p2y >= smallestP1Y && p2y <= largestP1Y) {
          result = p1x + p2y;
        }
      }
    }
  }
  return result;
}
const twoLines = input.split('\n');
let x = 0;
let y = 0;
const points = [[x, y]];
twoLines[0].split(',').forEach(entry => {
  const num = Number(entry.substring(1));
  const dir = entry[0];
  if (dir == 'R') {
    x += num;
  } else if (dir == 'D') {
    y -= num;
  } else if (dir == 'U') {
    y += num;
  } else {
    x -= num;
  }
  points.push([x, y]);
});
x = 0;
y = 0;
twoLines[1].split(',').forEach(entry => {
  const dir = entry[0];
  const num = Number(entry.substring(1));
  const origin = [x, y];
  if (dir == 'R') {
    x += num;
  } else if (dir == 'D') {
    y -= num;
  } else if (dir == 'U') {
    y += num;
  } else {
    x -= num;
  }
  const dest = [x, y];
  for (let i = 0; i < points.length - 1; i++) {
    const pOrigin = points[i];
    const pDest = points[i + 1];
    const dist = getIntersectingLinesManhattanDistance(pOrigin, pDest, origin, dest);

    if (dist) {
      console.log(dist);
      if (dist < part1) {
        part1 = dist;
      }
    }

  }
});

const end = performance.now();
const timeTaken = Math.round((end - start) * 1000) / 1000
console.log('part1: ', part1);
console.log('time taken', timeTaken, 'ms');
