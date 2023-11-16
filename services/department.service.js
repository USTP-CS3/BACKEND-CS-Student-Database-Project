import db from '../db.js';

const getAllDepartments = async () => {
 const [rows] = await db.query('SELECT * FROM department');

 return rows;
};

const getDepartmentById = async (departmentId) => {
 const [[rows]] = await db.query('SELECT * FROM department WHERE id = ?', [
  departmentId,
 ]);

 return rows;
};

const deleteDepartment = async (departmentId) => {
 const [{ affectedRows }] = await db.query(
  'DELETE FROM department WHERE id = ?',
  [departmentId]
 );

 return affectedRows;
};

const addOrEditDepartment = async (obj, departmentId = 0) => {
 const [[[{ affectedRows }]]] = await db.query(
  'CALL usp_department_add_or_edit(?,?,?,?)',
  [departmentId, obj.name, obj.college, obj.campus]
 );

 return affectedRows;
};

export default {
 getAllDepartments,
 getDepartmentById,
 deleteDepartment,
 addOrEditDepartment,
};
