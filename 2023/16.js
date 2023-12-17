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
const beams = [{coord: [0,0], dir: 'right', alive: true}];

while(beams.some(b => b.alive)) {
  const beamsLength = beams.length
  for (let i = 0; i < beamsLength;i++) {
    const beam = beams[i];
    energisedTiles[`${beam.coord[0]}${beam.coord[1]}`] = true;
    const tileCh = lines[beam.coord[1]][beam.coord[0]];
    const d = beam.dir;
    if (tileCh == '/') {
      if (d == 'right') {
        beam.dir = 'up';
      } else if (d == 'up') {
        beam.dir = 'right';
      } else if (d == 'left') {
        beam.dir = 'down';
      } else {
        beam.dir = 'left';
      }
    } else if (tileCh == '\') {
      if (d == 'right') {
        beam.dir = 'down';
      } else if (d == 'up') {
        beam.dir = 'left';
      } else if (d == 'down') {
        beam.dir = 'right';
      } else {
        beam.dir = 'up';
      }
    } else if (tileCh == '|') {
      // if dir right, go up, push new beam down
      // if dir left, go up, push new beam down
      // if dir down, go down
      // if dir up, go up
    } else if (tileCh == '-') {
      // if dir right, go right
      // if dir up, go left, push new beam right
      // if dir down, go left, push new beam right
      // if dir left, go left
    }
    moveBeamInDirection(beam);
  }
}

function moveBeamInDirection(beam) {
  if (beam.dir == 'right') {
    const rightTile = lines[beam.coord[1]][beam.coord[0] + 1];
    if (rightTile) {
      beam.coord[0] = beam.coord[0] + 1; 
    } else {
      beam.alive = false;
    }
  } else if (beam.dir == 'down') {
    const lineBelow = lines[beam.coord[1] + 1];
    if (lineBelow) {
      beam.coord[1] = beam.coord[1] + 1;
    } else {
      beam.alive = false;
    }
  } else if (beam.dir == 'left') {
    const colBefore = lines[beam.coord[1]][beam.coord[0] - 1];
    if (colBefore) {
      beam.coord[0] = beam.coord[0] - 1;
    } else {
      beam.alive = false;
    }
  } else {
    const lineAbove = lines[beam.coord[1] - 1];
    if (lineAbove) {
      beam.coord[1] = beam.coord[1] - 1;
    } else {
      beam.alive = false;
    }
  }
}



const end = performance.now();
console.log('time taken', end - start, 'ms');
    
