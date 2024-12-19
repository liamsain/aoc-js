import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2024, 11);
const start = performance.now();
class NumberKVStore {
  store = {};
  total = 0;
  insert(k = '', v = 0) {
    this.store[k] ? this.store[k] = this.store[k] + v : this.store[k] = v
    this.total += v;
  }
}
let stoneMap = new NumberKVStore();
input.split(' ').forEach(x => stoneMap.insert(x, 1))

for (let i = 0; i < 25; i++) {
  blink();
}
const part1 = stoneMap.total;
for (let i = 0; i < 50; i++) {
  blink();
}
const end = performance.now();

console.log(`Part 1: ${part1}\nPart 2: ${stoneMap.total}\nTime taken: ${end - start}ms`);

function blink() {
  const tmp = new NumberKVStore();
  for (let k in stoneMap.store) {
    if (k === '0') {
      tmp.insert('1', stoneMap.store['0'])
    } else {
      if (k.length % 2 === 0) {
        const firstHalfKey = k.substring(0, k.length / 2);
        tmp.insert(firstHalfKey, stoneMap.store[k]);
        const secondHalfKey = Number(k.substring(k.length / 2));
        tmp.insert(secondHalfKey, stoneMap.store[k]);
      } else {
        const res = Number(k) * 2024;
        tmp.insert(res, stoneMap.store[k]);
      }
    }
  }
  stoneMap = tmp;
}