import { parseInput } from '../utils';

const lines = parseInput();

const startCrates: string[] = [];
let i = 0;
while (lines[i] !== '') {
  const line = lines[i];
  startCrates.push(line);
  i++;
}

startCrates.pop();
startCrates.reverse();

const stackIndexMap = {
  1: 1,
  5: 2,
  9: 3,
  13: 4,
  17: 5,
  21: 6,
  25: 7,
  29: 8,
  33: 9,
};

const stacks = new Map<number, string[]>(
  [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => [i, []]),
);

for (const line of startCrates) {
  for (const [lineIndex, stackIndex] of Object.entries(stackIndexMap)) {
    const crate = line[Number(lineIndex)];
    if (crate === ' ') {
      continue;
    }
    stacks.get(stackIndex)!.push(crate);
  }
}

for (const line of lines.slice(i + 1)) {
  const [numberToMove, fromStack, toStack] = /(\d+) from (\d+) to (\d+)/
    .exec(line)!
    .slice(1)
    .map(Number);
  const crates = stacks.get(fromStack)!.splice(-numberToMove);
  stacks.get(toStack)!.push(...crates);
}

console.log([...stacks.values()].map((stack) => stack.pop()).join(''));
