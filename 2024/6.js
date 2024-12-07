import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2024, 6);

const start = performance.now();


let part2 = 0;
let grid = [];
let visited = [];
input.split('\n').forEach(l => grid.push(l.split('')));
const lineLength = grid[0].length;
let y = grid.findIndex(l => l.includes('^'));
let x = grid[y].findIndex(ch => ch == '^');
const initialPos = [x, y];
visited.push([x, y]);
const res = simulateGuardSteps(grid, visited);


const part1 = res.localVis.length;
let prevVisited = [];
x = initialPos[0];
y = initialPos[1];
visited = res.localVis.filter(x => !(x[0] == initialPos[0] && x[1] == initialPos[1]));
for (let i = 0; i < visited.length;i++) {
  x = initialPos[0];
  y = initialPos[1];
  const curr = visited[i];
  if (prevVisited.length) {
    grid[prevVisited[1]][prevVisited[0]] = '.';
  }
  grid[initialPos[1]][initialPos[0]] = '^';
  grid[curr[1]][curr[0]] = '#';
  prevVisited = [curr[0], curr[1]];
  const localRes = simulateGuardSteps(grid, visited, false);
  if (localRes.hesStuck) {
    part2 += 1;
  }
}

function simulateGuardSteps(initialGrid, visited = [], updateVisited = true) {
  let hesFallenOff = false;
  let hesStuck = false;
  const localVis = structuredClone(visited);
  const grid = structuredClone(initialGrid);
  const gridMap = {}; // key: '10 20 ^', value: true
  // assume that if x, y and dir are same again then he's stuck

  const modifyCoordAndDoStuckCheck = (newX, newY, dir) => {
    x = newX;
    y = newY;
    const k = `${x} ${y} ${dir}`;
    if (gridMap[k]) {
      return true; // hes stuck!
    } else {
      gridMap[k] = true;
    }
    if (updateVisited) {
      if (localVis.findIndex(i => i[0] == x && i[1] == y) == -1) {
        localVis.push([x, y]);
      }
    }

  }
  let ch = '^';

  while (!hesFallenOff && !hesStuck) {
    if (ch == '^') {
      if (y == 0) {
        hesFallenOff = true;
      } else {
        if (grid[y - 1][x] == '#') {
          ch = '>';
        } else {
          hesStuck = modifyCoordAndDoStuckCheck(x, y - 1, '^');
        }
      }
    } else if (ch == '>') {
      if (x == lineLength - 1) {
        hesFallenOff = true;
      } else {
        if (grid[y][x + 1] == '#') {
          ch = 'v';
        } else {
          hesStuck = modifyCoordAndDoStuckCheck(x + 1, y, '>');
        }
      }
    } else if (ch == 'v') {
      if (y == grid.length - 1) {
        hesFallenOff = true;
      } else {
        if (grid[y + 1][x] == '#') {
          ch = '<'
        } else {
          hesStuck = modifyCoordAndDoStuckCheck(x, y + 1, 'v');
        }
      }
    } else {
      if (x == 0) {
        hesFallenOff = true;
      } else {
        if (grid[y][x - 1] == '#') {
          ch = '^';
        } else {
          hesStuck = modifyCoordAndDoStuckCheck(x - 1, y, '<');
        }
      }
    }
  }

  return {
    hesFallenOff,
    hesStuck,
    localVis,
  }
}

const end = performance.now();
console.log('part 1: ', part1);
console.log('part 2: ', part2);
console.log('time taken', end - start, 'ms');
