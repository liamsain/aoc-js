import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2023, 4);
const start = performance.now();
// code here
let firstResult = 0;
const cards = []; // { matches: 1, copies: 1 }
input.split('\n').forEach((line, i) => {
  const indexOfPipe = line.indexOf('|');
  const leftSide = line.substring(0, indexOfPipe);
  const rightSide = line.substring(indexOfPipe + 1, line.length + 1);
  const winningNumbers = leftSide.split(':')[1].trim().split(' ').filter(x => x.length !== 0).map(x => parseInt(x));
  const chosenNumbers = rightSide.trim().split(' ').filter(x => x.length != 0).map(x => parseInt(x));
  let points = 0;
  let matches = 0;
  winningNumbers.forEach(n => {
    if (chosenNumbers.includes(n)) {
      matches += 1;
      if (points == 0) {
        points = 1
      } else {
        points = points * 2;
      }
    }
  });
  cards.push({ copies: 1, matches });
  firstResult += points;
});
// foreach card, foreach copy in that card, inc copies of next cards
cards.forEach((card, cardIndex) => {
  for (let i = 0; i < card.copies;i++) {
    for (let j = 1; j <= card.matches;j++) {
      cards[cardIndex + j].copies += 1;
    }
  }
});
const secondResult = cards.reduce((acc, val) => acc + val.copies, 0);
const end = performance.now();
console.log('time taken', end - start, 'ms');
console.log('first: ', firstResult);
console.log('second', secondResult);
