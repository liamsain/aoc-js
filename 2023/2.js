import { getAdventOfCodeData } from '../node-utils.js';
const start = performance.now();
const input = await getAdventOfCodeData(2023, 2);

// only 12 red cubes, 13 green cubes, and 14 blue cubes
let firstResult = 0;
let secondResult = 0;
input.split('\n').forEach((line) => {
  const firstColonIndex = line.indexOf(':');
  const game_id = line.slice(0, firstColonIndex).split(' ')[1];
  const data = line.slice(firstColonIndex + 2);
  const sets = data.split(';');
  let exceeded = false;
  const colourSets = [];
  for (let i = 0; i < sets.length; i++) {
    const set = sets[i].trim().split(',');
    const colours = {
      green:  0,
      red: 0,
      blue: 0,
    }

    for (let j = 0; j < set.length; j++) {
      const [count, colour] = set[j].trim().split(' ');
      colours[colour] += parseInt(count);
    }
    colourSets.push(colours);
    if (colours.red > 12 || colours.green > 13 || colours.blue > 14) {
      exceeded = true;
    }
  }
  if (!exceeded) {
    firstResult += parseInt(game_id);
  }

  const highestGreen = colourSets.map((set) => set.green).sort((a, b) => b - a)[0];
  const highestRed = colourSets.map((set) => set.red).sort((a, b) => b - a)[0];
  const highestBlue = colourSets.map((set) => set.blue).sort((a, b) => b - a)[0];
  const power = highestGreen * highestRed * highestBlue;
  secondResult += power;
});
const end = performance.now();
console.log('first result', firstResult);
console.log('second result', secondResult);

console.log('time taken', end - start, 'ms');