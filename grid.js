
// {width, height, onCellClick, divId, blockedCellCount}
export function createHtmlGrid(arg) {
  let width = arg.width || 10;
  let height = arg.height || 10;
  const containerDiv = document.querySelector('#' + arg.divId);
  let blockedCellCount = arg.blockedCellCount || 0;
  while(blockedCellCount > 0) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    const cellDiv = containerDiv.children[y].children[x];
    if (!cellDiv.classList.contains('blocked')) {
      cellDiv.classList.add('blocked');
      blockedCellCount--;
    }
  }

  for (let y = 0; y < height;y++) {
    const rowDiv = document.createElement('div');
    rowDiv.style.display = 'flex';
    containerDiv.appendChild(rowDiv);
    for (let x = 0; x < width;x++) {
      const cellDiv = document.createElement('div');
      cellDiv.style.width = '15px';
      cellDiv.style.height = '15px';
      cellDiv.style.borderRight = '1px solid black';
      cellDiv.style.borderBottom = '1px solid black';
      cellDiv.style.cursor = 'pointer';
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