export async function getAdventOfCodeData(year, day) {
  // const envRes = await fetch(`.env`);
  // if (!envRes.ok) {
  //   throw new Error('coudnt get env file');
  // }
  // const envData = await envRes.text();

  
  const res = await fetch(`./${year}/${year}-${day}-input.txt`);
  if (!res.ok) {
    throw new Error('File does not exist');
  }
  const data = await res.text();
  return data.trim();

}

export function drawLines(lines, fn) {
  let str = '';
  lines.forEach((line, y) => {
    let lineStr = '';
    line.split('').forEach((ch, x) => {
      lineStr += fn(ch, x, y);
      });
    str += lineStr + '\n';
  });
  return str;
}

export class NodeMap {
  // arg: {lines: ['asdf', 'asdf'], divId: 'map'}
  constructor(arg) {
    // rows: [[{x: 0, y: 0, ch: 'a', distance: null}]]
    this.rows = [];
    this.htmlDiv = arg.divId ? document.querySelector('#' + arg.divId) : null;
    arg.lines.forEach((line, lineIndex) => {
      const nodeRow = [];
      line.split('').forEach((ch, chIndex) => {
        const n = { x: chIndex, y: lineIndex, ch, distance: null }
        nodeRow.push(n);
      });
      this.rows.push(nodeRow);
    });
  }

  drawHtml() {
    if (!this.htmlDiv) {
      return;
    }
    this.htmlDiv.innerHTML = '';
    let width = this.rows[0].length;
    let height = this.rows.length;
    for (let y = 0; y < height;y++) {
      const rowDiv = document.createElement('div');
      rowDiv.style.display = 'flex';
      this.htmlDiv.appendChild(rowDiv);
      for (let x = 0; x < width;x++) {
        const cellDiv = document.createElement('div');
        cellDiv.style.width = '40px';
        cellDiv.style.height = '40px';
        cellDiv.style.display = 'flex';
        cellDiv.style.justifyContent = 'center';
        cellDiv.style.alignItems = 'center';
        cellDiv.style.borderRight = '1px solid black';
        cellDiv.style.borderBottom = '1px solid black';
        cellDiv.style.cursor = 'pointer';
        cellDiv.innerHTML = this.rows[y][x].ch;
        if (cellDiv.innerHTML == '#') {
          cellDiv.style.background = 'black';
        } else {
          if (cellDiv.innerHTML != 0 && cellDiv.innerHTML != 'E') {
            cellDiv.style.background = 'green';
            cellDiv.style.color = 'white';
          }
        }
          
        if (x == 0) {
          cellDiv.style.borderLeft = '1px solid black';
        }
        if (y == 0) {
          cellDiv.style.borderTop = '1px solid black';
        }
        rowDiv.appendChild(cellDiv);
        cellDiv.addEventListener('click', function() {
          if(arg.onCellClick) {
            arg.onCellClick(x, y);
          }
        });
      }
    }
  }

  getNode(x, y) {
    if (x >= 0 && x < this.rows[0].length && y >= 0 && y < this.rows.length) {
      return this.rows[y][x];
    }
    return null;
  }
  getNodeByChar(ch) {
    let node;
    mainLoop: for(const row of this.rows) {
      for (const n of row) {
        if (n.ch == ch) {
          node = n; 
          break mainLoop;
        }
      }
    }
    return node;

  }
  getNodesAround(x, y) {
    return [
      this.getNode(x - 1, y),
      this.getNode(x + 1, y),
      this.getNode(x, y - 1),
      this.getNode(x, y + 1)
    ].filter(x => x !== null);
  }

  drawMap(drawFn) {
    let mapStr = '';
    this.rows.forEach(row => {
      let rowStr = ''
      row.forEach(n => {
        if (drawFn) {
          rowStr += drawFn(n);
        } else {
          rowStr += n.ch;
        }
      });
      mapStr += (`${rowStr}\n`);
    });
    console.clear();
    console.log(mapStr);
  }
  stepsBetweenTwoCoords(src = [0, 0], target = [0, 0]) {
    let steps = 0;
    const srcNode = this.getNode(src[0], src[1]);
    srcNode.distance = 0;
    const q = [srcNode];
    let currentNode;
    while(q.length) {
      currentNode = q.pop();
      // this.drawMap(currentNode);
      // debugger;
      if (currentNode.x == target[0] && currentNode.y == target[1]) {
        steps = currentNode.distance;
        break;
      }
      const neighbours = this.getNodesAround(currentNode.x, currentNode.y);
      neighbours.forEach(n => {
        if (!n.distance) {
          n.distance = currentNode.distance + 1;
          q.push(n);
        }
      });
    }
    return steps;
  }
}