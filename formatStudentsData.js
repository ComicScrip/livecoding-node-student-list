const fs = require('fs');
const yargs = require('yargs');

const parsedCLIArguments = yargs
  .option('input-file', {
    alias: 'i',
    type: 'string',
    demandOption: true,
    describe: 'the path of the file to extract raw data from',
  })
  .option('output-file', {
    alias: 'o',
    type: 'string',
    demandOption: true,
    describe: 'the path of the file used to put formatted data into',
  }).argv;

const studentsRawFileContents = fs.readFileSync(parsedCLIArguments.i, {
  encoding: 'utf-8',
});

const studentsRaw = JSON.parse(studentsRawFileContents);
const studentsFormatted = [];

for (let i = 0; i < studentsRaw.length; i += 1) {
  const currentStudentNameParts = studentsRaw[i].split(' ');
  studentsFormatted.push({
    firstName: currentStudentNameParts[0],
    lastName: currentStudentNameParts[1],
  });
}

fs.writeFileSync(parsedCLIArguments.o, JSON.stringify(studentsFormatted));
