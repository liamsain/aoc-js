import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2024, 4);

const start = performance.now();
let part1 = 0;
let part2 = 0;
const coordIsValid = (coord, lastX, lastY) => coord[0] >= 0 && coord[0] <= lastX && coord[1] >= 0 && coord[1] <= lastY;

function part2Coords(x, y, lastX, lastY) { 
  /*
    Assume x and y is the coord of A
  */
  const topLeftToBottomRight = [[x - 1, y - 1], [x + 1, y + 1]]
  const topRightToBottomLeft = [[x + 1, y - 1], [x - 1, y + 1]]
  const res = [];
  if (topLeftToBottomRight.every(c => coordIsValid(c, lastX, lastY))) {
    res.push(topLeftToBottomRight);
  }
  if (topRightToBottomLeft.every(c => coordIsValid(c, lastX, lastY))) {
    res.push(topRightToBottomLeft);
  }
  return res;
}

function getXmasCoordsFromCoord(x, y, lastX, lastY) {
  const left = [[x - 1, y], [x - 2, y], [x - 3, y]];
  const right = [[x + 1, y], [x + 2, y], [x + 3, y]];
  const up = [[x, y - 1], [x, y - 2], [x, y - 3]];
  const down = [[x, y + 1], [x, y + 2], [x, y + 3]];
  const leftUp = [[x - 1, y - 1], [x - 2, y - 2], [x - 3, y - 3]];
  const leftDown = [[x - 1, y + 1], [x - 2, y + 2], [x - 3, y + 3]];
  const rightUp = [[x + 1, y - 1], [x + 2, y - 2], [x + 3, y - 3]];
  const rightDown =[[x + 1, y + 1], [x + 2, y + 2], [x + 3, y + 3]];
  const initial = [left, right, up, down, leftUp, leftDown, rightUp, rightDown];
  const res = [];
  for (let i = 0; i < initial.length;i++) {
    if (initial[i].every(c => coordIsValid(c, lastX, lastY))) {
      res.push(initial[i]);
    }
  }

  return res;
}
const lines = input.split('\n').map(l => l.split(''));
const limitY = lines.length - 1;
const limitX = lines[0].length - 1;
for (let y = 0; y < lines.length;y++) {
  for (let x = 0; x < lines[y].length;x++) {
    if (lines[y][x] == 'X') { 
      const coordLines = getXmasCoordsFromCoord(x, y, limitX, limitY);
      for ( let i = 0; i < coordLines.length;i++) {
        const c = coordLines[i];
        const first = c[0];
        const second = c[1];
        const third = c[2];
        const firstLetter = lines[first[1]][first[0]];
        const secondLetter = lines[second[1]][second[0]];
        const thirdLetter = lines[third[1]][third[0]];
        if (firstLetter === 'M' && secondLetter == 'A' && thirdLetter == 'S') {
          part1 += 1;
        }
      }
    } else if (lines[y][x] == 'A') {
      const coordLines = part2Coords(x, y, limitX, limitY);
      if (coordLines.length == 2) {
        let isValidCross = true;
        for (let i = 0; i < coordLines.length;i++) {
          const c = coordLines[i];
          const first = c[0];
          const second = c[1];
          const firstLetter = lines[first[1]][first[0]];
          const secondLetter = lines[second[1]][second[0]];
          if (!(firstLetter == 'M' && secondLetter == 'S') && !(firstLetter == 'S' && secondLetter == 'M')) {
            isValidCross = false
          } 
        }
        if (isValidCross) {
          part2 += 1;
        }
      }
    }
  }
}
const end = performance.now();
console.log('part 1: ', part1);
console.log('part 2: ', part2);
console.log('time taken', end - start, 'ms');
    