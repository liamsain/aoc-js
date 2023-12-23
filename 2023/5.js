import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2023, 5);

const start = performance.now();
// source, dest, length
const sectionsStrings = input.split('\n\n');
const seeds = sectionsStrings[0].substring('seeds: '.length).split(' ').map(x => parseInt(x));
const secondPartSeeds = [];
for (let i = 0; i < seeds.length; i += 2) {
  secondPartSeeds.push([seeds[i], seeds[i + 1]]);
}
let firstResult = Number.MAX_VALUE;
let secondResult = Number.MAX_VALUE;


const mapStrToMapArr = mapStr => mapStr
  .split('\n')
  .slice(1)
  .map(x => { const spl = x.split(' '); return [parseInt(spl[0]), parseInt(spl[1]), parseInt(spl[2])]; });

const sections = sectionsStrings.slice(1).map(x => mapStrToMapArr(x));

seeds.forEach(seed => {
  let currentNum = seed;
  sections.forEach(sec => {
    for (let i = 0; i < sec.length; i++) {
      const [dest, src, length] = sec[i];
      if (currentNum >= src && currentNum < (src + length)) {
        currentNum = (dest - src) + currentNum;
        break;
      }
    }
  });
  if (currentNum < firstResult) {
    firstResult = currentNum;
  }
});

secondPartSeeds.forEach((seedPair, seedPairIndex) => {
  const [seedStart, length] = seedPair;
  console.log(`working on seed pair ${seedPairIndex + 1} / ${secondPartSeeds.length}`);
  for (let i = seedStart; i < seedStart + length; i++) {
    let currentNum = i;
    sections.forEach(sec => {
      for (let j = 0; j < sec.length; j++) {
        const [dest, src, length] = sec[j];
        if (currentNum >= src && currentNum < (src + length)) {
          currentNum = (dest - src) + currentNum;
          break;
        }
      }
    });
    if (currentNum < secondResult) {
      secondResult = currentNum;
    }

  }
});


const end = performance.now();

console.log('time: ', end - start, 'ms');
console.log('first result: ', firstResult);
console.log('second result: ', secondResult);
