import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
// args: 
// -y year
// -d day
// -today true/false

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseArgs(args) {
  const parsedArgs = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-y' && args[i + 1] !== undefined) {
      parsedArgs.year = args[i + 1];
    } else if(arg === '-d' && args[i + 1] !== undefined) {
      parsedArgs.day = args[i + 1];
    } else if(arg === '-today' && args[i + 1] !== undefined) {
      parsedArgs.today = args[i + 1];
    }
  }
  return parsedArgs;
}

const args = process.argv.slice(2);
const parsedArgs = parseArgs(args);
if (parsedArgs.today === 'true') {
  const today = new Date();
  const year = today.getFullYear();
  const day = today.getDate();
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
    const dayTemplate = `import { getAdventOfCodeData } from '../utils.js';
  const input = await getAdventOfCodeData(${year}, ${day});
  const start = performance.now();
  // code here

  const end = performance.now();
  console.log('time taken', end - start, 'ms');
    `;
    fs.writeFileSync(dayPath, dayTemplate);
  }
}


