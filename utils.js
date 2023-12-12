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
  return data.trim(); // Trim to remove any leading or trailing whitespace
}

export class NodeMap {
  // arg: {input: '', startChar: '', endChar: ''}
  constructor(arg) {
    // nodeLines: [[{x: 0, y: 0, ch: 'a', distance: null}]]
    this.nodeLines = [];
    arg.input.split('\n').forEach((line, lineIndex) => {
      const nodeLine = [];
      line.split('').forEach((ch, chIndex) => {
        const n = { x: chIndex, y: lineIndex, ch, distance: null }
        nodeLine.push(n);
      });
      this.nodeLines.push(nodeLine);
    });
  }

  getNode(x, y) {
    if (x > 0 && x < this.nodeLines[0].length && y > 0 && y < this.nodeLines.length) {
      return this.nodeLines[y][x];
    }
    return null;
  }
}

