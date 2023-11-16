import db from '../db.js';

const getAllTracks = async () => {
 const [rows] = await db.query('SELECT * FROM track');

 return rows;
};

const getTrackById = async (trackId) => {
 const [[rows]] = await db.query('SELECT * FROM track WHERE id = ?', [trackId]);

 return rows;
};

const deleteTrack = async (trackId) => {
 const [{ affectedRows }] = await db.query('DELETE FROM track WHERE id = ?', [
  trackId,
 ]);

 return affectedRows;
};

const addOrEditTrack = async (obj, trackId = 0) => {
 const [[[{ affectedRows }]]] = await db.query(
  'CALL usp_track_add_or_edit(?,?)',
  [trackId, obj.name]
 );

 return affectedRows;
};

export default {
 getAllTracks,
 getTrackById,
 deleteTrack,
 addOrEditTrack,
};
