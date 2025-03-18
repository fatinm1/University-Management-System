## University Management System

A full-stack Flask + React application that allows users to manage students, instructors, courses, and enrollments in a university system.

## Features

✅ Manage Students - Add, update, delete, and list students.

✅ Manage Courses - Add, update, delete, and list courses.

✅ Manage Instructors - Add, update, delete, and list instructors.

✅ Enroll Students in Courses - Assign students to courses and remove them if needed.

✅ View Enrollment Records - Displays a table of student-course enrollments.

## Tech Stack

## Frontend:

    - React

    - Axios

    - HTML, CSS

## Backend:

    - Flask

    - Flask-SQLAlchemy

    - Flask-CORS

    - PyMySQL

## Database:

    - MySQL

## Libraries Used:

    - flask - Backend framework

    - flask_sqlalchemy - ORM for database operations

    - flask_cors - To handle cross-origin requests

    - pymysql - MySQL connector

    - axios - HTTP client for frontend API requests

## Project Structure
![Project Structure](https://github.com/user-attachments/assets/549f0a63-9de4-403c-a7d3-4295f58ba600)

## 🚀 Installation & Setup
## 1️⃣ Clone the Repository

git clone https://github.com/fatinm1/University-Management-System.git

cd University-Management-System

## 2️⃣ Setup Backend (Flask)
Navigate to the backend folder:

    cd backend

Create a virtual environment (optional but recommended):

    python -m venv venv

    source venv/bin/activate   # On macOS/Linux
    
    venv\Scripts\activate      # On Windows

Install dependencies:

    pip install -r requirements.txt

Set up MySQL database and configure .env file:

    DB_NAME=university
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_HOST=localhost

Initialize the database:

    python setup_database.py

Start the Flask backend:

    python setup_database.py

## Setup Frontend (React)
## Navigate to the frontend folder:

    cd src

## Install dependencies:

    npm install

## Start the React development server:

    npm start

## 📡 API Endpoints
## Method               Endpoint                            Description
GET	                    /students	                        Retrieve all students
POST	                /students	                        Add a new student
PUT	                    /students/{id}	                    Update student details
DELETE	                /students/{id}	                    Delete a student
GET	                    /courses	                        Retrieve all courses
POST	                /courses	                        Add a new course
PUT	                    /courses/{id}	                    Update course details
DELETE	                /courses/{id}	                    Delete a course
GET	                    /instructors	                    Retrieve all instructors
POST	                /instructors	                    Add a new instructor
PUT	                    /instructors/{id}	                Update instructor details
DELETE	                /instructors/{id}	                Delete an instructor
POST	                /enroll	                            Enroll a student in a course
DELETE	                /enroll/{student_id}/{course_id}	Drop a student from a course
GET	                    /enrollments	                    Retrieve all enrollment records
POST	                /initialize-db	                    Initialize the database tables.
