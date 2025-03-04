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
university-management-system/
│── backend/                  # Flask backend
│   ├── setup_database.py     # Flask API for database management
│   ├── requirements.txt      # Dependencies for backend
│  
│
│── frontend/                 # React frontend
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── index.js          # Entry point for React app
│   │   ├── components/       # Additional UI components
│
│── package.json             # Frontend dependencies
│── README.md                # Documentation
│── .gitignore               # Files to ignore in Git
