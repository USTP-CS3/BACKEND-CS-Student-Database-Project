import db from '../db.js';

const getAllRooms = async () => {
 const [rows] = await db.query('SELECT * FROM room');

 return rows;
};

const getRoomById = async (roomId) => {
 const [[rows]] = await db.query('SELECT * FROM room WHERE id = ?', [roomId]);

 return rows;
};

const deleteRoom = async (roomId) => {
 const [{ affectedRows }] = await db.query('DELETE FROM room WHERE id = ?', [
  roomId,
 ]);

 return affectedRows;
};

const addOrEditRoom = async (obj, roomId = 0) => {
 const [[[{ affectedRows }]]] = await db.query(
  'CALL usp_room_add_or_edit(?,?,?,?,?)',
  [roomId, obj.description, obj.room_number, obj.floor_no, obj.building_id]
 );

 return affectedRows;
};

export default {
 getAllRooms,
 getRoomById,
 deleteRoom,
 addOrEditRoom,
};
