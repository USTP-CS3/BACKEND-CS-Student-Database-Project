import db from '../db.js';

const getAllFaculties = async () => {
 const [rows] = await db.query('SELECT * FROM faculty');
 console.log(rows);

 return rows;
};

const getFacultyById = async (facultyId) => {
 const [[rows]] = await db.query('SELECT * FROM faculty WHERE id = ?', [
  facultyId,
 ]);

 return rows;
};

const deleteFaculty = async (facultyId) => {
 const [{ affectedRows }] = await db.query('DELETE FROM faculty WHERE id = ?', [
  facultyId,
 ]);

 return affectedRows;
};

const addOrEditFaculty = async (obj, facultyId = 0) => {
 const [[[{ affectedRows }]]] = await db.query(
  'CALL usp_faculty_add_or_edit(?,?,?)',
  [obj.id, obj.first_name, obj.last_name]
 );

 return affectedRows;
};

export default {
 getAllFaculties,
 getFacultyById,
 deleteFaculty,
 addOrEditFaculty,
};
