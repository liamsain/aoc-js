import { getAdventOfCodeData, NodeMap } from '../node-utils.js';
const input = await getAdventOfCodeData(2023, 11);
const start = performance.now();
const lines = input.split('\n');
let firstResult = 0;
let secondResult = 0;

function getEmptyColumnAndRowIndexes() {
  const result = {columns: [], rows: []}
  lines.forEach((line, lineIndex) => {
    if (!line.includes('#')) {
      result.rows.push(lineIndex);
    }
  });
   lines[0].split('').forEach((ch, i) => {
    if (lines.every(l => l[i] == '.')) {
      result.columns.push(i);
    }
  });
 
  return result;
}
const emptyColumnAndRowIndexes = getEmptyColumnAndRowIndexes();
function getGalaxyDirectory() {
  let result = [];
  let currentGalaxy = 0;
  for (let i = 0; i < lines.length;i++) {
    for (let j = 0; j < lines[0].length;j++) {
      if (lines[i][j] == '#') {
        result.push([j, i]);
        currentGalaxy += 1;
      }
    }
  }
  return result;
}

const galaxyDirectory = getGalaxyDirectory();

for (let i = 0; i < galaxyDirectory.length; i++) {
  for (let j = i + 1;j < galaxyDirectory.length;j++) {
    const src = galaxyDirectory[i];
    const t = galaxyDirectory[j];
    const highestX = Math.max(src[0], t[0]);
    const lowestX = Math.min(src[0], t[0]);
    const highestY = Math.max(src[1], t[1]);
    const lowestY = Math.min(src[1], t[1]);
    const columnBoundaryCrosses = emptyColumnAndRowIndexes.columns.filter(c => c > lowestX && c < highestX).length;
    const rowBoundaryCrosses = emptyColumnAndRowIndexes.rows.filter(r => r > lowestY && r < highestY).length;
    firstResult += Math.abs(t[0] - src[0]) + Math.abs(t[1] - src[1]) + columnBoundaryCrosses + rowBoundaryCrosses;
    secondResult += Math.abs(t[0] - src[0]) + Math.abs(t[1] - src[1]) + (columnBoundaryCrosses * (1000000 - 1))+ (rowBoundaryCrosses * (1000000 - 1));

  }
}

const end = performance.now();
console.log('first: ', firstResult); 
console.log('second: ', secondResult); 
console.log('time taken', end - start, 'ms');
