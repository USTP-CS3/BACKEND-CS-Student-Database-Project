import db from '../db.js';

const getAllSubjects = async () => {
 const [rows] = await db.query('SELECT * FROM subject');

 return rows;
};

const getSubjectById = async (subjectId) => {
 const [[rows]] = await db.query('SELECT * FROM subject WHERE id = ?', [
  subjectId,
 ]);

 return rows;
};

const deleteSubject = async (subjectId) => {
 const [{ affectedRows }] = await db.query('DELETE FROM subject WHERE id = ?', [
  subjectId,
 ]);

 return affectedRows;
};

const addOrEditSubject = async (obj, subjectId = 0) => {
 const [[[{ affectedRows }]]] = await db.query(
  'CALL usp_subject_add_or_edit(?,?,?,?,?,?)',
  [
   subjectId,
   obj.course_code,
   obj.description,
   obj.lecture_units,
   obj.lab_units,
   obj.credit_units,
  ]
 );

 return affectedRows;
};

export default {
 getAllSubjects,
 getSubjectById,
 deleteSubject,
 addOrEditSubject,
};
