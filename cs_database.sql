CREATE DATABASE `csstudentdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE csstudentdb;


CREATE TABLE `building` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `faculty` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(45) DEFAULT NULL,
  `room_number` int DEFAULT NULL,
  `floor_no` int DEFAULT NULL,
  `building_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_RoomBuilding` (`building_id`),
  CONSTRAINT `FK_RoomBuilding` FOREIGN KEY (`building_id`) REFERENCES `building` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject_id` int DEFAULT NULL,
  `faculty_id` int DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  `section` varchar(10) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `weekday` varchar(20) DEFAULT NULL,
  `semester` int DEFAULT NULL,
  `year` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ScheduleSubject_idx` (`subject_id`),
  KEY `FK_ScheduleRoom_idx` (`room_id`),
  KEY `FK_ScheduleFaculty_idx` (`faculty_id`),
  CONSTRAINT `FK_ScheduleFaculty` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`id`),
  CONSTRAINT `FK_ScheduleRoom` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  CONSTRAINT `FK_ScheduleSubject` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `student` (
  `id` int NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `year_level` int DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `college` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contact_no` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `student_schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `schedule_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_StudentScheduleProfile` (`student_id`),
  KEY `FK_ScheduleStudentProfile` (`schedule_id`),
  CONSTRAINT `FK_ScheduleStudentProfile` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`),
  CONSTRAINT `FK_StudentScheduleProfile` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `subject` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_code` varchar(45) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `lecture_units` int DEFAULT NULL,
  `lab_units` int DEFAULT NULL,
  `credit_units` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




-- STORED PROCEDURES-------------------------------------------------------------------------------------------------



-- Student Table Procedure
DELIMITER $$
CREATE DEFINER=`{{MYSQL_USER}}`@`{{MYSQL_HOST}}` PROCEDURE `usp_student_add_or_edit`(
    IN _id INT,
    IN _track_id INT,
    IN _first_name VARCHAR(45),
    IN _last_name VARCHAR(45),
    IN _nationality VARCHAR(45),
    IN _birthday DATE,
    IN _gender ENUM('Male', 'Female'),
    IN _email VARCHAR(100),
    IN _phone VARCHAR(45),
    IN _year_level int,
    IN _age int,
    IN _section_id VARCHAR(10)
)
BEGIN
-- Insert new student or update existing one
    INSERT INTO Student (id, track_id, first_name, last_name, nationality, birthday, gender, email, phone, year_level, age, section_id)
    VALUES (_id, _track_id, _first_name, _last_name, _nationality, _birthday, _gender, _email, _phone, _year_level, _age, _section_id)
    ON DUPLICATE KEY UPDATE
        track_id = VALUES(track_id),
        first_name = VALUES(first_name),
        last_name = VALUES(last_name),
        nationality = VALUES(nationality),
        birthday = VALUES(birthday),
        gender = VALUES(gender),
        email = VALUES(email),
        phone = VALUES(phone),
        year_level = VALUES(year_level),
        age = VALUES(age),
        section_id = VALUES(section_id);

    SELECT ROW_COUNT() AS 'affectedRows';
END$$
DELIMITER ;



-- Faculty Table Procedure
DELIMITER $$
CREATE DEFINER=`{{MYSQL_USER}}`@`{{MYSQL_HOST}}` PROCEDURE `usp_faculty_add_or_edit`(
    IN _id INT,
    IN _first_name VARCHAR(45),
    IN _last_name VARCHAR(45)
)
BEGIN
    INSERT INTO faculty (id, first_name, last_name)
    VALUES (_id, _first_name, _last_name)
    ON DUPLICATE KEY UPDATE
        first_name = VALUES(first_name),
        last_name = VALUES(last_name);


    SELECT ROW_COUNT() AS 'affectedRows';
END$$

DELIMITER ;



-- Schedule Table Procedure
DELIMITER $$
CREATE DEFINER=`{{MYSQL_USER}}`@`{{MYSQL_HOST}}` PROCEDURE `usp_schedule_add_or_edit`(
    IN _id INT,
    IN _semester_id int,
    IN _subject_id int,
    IN _section_id varchar(10),
    IN _faculty_id int,
    IN _room_id varchar(10),
    IN _day varchar(20),
    IN _start_time time,
    IN _end_time time,
)
BEGIN
    INSERT INTO schedule (id, semester_id, subject_id, section_id, faculty_id, room_id, day, start_time, end_time)
    VALUES (_id, _semester_id, _subject_id, _section_id, _faculty_id, _room_id, _day, _start_time, _end_time)
    ON DUPLICATE KEY UPDATE
        semester_id = VALUES(semester_id),
        subject_id = VALUES(subject_id),
        section_id = VALUES(section_id),
        faculty_id = VALUES(faculty_id),
        room_id = VALUES(room_id),
        day = VALUES(day),
        start_time = VALUES(start_time),
        end_time = VALUES(end_time);

    SELECT ROW_COUNT() AS 'affectedRows';
END$$

DELIMITER ;


-- Department Table PROCEDURE

DELIMITER $$
CREATE DEFINER=`{{MYSQL_USER}}`@`{{MYSQL_HOST}}` PROCEDURE `usp_department_add_or_edit`(
    IN _id INT,
    IN _name VARCHAR(255),
    IN _college VARCHAR(255),
    IN _campus VARCHAR(255)
)
BEGIN
    INSERT INTO department (id, name, college, campus)
    VALUES (_id, _name, _college, _campus)
    ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        college = VALUES(college),
        campus = VALUES(campus);

    SELECT ROW_COUNT() AS 'affectedRows';
END$$

DELIMITER ;


-- Section Table PROCEDURE
DELIMITER $$
CREATE DEFINER=`{{MYSQL_USER}}`@`{{MYSQL_HOST}}` PROCEDURE `usp_section_add_or_edit`(
    IN _id VARCHAR(10),
    IN _department_id INT
)
BEGIN
    INSERT INTO section (id, department_id)
    VALUES (_id, _department_id)
    ON DUPLICATE KEY UPDATE
      department_id = VALUES(department_id);

    SELECT ROW_COUNT() AS 'affectedRows';
END$$

DELIMITER ;


-- Building Table PROCEDURE
DELIMITER $$
CREATE DEFINER=`{{MYSQL_USER}}`@`{{MYSQL_HOST}}` PROCEDURE `usp_building_add_or_edit`(
    IN _id INT,
    IN _name VARCHAR(255)
)
BEGIN
    INSERT INTO building (id, name)
    VALUES (_id, _name)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name);

    SELECT ROW_COUNT() AS 'affectedRows';
END$$

DELIMITER ;



-- Room Table PROCEDURE


DELIMITER $$

CREATE DEFINER=`{{MYSQL_USER}}`@`{{MYSQL_HOST}}` PROCEDURE `usp_room_add_or_edit`(
    IN _id VARCHAR(10),
    IN _building_id INT,
    IN _floor INT,
    IN _number INT
)
BEGIN
    INSERT INTO building (id, building_id, floor, number)
    VALUES (_id, _building_id, _floor, _number)
    ON DUPLICATE KEY UPDATE
      building_id = VALUES(building_id),
      floor = VALUES(floor),
      number = VALUES(number);
      
    SELECT ROW_COUNT() AS 'affectedRows';
END$$
DELIMITER ;

-- Track Table PROCEDURE

DELIMITER $$
CREATE DEFINER=`{{MYSQL_USER}}`@`{{MYSQL_HOST}}` PROCEDURE `usp_track_add_or_edit`(
    IN _id INT,
    IN _name VARCHAR(255)
)
BEGIN
    INSERT INTO track (id, name)
    VALUES (_id, _name)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name);
      
    SELECT ROW_COUNT() AS 'affectedRows';
END$$
DELIMITER ;

-- Semester Table PROCEDURE

DELIMITER $$
CREATE DEFINER=`{{MYSQL_USER}}`@`{{MYSQL_HOST}}` PROCEDURE `usp_semester_add_or_edit`(
    IN _id INT,
    IN _year INT,
    IN _period VARCHAR(10)
)
BEGIN
    INSERT INTO semester (id, year, period)
    VALUES (_id, _year, _period)
    ON DUPLICATE KEY UPDATE
      year = VALUES(year),
      period = VALUES(period);      
    SELECT ROW_COUNT() AS 'affectedRows';
END$$
DELIMITER ;


-- Subject Table PROCEDURE
DELIMITER $$
CREATE DEFINER=`{{MYSQL_USER}}`@`{{MYSQL_HOST}}` PROCEDURE `usp_subject_add_or_edit`(
    IN _course_code VARCHAR(45),
    IN _description TEXT,
    IN _lecture_units INT,
    IN _laboratory_units INT,
    IN _credit_units INT
)
BEGIN
    INSERT INTO subject (course_code, description, lecture_units, laboratory_units, credit_units)
    VALUES (_course_code, _description, _lecture_units, _laboratory_units, _credit_units) 
    ON DUPLICATE KEY UPDATE
      description = VALUES(description),
      lecture_units = VALUES(lecture_units),
      laboratory_units = VALUES(laboratory_units),
      credit_units = VALUES(credit_units);


  SELECT ROW_COUNT() AS 'affectedRows';
END$$
DELIMITER ;