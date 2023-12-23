import { it, equals } from '../node-utils.js';
import { getTotalEnergizedTiles } from './16.js'

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
  const result1 = getTotalEnergizedTiles(input1.split('\n'));
  equals(result1, 46)
  const input2 = String.raw`..--|
|..--
\.../`;
  const result2 = getTotalEnergizedTiles(input2.split('\n'));
  equals(result2, 15);
  const input3 = String.raw`..--|
`;
});
