import { expect, test, describe, it } from "bun:test"
import IntCode from './IntCode';

describe('IntCode', () => {
  it('Give correct output', () => {
    const tests = [
      {
        // Take input. save to pos 0, output pos 0. end
        ints: [3, 0, 4, 0, 99],
        input: [800],
        expected: [800]
      },

      {
        /* pos mode*/
        ints: [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
        input: [8],
        expected: [1]
      },
      {
        ints: [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
        input: [9],
        expected: [0]
      },
      {
        // output = 1 when input < 8
        ints: [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
        input: [7],
        expected: [1]
      },
      {
        // output = 1 when input < 8
        ints: [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
        input: [9],
        expected: [0]
      },
      {
        /*  The program will then output 999 if the input value is below 8,
            output 1000 if the input value is equal to 8,
            or output 1001 if the input value is greater than 8
        */
        ints: [3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31,
          1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104,
          999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99],
        input: [7],
        expected: [999]
      },
      {
        /*  The program will then output 999 if the input value is below 8,
            output 1000 if the input value is equal to 8,
            or output 1001 if the input value is greater than 8
        */
        ints: [3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31,
          1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104,
          999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99],
        input: [8],
        expected: [1000]
      },
      {
        /*  The program will then output 999 if the input value is below 8,
            output 1000 if the input value is equal to 8,
            or output 1001 if the input value is greater than 8
        */
        ints: [3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31,
          1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104,
          999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99],
        input: [9],
        expected: [1001]
      },

    ];
    tests.forEach(t => {
      const ic = new IntCode(t.ints, t.input);
      ic.compute();
      expect(ic.output).toStrictEqual(t.expected);
    });
  })
});