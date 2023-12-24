import { getAdventOfCodeData } from '../node-utils.js';
const input = await getAdventOfCodeData(2023, 19);
// const input = `px{a<2006:qkq,m>2090:A,rfg}
// pv{a>1716:R,A}
// lnx{m>1548:A,A}
// rfg{s<537:gd,x>2440:R,A}
// qs{s>3448:A,lnx}
// qkq{x<1416:A,crn}
// crn{x>2662:A,R}
// in{s<1351:px,qqz}
// qqz{s>2770:qs,m<1801:hdj,R}
// gd{a>3333:R,R}
// hdj{m>838:A,pv}

// {x=787,m=2655,a=1222,s=2876}
// {x=1679,m=44,a=2067,s=496}
// {x=2036,m=264,a=79,s=2244}
// {x=2461,m=1339,a=466,s=291}
// {x=2127,m=1623,a=2188,s=1013}`;

const start = performance.now();
const [workflows, parts] = input.split('\n\n');

const workflowDict = {};
workflows.split('\n').forEach(w => {
  let [label, content] = w.split('{');
  content = content.substring(0, content.length - 1);
  workflowDict[label] = content;
});


function getPartRating(part) {
  const partDict = {};
  part.substring(1, part.length - 1)
    .split(',')
    .forEach(el => {
      const [category, rating] = el.split('=');
      partDict[category] = parseInt(rating);
    });
  let result = 0;
  let currentKey = 'in';
  while (true) {
    if (currentKey == 'A') {
      result = partDict.x + partDict.m + partDict.a + partDict.s;
      break;
    } else if (currentKey == 'R') {
      break;
    }
    const instructions = workflowDict[currentKey].split(',');
    for (let ins of instructions) {
      const dest = ins.split(':')[1];
      if (ins.includes('<')) {
        const [cat, rest] = ins.split('<');
        const [val] = rest.split(':');
        if (partDict[cat] < parseInt(val)) {
          currentKey = dest;
          break;
        }
      } else if (ins.includes('>')) {
        const [cat, rest] = ins.split('>');
        const [val] = rest.split(':');
        if (partDict[cat] > parseInt(val)) {
          currentKey = dest;
          break;
        }
      } else {
        currentKey = ins;
        break;
      }
    }
  }
  return result;
}
const part1 = parts.split('\n').reduce((acc, val) => acc + getPartRating(val),0)


const end = performance.now();
console.log(part1);
console.log('time taken', end - start, 'ms');
