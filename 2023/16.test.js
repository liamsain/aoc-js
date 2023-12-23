import { it, assert, equals, getAdventOfCodeData } from '../utils.js';
import { part1 } from './16.js'

it('Part 1 ', async() => {
  const input1 = String.raw`.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....`;
  const result1 = part1(input1.split('\n'));
  equals(result1, 46)
  const input2 = String.raw`..--|
|..--
\.../`;
  const result2 = part1(input2.split('\n'));
  equals(result2, 15);
  const input3 = String.raw`..--|
`;
});
