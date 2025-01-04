import { expect, test, describe, it } from "bun:test"
import IntCode from './IntCode';

describe('IntCode', () => {
  it('Correctly transforms add and multiply programs', () => {
    const tests = [
      {
        input: [1, 0, 0, 0, 99],
        expected: [2, 0, 0, 0, 99]
      },
      {
        input: [2, 3, 0, 3, 99],
        expected: [2, 3, 0, 6, 99]
      },
      {
        input: [2, 4, 4, 5, 99, 0],
        expected: [2, 4, 4, 5, 99, 9801]
      },
      {
        input: [1, 1, 1, 4, 99, 5, 6, 0, 99],
        expected: [30, 1, 1, 4, 2, 5, 6, 0, 99]
      },
      {
        // with an immediate mode param
        input: [1002, 4, 3, 4, 33],
        expected: [1002, 4, 3, 4, 99]
      },

    ];
    tests.forEach(t => {
      const ic = new IntCode(t.input);
      const output = ic.compute();
      expect(output).toStrictEqual(t.expected);
    });
  });
  it('Give correct output', () => {
    const tests = [
      {
        ints: [3, 0, 4, 0, 99],
        input: 800,
        expected: [800]
      },

      {
         /* pos mode*/
        ints: [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
        input: 8,
        expected: [1]
      },
      {
        ints: [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
        input: 9,
        expected: [0]
      },
      {
        // output = 1 when input < 8
        ints: [3,9,7,9,10,9,4,9,99,-1,8],
        input: 7,
        expected: [1]
      },
      {
        // output = 1 when input < 8
        ints: [3,9,7,9,10,9,4,9,99,-1,8],
        input: 9,
        expected: [0]
      },

    ];
    tests.forEach(t => {
      const ic = new IntCode(t.ints, t.input);
      ic.compute();
      expect(ic.output).toStrictEqual(t.expected);
    });
  })
});