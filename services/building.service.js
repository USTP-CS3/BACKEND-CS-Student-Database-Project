import db from '../db.js';

const getAllBuildings = async () => {
 const [rows] = await db.query('SELECT * FROM building');

 return rows;
};

const getBuildingById = async (buildingId) => {
 const [[rows]] = await db.query('SELECT * FROM building WHERE id = ?', [
  buildingId,
 ]);

 return rows;
};

const deleteBuilding = async (buildingId) => {
 const [{ affectedRows }] = await db.query(
  'DELETE FROM building WHERE id = ?',
  [buildingId]
 );

 return affectedRows;
};

const addOrEditBuilding = async (obj, buildingId = 0) => {
 const [[[{ affectedRows }]]] = await db.query(
  'CALL usp_building_add_or_edit(?,?)',
  [buildingId, obj.name]
 );

 return affectedRows;
};

export default {
 getAllBuildings,
 getBuildingById,
 deleteBuilding,
 addOrEditBuilding,
};
