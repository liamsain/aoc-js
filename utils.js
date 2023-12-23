// const path = require('path');
// import path from 'path';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const __dirname = dirname(fileURLToPath(import.meta.url));
export async function getAdventOfCodeData(year, day) {
  // check the file system using fs to see whether that file exists:
  const yearPath = path.join(__dirname, year.toString());
  const inputFilePath = `${yearPath}/${year}-${day}-input.txt`;
  // use fs to read file path:
  if (fs.existsSync(inputFilePath)) {
    const data = fs.readFileSync(inputFilePath, 'utf8');
    return data.trim();
  } else {
    console.log(`Input file for ${year} day ${day} does not exist. Fetching from Advent of Code...`);
  }

  const url = `https://adventofcode.com/${year}/day/${day}/input`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Cookie': `session=${process.env.session_id}`,
      'User-Agent': 'liamkennedy89@outlook.com'
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data. Status code: ${response.status}`);
  }

  const data = await response.text();
  fs.writeFileSync(inputFilePath, data.trim());
  console.log(`Saved input data for ${year} day ${day} to ${inputFilePath}`);
  return data.trim(); // Trim to remove any leading or trailing whitespace
}

export class NodeMap {
  // arg: {lines: ['asdf', 'asdf']}
  constructor(arg) {
    // rows: [[{x: 0, y: 0, ch: 'a', distance: null}]]
    this.rows = [];
    arg.lines.forEach((line, lineIndex) => {
      const nodeRow = [];
      line.split('').forEach((ch, chIndex) => {
        const n = { x: chIndex, y: lineIndex, ch, distance: null }
        nodeRow.push(n);
      });
      this.rows.push(nodeRow);
    });
  }

  getNode(x, y) {
    if (x >= 0 && x < this.rows[0].length && y >= 0 && y < this.rows.length) {
      return this.rows[y][x];
    }
    return null;
  }
  getNodesAround(x, y) {
    let result = [];
    const left = this.getNode(x - 1, y);
    if (left) {
      result.push(left);
    }
    const right = this.getNode(x + 1, y);
    if (right) {
      result.push(right);
    }
    const up = this.getNode(x, y - 1);
    if (up) {
      result.push(up);
    }
    const down = this.getNode(x, y + 1);
    if (down) {
      result.push(down);
    }
    return result;
  }
  drawMap(currentNode) {
    let mapStr = '';
    this.rows.forEach(row => {
      let rowStr = ''
      row.forEach(n => {
        if (currentNode && n.x == currentNode.x && n.y == currentNode.y) {
          rowStr += 'C';
        } else {
          rowStr += n.ch;
        }
      });
      mapStr += (`${rowStr}\n`);
    });
    console.clear();
    console.log(mapStr);
  }
  lineIncludesCh(rowNumber, ch) {
    return this.rows[rowNumber].map(n => n.ch).includes(ch);
  }
  stepsBetweenTwoCoords(src = [0, 0], target = [0, 0]) {
    let steps = 0;
    const srcNode = this.getNode(src[0], src[1]);
    srcNode.distance = 0;
    const q = [srcNode];
    let currentNode;
    while(q.length) {
      currentNode = q.shift();
      // this.drawMap(currentNode);
      // debugger;
      if (currentNode.x == target[0] && currentNode.y == target[1]) {
        steps = currentNode.distance;
        break;
      }
      const neighbours = this.getNodesAround(currentNode.x, currentNode.y);
      neighbours.forEach(n => {
        if (!n.distance) {
          n.distance = currentNode.distance + 1;
          q.push(n);
        }
      });
    }
    return steps;
  }
}

export function it(desc, fn) {
  try {
    console.log('\x1b[32m%s\x1b[0m', desc);
    fn();
  } catch (error) {
    // console.log('\n');
    // console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + desc);
    // console.error(error.message);
  }
}
export function assert(isTrue) {
  if (!isTrue) {
    throw new Error();
  }
}
export function equals(a, b) {
  if (a != b) {
    console.log('\x1b[31m%s\x1b[0m', '\u2718 ', `${a} != ${b}`);
    // throw new Error(`${a} != ${b}`);
  } else {
    console.log('\x1b[32m%s\x1b[0m', '\u2714 ', `${a} == ${b}`);
  }
}
export async function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export function drawLines(lines, fn) {
  let str = '';
  lines.forEach((line, y) => {
    let lineStr = '';
    line.split('').forEach((ch, x) => {
      lineStr += fn(ch, x, y);
      });
    str += lineStr + '\n';
  });
  return str;

}

