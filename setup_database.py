from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Enable communication with React frontend
import pymysql

# Initialize Flask app
app = Flask(__name__)

# ✅ Fixing CORS issues (Allow React frontend to access Flask API)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "supports_credentials": True, "allow_headers": "*", "methods": ["GET", "POST", "PUT", "DELETE"]}})

@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Credentials"] = "true"  # ✅ Critical Fix
    return response

# ✅ Database Configuration
USERNAME = "root"
PASSWORD = "Bd2222Mo?"  # Make sure this is correct
DB_NAME = "university"

app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://{USERNAME}:{PASSWORD}@localhost/{DB_NAME}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize database
db = SQLAlchemy(app)

# ==========================
# 🎓 Database Models
# ==========================
class Student(db.Model):
    student_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    credits_earned = db.Column(db.Integer, nullable=False)

class Instructor(db.Model):
    instructor_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    department = db.Column(db.String(255), nullable=False)

class Course(db.Model):
    course_id = db.Column(db.Integer, primary_key=True)
    course_title = db.Column(db.String(255), nullable=False)
    instructor_id = db.Column(db.Integer, db.ForeignKey("instructor.instructor_id"), nullable=False)
    credits = db.Column(db.Integer, nullable=False)
'''
class Enrollment(db.Model):
    student_id = db.Column(db.Integer, db.ForeignKey("student.student_id"), primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey("course.course_id"), primary_key=True)
    grade = db.Column(db.String(5), nullable=True)
'''
class Enrollment(db.Model):
    student_id = db.Column(
        db.Integer, db.ForeignKey("student.student_id", ondelete="CASCADE"), primary_key=True
    )
    course_id = db.Column(
        db.Integer, db.ForeignKey("course.course_id", ondelete="CASCADE"), primary_key=True
    )
    grade = db.Column(db.String(5), nullable=True)

# ==========================
# 🛠️ Database Setup API
# ==========================
@app.route('/')
def home():
    return "Flask Backend is Running! Use /students or other routes."

@app.route('/initialize-db', methods=['POST'])
def initialize_db():
    """Creates database tables if they don't exist."""
    try:
        db.create_all()
        return jsonify({"message": "✅ Database initialized successfully!"})
    except Exception as e:
        print(f"❌ Error initializing database: {str(e)}")
        return jsonify({"error": "Database initialization failed"}), 500

# ==========================
# 📌 API Endpoints
# ==========================

# ✅ Get all students
@app.route('/students', methods=['GET'])
def get_students():
    try:
        students = Student.query.all()
        return jsonify([{"id": s.student_id, "name": s.name, "credits": s.credits_earned} for s in students])
    except Exception as e:
        print(f"❌ Server Error: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500

# ✅ Add a new student
@app.route('/students', methods=['POST'])
def add_student():
    try:
        data = request.json
        if Student.query.get(data['student_id']):
            return jsonify({"error": "Student ID already exists!"}), 400

        new_student = Student(student_id=data['student_id'], name=data['name'], credits_earned=data['credits_earned'])
        db.session.add(new_student)
        db.session.commit()
        return jsonify({"message": "✅ Student added successfully!"}), 201
    except Exception as e:
        print(f"❌ Error adding student: {str(e)}")
        return jsonify({"error": "Failed to add student"}), 500
'''
# ✅ Delete a student
@app.route('/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    try:
        student = Student.query.get(student_id)
        if not student:
            return jsonify({"error": "Student not found"}), 404
        
        db.session.delete(student)
        db.session.commit()
        return jsonify({"message": "✅ Student deleted successfully!"})
    except Exception as e:
        print(f"❌ Error deleting student: {str(e)}")
        return jsonify({"error": "Failed to delete student"}), 500
'''
@app.route('/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    """Deletes a student from the database."""
    try:
        print(f"🛠️ Attempting to delete student with ID: {student_id}")  # Debugging log
        
        student = Student.query.get(student_id)
        if not student:
            print(f"❌ Student ID {student_id} not found in the database!")  # Debug log
            return jsonify({"error": "Student not found"}), 404

        print(f"✅ Found student: {student}")  # Debugging log
        db.session.delete(student)
        db.session.commit()
        db.session.expire_all()  # ✅ Ensures changes reflect immediately
        
        print(f"✅ Successfully deleted student ID {student_id}")  # Debug log
        return jsonify({"message": "✅ Student deleted successfully!"})
    
    except Exception as e:
        db.session.rollback()  # Rollback on failure
        print(f"❌ Error deleting student: {str(e)}")  # Debugging log
        return jsonify({"error": "Failed to delete student"}), 500
    
@app.route('/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    """Updates student details."""
    try:
        data = request.json
        student = Student.query.get(student_id)
        if not student:
            return jsonify({"error": "Student not found"}), 404
        
        # Update student info
        student.name = data.get("name", student.name)
        student.credits_earned = data.get("credits_earned", student.credits_earned)

        db.session.commit()
        db.session.expire_all()  # ✅ Fixes issue with UI not updating
        
        return jsonify({"message": "✅ Student updated successfully!"})
    except Exception as e:
        db.session.rollback()
        print(f"❌ Error updating student: {str(e)}")
        return jsonify({"error": "Failed to update student"}), 500

# ✅ Get all instructors
@app.route('/instructors', methods=['GET'])
def get_instructors():
    try:
        instructors = Instructor.query.all()
        return jsonify([{"id": i.instructor_id, "name": i.name, "department": i.department} for i in instructors])
    except Exception as e:
        print(f"❌ Server Error: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500

# ✅ Add an instructor
@app.route('/instructors', methods=['POST'])
def add_instructor():
    try:
        data = request.json

        if not data or "instructor_id" not in data or "name" not in data or "department" not in data:
            return jsonify({"error": "Missing required fields"}), 400

        if Instructor.query.get(data["instructor_id"]):
            return jsonify({"error": "Instructor ID already exists!"}), 400

        new_instructor = Instructor(
            instructor_id=data["instructor_id"],
            name=data["name"],
            department=data["department"]
        )
        db.session.add(new_instructor)
        db.session.commit()

        return jsonify({"message": "✅ Instructor added successfully!"}), 201

    except Exception as e:
        print(f"❌ Error adding instructor: {str(e)}")
        return jsonify({"error": "Failed to add instructor"}), 500

# ✅ Delete an instructor
@app.route('/instructors/<int:instructor_id>', methods=['DELETE'])
def delete_instructor(instructor_id):
    try:
        instructor = Instructor.query.get(instructor_id)
        if not instructor:
            return jsonify({"error": "Instructor not found"}), 404

        db.session.delete(instructor)
        db.session.commit()
        return jsonify({"message": "✅ Instructor deleted successfully!"})
    except Exception as e:
        print(f"❌ Error deleting instructor: {str(e)}")
        return jsonify({"error": "Failed to delete instructor"}), 500

# ✅ Modify an instructor
@app.route('/instructors/<int:instructor_id>', methods=['PUT'])
def modify_instructor(instructor_id):
    try:
        instructor = Instructor.query.get(instructor_id)
        if not instructor:
            return jsonify({"error": "Instructor not found"}), 404
        
        data = request.json
        instructor.name = data.get('name', instructor.name)
        instructor.department = data.get('department', instructor.department)
        db.session.commit()
        return jsonify({"message": "✅ Instructor updated successfully!"})
    except Exception as e:
        print(f"❌ Error modifying instructor: {str(e)}")
        return jsonify({"error": "Failed to update instructor"}), 500

# ✅ Get all courses
@app.route('/courses', methods=['GET'])
def get_courses():
    try:
        courses = Course.query.all()
        return jsonify([{"id": c.course_id, "title": c.course_title, "instructor_id": c.instructor_id, "credits": c.credits} for c in courses])
    except Exception as e:
        print(f"❌ Server Error: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500
    
# ✅ Add a new course
@app.route('/courses', methods=['POST'])
def add_course():
    try:
        data = request.json
        if not data or 'course_id' not in data or 'course_title' not in data or 'instructor_id' not in data or 'credits' not in data:
            return jsonify({"error": "Missing required fields"}), 400
        
        # Check if the course already exists
        if Course.query.get(data['course_id']):
            return jsonify({"error": "Course ID already exists!"}), 400
        
        # Create new course
        new_course = Course(
            course_id=data['course_id'],
            course_title=data['course_title'],
            instructor_id=data['instructor_id'],
            credits=data['credits']
        )
        db.session.add(new_course)
        db.session.commit()
        
        return jsonify({"message": "✅ Course added successfully!"}), 201
    
    except Exception as e:
        print(f"❌ Error adding course: {str(e)}")
        return jsonify({"error": "Failed to add course"}), 500
    
# ✅ Delete a course
@app.route('/courses/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    try:
        course = Course.query.get(course_id)
        if not course:
            return jsonify({"error": "Course not found"}), 404

        db.session.delete(course)
        db.session.commit()
        return jsonify({"message": "✅ Course deleted successfully!"})

    except Exception as e:
        print(f"❌ Error deleting course: {str(e)}")
        return jsonify({"error": "Failed to delete course"}), 500
    
# ✅ Update a course
@app.route('/courses/<int:course_id>', methods=['PUT'])
def update_course(course_id):
    try:
        data = request.json
        course = Course.query.get(course_id)
        if not course:
            return jsonify({"error": "Course not found"}), 404

        course.course_title = data.get("course_title", course.course_title)
        course.instructor_id = data.get("instructor_id", course.instructor_id)
        course.credits = data.get("credits", course.credits)

        db.session.commit()
        return jsonify({"message": "✅ Course updated successfully!"})

    except Exception as e:
        print(f"❌ Error updating course: {str(e)}")
        return jsonify({"error": "Failed to update course"}), 500

# ✅ Add a student to a course
@app.route('/enroll', methods=['POST'])
def enroll_student():
    try:
        data = request.json
        existing_enrollment = Enrollment.query.filter_by(student_id=data['student_id'], course_id=data['course_id']).first()
        
        if existing_enrollment:
            return jsonify({"error": "Student is already enrolled in this course!"}), 400
        
        enrollment = Enrollment(student_id=data['student_id'], course_id=data['course_id'], grade=data.get('grade'))
        db.session.add(enrollment)
        db.session.commit()
        return jsonify({"message": "✅ Student enrolled successfully!"})
    except Exception as e:
        print(f"❌ Error enrolling student: {str(e)}")
        return jsonify({"error": "Failed to enroll student"}), 500

@app.route('/enrollments', methods=['GET'])
def get_enrollments():
    try:
        enrollments = Enrollment.query.all()
        return jsonify([
            {
                "student_id": e.student_id,
                "course_id": e.course_id
            } for e in enrollments
        ])
    except Exception as e:
        print(f"❌ Error fetching enrollments: {str(e)}")
        return jsonify({"error": "Failed to fetch enrollments"}), 500

# ✅ Remove a student from a course
@app.route('/enroll/<int:student_id>/<int:course_id>', methods=['DELETE'])
def drop_student(student_id, course_id):
    try:
        enrollment = Enrollment.query.filter_by(student_id=student_id, course_id=course_id).first_or_404()
        db.session.delete(enrollment)
        db.session.commit()
        return jsonify({"message": "✅ Student dropped from course!"})
    except Exception as e:
        print(f"❌ Error dropping student: {str(e)}")
        return jsonify({"error": "Failed to drop student"}), 500

# ✅ Run Flask Server
if __name__ == "__main__":
   from sqlalchemy.sql import text  # ✅ Import `text` from SQLAlchemy

with app.app_context():
    try:
        db.session.execute(text("SELECT 1"))  # ✅ Use `text()`
        print("✅ Database connection successful!")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")


    app.run(debug=True)
