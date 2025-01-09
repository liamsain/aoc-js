export const OpTypes = {
  Add: 'Add',
  Multiply: 'Multiply',
  Save: 'Save',
  Output: 'Output',
  JumpIfTrue: 'JumpIfTrue',
  JumpIfFalse: 'JumpIfFalse',
  LessThan: 'LessThan',
  Equals: 'Equals',
  RelativeBaseChange: 'RelativeBaseChange'
};
export const Operations = {
  1: {
    type: OpTypes.Add,
    opLength: 4
  },
  2: {
    type: OpTypes.Multiply,
    opLength: 4
  },
  3: {
    type: OpTypes.Save,
    opLength: 2
  },
  4: {
    type: OpTypes.Output,
    opLength: 2
  },
  5: {
    type: OpTypes.JumpIfTrue,
    opLength: 3
  },
  6: {
    type: OpTypes.JumpIfFalse,
    opLength: 3
  },
  7: {
    type: OpTypes.LessThan,
    opLength: 4
  },
  8: {
    type: OpTypes.Equals,
    opLength: 4
  },
  9: {
    type: OpTypes.RelativeBaseChange,
    opLength: 2
  }
};
export const ModeTypes = {
  Position: 'Position',
  Immediate: 'Immediate',
  Relative: 'Relative'
}
export const Modes = {
  0: {
    type: ModeTypes.Position
  },
  1: {
    type: ModeTypes.Immediate
  },
  2: {
    type: ModeTypes.Relative
  }
}