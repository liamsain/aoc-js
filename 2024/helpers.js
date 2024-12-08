export function simGuardStepsV2(buff, updateVisited = true, startIndex, lineLength, lastY, extraObstacleIndex) {
  let hesFallenOff = false;
  let hesStuck = false;
  const visited = [];
  let currentIndex = startIndex;

  const gridMap = {}; // key: '10 20 ^', value: true
  // assume that if x, y and dir are same again then he's stuck

  let ch = '^';
  const isStuck = () => {
    const k = `${currentIndex} ${ch}`;
    if (gridMap[k]) {
      return true; // hes stuck!
    } else {
      gridMap[k] = true;
    }
    if (updateVisited) {
      if (!visited.includes(currentIndex)) {
        visited.push(currentIndex);
      }
    }

  }
  // const draw = () => {
  //   let strs = '';
  //   for (let y = 0; y < lastY;y++) {
  //     let str = '';
  //     for (let x = 0; x < lineLength;x++) {
  //       const ind = (y * lineLength) + x;
  //       if (ind == currentIndex) {
  //         str += ch;
  //       } else {
  //         if (buff[ind] == 0) {
  //           str += '.'
  //         } else {
  //           str += '#';
  //         }
  //       }
  //     }
  //     strs += str;
  //     strs += '\n';
  //   }
  //   console.log(strs);
  // }

  while (!hesFallenOff && !hesStuck) {
    let testInd = 0;
    if (ch == '^') {
      if (currentIndex < lineLength) {
        hesFallenOff = true;
      } else {
        testInd = currentIndex - lineLength;
        if (buff[testInd] == 1 || (testInd == extraObstacleIndex)) {
          ch = '>';
        } else {
          currentIndex -= lineLength;
          hesStuck = isStuck();
        }
      }
    } else if (ch == '>') {
      if ((currentIndex + 1) % lineLength == 0) {
        hesFallenOff = true;
      } else {
        testInd = currentIndex + 1;
        if (buff[testInd] == 1 || (testInd == extraObstacleIndex)) {
          ch = 'v';
        } else {
          currentIndex += 1
          hesStuck = isStuck();
        }
      }
    } else if (ch == 'v') {
      if (currentIndex > (lineLength * lastY)) {
        hesFallenOff = true;
      } else {
        testInd = currentIndex + lineLength;
        if (buff[testInd] == 1 || (testInd == extraObstacleIndex)) {
          ch = '<'
        } else {
          currentIndex += lineLength;
          hesStuck = isStuck();
        }
      }
    } else {
      if (currentIndex % lineLength == 0) {
        hesFallenOff = true;
      } else {
        testInd = currentIndex - 1;
        if (buff[testInd] == 1 || (testInd == extraObstacleIndex)) {
          ch = '^';
        } else {
          currentIndex--;
          hesStuck = isStuck();
        }
      }
    }
  }

  return {
    hesFallenOff,
    hesStuck,
    visited,
  }

}

