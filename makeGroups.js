const fs = require('fs');
const yargs = require('yargs');
const { shuffle } = require('lodash');
const chalk = require('chalk');

const parsedCLIArguments = yargs
  .option('input-file', {
    alias: 'i',
    type: 'string',
    demandOption: true,
    describe: 'set how many student maximum will be in each group',
  })
  .option('students-per-group', {
    alias: 'n',
    type: 'number',
    describe: 'set how many student maximum will be in each group',
    number: true,
    demandOption: true,
    default: 5,
  })
  .option('even-groups', {
    alias: 'e',
    type: 'boolean',
    default: true,
    describe: 'should the algorithm try to make even groups ?',
  })
  .option('shuffle', {
    alias: 's',
    type: 'boolean',
    default: true,
    describe: 'should the algorithm shuffle students ?',
  }).argv;

const studentFileContent = fs.readFileSync(parsedCLIArguments.i, {
  encoding: 'utf-8',
});

let students = JSON.parse(studentFileContent);

if (parsedCLIArguments.s) {
  students = shuffle(students);
}

const studentsPerGroup = parsedCLIArguments.n;

const groups = [];
let currentGroupIndex = 0;

if (parsedCLIArguments.e) {
  const numberOfGroups = Math.floor(students.length / parsedCLIArguments.n);
  for (let i = 0; i < students.length; i += 1) {
    if (!groups[currentGroupIndex]) {
      groups[currentGroupIndex] = [];
    }

    groups[currentGroupIndex].push(students[i]);

    if (currentGroupIndex < numberOfGroups - 1) {
      currentGroupIndex += 1;
    } else {
      currentGroupIndex = 0;
    }
  }
} else {
  for (let i = 0; i < students.length; i += 1) {
    if (i % studentsPerGroup === 0) {
      currentGroupIndex += 1;
    }
    if (!groups[currentGroupIndex]) {
      groups[currentGroupIndex] = [];
    }
    groups[currentGroupIndex].push(students[i]);
  }
}

for (let i = 0; i < groups.length; i += 1) {
  console.log(
    chalk.underline(chalk.yellow(`${i !== 0 ? '\n' : ''}Group n° ${i + 1} :`))
  );
  for (let j = 0; j < groups[i].length; j += 1) {
    console.log(
      `${groups[i][j].firstName} ${groups[i][j].lastName
        .slice(0, 1)
        .toUpperCase()}.`
    );
  }
}
