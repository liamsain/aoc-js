import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2023, 7);
const start = performance.now();
let firstResult = 0;
let secondResult = 0;
const cardValueLookup = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
const highcards = [];
const onepairs = [];
const twopairs = [];
const threes = [];
const fullhouse = [];
const fours = [];
const fives = [];

const cardValueLookup2 = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A']
const highcards2 = [];
const onepairs2 = [];
const twopairs2 = [];
const threes2 = [];
const fullhouse2 = [];
const fours2 = [];
const fives2 = [];

const HandType = {
  highcard: 'highcard',
  onepair: 'onepair',
  twopair: 'twopair',
  threes: 'threes',
  fullhouse: 'fullhouse',
  fours: 'fours',
  fives: 'fives'
};

function pushPart2Hand (line, handType, jokerCount) {
  if (handType == HandType.fours) {
    if (jokerCount == 0) {
      fours2.push(line);
    } else {
      fives2.push(line);
    }
  } else if (handType == HandType.fullhouse) {
    if (jokerCount == 0) {
      fullhouse2.push(line);
    } else {
      fives2.push(line);
    } 
  } else if (handType == HandType.threes) {
    if (jokerCount == 0) {
      threes2.push(line);
    } else if (jokerCount == 1 || jokerCount == 3) {
      fours2.push(line);
    } 
  } else if (handType == HandType.twopair) {
    if (jokerCount == 0) {
      twopairs2.push(line);
    } else if (jokerCount == 1) {
      fullhouse2.push(line);
    } else if (jokerCount == 2) {
      fours2.push(line);
    }
  } else if (handType == HandType.onepair) {
    if (jokerCount == 0) {
      onepairs2.push(line);
    } else if (jokerCount == 1) {
      threes2.push(line);
    } else if (jokerCount == 2) {
      threes2.push(line);
    }
  } else if (handType == HandType.highcard) {
    if (jokerCount == 0) {
      highcards2.push(line);
    } else if (jokerCount == 1) {
      onepairs2.push(line);
    }
  }
};

input.split('\n').forEach(line => {
  const dict = {};
  line.split(' ')[0].split('').forEach(ch => { 
    if (dict[ch]) {
      dict[ch] += 1;
    } else {
      dict[ch] = 1;
    }
  });
  const jokers = dict['J'] || 0;

  const arr = Object.values(dict);
  if (arr[0] == 5) {
    fives.push(line);
    fives2.push(line);
  } else if (arr.some(x => x == 4)) {
    fours.push(line);
    pushPart2Hand(line, HandType.fours, jokers);
  } else if (arr.some(x => x == 3)) {
    if (arr.some(x => x == 2)) {
      fullhouse.push(line);
      pushPart2Hand(line, HandType.fullhouse, jokers);
    } else {
      threes.push(line);
      pushPart2Hand(line, HandType.threes,jokers);
    }
  } else if (arr.some(x => x == 2)) {
    if (arr.filter(x => x == 2).length == 2) {
      pushPart2Hand(line, HandType.twopair, jokers);
      twopairs.push(line);
    } else {
      pushPart2Hand(line, HandType.onepair, jokers);
      onepairs.push(line);
    }
  } else {
    pushPart2Hand(line, HandType.highcard, jokers);
    highcards.push(line);
  }
});

function sortFn(a, b) {
  const handA = a.split(' ')[0].split('');
  const handB = b.split(' ')[0].split('');
  let result = 0;
  for (let i =0; i < handA.length;i++) {
    const aInd = cardValueLookup.findIndex(x => x == handA[i]);
    const bInd = cardValueLookup.findIndex(x => x == handB[i]);
    if (aInd !== bInd) {
      if (bInd > aInd) {
        result = -1;
      } else {
        result = 1;
      }
      break;
    }
  }
  return result;
}

function sortFn2(a, b) {
  const handA = a.split(' ')[0].split('');
  const handB = b.split(' ')[0].split('');
  let result = 0;
  for (let i =0; i < handA.length;i++) {
    const aInd = cardValueLookup2.findIndex(x => x == handA[i]);
    const bInd = cardValueLookup2.findIndex(x => x == handB[i]);
    if (aInd !== bInd) {
      if (bInd > aInd) {
        result = -1;
      } else {
        result = 1;
      }
      break;
    }
  }
  return result;
}

highcards.sort(sortFn);
onepairs.sort(sortFn);
twopairs.sort(sortFn);
threes.sort(sortFn);
fullhouse.sort(sortFn);
fours.sort(sortFn);
fives.sort(sortFn);

highcards2.sort(sortFn2);
onepairs2.sort(sortFn2);
twopairs2.sort(sortFn2);
threes2.sort(sortFn2);
fullhouse2.sort(sortFn2);
fours2.sort(sortFn2);
fives2.sort(sortFn2);

const allHands = highcards.concat(onepairs).concat(twopairs).concat(threes).concat(fullhouse).concat(fours).concat(fives);
const allHands2 = highcards2.concat(onepairs2).concat(twopairs2).concat(threes2).concat(fullhouse2).concat(fours2).concat(fives2);
allHands.forEach((hand, index) => {
  const handValue = hand.split(' ')[1];
  firstResult += parseInt(handValue) * (index + 1);
  secondResult += parseInt(allHands2[index].split(' ')[1]) * (index + 1);
});



const end = performance.now();
console.log('first\t', firstResult);
console.log('second\t', secondResult);
// 248820779 too low
console.log('time taken', end - start, 'ms');
    
