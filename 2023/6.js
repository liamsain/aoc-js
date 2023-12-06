import { getAdventOfCodeData } from '../utils.js';
const input = await getAdventOfCodeData(2023, 6);
const start = performance.now();

const spli = input.split('\n');
const times = spli[0].split(' ').filter(x => x.length > 0).slice(1).map(x => parseInt(x));
const distances = spli[1].split(' ').filter(x => x.length > 0).slice(1).map(x => parseInt(x));
const timePart2 = parseInt(times.reduce((acc, val) => acc + val.toString(), ''));
const distancePart2 = parseInt(distances.reduce((acc, val) => acc + val.toString(), ''));
let firstResult = 1;
let secondResult = 0;

times.forEach((time, timeIndex) => {
  const recordDistance = distances[timeIndex];
  let numberOfWaysToBeatRecord = 0;
  for (let i = 1; i < time - 1; i++) {
    const mph = i;
    const hoursLeft = time - i;
    const dist = hoursLeft * mph;
    if (dist > recordDistance) {
      numberOfWaysToBeatRecord += 1;
    }
  }
  firstResult *= numberOfWaysToBeatRecord;
});

for (let i = 0; i < timePart2; i++) {
  const mph = i;
  const hoursLeft = timePart2 - i;
  const dist = hoursLeft * mph;
  if (dist > distancePart2) {
    secondResult += 1;
  }
}
const end = performance.now();
console.log(firstResult);
console.log(secondResult);
console.log('time taken', end - start, 'ms');
