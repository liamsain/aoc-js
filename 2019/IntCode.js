import { Operations, Modes, OperationTypes, ModeTypes } from './IntCodeTypes.js';

export default class IntCode {
  currentProgramPos = 0;
  ints = [];
  originalInts = [];
  output = [];
  input = [];
  currentInputPos = 0;
  constructor(ints, input = []) {
    this.ints = [...ints];
    this.originalInts = [...ints];
    this.programLength = this.ints.length;
    this.input = input;
  }
  reset() {
    this.ints = [...this.originalInts];
    this.currentProgramPos = 0;
    this.currentInputPos = 0;
  }
  // note: Parameters that an instruction writes to will never be in immediate mode!
  compute() {
    while (this.currentProgramPos < this.programLength - 1) {
      const currentNum = this.ints[this.currentProgramPos];
      if (currentNum == 99) {
        break;
      }
      const MaxOpLength = 5;
      const strNum = currentNum.toString()
      const strOp = strNum.padStart(MaxOpLength, '0')
      const opNum = Number(strOp.substring(3));
      const currentOp = Operations[opNum];
      const firstParam = this.ints[this.currentProgramPos + 1];
      const secondParam = this.ints[this.currentProgramPos + 2];
      const thirdParam = this.ints[this.currentProgramPos + 3];

      const firstParamMode = Modes[strOp[2]]
      const secondParamMode = Modes[strOp[1]]
      const thirdParamMode = Modes[strOp[0]]

      const firstVal = firstParamMode.type == ModeTypes.Position ? this.ints[firstParam] : firstParam;
      const secondVal = secondParamMode.type == ModeTypes.Position ? this.ints[secondParam] : secondParam;

      let shouldIncreaseCurrentPos = true;
      switch (currentOp.type) {
        case OperationTypes.Add:
          this.ints[thirdParam] = firstVal + secondVal;
          break;
        case OperationTypes.Multiply:
          this.ints[thirdParam] = firstVal * secondVal;
          break;
        case OperationTypes.Save:
          if (this.input.length == 0) {
            console.error('Tried to save input but it is empty');
          }
          this.ints[firstParam] = this.input[this.currentInputPos];
          this.currentInputPos++;
          if (this.currentInputPos >= this.input.length) {
            this.currentInputPos = 0;
          }
          break;
        case OperationTypes.Output:
          if (firstParamMode.type == ModeTypes.Position) {
            this.output.push(this.ints[firstParam])
          } else {
            this.output.push(firstParam);
          }

          break;
        case OperationTypes.JumpIfTrue:
          if (firstVal !== 0) {
            this.currentProgramPos = secondVal;
            shouldIncreaseCurrentPos = false;
          }

          break;
        case OperationTypes.JumpIfFalse:
          if (firstVal === 0) {
            this.currentProgramPos = secondVal;
            shouldIncreaseCurrentPos = false;
          }

          break;
        case OperationTypes.LessThan:
          this.ints[thirdParam] = firstVal < secondVal ? 1 : 0;
          break;
        case OperationTypes.Equals:
          this.ints[thirdParam] = firstVal == secondVal ? 1 : 0
          break;
        default:
          break;
      }
      if (shouldIncreaseCurrentPos) {
        this.currentProgramPos += currentOp.opLength;
      }
    }
  }
}