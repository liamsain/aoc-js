import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2024, 8);
const start = performance.now();
class Grid {
  lines = [];
  maxY = 0;
  maxX = 0;
  freqMap = null; // {'a': [[0, 1], [1, 2]] // i.e. char 'a' appears where x = 0, y = 1 and x = 1 and y = 2
  constructor(lines) {
    // array of strings
    // this.lines = lines;
    lines.forEach(l => {
      this.lines.push(l.split(''));
    });
    this.maxY = this.lines.length - 1;
    this.maxX = this.lines[0].length - 1;
  }

  setCharAtPos(ch, pos = []) {
    const line = this.lines[pos[1]];
    line[pos[0]] = ch;
  }
  getChar(pos) {
    const line = this.lines[pos[1]];
    return line[pos[0]];
  }

  generateFreqMap(config = {}) {
    // config = {charsToExclude: ['a']}
    if (this.freqMap) {
      return this.freqMap;
    } else {
      this.freqMap = {};
      for (let y = 0; y <= this.maxY; y++) {
        for (let x = 0; x <= this.maxX; x++) {
          const line = this.lines[y];
          const ch = line[x];
          const excludeChar = config.charsToExclude && config.charsToExclude.includes(ch);
          if (!excludeChar) {
            if (!this.freqMap[ch]) {
              this.freqMap[ch] = [[x, y]];
            } else {
              this.freqMap[ch].push([x, y]);
            }
          }
        }
      }
    }
    return this.freqMap;
  }
  draw() {
    console.log(this.lines.map(l => l.join('')).join('\n'));
  }
}



const grid = new Grid(input.split('\n'));
grid.generateFreqMap({ charsToExclude: ['.'] });

const foundAntinodes = [];
const extraAntinodes = [];
for (const prop in grid.freqMap) {
  const coords = grid.freqMap[prop];
  for (let i = 0; i < coords.length; i++) {
    for (let ii = coords.length - 1; ii > i; ii--) {
      if (i == ii) {
        continue;
      }
      const currCoord = [coords[i][0], coords[i][1]]
      const currCoordIsInExtraAntinodes = extraAntinodes.find(spot => spot[0] == currCoord[0] && spot[1] == currCoord[1]);
      if (!currCoordIsInExtraAntinodes) {
        extraAntinodes.push(currCoord);
      }
      const nextCoord = [coords[ii][0], coords[ii][1]]

      const nextCoordIsInExtraAntinodes = extraAntinodes.find(spot => spot[0] == nextCoord[0] && spot[1] == nextCoord[1]);
      if (!nextCoordIsInExtraAntinodes) {
        extraAntinodes.push(nextCoord);
      }
      const diffx = coords[i][0] - coords[ii][0];
      const diffy = coords[i][1] - coords[ii][1];

      let firstx = coords[i][0] + diffx;
      let firsty = coords[i][1] + diffy;
      let secondx = coords[ii][0] - diffx;
      let secondy = coords[ii][1] - diffy;
      if (firstx >= 0 && firstx <= grid.maxX && firsty >= 0 && firsty <= grid.maxY) {
        if (!foundAntinodes.find(spot => spot[0] == firstx && spot[1] == firsty)) {
          foundAntinodes.push([firstx, firsty]);
        }
        const inExtra = extraAntinodes.find(spot => spot[0] == firstx && spot[1] == firsty);
        if (!inExtra) {
          extraAntinodes.push([firstx, firsty]);
          grid.setCharAtPos('#', [firstx, firsty]);
        }
      }
      let outOfBounds = false;
      while (!outOfBounds) {
        firstx += diffx;
        firsty += diffy;

        if (firstx >= 0 && firstx <= grid.maxX && firsty >= 0 && firsty <= grid.maxY) {
          const inExtraAntinodes = extraAntinodes.find(spot => spot[0] == firstx && spot[1] == firsty);
          if (!inExtraAntinodes) {
            extraAntinodes.push([firstx, firsty]);
            grid.setCharAtPos('#', [firstx, firsty]);
          }
        } else {
          outOfBounds = true;
        }
      }


      if (secondx >= 0 && secondx <= grid.maxX && secondy >= 0 && secondy <= grid.maxY) {
        if (!foundAntinodes.find(spot => spot[0] == secondx && spot[1] == secondy)) {
          foundAntinodes.push([secondx, secondy]);
        }
        const inExtra = extraAntinodes.find(spot => spot[0] == secondx && spot[1] == secondy);
        if (!inExtra) {
          extraAntinodes.push([secondx, secondy]);
          grid.setCharAtPos('#', [secondx, secondy]);
        }

      }
      outOfBounds = false;
      while (!outOfBounds) {
        secondx -= diffx;
        secondy -= diffy;

        if (secondx >= 0 && secondx <= grid.maxX && secondy >= 0 && secondy <= grid.maxY) {
          const inExtraAntinodes = extraAntinodes.find(spot => spot[0] == secondx && spot[1] == secondy);
          if (!inExtraAntinodes) {
            grid.setCharAtPos('#', [secondx, secondy]);
            extraAntinodes.push([secondx, secondy]);
          }
        } else {
          outOfBounds = true;
        }
      }
    }
  }
}

const end = performance.now();
console.log('part1: ', foundAntinodes.length);
console.log('part2: ', extraAntinodes.length);
console.log('time taken', Math.ceil(end - start), 'ms');
