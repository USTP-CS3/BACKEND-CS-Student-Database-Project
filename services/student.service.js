const db = require('../db');

module.exports.getAllStudents = async () => {
 const [rows] = await db.query('SELECT * FROM student');

 return rows;
};

module.exports.getStudentById = async (studentId) => {
 const [[rows]] = await db.query('SELECT * FROM student WHERE id = ?', [
  studentId,
 ]);

 return rows;
};

module.exports.deleteStudent = async (studentId) => {
 const [{ affectedRows }] = await db.query('DELETE FROM student WHERE id = ?', [
  studentId,
 ]);

 return affectedRows;
};

module.exports.addOrEditStudent = async (obj, studentId = 0) => {
 console.log(obj);
 const [[[{ affectedRows }]]] = await db.query(
  'CALL usp_student_add_or_edit(?, ?, ?, ?, ?, ?, ?, ?, ?)',
  [
   studentId,
   obj.track_id,
   obj.first_name,
   obj.last_name,
   obj.nationality,
   obj.birthday,
   obj.sex,
   obj.email,
   obj.phone,
  ]
 );

 return affectedRows;
};
