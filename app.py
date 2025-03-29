from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import mysql.connector
import cx_Oracle  # Oracle database connector

app = Flask(__name__)

# 数据库连接(success)
def get_db_connection():
    try:
        # Oracle connection string format: username/password@hostname:port/service_name
        connection = cx_Oracle.connect(
            user='yzhe0128',
            password='student',
            dsn='localhost:1521/HOME_ARE_US'  # Assuming default port 1521
        )
        return connection
    except cx_Oracle.DatabaseError as e:
        print(f"Database connection failed: {e}")
        raise
  
# 默认路由跳转到登录页面
@app.route('/')
def login_page():
    return render_template('main.html')  # 显示登录页面

# 登录页面的处理路由
@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    
    # 这里进行登录验证，如果验证成功则跳转到学生页面
    if username == "admin" and password == "admin123":  # 这里可以替换为数据库验证
        return redirect(url_for('index_page'))

    return "登录失败，用户名或密码错误！"  # 如果失败，返回提示信息

# 登出操作
@app.route('/logout')
def logout():
    # 清除session，登出
    session.pop('username', None)
    return redirect(url_for('main'))  # 跳转到登录页面

# 主页面
@app.route('/index')
def index_page():
    return render_template('index.html')  # 渲染主页面


# 以下是homeless表的操作
@app.route('/homeless')
def students():
    # 从数据库查询学生信息
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("""
        SELECT h.id, h.name AS homeless_name, s.age, s.class_id, s.score, c.name AS class_name
        FROM homeless h
        JOIN classes c ON s.class_id = c.id
        ORDER BY s.id ASC
    """)  # 获取学生信息和班级名称
    students = cursor.fetchall()
    cursor.close()
    connection.close()
    # 渲染模板并传递学生数据
    return render_template('students.html', students=students)

@app.route('/add_student', methods=['POST'])
def add_student():
    name = request.form['name']
    age = request.form['age']
    class_id = request.form['class_id']
    score = request.form['score']
    
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("""
            INSERT INTO students (name, age, class_id, score)
            VALUES (%s, %s, %s, %s)
        """, (name, age, class_id, score))

        new_student_id = cursor.lastrowid  # 获取新学生的 ID
        # 为新学生添加所有课程的成绩记录
        cursor.execute("SELECT id FROM courses")
        courses = cursor.fetchall()
        for course in courses:
            cursor.execute("""
                INSERT INTO scores (student_id, course_id, score)
                VALUES (%s, %s, NULL)
            """, (new_student_id, course[0]))


        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({'success': True})
    except Exception as e:
        print(f"Error adding student: {e}")
        return jsonify({'success': False, 'error': str(e)})

@app.route('/edit_student', methods=['POST'])
def edit_student():
    # 获取表单数据
    student_id = request.form.get('student_id')  # 从隐藏字段获取学生 ID
    name = request.form.get('name')
    age = request.form.get('age')
    class_id = request.form.get('class_id')
    score = request.form.get('score')

    try:
        # 检查学生是否存在
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT id FROM students WHERE id = %s", (student_id,))
        if not cursor.fetchone():
            print(f"Student ID {student_id} does not exist.")

            return jsonify({'success': False, 'error': 'Student not found'})

        # 更新学生信息
        cursor.execute("""
            UPDATE students
            SET name=%s, age=%s, class_id=%s, score=%s
            WHERE id=%s
        """, (name, age, class_id, score, student_id))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({'success': True})
    except Exception as e:
        print(f"Error updating student: {e}")
        return jsonify({'success': False, 'error': str(e)})
    
@app.route('/delete_student', methods=['POST'])
def delete_student():
    student_id = request.form.get('student_id')  # 从隐藏字段获取学生 ID

    # 尝试将 student_id 转换为整数
    try:
        student_id = int(student_id)
    except ValueError:
        return jsonify({'success': False, 'error': '无效的学生 ID'}), 400
    # 验证 student_id 是否有效
    if student_id <= 0:
        return jsonify({'success': False, 'error': '无效的学生 ID'}), 400
    
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("DELETE FROM students WHERE id = %s", (student_id,))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    

# 以下是班级表的操作
@app.route('/classes')
def classes():
    # 从数据库查询信息
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("""
    SELECT 
        c.id AS id, 
        c.name AS class_name,
        c.level,
        COUNT(s.id) AS student_count
    FROM classes c
    LEFT JOIN students s ON c.id = s.class_id
    GROUP BY c.id, c.name, c.level;
    ORDER BY c.id ASC
    """)  # 获取班级信息
    classes = cursor.fetchall()
    cursor.close()
    connection.close()
    # 渲染模板并传递班级数据
    return render_template('classes.html', classes=classes)

@app.route('/add_class', methods=['POST'])
def add_class():
    name = request.form['class_name']
    level = request.form['level']

    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("""
            INSERT INTO classes (name, level)
            VALUES (%s, %s)
        """, (name, level))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({'success': True})
    except Exception as e:
        print(f"Error adding class: {e}")
        return jsonify({'success': False, 'error': str(e)})

@app.route('/edit_class', methods=['POST'])
def edit_class():
    # 获取表单数据
    class_id = request.form.get('class_id')  # 从隐藏字段获取班级 ID
    name = request.form.get('class_name')
    level = request.form.get('level')

    try:
        # 检查班级是否存在
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT id FROM classes WHERE id = %s", (class_id,))
        if not cursor.fetchone():
            print(f"Class ID {class_id} does not exist.")
            return jsonify({'success': False, 'error': 'Class not found'})

        # 更新班级信息
        cursor.execute("""
            UPDATE classes
            SET name=%s, level=%s
            WHERE id=%s
        """, (name, level, class_id))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({'success': True})
    except Exception as e:
        print(f"Error updating class: {e}")
        return jsonify({'success': False, 'error': str(e)})

@app.route('/delete_class', methods=['POST'])
def delete_class():
    class_id = request.form.get('class_id')  # 从隐藏字段获取班级 ID
    
    # 尝试将 class_id 转换为整数
    try:
        class_id = int(class_id)
    except ValueError:
        return jsonify({'success': False, 'error': '无效的班级 ID'}), 400

    # 验证 class_id 是否有效
    if class_id <= 0:
        return jsonify({'success': False, 'error': '无效的班级 ID'}), 400
    
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("DELETE FROM classes WHERE id = %s", (class_id,))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


# 以下是课程表的操作
@app.route('/courses')
def courses():
    # 从数据库查询信息
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("""
        SELECT id, name, credit
        FROM courses
        Order by id ASC
    """)  # 获取信息
    courses = cursor.fetchall()
    cursor.close()
    connection.close()
    # 渲染模板并传递数据
    return render_template('courses.html', courses=courses)

@app.route('/add_course', methods=['POST'])
def add_course():
    name = request.form['course_name']
    credit = request.form['credit']
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("""
            INSERT INTO courses (name, credit)
            VALUES (%s, %s)
        """, (name, credit))

        new_course_id = cursor.lastrowid  # 获取新课程的 ID

        # 为新课程添加所有学生的成绩记录
        cursor.execute("SELECT id FROM students")
        students = cursor.fetchall()
        for student in students:
            cursor.execute("""
                INSERT INTO scores (student_id, course_id, score)
                VALUES (%s, %s, NULL)
            """, (student[0], new_course_id))



        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({'success': True})
    except Exception as e:
        print(f"Error adding course: {e}")
        return jsonify({'success': False, 'error': str(e)})
    
@app.route('/edit_course', methods=['POST'])
def edit_course():
    # 获取表单数据
    course_id = request.form.get('course_id')  # 从隐藏字段获取班级 ID
    name = request.form.get('course_name')
    credit = request.form.get('credit')

    try:
        # 检查是否存在
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT id FROM courses WHERE id = %s", (course_id,))
        if not cursor.fetchone():
            print(f"Course ID {course_id} does not exist.")
            return jsonify({'success': False, 'error': 'Course not found'})

        # 更新班级信息
        cursor.execute("""
            UPDATE courses
            SET name=%s, credit=%s
            WHERE id=%s
        """, (name, credit, course_id))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({'success': True})
    except Exception as e:
        print(f"Error updating course: {e}")
        return jsonify({'success': False, 'error': str(e)})

@app.route('/delete_course', methods=['POST'])
def delete_course():
    course_id = request.form.get('course_id')  # 从隐藏字段获取班级 ID
    
    # 尝试将 class_id 转换为整数
    try:
        course_id = int(course_id)
    except ValueError:
        return jsonify({'success': False, 'error': '无效的 ID'}), 400

    # 验证 course_id 是否有效
    if course_id <= 0:
        return jsonify({'success': False, 'error': '无效的 ID'}), 400
    
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("DELETE FROM courses WHERE id = %s", (course_id,))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


# 以下是成绩表的操作
@app.route('/scores')
def scores():
    # 从数据库查询信息
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("""
        SELECT s.student_id, st.name AS name, s.course_id, s.score, c.name AS course_name
        FROM scores s
        JOIN students st ON s.student_id = st.id
        JOIN courses c ON s.course_id = c.id
        ORDER BY s.student_id ASC
                   
    """)  # 获取信息
    scores = cursor.fetchall()

    # 获取学生列表
    cursor.execute("SELECT id, name FROM students")
    students = cursor.fetchall()

    # 获取课程列表
    cursor.execute("SELECT id, name FROM courses")
    courses = cursor.fetchall()


    cursor.close()
    connection.close()
    # 渲染模板并传递数据
    return render_template('scores.html', scores=scores, students=students, courses=courses)

@app.route('/add_score', methods=['POST'])
def add_score():
    # 从表单中获取数据
    student_id = request.form['student_id']
    course_id = request.form['course_id']
    score = request.form['score']
    
    try:
        # 插入分数信息到数据库
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("""
            INSERT IGNORE INTO scores (student_id, course_id, score)
            VALUES (%s, %s, %s)
        """, (student_id, course_id, score))
        connection.commit()
        cursor.close()
        connection.close()
        
        return jsonify({'success': True})
    except Exception as e:
        print(f"Error adding score: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500
    
@app.route('/edit_score', methods=['POST'])
def edit_score():
    # 获取表单数据
    student_id = request.form.get('student_id')  # 从隐藏字段获取学生ID
    course_id = request.form.get('course_id')  # 从隐藏字段获取课程ID
    score = request.form.get('score')

    try:
        # 获取数据库连接
        connection = get_db_connection()
        cursor = connection.cursor()

        # 检查学生和课程是否存在
        cursor.execute("""
            SELECT 1 FROM scores WHERE student_id = %s AND course_id = %s
        """, (student_id, course_id))

        # 确保处理查询结果
        result = cursor.fetchone()
        if not result:
            return jsonify({'success': False, 'error': 'Student or course not found'})

        # 更新成绩
        cursor.execute("""
            UPDATE scores
            SET score = %s
            WHERE student_id = %s AND course_id = %s
        """, (score, student_id, course_id))

        # 提交事务
        connection.commit()

        # 确保连接和游标关闭
        cursor.close()
        connection.close()

        # 返回成功消息
        return jsonify({'success': True})

    except Exception as e:
        # 如果出现异常，捕获并输出错误
        connection.rollback()  # 回滚事务，避免部分提交
        print(f"Error: {e}")
        return jsonify({'success': False, 'error': str(e)})

@app.route('/delete_score', methods=['POST'])
def delete_score():
    student_id = request.form.get('student_id')  # 从隐藏字段获取学生ID
    course_id = request.form.get('course_id')  # 从隐藏字段获取课程ID
    
    try:
        # 转换为整数类型（确保是有效的 ID）
        student_id = int(student_id)
        course_id = int(course_id)
    except ValueError:
        return jsonify({'success': False, 'error': '无效的学生 ID 或课程 ID'}), 400

    # 验证 course_id 是否有效
    if course_id <= 0 or student_id <= 0 :
        return jsonify({'success': False, 'error': '无效的 ID'}), 400
    
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("""
            DELETE FROM scores
            WHERE student_id = %s AND course_id = %s
        """, (student_id, course_id))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500




if __name__ == '__main__':
    app.run(debug=True)

