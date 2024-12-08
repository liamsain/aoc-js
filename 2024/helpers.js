export function simulateGuardSteps(grid, visited = [], updateVisited = true, startX, startY) {
  let curX = startX;
  let curY = startY;
  let hesFallenOff = false;
  let hesStuck = false;
  // const localVis = structuredClone(visited);
  // const grid = structuredClone(initialGrid);

  const lineLength = grid[0].length;
  const gridMap = {}; // key: '10 20 ^', value: true
  // assume that if x, y and dir are same again then he's stuck

  const modifyCoordAndDoStuckCheck = (newX, newY, dir) => {
    curX = newX;
    curY = newY;
    const k = `${curX} ${curY} ${dir}`;
    if (gridMap[k]) {
      return true; // hes stuck!
    } else {
      gridMap[k] = true;
    }
    if (updateVisited) {
      if (visited.findIndex(i => i[0] == curX && i[1] == curY) == -1) {
        visited.push([curX, curY]);
      }
    }

  }
  let ch = '^';

  while (!hesFallenOff && !hesStuck) {
    if (ch == '^') {
      if (curY == 0) {
        hesFallenOff = true;
      } else {
        if (grid[curY - 1][curX] == '#') {
          ch = '>';
        } else {
          hesStuck = modifyCoordAndDoStuckCheck(curX, curY - 1, '^');
        }
      }
    } else if (ch == '>') {
      if (curX == lineLength - 1) {
        hesFallenOff = true;
      } else {
        if (grid[curY][curX + 1] == '#') {
          ch = 'v';
        } else {
          hesStuck = modifyCoordAndDoStuckCheck(curX + 1, curY, '>');
        }
      }
    } else if (ch == 'v') {
      if (curY == grid.length - 1) {
        hesFallenOff = true;
      } else {
        if (grid[curY + 1][curX] == '#') {
          ch = '<'
        } else {
          hesStuck = modifyCoordAndDoStuckCheck(curX, curY + 1, 'v');
        }
      }
    } else {
      if (curX == 0) {
        hesFallenOff = true;
      } else {
        if (grid[curY][curX - 1] == '#') {
          ch = '^';
        } else {
          hesStuck = modifyCoordAndDoStuckCheck(curX - 1, curY, '<');
        }
      }
    }
  }

  return {
    hesFallenOff,
    hesStuck,
    visited,
  }
}