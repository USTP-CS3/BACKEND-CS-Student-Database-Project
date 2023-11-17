// const db = require('../db');

import db from '../db.js';

const getAllStudents = async () => {
 const [rows] = await db.query('SELECT * FROM student');

 return rows;
};

const getStudentById = async (studentId) => {
 const [[rows]] = await db.query('SELECT * FROM student WHERE id = ?', [
  studentId,
 ]);

 return rows;
};

const deleteStudent = async (studentId) => {
 const [{ affectedRows }] = await db.query('DELETE FROM student WHERE id = ?', [
  studentId,
 ]);

 return affectedRows;
};

const addOrEditStudent = async (obj, studentId = 0) => {
 console.log(obj);
 console.log(studentId);
 const [[[{ affectedRows }]]] = await db.query(
  'CALL usp_student_add_or_edit(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
  [
   studentId,
   obj.first_name,
   obj.last_name,
   obj.middle_initial,
   obj.age,
   obj.gender,
   obj.year_level,
   obj.nationality,
   obj.department,
   obj.college,
   obj.email,
   obj.contact_no,
  ]
 );

 return affectedRows;
};

export default {
 getAllStudents,
 getStudentById,
 deleteStudent,
 addOrEditStudent,
};
