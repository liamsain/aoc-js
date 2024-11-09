import  fs from 'fs';
const start = performance.now();
const data = fs.readFileSync('./2016-1-input.txt', 'utf8');
let facing = 'U';
let x = 0;
let y = 0;
const splitData = data.split(', ');
for (let i = 0; i < splitData.length;i++) {
  const line = splitData[i];
  const d = line[0];
  const amount = parseInt(line.substring(1));
  if (facing == 'U') {
    facing = d == 'R' ? 'R' : 'L';
  } else if (facing == 'R') {
    facing = d == 'R' ? 'D' : 'U';
  } else if (facing == 'D') {
    facing = d == 'R' ? 'L' : 'R';
  } else {
    facing = d == 'R' ? 'U' : 'D';
  }
  if (facing == 'U') {
    y += amount;
  } else if (facing == 'R') {
    x += amount;
  } else if (facing == 'D') {
    y -= amount;
  } else {
    x -= amount;
  }
}

const part1 = Math.abs(x) + Math.abs(y);
const end = performance.now();
console.log('microseconds: ', (end - start) * 1000);
console.log('part 1: ', part1);