import express from 'express';
import db from './db.js';
import studentRoutes from './controllers/student.controller.js';
import facultyRoutes from './controllers/faculty.controller.js';
import scheduleRoutes from './controllers/schedule.controller.js';
import buildingRoutes from './controllers/building.controller.js';
import roomRoutes from './controllers/room.controller.js';
import subjectRoutes from './controllers/subject.controller.js';
import studentScheduleRoutes from './controllers/student_schedule.controller.js';
import 'express-async-errors';
import cors from 'cors';

const app = express();

const corsOptions = {
 origin: 'http://localhost:3000',
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/students', studentRoutes);
app.use('/api/faculties', facultyRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/buildings', buildingRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/student-schedules', studentScheduleRoutes);

app.use((err, req, res, next) => {
 console.log(err);
 res.status(err.status).send('Something went wrong!');
});

// Test db connection
const port = process.env.PORT || 3000;
db
 .query('SELECT 1')
 .then((data) => {
  console.log('db connection successful');
  app.listen(port, () => console.log(`Server listening on port ${port}!`));
 })
 .catch((err) => console.log('db connection failed', err));
