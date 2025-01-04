const Operations = {
  1: {
    type: 'Add',
    opLength: 4
  },
  2: {
    type: 'Multiply',
    opLength: 4
  },
  3: {
    type: 'Save',
    opLength: 2
  },
  4: {
    type: 'Output',
    opLength: 2
  },
  5: {
    type: 'JumpIfTrue',
    opLength: 3
  },
  6: {
    type: 'JumpIfFalse',
    opLength: 3
  },
  7: {
    type: 'LessThan',
    opLength: 4
  },
  8: {
    type: 'Equals',
    opLength: 4
  }
};

const Modes = {
  0: {
    type: 'Position'
  },
  1: {
    type: 'Immediate'
  }
}
export default class IntCode {
  currentPos = 0;
  ints = [];
  originalInts = [];
  output = [];
  input = undefined;
  constructor(ints, input) {
    this.ints = [...ints];
    this.originalInts = [...ints];
    this.programLength = this.ints.length;
    if (input) {
      this.input = input;
    }
  }
  reset() {
    this.ints = [...this.originalInts];
    this.currentPos = 0;
  }

  compute() {
    while (this.currentPos < this.programLength) {
      const currentNum = this.ints[this.currentPos];
      if (currentNum == 99) {
        break;
      }
      const MaxOpLength = 5;
      const strNum = currentNum.toString()
      const strOp = strNum.padStart(MaxOpLength, '0')
      const opNum = Number(strOp.substring(3));
      const currentOp = Operations[opNum];
      const firstParamMode = Modes[strOp[2]]
      const secondParamMode = Modes[strOp[1]]
      const thirdParamMode = Modes[strOp[0]]
      let shouldIncreaseCurrentPos = true;
      // console.log(`currentPos: ${this.currentPos}, opNum: ${opNum}, item: ${this.ints[this.currentPos]}`);
      if (currentOp.type == 'Add') {
        const firstParam = this.ints[this.currentPos + 1];
        const secondParam = this.ints[this.currentPos + 2];
        const firstVal = firstParamMode.type == 'Position' ? this.ints[firstParam] : firstParam;
        const secondVal = secondParamMode.type == 'Position' ? this.ints[secondParam] : secondParam;
        const destIndex = this.ints[this.currentPos + 3];
        this.ints[destIndex] = firstVal + secondVal;
      } else if (currentOp.type == 'Multiply') {
        const firstParam = this.ints[this.currentPos + 1];
        const secondParam = this.ints[this.currentPos + 2];
        const firstVal = firstParamMode.type == 'Position' ? this.ints[firstParam] : firstParam;
        const secondVal = secondParamMode.type == 'Position' ? this.ints[secondParam] : secondParam;
        const destIndex = this.ints[this.currentPos + 3];
        this.ints[destIndex] = firstVal * secondVal;
      } else if (currentOp.type == 'Save') {
        if (this.input !== undefined) {
          const firstParam = this.ints[this.currentPos + 1];
          if (firstParamMode.type == 'Position') {
            this.ints[firstParam] = this.input;
          } else {
            console.log('unhandled');
          }
          // const indexToSet = this.ints[this.currentPos + 1];
          // this.ints[indexToSet] = this.input;
          // this.ints[firstVal] = this.input;
        }
      } else if (currentOp.type == 'Output') {
        const firstParam = this.ints[this.currentPos + 1];
        if (firstParamMode.type == 'Position') {
          this.output.push(this.ints[firstParam])
        } else {
          this.output.push(firstParam);
        }
      } else if (currentOp.type == 'JumpIfTrue') {
        const firstParam = this.ints[this.currentPos + 1];
        const secondParam = this.ints[this.currentPos + 2];
        const firstVal = firstParamMode.type == 'Position' ? this.ints[firstParam] : firstParam;
        const secondVal = secondParamMode.type == 'Position' ? this.ints[secondParam] : secondParam;
        if (firstVal !== 0) {
          this.currentPos = secondVal;
          shouldIncreaseCurrentPos = false;
        }
      } else if (currentOp.type == 'JumpIfFalse') {
        const firstParam = this.ints[this.currentPos + 1];
        const secondParam = this.ints[this.currentPos + 2];
        const firstVal = firstParamMode.type == 'Position' ? this.ints[firstParam] : firstParam;
        const secondVal = secondParamMode.type == 'Position' ? this.ints[secondParam] : secondParam;
        if (firstVal === 0) {
          this.currentPos = secondVal;
          shouldIncreaseCurrentPos = false;
        }
      } else if (currentOp.type == 'LessThan') {
        const firstParam = this.ints[this.currentPos + 1];
        const secondParam = this.ints[this.currentPos + 2];
        const thirdParam = this.ints[this.currentPos + 3];
        const firstVal = firstParamMode.type == 'Position' ? this.ints[firstParam] : firstParam;
        const secondVal = secondParamMode.type == 'Position' ? this.ints[secondParam] : secondParam;
        // const thirdVal = thirdParamMode.type == 'Position' ? this.ints[thirdParam] : thirdParam;
        if (firstVal < secondVal) {
          this.ints[thirdParam] = 1;
        } else {
          this.ints[thirdParam] = 0;
        }

      } else if (currentOp.type == 'Equals') {
        const firstParam = this.ints[this.currentPos + 1];
        const secondParam = this.ints[this.currentPos + 2];
        const thirdParam = this.ints[this.currentPos + 3];
        const firstVal = firstParamMode.type == 'Position' ? this.ints[firstParam] : firstParam;
        const secondVal = secondParamMode.type == 'Position' ? this.ints[secondParam] : secondParam;
        // const thirdVal = thirdParamMode.type == 'Position' ? this.ints[thirdParam] : thirdParam;
        if (firstVal == secondVal) {
          this.ints[thirdParam] = 1;
        } else {
          this.ints[thirdParam] = 0;
        }
      } else {
        break;
      }
      if (shouldIncreaseCurrentPos) {
        this.currentPos += currentOp.opLength;
      }
    }
    return this.ints;
  }
}