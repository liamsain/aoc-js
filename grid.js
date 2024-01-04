
// {width, height, onCellClick}
export function createHtmlGrid(arg) {
  let width = arg.width || 10;
  let height = arg.height || 10;
  const gridStyle = '';
  const rowStyle= 'display:flex;';
  const cellStyle = 'width: 20px;height: 20px;border: 1px solid black;';
  let htmlString = `<div style=${gridStyle}>`;
  for (let y = 0; y < height;y++) {
    let row = `<div style="${rowStyle}">`
    for (let x = 0; x < width;x++) {
      row += `<div style="${cellStyle}"></div>`;
    }
    row += '</div>'
    htmlString += row;
  }
  htmlString += '</div>';
  console.log(htmlString);
  return htmlString;
}