import { getAdventOfCodeData } from '../utils.js';
// const input = await getAdventOfCodeData(2023, 16);
const input = String.raw`.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....`;
const start = performance.now();
const lines = input.split('\n');
const energisedTiles = {};
const beams = [{coord: [0,0], dir: 'right'}];
while(beams.length) {
  const beamsLength = beams.length
  for (let i = 0; i < beamsLength;i++) {
    const beam = beams[i];
    energisedTiles[`${beam.coord[0]}${beam.coord[1]}`] = true;
    const tileCh = lines[beam.coord[1]][beam.coord[0]];
    if (tileCh == '.') {

    }
  }
}
function moveBeamInDirection(beam) {
}
// String.raw`${}`.split('\n').forEach(l => {

// });



const end = performance.now();
console.log('time taken', end - start, 'ms');
    