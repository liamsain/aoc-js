export const OperationTypes = {
  Add: 'Add',
  Multiply: 'Multiply',
  Save: 'Save',
  Output: 'Output',
  JumpIfTrue: 'JumpIfTrue',
  JumpIfFalse: 'JumpIfFalse',
  LessThan: 'LessThan',
  Equals: 'Equals'
};
export const Operations = {
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
export const ModeTypes = {
  Position: 'Position',
  Immediate: 'Immediate'
}
export const Modes = {
  0: {
    type: ModeTypes.Position
  },
  1: {
    type: ModeTypes.Immediate
  }
}