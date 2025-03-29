# 学生管理系统 README

## 概述 | Overview

这是一个基于 Flask 的学生管理系统，支持学生、班级、课程以及成绩的管理功能。系统允许用户通过简单的 Web 界面对数据进行新增、编辑、删除等操作，并能直观展示各类信息。

This is a Flask-based Student Management System that supports the management of students, classes, courses, and scores. Users can add, edit, and delete data through a simple web interface and view the information intuitively.

---

## 功能特性 | Features

### 学生表 (students table)
- **字段**: 学生ID (id), 姓名 (name), 年龄 (age), 隶属班级 (class_id), 总成绩 (score)。
  **Fields**: Student ID (id), Name (name), Age (age), Class ID (class_id), Total Score (score).
- **功能**:
  - **新增**: 添加新学生，填写姓名、年龄、隶属班级等信息。
    **Add**: Add a new student by providing their name, age, and class affiliation.
  - **编辑**: 修改学生信息，例如更新姓名、年龄或班级。
    **Edit**: Update student information, such as name, age, or class.
  - **删除**: 删除学生记录。
    **Delete**: Remove a student record.
  - **查看**: 显示学生的ID、姓名、年龄、隶属班级以及总成绩。
    **View**: Display the student ID, name, age, class, and total score.

### 班级表 (classes table)
- **字段**: 班级ID (id), 班级名称 (name), 总人数 (total_students)。
  **Fields**: Class ID (id), Class Name (name), Total Students (total_students).
- **功能**:
  - **新增**: 添加新班级，填写班级名称。
    **Add**: Add a new class by providing its name.
  - **编辑**: 修改班级名称。
    **Edit**: Update the class name.
  - **删除**: 删除班级记录。
    **Delete**: Remove a class record.
  - **查看**: 显示班级ID、名称和班级的总人数。
    **View**: Display the class ID, name, and total number of students.

### 课程表 (courses table)
- **字段**: 课程ID (id), 课程名称 (name), 学分 (credits)。
  **Fields**: Course ID (id), Course Name (name), Credits (credits).
- **功能**:
  - **新增**: 添加新课程，填写课程名称和学分。
    **Add**: Add a new course by providing its name and credits.
  - **编辑**: 修改课程信息，例如更新课程名称或学分。
    **Edit**: Update course details, such as name or credits.
  - **删除**: 删除课程记录。
    **Delete**: Remove a course record.
  - **查看**: 显示课程ID、名称和课程学分。
    **View**: Display the course ID, name, and credits.

### 成绩表 (scores table)
- **字段**: 学生ID (student_id), 课程ID (course_id), 成绩 (score)。
  **Fields**: Student ID (student_id), Course ID (course_id), Score (score).
- **功能**:
  - **新增**: 添加学生在某课程的成绩。
    **Add**: Add a student's score for a specific course.
  - **编辑**: 修改学生在某课程的成绩。
    **Edit**: Update a student's score for a course.
  - **删除**: 删除学生在某课程的成绩。
    **Delete**: Remove a student's score for a course.
  - **查看**: 显示每个学生在每门课程的成绩。
    **View**: Display the scores of each student for every course.

---

## 数据库结构 | Database Schema

### students 表
```sql
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    class_id INT,
    score INT,
    FOREIGN KEY (class_id) REFERENCES classes(id)
);
```

### classes 表
```sql
CREATE TABLE classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    total_students INT
);
```

### courses 表
```sql
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    credits INT
);
```

### scores 表
```sql
CREATE TABLE scores (
    student_id INT,
    course_id INT,
    score INT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);
```

---

## 部署与运行 | Deployment and Execution

1. 克隆仓库 | Clone the repository:
   ```bash
   git clone <repository_url>
   cd student-management-system
   ```

2. 安装依赖 | Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. 初始化数据库 | Initialize the database:
   ```bash
   flask db init
   flask db migrate
   flask db upgrade
   ```

4. 启动服务器 | Run the server:
   ```bash
   flask run
   ```

5. 访问系统 | Access the system:
   打开浏览器，访问 http://127.0.0.1:5000/
   Open your browser and go to http://127.0.0.1:5000/

---

## 登录信息 | Login Information
- **用户名(Username)**: admin
  
- **密码(Password)**: admin123
  

---

## 系统特点 | System Features
- **语言设置**: 可以在系统设置中修改语言（后续将添加）。
  **Language Settings**: Users can change the language in system settings (to be added later).
- **登出功能**: 所有页面提供登出功能。
  **Logout Feature**: All pages provide a logout option.

---

## 用例场景 | Use Cases

### 学生管理 | Student Management
- 添加新学生，编辑或删除现有学生。
  Add new students or edit/delete existing ones.
- 查看学生的总成绩，以及所属班级的信息。
  View students' total scores and their class information.

### 班级管理 | Class Management
- 管理班级信息，查看班级的总人数。
  Manage class information and view the total number of students in a class.

### 课程管理 | Course Management
- 添加、编辑或删除课程。
  Add, edit, or delete courses.
- 管理课程学分。
  Manage course credits.

### 成绩管理 | Score Management
- 为学生录入课程成绩。
  Record course scores for students.
- 修改或删除已录入的成绩。
  Edit or delete recorded scores.
- 按学生或课程查看成绩详情。
  View score details by student and course.

---

## 注意事项 | Notes
- 数据库中所有表均使用外键进行关联，确保数据一致性。
  All database tables use foreign keys to ensure data consistency.
- 请在操作前确保数据库已正确配置。
  Ensure the database is correctly configured before operations.

---

## 技术栈 | Tech Stack
- **后端(Back_end)**: Flask (Python)
- **前端(Front_end)**: HTML, CSS, JavaScript
- **数据库(Database)**: MySQL
  

---

## 贡献 | Contribution
欢迎提交 issue 或 pull request，以帮助改进本系统。
Feel free to open issues or pull requests to improve this system.

---

## 作者 | Author
由 [鄭] 开发 | Developed by [Zheng]
