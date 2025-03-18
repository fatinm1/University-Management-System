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

