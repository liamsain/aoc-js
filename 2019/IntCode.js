const Operations = {
  1: {
    type: 'Add',
    opLength: 4
  },
  2: {
    type: 'Multiply',
    opLength: 4
  }
};

const Modes = {

}
export default class IntCode {
  mode = 1;
  currentPos = 0;
  ints = [];
  constructor(ints) {
    this.ints = [...ints];
    this.programLength = this.ints.length;
  }
  reset(ints) {
    this.ints = [...ints];
    this.currentPos = 0;
  }

  compute() {
    while (this.currentPos < this.programLength) {
      const currentNum = this.ints[this.currentPos];
      if (currentNum == 99) {
        break;
      }
      const currentOp = Operations[currentNum];
      if (currentOp.type == 'Add') {
        const firstIndex = this.ints[this.currentPos + 1];
        const secondIndex = this.ints[this.currentPos + 2];
        const destIndex = this.ints[this.currentPos + 3]; 
        this.ints[destIndex] = this.ints[firstIndex] + this.ints[secondIndex];
      } else if (currentOp.type == 'Multiply') {
        const firstIndex = this.ints[this.currentPos + 1];
        const secondIndex = this.ints[this.currentPos + 2];
        const destIndex = this.ints[this.currentPos + 3]; 
        this.ints[destIndex] = this.ints[firstIndex] * this.ints[secondIndex];
      }
      this.currentPos += currentOp.opLength;
    }
    return this.ints;
  }
}