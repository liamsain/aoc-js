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
    } else if (tileCh == '\\') {
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
      if (d == 'right' || d == 'left') {
        beam.dir = 'up';
        beams.push({coord: [...beam.coord], dir: 'down', alive: true});
      } 
    } else if (tileCh == '-') {
      if (d == 'up' || d == 'down') {
        beam.dir = 'left';
        beams.push({coord: [...beam.coord], dir: 'right', alive: true});
      }
    }
    moveBeamInDirection(beam);
  }
}

function getTileAtCoord(coord) {
  const row = lines[coord[1]];
  if (row) {
    return lines[coord[1]][coord[0]]
  }
  return undefined;
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
    
