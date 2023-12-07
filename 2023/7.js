import { getAdventOfCodeData } from '../utils.js';
const input = await getAdventOfCodeData(2023, 7);
const start = performance.now();

const cardValueLookup = ['', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
const highcards = [];
const onepairs = [];
const twopairs = [];
const threes = [];
const fullhouse = [];
const fours = [];
const fives = [];

input.split('\n').forEach(line => {
  var dict = {};
  line.split(' ')[0].split('').forEach(ch => { 
    if (dict[ch]) {
      dict[ch] += 1;
    } else {
      dict[ch] = 1;
    }
  });

  const arr = Object.values(dict);
  if (arr[0] == 5) {
    fives.push(line);
  } else if (arr.some(x => x == 4)) {
    fours.push(line);
  } else if (arr.some(x => x == 3)) {
    if (arr.some(x => x == 2)) {
      fullhouse.push(line);
    } else {
      threes.push(line);
    }
  } else if (arr.some(x => x == 2)) {
    if (arr.filter(x => x == 2).length == 2) {
      twopairs.push(line);
    } else {
      onepairs.push(line);
    }
  } else {
    highcards.push(line);
  }
});

function sortFn(a, b) {
// if a less than b, return -1, else if b is more than a, return 1. else return 0
  const handA = a.split(' ')[0].split('');
  const handB = b.split(' ')[0].split('');
  let result = 0;
  for (let i =0; i < handA.length;i++) {
    const aInd = cardValueLookup.findIndex(handA[i]);
    const bInd = cardValueLookup.findIndex(handB[i]);
    if (aInd !== bInd) {
      if (bInd > aInd) {
        result = 1;
      } else {
        result = -1;
      }
      break;
    }
  }
  return result;
}


const end = performance.now();
/*
console.log('fives =====', fives);
console.log('fours =====', fours);
console.log('fullhouse =====', fullhouse);
console.log('threes =====', threes);
console.log('twopairs =====', twopairs);
console.log('onepairs =====', onepairs);
console.log('highcards =====', highcards);
*/

console.log('time taken', end - start, 'ms');
    
