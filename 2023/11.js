import { getAdventOfCodeData, NodeMap } from '../utils.js';
const input = await getAdventOfCodeData(2023, 11);
// const input = `...#......
// .......#..
// #.........
// ..........
// ......#...
// .#........
// .........#
// ..........
// .......#..
// #...#.....`;
const start = performance.now();
const lines = input.split('\n');
let firstResult = 0;

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
function getGalaxyDirectory() {
  let result = [];
  let currentGalaxy = 0;
  for (let i = 0; i < lines.length;i++) {
    for (let j = 0; j < lines[0].length;j++) {
      if (lines[i][j] == '#') {
        // lines[i] = lines[i].substring(0, j) + currentGalaxy + lines[i].substring(j + 1);
        result.push([j, i]);
        currentGalaxy += 1;
      }
    }
  }
  return result;
}

expandSpace();
const galaxyDirectory = getGalaxyDirectory();

for (let i = 0; i < galaxyDirectory.length; i++) {
  for (let j = i + 1;j < galaxyDirectory.length;j++) {
    const src = galaxyDirectory[i];
    const t = galaxyDirectory[j];
    firstResult += Math.abs(t[0] - src[0]) + Math.abs(t[1] - src[1]);
  }
}

const end = performance.now();
console.log('first: ', firstResult); // 9323130 too low
console.log('time taken', end - start, 'ms');
