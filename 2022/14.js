import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2022, 14);
// const input = `498,4 -> 498,6 -> 496,6
// 503,4 -> 502,4 -> 502,9 -> 494,9`;
const start = performance.now();

class Cave {
  grid = [];

  constructor(maxX, maxY) {
    for (let i = 0; i < maxY; i++) {
      this.grid.push(new Array(maxX).fill('.'));
    }
  }
  draw(fromX = 0, toX, toY) {
    if (!toX) {
      toX = this.grid[0].length;
    }
    if (!toY) {
      toY = this.grid.length;
    }
    let result = '';
    for (let i = 0; i < toY; i++) {
      result += this.grid[i].slice(fromX, toX).join('') + '\n';
    }
    console.log(result);
  }

  get leftMostPoint() {
    let result = Infinity;
    for (let i = 0; i < this.grid.length; i++) {
      for (let ii = 0; ii < this.grid[i].length; ii++) {
        if (this.grid[i][ii] == '#' && ii < result) {
          result = ii;
          break;
        }
      }
    }
    return result;
  }

  get rightMostPoint() {
    let result = 0;
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = this.grid[y].length; x > 0; x--) {
        if (this.grid[y][x] === '#' && x > result) {
          result = x;
          break;
        }
      }
    }
    return result;
  }
  get bottomMostPoint() {
    let result = this.grid.length;
    for (let y = this.grid.length - 1; y > 0; y--) {
      if (this.grid[y].some(x => x === '#')) {
        result = y;
        break;
      }
    }
    return result;
  }

  addSand(yLimit) {
    let currentX = 500;
    let currentY = 0;
    let atRest = false;
    let caveFull = false;
    while (!atRest) {
      if (currentY > yLimit || caveFull) {
        break;
      }
      const belowCell = this.grid[currentY + 1][currentX];
      if (belowCell === '.') {
        currentY += 1;
      } else {
        const belowLeft = this.grid[currentY + 1][currentX - 1];
        if (belowLeft === '.') {
          currentY += 1;
          currentX -= 1;
        } else {
          const belowRight = this.grid[currentY + 1][currentX + 1];
          if (belowRight === '.') {
            currentY += 1;
            currentX += 1;
          } else {
            if (currentY === 0 && this.grid[currentY][currentX] === 'o') {
              caveFull = true;
            } else {
              atRest = true;
              this.grid[currentY][currentX] = 'o';
            }
          }

        }
      }
    }
    return atRest;
  }

  addRockLine(fromX, fromY, toX, toY) {
    this.grid[fromY][fromX] = '#';
    if (fromX === toX) {
      let lineLength = Math.abs(toY - fromY);
      let currentY = fromY;
      const drawDownwards = toY > fromY;
      while (lineLength > 0) {
        if (drawDownwards) {
          currentY += 1;
        } else {
          currentY -= 1;
        }
        this.grid[currentY][fromX] = '#';
        lineLength -= 1;
      }
    } else {
      let lineLength = Math.abs(toX - fromX);
      let currentX = fromX;
      const drawToTheRight = toX > fromX;
      while (lineLength > 0) {
        if (drawToTheRight) {
          currentX += 1;
        } else {
          currentX -= 1;
        }
        this.grid[fromY][currentX] = '#';
        lineLength -= 1;
      }
    }
  }
}

const g = new Cave(1000, 1000);
const g2 = new Cave(1000, 1000);
g.grid[0][500] = '+';
g2.grid[0][500] = '+';

input.split('\n').forEach(line => {
  const coords = line.split('->');
  for (let i = 1; i < coords.length; i++) {
    const fromStr = coords[i - 1].split(',');
    const toStr = coords[i].split(',');
    const fromX = Number(fromStr[0])
    const fromY = Number(fromStr[1])
    const toX = Number(toStr[0])
    const toY = Number(toStr[1])
    g.addRockLine(fromX, fromY, toX, toY);
    g2.addRockLine(fromX, fromY, toX, toY);
  }
});
const g2XBuffer = 200
g2.addRockLine(g2XBuffer, g2.bottomMostPoint + 2, g2.rightMostPoint + g2XBuffer, g2.bottomMostPoint + 2);

const maxY = g.bottomMostPoint + 1;
let sandThatCameToRest = 0;
let g1NoRest = false;
let g2NoRest = false;
let g2SandAtRest = 0;

while (!g1NoRest || !g2NoRest) {
  const g1CameToRest = g.addSand(maxY);
  const g2CameToRest = g2.addSand(maxY);

  if (!g1NoRest && g1CameToRest) {
    sandThatCameToRest += 1;
  } else {
    g1NoRest = true;
  }
  if (!g2NoRest && g2CameToRest) {
    g2SandAtRest += 1;
  } else {
    g2NoRest = true;
  }
}


const end = performance.now();

console.log('Units of sand that came to rest g1: ', sandThatCameToRest);
console.log('Units of sand that came to rest g2: ', g2SandAtRest);
console.log('time taken', end - start, 'ms');
