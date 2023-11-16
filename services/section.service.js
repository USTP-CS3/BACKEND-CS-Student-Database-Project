import db from '../db.js';

const getAllSections = async () => {
 const [rows] = await db.query('SELECT * FROM section');

 return rows;
};

const getSectionById = async (sectionId) => {
 const [[rows]] = await db.query('SELECT * FROM section WHERE id = ?', [
  sectionId,
 ]);

 return rows;
};

const deleteSection = async (sectionId) => {
 const [{ affectedRows }] = await db.query('DELETE FROM section WHERE id = ?', [
  sectionId,
 ]);

 return affectedRows;
};

const addOrEditSection = async (obj, sectionId = 0) => {
 const [[[{ affectedRows }]]] = await db.query(
  'CALL usp_section_add_or_edit(?,?)',
  [sectionId, obj.department_id]
 );

 return affectedRows;
};

export default {
 getAllSections,
 getSectionById,
 deleteSection,
 addOrEditSection,
};
