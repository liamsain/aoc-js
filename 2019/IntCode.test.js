import { expect, test, describe, it } from "bun:test"
import IntCode from './IntCode';

describe('IntCode', () => {
  it('Correctly transforms add and multiply programs', () => {
    const tests = [
      {
        input: [1,0,0,0,99],
        expected: [2,0,0,0,99]
      },
      {
        input: [2,3,0,3,99],
        expected: [2,3,0,6,99]
      },
      {
        input: [2,4,4,5,99,0],
        expected: [2,4,4,5,99,9801]
      },
      {
        input: [1,1,1,4,99,5,6,0,99],
        expected: [30,1,1,4,2,5,6,0,99]
      },

    ];
    tests.forEach(t => {
      const ic = new IntCode(t.input);
      const output = ic.compute();
      expect(output).toStrictEqual(t.expected);
    });
  });
});