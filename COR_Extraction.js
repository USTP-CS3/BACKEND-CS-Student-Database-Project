const pdf = require('pdf-parse');
const fs = require('fs');
const db = require('./db');
let dataBuffer = fs.readFileSync('./cor-pdfs/BALILING_COMSCI-LEAD.pdf');

pdf(dataBuffer).then(async (data) => {
 const studentInfo = data.text.split('\n');

 const parsedData = {
  studentGenInfo: {
   studentId: studentInfo[18],
   names: studentInfo[19].split(' '),
   gender: studentInfo[20],
   age: studentInfo[21],
   college: studentInfo[22],
   program: studentInfo[23],
   major: studentInfo[24],
   yearLevel: studentInfo[25],
   curriculum: studentInfo[26],
   nationality: studentInfo[30].split(':')[1],
  },
  registrationInfo: {
   documentTitle: studentInfo[3],
   registrationNo: studentInfo[17],
  },
  //   courseInfo: {
  //    faculty: studentInfo[36],
  //    subject: studentInfo[37],
  //    units: getUnits(studentInfo[38]),
  //   },
 };

 console.log(parsedData.studentGenInfo);
 console.log(parsedData.registrationInfo);

 // Store in database
 try {
  await storeInDatabase(parsedData.studentGenInfo);
  console.log('Data stored successfully');
 } catch (error) {
  console.error('Error storing data', error);
 }
});

function getUnits(units) {
 let totalUnits = 0;
 units.split('').forEach((unit) => {
  totalUnits += parseInt(unit);
 });

 return totalUnits;
}

async function storeInDatabase(studentGenInfo) {
 const sql = `
        INSERT INTO student
        (id, first_name, last_name, gender, age, year_level, nationality)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

 let gender;
 if (studentGenInfo.gender === 'M') {
  gender = 'Male';
 } else {
  gender = 'Female';
 }

 const values = [
  parseInt(studentGenInfo.studentId),
  studentGenInfo.names[0],
  studentGenInfo.names[1] + ' ' + studentGenInfo.names[2],
  gender,
  parseInt(studentGenInfo.age),
  parseInt(studentGenInfo.yearLevel),
  studentGenInfo.nationality,
 ];

 console.log(values);

 try {
  const result = await db.executeQuery(sql, values);
  console.log('Insert result:', result);
 } catch (err) {
  console.error('Insert failed:', err);
  throw err; // or handle error as you see fit
 }
}
