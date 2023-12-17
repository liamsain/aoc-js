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
let firstResult = 0;
  
const energisedTiles = {};
const energisedTilesWithDir = {};
let beams = [{coord: [0,0], dir: 'right', alive: true, visited: {}}];

function draw(beam) {
  const Dirs = {'up': '^', 'down': 'v', 'left': '<', right: '>'};
  let str = '';
  lines.slice(0, beam.coord[1] + 10 ).forEach((line, y) => {
    let lineStr = '';
    line.split('').forEach((ch, x) => {
      const beam = beams.find(b => b.coord[0] == x && b.coord[1] == y);
      if (beam) {
        lineStr += Dirs[beam.dir];
      } else {
        lineStr += ch;
      }
    });
    str += lineStr + '\n';
  });
  console.clear();
  console.log(str);
}
async function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
} 

while(beams.some(b => b.alive)) {
  beams = beams.filter(b => b.alive);
  await delay(300);
  for (let i = 0; i < beams.length;i++) {
    const beam = beams[i];
    draw(beam);
    const beamCoordKey = `${beam.coord[0]}${beam.coord[1]}`;
    const beamCoordDirKey = `${beamCoordKey}${beam.dir}`;
    // debugger;
    if (!energisedTiles[beamCoordKey]) {
      energisedTiles[beamCoordKey] = true;
      firstResult += 1;
    }

    if (energisedTilesWithDir[beamCoordDirKey]) {
      beam.alive = false;
      continue
    } else {
      energisedTilesWithDir[beamCoordDirKey] = true;
    }
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
        const newBeam = {coord: [...beam.coord], dir: 'down', alive: true};
        beams.push(newBeam);
      } 
    } else if (tileCh == '-') {
      if (d == 'up' || d == 'down') {
        beam.dir = 'left';
        const newBeam = {coord: [...beam.coord], dir: 'right', alive: true};
        beams.push(newBeam);
      }
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
console.log('first', firstResult); // 6506, 6507   too low
    
