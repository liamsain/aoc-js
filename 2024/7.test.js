import { expect, test, describe } from "bun:test"
import { getOperatorCombos, atLeastOneEquationMakesTestVal } from './7.js';
describe('day7', () => {
  test('getOperatorCombos length', () => {
    const one = getOperatorCombos(1);
    expect(one.length).toBe(2);

    const two = getOperatorCombos(2);
    expect(two.length).toBe(4);

    const three = getOperatorCombos(3);
    expect(three.length).toBe(8);

    const four = getOperatorCombos(4);
    expect(four.length).toBe(14);

    const five = getOperatorCombos(5);
    expect(five.length).toBe(22);


  });
  test('getOperatorCombos contents', () => {
    const res = getOperatorCombos(5);
    expect(res[0]).toStrictEqual('*****')
    expect(res[1]).toStrictEqual('+****')
    expect(res[2]).toStrictEqual('*+***')
    expect(res[3]).toStrictEqual('**+**')
    expect(res[4]).toStrictEqual('***+*')
    expect(res[5]).toStrictEqual('****+')
    expect(res[6]).toStrictEqual('++***')
    expect(res[7]).toStrictEqual('*++**')
    expect(res[8]).toStrictEqual('**++*')
    expect(res[9]).toStrictEqual('***++')
    expect(res[10]).toStrictEqual('+++**')
    expect(res[11]).toStrictEqual('*+++*')
    expect(res[12]).toStrictEqual('**+++')
    expect(res[13]).toStrictEqual('++++*')
    expect(res[14]).toStrictEqual('*++++')
    expect(res[15]).toStrictEqual('+++++')
  });

  const nums = [11, 24, 36, 42, 58]
  test.each([23151744, // ****
    3069360, // +***
    730800, // *+**
    553668, // **+*
    399226, // ***+
    172956, // ++**
    19836, // *++*
    9604, // **++
    6554, //+++*
    400, // *+++
    171, // ++++
    1360,// +*++
    3040, // ++*+
    52978// +**+
  ])('test val is found', (testVal) => {

    expect(atLeastOneEquationMakesTestVal(nums, testVal)).toBe(true);
  })
});