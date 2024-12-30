import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getAdventOfCodeData } from './node-utils.js';
import fs from 'fs';
// args: 
// -y year
// -d day
// -today 

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseArgs(args) {
  const parsedArgs = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-y' && args[i + 1] !== undefined) {
      parsedArgs.year = args[i + 1];
    } else if(arg === '-d' && args[i + 1] !== undefined) {
      parsedArgs.day = args[i + 1];
    } else if(arg === '-today') {
      parsedArgs.today = true
    }
  }
  return parsedArgs;
}

const args = process.argv.slice(2);
const parsedArgs = parseArgs(args);
if (parsedArgs.today) {
  const today = new Date();
  const year = today.getFullYear().toString();
  const day = today.getDate().toString();
  createDayFile(year, day);
} else {
  createDayFile(parsedArgs.year, parsedArgs.day);
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
    const dayTemplate = `import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(${year}, ${day});
const start = performance.now();


const end = performance.now();
const timeTaken = Math.round((end - start) * 1000) / 1000
console.log('time taken', timeTaken, 'ms');
    `;
    getAdventOfCodeData(year, day);

    fs.writeFileSync(dayPath, dayTemplate);
  } else {
    console.log('That file already exists: ', dayPath);
  }
}


