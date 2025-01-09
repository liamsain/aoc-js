import { Operations, Modes, OpTypes, ModeTypes } from './IntCodeTypes.js';
export default class IntCode {
  currentProgramPos = 0;
  relativeBase = 0;
  ints = [];
  output = [];
  input = [];
  paused = false;
  halted = false;
  constructor(ints, input = []) {
    this.ints = [...ints, ...Array(ints.length * 10).fill(0)];
    this.programLength = this.ints.length;
    this.input = [...input];
  }
  pushInputAndContinue(input = []) {
    this.input.push(...input);
    this.paused = false;
    this.compute();
  }
  get lastOutput() {
    return this.output[this.output.length - 1];
  }
  compute() {
    while (true) {
      const currentNum = this.ints[this.currentProgramPos];
      if (currentNum == 99 || this.currentProgramPos >= this.programLength - 1) {
        this.halted = true;
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

      const getParamVal = (param, paramMode) => {
        if (paramMode.type == ModeTypes.Position) {
          return this.ints[param];
        } else if (paramMode.type == ModeTypes.Immediate) {
          return param;
        } else if (paramMode.type == ModeTypes.Relative) {
          return this.ints[this.relativeBase + param];
        }
      }
      const firstVal = getParamVal(firstParam, firstParamMode);
      const secondVal = getParamVal(secondParam, secondParamMode);
      // note: Parameters that an instruction writes to will never be in immediate mode!
      const thirdVal = thirdParamMode.type == ModeTypes.Relative ? this.relativeBase + thirdParam : thirdParam;

      let shouldIncreaseCurrentPos = true;
      switch (currentOp.type) {
        case OpTypes.Add:
          this.ints[thirdVal] = firstVal + secondVal;
          break;
        case OpTypes.Multiply:
          this.ints[thirdVal] = firstVal * secondVal;
          break;
        case OpTypes.Save:
          if (this.input.length === 0) {
            this.paused = true;
            break;
          }
          if (firstParamMode.type == ModeTypes.Relative) {
            this.ints[this.relativeBase + firstParam] = this.input.shift();
          } else {
            this.ints[firstParam] = this.input.shift();
          }
          break;
        case OpTypes.Output:
          if (firstParamMode.type == ModeTypes.Relative) {
            this.output.push(this.ints[firstParam + this.relativeBase]);
          } else if (firstParamMode.type == ModeTypes.Position) {
            this.output.push(this.ints[firstParam])
          } else {
            this.output.push(firstParam);
          }
          break;
        case OpTypes.JumpIfTrue:
          if (firstVal !== 0) {
            this.currentProgramPos = secondVal;
            shouldIncreaseCurrentPos = false;
          }
          break;
        case OpTypes.JumpIfFalse:
          if (firstVal === 0) {
            this.currentProgramPos = secondVal;
            shouldIncreaseCurrentPos = false;
          }
          break;
        case OpTypes.LessThan:
          this.ints[thirdVal] = firstVal < secondVal ? 1 : 0;
          break;
        case OpTypes.Equals:
          this.ints[thirdVal] = firstVal == secondVal ? 1 : 0
          break;
        case OpTypes.RelativeBaseChange:
          this.relativeBase += firstVal;
          break;
        default:
          this.halted = true;
          break;
      }
      if (this.paused) {
        break;
      }
      if (shouldIncreaseCurrentPos) {
        this.currentProgramPos += currentOp.opLength;
      }
    }
  }
}