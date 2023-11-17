import db from '../db.js';

const getAllStudentSchedules = async () => {
 const [rows] = await db.query('SELECT * FROM student_schedule');

 return rows;
};

const getStudentScheduleById = async (studentScheduleId) => {
 const [[rows]] = await db.query(
  'SELECT * FROM student_schedule WHERE id = ?',
  [studentScheduleId]
 );

 return rows;
};

const deleteStudentSchedule = async (studentScheduleId) => {
 const [{ affectedRows }] = await db.query(
  'DELETE FROM student_schedule WHERE id = ?',
  [studentScheduleId]
 );

 return affectedRows;
};

const addOrEditStudentSchedule = async (obj, studentScheduleId = 0) => {
 const [[[{ affectedRows }]]] = await db.query(
  'CALL usp_student_schedule_add_or_edit(?,?,?)',
  [studentScheduleId, obj.student_id, obj.schedule_id]
 );

 return affectedRows;
};

export default {
 getAllStudentSchedules,
 getStudentScheduleById,
 deleteStudentSchedule,
 addOrEditStudentSchedule,
};
