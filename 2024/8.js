import { getAdventOfCodeData } from '../node-utils.js';
// const input = await getAdventOfCodeData(2024, 8);
const input = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`
const start = performance.now();

let width = 0;
let height = 0;
const freqMap = {};
freqMap['a'] = [[1, 2]];
input.split('\n').forEach((line, lineIndex) => {
  width = line.length;
  for (let i = 0; i < width; i++) {
    if (line[i] !== '.') {
      const ch = line[i];
      if (!freqMap[ch]) {
        freqMap[ch] = [[i, height]];
      } else {
        freqMap[ch].push([i, height]);
      }
    }
  }
  height++;
});
let part1 = 0;
const foundAntinodes = [];
for (const prop in freqMap) {
  const coords = freqMap[prop];
  for (let i = 0; i < coords.length; i++) {
    for (let ii = 0; ii < coords.length; ii++) {
      if (i == ii) {
        continue;
      }
      // if pos, first is right of second
      const diffx = coords[i][0] - coords[ii][0];


      // if pos, first is below second
      const diffy = coords[i][1] - coords[ii][1];

      const firstx = coords[i][0] + diffx;
      const firsty = coords[i][1] + diffy;
      const secondx = coords[ii][0] - diffx;
      const secondy = coords[ii][1] - diffy;
      debugger;
      if (firstx >= 0 && firstx <= width && firsty >= 0 && firsty <= height) {
        part1++;
        foundAntinodes.push([firstx, firsty]);
      }
      if (secondx >= 0 && secondx <= width && secondy >= 0 && secondy <= height) {
        part1++;

        foundAntinodes.push([secondx, secondy]);
      }
    }
  }
}
drawAntinodes();
function drawAntinodes() {
  let finalStr = '';
  for (let y = 0; y < height; y++ ) {
    let str = '';
    for (let x = 0; x < width;x++) {
      if (foundAntinodes.find(a => a[0] == x && a[1] == y)) {
        str += '#';
      } else {
        str += '.'
      }
    }
    str += '\n'
    finalStr += str;
  }
  console.log(finalStr);
}
const end = performance.now();
console.log('part1: ', part1);
console.log('time taken', end - start, 'ms');
