import db from '../db.js';

const getAllSchedules = async () => {
 const [rows] = await db.query('SELECT * FROM schedule');

 return rows;
};

const getScheduleById = async (scheduleId) => {
 const [[rows]] = await db.query('SELECT * FROM schedule WHERE id = ?', [
  scheduleId,
 ]);

 return rows;
};

const deleteSchedule = async (scheduleId) => {
 const [{ affectedRows }] = await db.query(
  'DELETE FROM schedule WHERE id = ?',
  [scheduleId]
 );

 return affectedRows;
};

const addOrEditSchedule = async (obj, scheduleId = 0) => {
 const [[[{ affectedRows }]]] = await db.query(
  'CALL usp_schedule_add_or_edit(?,?,?,?,?,?,?,?,?)',
  [
   scheduleId,
   obj.semester_id,
   obj.subject_id,
   obj.section_id,
   obj.faculty_id,
   obj.room_id,
   obj.day,
   obj.start_time,
   obj.end_time,
  ]
 );

 return affectedRows;
};

export default {
 getAllSchedules,
 getScheduleById,
 deleteSchedule,
 addOrEditSchedule,
};
