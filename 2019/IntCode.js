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
  input = [];
  currentInputPos = 0;
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
  // note: Parameters that an instruction writes to will never be in immediate mode!
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
      const firstParam = this.ints[this.currentPos + 1];
      const secondParam = this.ints[this.currentPos + 2];
      const thirdParam = this.ints[this.currentPos + 3];

      const firstParamMode = Modes[strOp[2]]
      const secondParamMode = Modes[strOp[1]]
      const thirdParamMode = Modes[strOp[0]]

      const firstVal = firstParamMode.type == 'Position' ? this.ints[firstParam] : firstParam;
      const secondVal = secondParamMode.type == 'Position' ? this.ints[secondParam] : secondParam;

      let shouldIncreaseCurrentPos = true;
      // console.log(`currentPos: ${this.currentPos}, opNum: ${opNum}, item: ${this.ints[this.currentPos]}`);
      if (currentOp.type == 'Add') {
        this.ints[thirdParam] = firstVal + secondVal;
      } else if (currentOp.type == 'Multiply') {
        this.ints[thirdParam] = firstVal * secondVal;
      } else if (currentOp.type == 'Save') {
        if (this.input.length == 0) {
          console.error('Tried to save input but it is empty');
        }
        this.ints[firstParam] = this.input[this.currentInputPos];
        this.currentInputPos++;
        if (this.currentInputPos >= this.input.length) {
          this.currentInputPos = 0;
        }
      } else if (currentOp.type == 'Output') {
        if (firstParamMode.type == 'Position') {
          this.output.push(this.ints[firstParam])
        } else {
          this.output.push(firstParam);
        }
      } else if (currentOp.type == 'JumpIfTrue') {
        if (firstVal !== 0) {
          this.currentPos = secondVal;
          shouldIncreaseCurrentPos = false;
        }
      } else if (currentOp.type == 'JumpIfFalse') {
        if (firstVal === 0) {
          this.currentPos = secondVal;
          shouldIncreaseCurrentPos = false;
        }
      } else if (currentOp.type == 'LessThan') {
        if (firstVal < secondVal) {
          this.ints[thirdParam] = 1;
        } else {
          this.ints[thirdParam] = 0;
        }

      } else if (currentOp.type == 'Equals') {
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