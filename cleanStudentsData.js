const fs = require('fs');

const INPUT_PATH = process.argv[2] || './studentsRaw.txt';
const OUTPUT_PATH = process.argv[3] || 'studentsCleaned.json';

const studentsRawFileContents = fs.readFileSync(INPUT_PATH, {
  encoding: 'utf-8',
});

const studentLines = studentsRawFileContents.split('\n');
const studentEntriesCleaned = [];
for (let i = 0; i < studentLines.length; i += 1) {
  const currentStudentLineParts = studentLines[i].split(' ');
  if (currentStudentLineParts.length === 2) {
    studentEntriesCleaned.push({
      firstName: currentStudentLineParts[0],
      lastName: currentStudentLineParts[1],
    });
  } else if (currentStudentLineParts.length === 3) {
    studentEntriesCleaned.push({
      firstName: currentStudentLineParts[1],
      lastName: currentStudentLineParts[2],
    });
  }
}

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(studentEntriesCleaned));

console.log('Done !');
