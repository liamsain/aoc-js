import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getAdventOfCodeData } from './node-utils.js';
import fs from 'fs';
// args: 
// -y year
// -d day
// -today 
// -dataOnly: only get data, don't init a js file

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseArgs(args) {
  const parsedArgs = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-y' && args[i + 1] !== undefined) {
      parsedArgs.year = args[i + 1];
    } else if (arg === '-d' && args[i + 1] !== undefined) {
      parsedArgs.day = args[i + 1];
    } else if (arg === '-today') {
      parsedArgs.today = true
    } else if (arg == '-data-only') {
      parsedArgs.dataOnly = true;
    }
  }
  return parsedArgs;
}

const args = process.argv.slice(2);
const parsedArgs = parseArgs(args);
const today = new Date();
let year = parsedArgs.year;
let day = parsedArgs.day;
if (parsedArgs.today) {
  year = today.getFullYear().toString();
  day = today.getDate().toString();
}
if (parsedArgs.dataOnly) {
  getAdventOfCodeData(year, day);
} else {
  createDayFile(year, day);
}



function createDayFile(year, day) {
  // create a folder for the year if it does not exist
  const yearPath = path.join(__dirname, year);
  if (!fs.existsSync(yearPath)) {
    fs.mkdirSync(yearPath);
  }


  // create a js file for the day in the year folder if the day file does not exist
  const dayPath = path.join(yearPath, `/${day}.js`);
  if (!fs.existsSync(dayPath)) {
    const dayTemplate = `import { getAdventOfCodeData, logTime } from '../node-utils.js';
const input = await getAdventOfCodeData(${year}, ${day});
const start = performance.now();


const end = performance.now();
logTime(end - start);
    `;
    getAdventOfCodeData(year, day);

    fs.writeFileSync(dayPath, dayTemplate);
  } else {
    console.log('That file already exists: ', dayPath);
  }
}


