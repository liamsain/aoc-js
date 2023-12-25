import { getAdventOfCodeData } from '../node-utils.js';
// const input = await getAdventOfCodeData(2023, 25);
const start = performance.now();
// const input = `a: b c d
// b: e f`
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
const lines = input.split('\n');
class GraphNode {
  constructor(label) {
    this.label = label;
    this.neighbours = [];
  }
  addNeighbour(graphNode) {
    const existing = this.neighbours.find(n => n.label == graphNode.label);
    if (!existing) {
      this.neighbours.push(graphNode);
    }
  }
  removeNeighbour(neighbourLabel) {
    const neighbourIndex = this.neighbours.findIndex(n => n.label == neighbourLabel);
    if (neighbourIndex != -1) {
      const neighbour = this.neighbours.splice(neighbourIndex, 1)[0];
      neighbour.removeNeighbour(this.label);
    }
  }
  bfs() {
    this.visited = true;
    const q = [this];
    let count = 0;
    while(q.length > 0) {
      let current = q.shift();
      count += 1;
      console.log(current.label);
      current.neighbours.forEach(n => {
        if (!n.visited) {
          q.push(n)
          n.visited = true;
        }
      })
    }
    console.log(count);
  }
}
class GraphNodes {
  constructor(lines) {
    this.nodes = this.populateFromLines(lines);
  }
  getNode(label) {
    return this.nodes.find(n => n.label == label);
  }
  populateFromLines(lines) {
    const nodes = [];
    lines.forEach(l => {
      const [leftNodeLabel, restOfLine] = l.split(':');
      let leftNode = nodes.find(n => n.label == leftNodeLabel);
      if (!leftNode) {
        leftNode = new GraphNode(leftNodeLabel);
        nodes.push(leftNode);
      }
      restOfLine.trim().split(' ').forEach(label => {
        let rightNode = nodes.find(n => n.label == label);
        if (!rightNode) {
          rightNode = new GraphNode(label);
          nodes.push(rightNode);
        } 
        leftNode.addNeighbour(rightNode);
        rightNode.addNeighbour(leftNode);
      });
    });
    return nodes;
  }
}

const graphNodes = new GraphNodes(lines);

const hfx = graphNodes.getNode('hfx');
hfx.removeNeighbour('pzl');
const bvb = graphNodes.getNode('bvb');
bvb.removeNeighbour('cmg');
const nvd = graphNodes.getNode('nvd');
nvd.removeNeighbour('jqt');
nvd.bfs();
bvb.bfs();
hfx.bfs();


const end = performance.now();
console.log('time taken', end - start, 'ms');
