import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2024, 10);
const start = performance.now();
const rows = input.split('\n').map(x => x.split('').map(y => Number(y)));
const maxy = rows.length - 1;
const maxx = rows[0].length - 1;
const zeroCoords = [];
let part2 = 0;
function getSurroundingCoords(coord) {
  const result = [];
  if (coord[0] + 1 <= maxx) {
    result.push({ coord: [coord[0] + 1, coord[1]], num: rows[coord[1]][coord[0] + 1] })
  }
  if (coord[0] - 1 >= 0) {
    result.push({ coord: [coord[0] - 1, coord[1]], num: rows[coord[1]][coord[0] - 1] })
  }
  if (coord[1] + 1 <= maxy) {
    result.push({ coord: [coord[0], coord[1] + 1], num: rows[coord[1] + 1][coord[0]] })
  }
  if (coord[1] - 1 >= 0) {
    result.push({ coord: [coord[0], coord[1] - 1], num: rows[coord[1] - 1][coord[0]] });
  }
  return result;
}

for (let y = 0; y < rows.length; y++) {
  for (let x = 0; x < rows[y].length; x++) {
    if (rows[y][x] == 0) {
      zeroCoords.push({ origin: [x, y], score: 0 });
    }
  }
}
const part2ZeroCoords = structuredClone(zeroCoords);
for (const zeroObj of zeroCoords) {
  const neighbours = getSurroundingCoords(zeroObj.origin).filter(x => x.num === 1);
  const visitedNines = [];
  while (neighbours.length > 0) {
    const current = neighbours.pop();
    // drawWithActiveHashes([], current.coord);
    debugger;
    if (current.num === 9 && !visitedNines.find(vn => vn[0] == current.coord[0] && vn[1] == current.coord[1])) {
      visitedNines.push([current.coord[0], current.coord[1]]);
      zeroObj.score++;
    } else {
      neighbours.push(...getSurroundingCoords(current.coord).filter(x => x.num === current.num + 1));
    }
  }
}

for (const zeroObj of part2ZeroCoords) {
  const neighbours = getSurroundingCoords(zeroObj.origin).filter(x => x.num === 1);
  while (neighbours.length > 0) {
    const current = neighbours.pop();
    if (current.num === 9){
      zeroObj.score++;
    } else {
      neighbours.push(...getSurroundingCoords(current.coord).filter(x => x.num === current.num + 1));
    }
  }
}

function drawWithActiveHashes(coords = [], currCoord) {
  console.clear();
  let result = '';
  for (let y =0; y < rows.length;y++) {
    let str = ''
    for (let x = 0; x < rows[y].length;x++) {
      // if (coords.find(c => c[0] == x && c[1] == y)) {
      //   str += '#';
      if (x == currCoord[0] && y == currCoord[1]) {
        str += '#';
      } else if (isNaN(rows[y][x])) {
        str += '.'
      } else {

        str += rows[y][x];
      }
    }
    str += '\n'
    result += str;
  }
  console.log(result);
}
const part1 = zeroCoords.reduce((acc, val) => acc + val.score, 0)
part2 = part2ZeroCoords.reduce((acc, val) => acc + val.score, 0);


const end = performance.now();
console.log('part1: ', part1);
console.log('part2: ', part2);
console.log('time taken', end - start, 'ms');
