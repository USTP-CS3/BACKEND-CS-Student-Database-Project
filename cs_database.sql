CREATE DATABASE `csstudentdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE csstudentdb;


CREATE TABLE `building` (
  `id` tinyint unsigned NOT NULL,
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
  `description` varchar(100) DEFAULT NULL,
  `room_number` varchar(25) DEFAULT NULL,
  `floor_no` tinyint unsigned DEFAULT NULL,
  `building_id` tinyint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_RoomBuilding` (`building_id`),
  CONSTRAINT `FK_RoomBuilding` FOREIGN KEY (`building_id`) REFERENCES `building` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject_id` int NOT NULL,
  `faculty_id` int NOT NULL,
  `room_id` int DEFAULT NULL,
  `section` varchar(25) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `day` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  `semester` enum('1','2') NOT NULL,
  `year` year NOT NULL,
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
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `middle_initial` varchar(1) DEFAULT NULL,
  `age` tinyint unsigned NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `year_level` int NOT NULL,
  `nationality` varchar(45) NOT NULL,
  `department` enum('CS','IT','DS','TCM') NOT NULL,
  `college` enum('College of Information Technology and Computing') NOT NULL,
  `email` varchar(50) NOT NULL,
  `contact_no` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `student_schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `schedule_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_StudentScheduleProfile` (`student_id`),
  KEY `FK_ScheduleStudentProfile` (`schedule_id`),
  CONSTRAINT `FK_ScheduleStudentProfile` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`),
  CONSTRAINT `FK_StudentScheduleProfile` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `subject` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_code` varchar(25) NOT NULL,
  `description` varchar(255) NOT NULL,
  `lecture_units` tinyint unsigned NOT NULL,
  `lab_units` tinyint unsigned NOT NULL,
  `credit_units` tinyint unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- STORED PROCEDURES-------------------------------------------------------------------------------------------------



-- Student Table Procedure
DELIMITER $$
CREATE DEFINER=`{{MYSQL_USER}}`@`{{MYSQL_HOST}}` PROCEDURE `usp_student_add_or_edit`(
    IN _id INT,
    IN _first_name VARCHAR(100),
    IN _last_name VARCHAR(25),
    IN _middle_initial VARCHAR(1),
    IN _age TINYINT UNSIGNED,
    IN _gender ENUM("Male", "Female"),
    IN _year_level INT,
    IN _nationality VARCHAR(45),
    IN _department ENUM("CS", "IT", "DS", "TCM"),
    IN _college ENUM("College of Information Technology and Computing"),
    IN _email VARCHAR(50),
    IN _contact_no VARCHAR(20)
)
BEGIN
-- Insert new student or update existing one
    INSERT INTO Student (id, first_name, last_name, middle_initial, age, gender, year_level, nationality, department, college, email, contact_no)
    VALUES (_id, _first_name, _last_name, _middle_initial, _age, _gender, _year_level, _nationality, _department, _college, _email, _contact_no)
    ON DUPLICATE KEY UPDATE
        first_name = VALUES(first_name),
        last_name = VALUES(last_name),
        middle_initial = VALUES(middle_initial),
        age = VALUES(age),
        gender = VALUES(gender),
        year_level = VALUES(year_level),
        nationality = VALUES(nationality),
        department = VALUES(department),
        college = VALUES(college),
        email = VALUES(email),
        contact_no = VALUES(contact_no);

    SELECT ROW_COUNT() AS 'affectedRows';
END$$
DELIMITER ;



-- Faculty Table Procedure
DELIMITER $$
CREATE DEFINER=`{{MYSQL_USER}}`@`{{MYSQL_HOST}}` PROCEDURE `usp_faculty_add_or_edit`(
    IN _id INT,
    IN _name VARCHAR(255)
)
BEGIN
    INSERT INTO faculty (id, name)
    VALUES (_id, _name)
    ON DUPLICATE KEY UPDATE
        name = VALUES(name);


    SELECT ROW_COUNT() AS 'affectedRows';
END$$

DELIMITER ;



-- Schedule Table Procedure
DELIMITER $$
CREATE DEFINER=`{{MYSQL_USER}}`@`{{MYSQL_HOST}}` PROCEDURE `usp_schedule_add_or_edit`(
    IN _id INT,
    IN _subject_id int,
    IN _faculty_id int,
    IN _room_id int,
    IN _section varchar(25),
    IN _start_time time,
    IN _end_time time,
    IN _day enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'),
    IN _semester enum('1','2'),
    IN _year year(4)
)
BEGIN
    INSERT INTO schedule (id, subject_id, faculty_id, room_id, section, start_time, end_time, day, semester, year)
    VALUES (_id, _subject_id, _faculty_id, _room_id, _section, _start_time, _end_time, _day, _semester, _year)
    ON DUPLICATE KEY UPDATE
        subject_id = VALUES(subject_id),
        faculty_id = VALUES(faculty_id),
        room_id = VALUES(room_id),
        section = VALUES(section),
        start_time = VALUES(start_time),
        end_time = VALUES(end_time),
        day = VALUES(day),
        semester = VALUES(semester),
        year = VALUES(year);
    SELECT ROW_COUNT() AS 'affectedRows';
END$$


-- Building Table PROCEDURE
DELIMITER $$
CREATE DEFINER=`{{MYSQL_USER}}`@`{{MYSQL_HOST}}` PROCEDURE `usp_building_add_or_edit`(
    IN _id TINYINT(1),
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
    IN _id int,
    IN _description VARCHAR(255),
    IN _room_number VARCHAR(25),
    IN _floor_no TINYINT(1),
    IN _building_id TINYINT(1)
)
BEGIN
    INSERT INTO building (id, description, room_number, floor_no, building_id)
    VALUES (_id, _description, _room_number, _floor_no, _building_id)
    ON DUPLICATE KEY UPDATE
      description = VALUES(description),
      room_number = VALUES(room_number),
      floor_no = VALUES(floor_no),
      building_id = VALUES(building_id);      
    SELECT ROW_COUNT() AS 'affectedRows';
END$$
DELIMITER $$

-- Subject Table PROCEDURE
DELIMITER $$
CREATE DEFINER=`{{MYSQL_USER}}`@`{{MYSQL_HOST}}` PROCEDURE `usp_subject_add_or_edit`(
    IN _id INT,
    IN _course_code VARCHAR(25),
    IN _description VARCHAR(255),
    IN _lecture_units TINYINT(1),
    IN _lab_units TINYINT(1),
    IN _credit_units TINYINT(1)
)
BEGIN
    INSERT INTO subject (id, course_code, description, lecture_units, lab_units, credit_units)
    VALUES (_id, _course_code, _description, _lecture_units, _lab_units, _credit_units) 
    ON DUPLICATE KEY UPDATE
      course_code = VALUES(course_code),
      description = VALUES(description),
      lecture_units = VALUES(lecture_units),
      lab_units = VALUES(lab_units),
      credit_units = VALUES(credit_units);


  SELECT ROW_COUNT() AS 'affectedRows';
END$$
DELIMITER ;


-- Student Schedule Table PROCEDURE
DELIMITER $$

CREATE DEFINER=`{{MYSQL_USER}}`@`{{MYSQL_HOST}}` PROCEDURE `usp_student_schedule_add_or_edit`(
    IN _id int,
    IN _student_id int,
    IN _schedule_id int
)
BEGIN
    INSERT INTO student_schedule (id, student_id, schedule_id)
    VALUES (_id, _student_id, _schedule_id)
    ON DUPLICATE KEY UPDATE
      student_id = VALUES(student_id),
      schedule_id = VALUES(schedule_id);      
    SELECT ROW_COUNT() AS 'affectedRows';
END$$