import { getAdventOfCodeData } from '../node-utils.js';
// const input = await getAdventOfCodeData(2023, 25);
const start = performance.now();
const input = `jqt: rhn xhk nvd
rsh: frs pzl lsr
xhk: hfx
cmg: qnr nvd lhk bvb
rhn: xhk bvb hfx
bvb: xhk hfx
pzl: lsr hfx nvd
qnr: nvd
ntq: jqt hfx bvb xhk
nvd: lhk
lsr: lhk
rzs: qnr cmg lsr rsh
frs: qnr lhk lsr`;
const graphNodes = [];
class GraphNode {
  constructor(label) {
    this.label = label;
    this.neighbours = [];
  }
  addNeighbour(n) {
    this.neighbours.push(n);
  }
}
input.split('\n').forEach(l => {
  const [leftNodeLabel, restOfLine] = l.split(':');
  let leftNode = graphNodes.find(n => n.label == leftNodeLabel);
  if (!leftNode) {
    leftNode = new GraphNode(leftNodeLabel);
    graphNodes.push(leftNode);
  }
  restOfLine.trim().split(' ').forEach(label => {
    let rightNode = graphNodes.find(n => n.label == label);
    if (!rightNode) {
      rightNode = new GraphNode(label);
      graphNodes.push(rightNode);
    } 
    leftNode.addNeighbour(rightNode);
    rightNode.addNeighbour(leftNode);
  });
});


const end = performance.now();
console.log('time taken', end - start, 'ms');