--@block 
use student_management

--@block
-- 班级表
CREATE TABLE classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    level VARCHAR(10),
    student_num INT
);

-- 学生表
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    class_id INT,
    score INT,
    exam_num INT,
    FOREIGN KEY (class_id) REFERENCES classes(id)
);
--@block
SELECT s.id, s.name, s.age, s.class_id, s.score, s.exam_num, c.name 
FROM students s
JOIN classes c ON s.class_id = c.id;







--@block
-- 课程表
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    credit INT
);

-- 成绩表
CREATE TABLE scores (
    student_id INT,
    course_id INT,
    score INT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

--@block
INSERT INTO classes (name, level, student_num) VALUES
('唱班', '优', 10),
('跳班', '良', 12),
('rap班', '普通', 15),
('篮球班', '优', 20);



--@block


INSERT INTO courses (name, credit) VALUES
('数学', 3),
('英语', 2),
('物理', 4);



--@block

SELECT * FROM students

--@block
SELECT * from courses




--@block
UPDATE scores s
JOIN students st ON s.student_id = st.id
SET s.class_id = st.class_id;

--@block

DELETE FROM students WHERE id = 24;
ALTER TABLE students AUTO_INCREMENT = 10;
 --@block
 DESC students;


--@block
SELECT id FROM students WHERE id = 10; -- 替换 1 为你更新时使用的 id

--@block
-- 成绩表
CREATE TABLE scores (
    student_id INT,
    course_id INT,
    score INT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

--@block
INSERT INTO scores (student_id, course_id, score) VALUES
(1, 1, 85),
(1, 2, 78),
(1, 3, 92),
(2, 1, 65),
(2, 2, 70),
(2, 3, 80),
(3, 1, 88),
(3, 2, 91),
(3, 3, 95);

--@block
SELECT * from students

--@block
ALTER TABLE students
DROP COLUMN exam_num;

--@block
UPDATE students s
JOIN (
    SELECT student_id, SUM(score) AS total_score
    FROM scores
    GROUP BY student_id
) sub ON s.id = sub.student_id
SET s.score = sub.total_score;
