import { getAdventOfCodeData } from '../node-utils.js';
// const input = await getAdventOfCodeData(2022, 16);
const input = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`;

const start = performance.now();


const valves = [];
input.split('\n').forEach(line => {
  // const splitLine = line.split(' ');
   const [, name, flowRate, tunnels] = line.match(/Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? (.+)/);
   valves.push({name, flowRate: Number(flowRate), neighbours: tunnels.split(', ').map(t => t.trim())});
  // valves.push(
  //   {
  //     name: splitLine[1],
  //     flow: Number(splitLine[4].split('=')[1].replace(';', '')),
  //     neighbours: line.split('valves ')[1].split(',').map(x => x.trim())
  //   }
  // );
});
console.log(valves);



const end = performance.now();
console.log('time taken', end - start, 'ms');
