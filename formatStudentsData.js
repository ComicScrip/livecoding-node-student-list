const fs = require('fs');

const studentsRawFileContents = fs.readFileSync('./studentsRaw.json', {
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

fs.writeFileSync('studentsFormatted.json', JSON.stringify(studentsFormatted));
