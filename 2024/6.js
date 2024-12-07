import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2024, 6);
// const input = `....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...`;
const start = performance.now();


let grid = [];
const visited = [];
input.split('\n').forEach(l => grid.push(l.split('')));
const lineLength = grid[0].length;
let y = grid.findIndex(l => l.includes('^'));
let x = grid[y].findIndex(ch => ch == '^');
visited.push([x, y]);
const gridMap = new Map(); // key: '10 20', value: '^';
// assume that if x, y and dir are same again then he's stuck


let hesFallenOff = false;
let hesStuck = false;
while (!hesFallenOff) {
  const ch = grid[y][x];
  if (ch == '^') {
    if (y == 0) {
      hesFallenOff = true;
    } else {
      if (grid[y - 1][x] == '#') {
        grid[y][x] = '>';
      } else {
        grid[y][x] = 'X';
        const k = `${x} ${y-1}`;
        if (!gridMap.has(k)) {
          gridMap.set(k, '^');
        }
        // if (visited.findIndex(i => i[0] == x && i[1] == y -1) == -1) {
        //   visited.push([x, y-1]);
        // }
        grid[y - 1][x] = '^';
        y -= 1;
      }
    }
  } else if (ch == '>') {
    if (x == lineLength - 1) {
      hesFallenOff = true;
    } else {
      if (grid[y][x + 1] == '#') {
        grid[y][x] = 'v'; 
      } else {
        grid[y][x] = 'X';
        if (visited.findIndex(i => i[0] == x + 1 && i[1] == y) == -1) {
          visited.push([x + 1, y]);
        }
        grid[y][x + 1] = '>';
        x += 1;
      }
    }
  } else if (ch == 'v') {
    if (y == grid.length - 1) {
      hesFallenOff = true;
    } else {
      if (grid[y + 1][x] == '#') {
        grid[y][x] = '<';
      } else {
        grid[y][x] = 'X';
        if (visited.findIndex(i => i[0] == x && i[1] == y + 1) == -1) {
          visited.push([x, y + 1]);
        }
        grid[y + 1][x] = 'v';
        y += 1;
      }
    }
  } else {
    // left
    if (x == 0) {
      hesFallenOff = true;
    } else {
      if (grid[y][x - 1] == '#') {
        grid[y][x] = '^';
      } else {
        grid[y][x] = 'X';
        if (visited.findIndex(i => i[0] == x - 1 && i[1] == y) == -1) {
          visited.push([x - 1, y]);
        }
        grid[y][x - 1] = '<';
        x -= 1;
      }
    }
  }
}


const end = performance.now();
console.log('part 1: ', visited.length);
console.log('time taken', end - start, 'ms');
    