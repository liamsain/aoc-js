// first problem: infinite loop where beam would go round and round. fixed with storing coord and direction
// second problem: works on test data, not on big input.
import { getAdventOfCodeData, drawLines } from '../utils.js';
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

const Dirs = {up: '^', down: 'v', left: '<', right: '>'};
function draw(lines, beams) {
  const drawnLines = drawLines(lines, (ch, x, y) => {
    const beam = beams.find(b => b.coord[0] == x && b.coord[1] == y);
    if (beam) {
      return Dirs[beam.dir];
    } else {
      return ch;
    }
  });
  console.clear();
  console.log(drawnLines);
}
 
export function part1(lines, debug = false) {
  const energisedTiles = {};
  const energisedTilesWithDir = {};
  let beams = [{coord: [0,0], dir: 'right', alive: true}];

  let result = 0;
  while(beams.some(b => b.alive)) {
    beams = beams.filter(b => b.alive);
    // debugger;
    // draw(lines, beams);

    for (let i = 0; i < beams.length;i++) {
      const beam = beams[i];
      const beamCoordKey = `${beam.coord[0]}${beam.coord[1]}`;
      const beamCoordDirKey = `${beamCoordKey}${beam.dir}`;
      if (!energisedTiles[beamCoordKey]) {
        energisedTiles[beamCoordKey] = true;
        result += 1;
      }

      if (energisedTilesWithDir[beamCoordDirKey]) {
        beam.alive = false;
        continue
      } else {
        energisedTilesWithDir[beamCoordDirKey] = beam.dir;
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
      moveBeamInDirection(beam, lines);
    }
  }
  return result;
}


function moveBeamInDirection(beam, lines) {
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

const firstResult = part1(lines);

const end = performance.now();
console.log('time taken', end - start, 'ms');
console.log('first', firstResult); // 6506, 6507   too low
    
