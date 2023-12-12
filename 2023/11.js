import { getAdventOfCodeData, NodeMap } from '../utils.js';
// const input = await getAdventOfCodeData(2023, 11);
const input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;
const start = performance.now();
const lines = input.split('\n');

function expandSpace() {
  const lineIndexesToModify = [];

  lines.forEach((line, lineIndex) => {
    if (!line.includes('#')) {
      lineIndexesToModify.push(lineIndex);
    }
  });

  const emptyLine = lines[lineIndexesToModify[0]];
  lineIndexesToModify.forEach((lineIndex, i) => {
    lines.splice(lineIndex + i, 0, emptyLine);
  });

  const columnNumbersToModify = [];
  lines[0].split('').forEach((ch, i) => {
    if (lines.every(l => l[i] == '.')) {
      columnNumbersToModify.push(i);
    }
  });
  columnNumbersToModify.forEach((colIndex, i) => {
    for (let j = 0; j < lines.length; j++) {
      const newLine = lines[j].split('');
      newLine.splice(colIndex + i, 0, '.');
      lines[j] = newLine.join('');
    }
  });
}
expandSpace();
let currentGalaxy = 1;
for (let i = 0; i < lines.length;i++) {
  for (let j = 0; j < lines[0].length;j++) {
    if (lines[i][j] == '#') {
      lines[i] = lines[i].substring(0, j) + currentGalaxy + lines[i].substring(j + 1);
      currentGalaxy += 1;
    }
  }
}



const end = performance.now();
console.log('time taken', end - start, 'ms');
