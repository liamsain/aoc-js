import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const __dirname = dirname(fileURLToPath(import.meta.url));
export async function getAdventOfCodeData(year, day) {
  const yearPath = path.join(__dirname, year.toString());
  const inputFilePath = `${yearPath}/${year}-${day}-input.txt`;
  if (fs.existsSync(inputFilePath)) {
    const data = fs.readFileSync(inputFilePath, 'utf8');
    return data.trim();
  } else {
    console.log(`Fetching ${year} day ${day} from Advent of Code...`);
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
    if (response.status == 400) {
      console.log('400 error. You probably need to update your session_id');
      return;
    } else {
      console.log(response);
      throw new Error(`Failed to fetch data. Status code: ${response.status}`);
    }
  }

  const data = await response.text();
  fs.writeFileSync(inputFilePath, data.trim());
  console.log(`Saved input data for ${year} day ${day} to ${inputFilePath}`);
  return data.trim(); // Trim to remove any leading or trailing whitespace
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

export function logTime(milliseconds) {
  let unit = 'milliseconds';
  let val = milliseconds;
  if (milliseconds < 1) {
    val = milliseconds * 1000;
    unit = 'microseconds';
  } else if (milliseconds >= 1000) {
    val = milliseconds / 1000;
    unit = 'seconds';
  }
  let valToNearestThreeDecimalPoints = Math.round(val * 1000) / 1000;
  console.log(`Time taken: ${valToNearestThreeDecimalPoints} ${unit}`);
}



