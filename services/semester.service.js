import db from '../db.js';

const getAllSemesters = async () => {
 const [rows] = await db.query('SELECT * FROM semester');

 return rows;
};

const getSemesterById = async (semesterId) => {
 const [[rows]] = await db.query('SELECT * FROM semester WHERE id = ?', [
  semesterId,
 ]);

 return rows;
};

const deleteSemester = async (semesterId) => {
 const [{ affectedRows }] = await db.query(
  'DELETE FROM semester WHERE id = ?',
  [semesterId]
 );

 return affectedRows;
};

const addOrEditSemester = async (obj, semesterId = 0) => {
 const [[[{ affectedRows }]]] = await db.query(
  'CALL usp_semester_add_or_edit(?,?,?)',
  [semesterId, obj.year, obj.period]
 );

 return affectedRows;
};

export default {
 getAllSemesters,
 getSemesterById,
 deleteSemester,
 addOrEditSemester,
};
