## University Management System
A full-stack Flask + React application that allows users to manage students, instructors, courses, and enrollments in a university system.

## Features
✅ Manage Students - Add, update, delete, and list students.
✅ Manage Courses - Add, update, delete, and list courses.
✅ Manage Instructors - Add, update, delete, and list instructors.
✅ Enroll Students in Courses - Assign students to courses and remove them if needed.
✅ View Enrollment Records - Displays a table of student-course enrollments.

## Tech Stack
Frontend: React, Axios

Backend: Flask, Flask-SQLAlchemy, Flask-CORS

Database: MySQL

Libraries:

  - flask
  
  - flask_sqlalchemy
  
  - flask_cors
  
  - pymysql
  
  - axios

## Project Structure
university-management-system/ │── backend/ # Flask backend │ ├── setup_database.py # Flask API for database management │ ├── requirements.txt # Dependencies for backend │ ├── .env # Database credentials │── frontend/ # React frontend │ ├── src/ │ │ ├── App.js # Main React component │ │ ├── index.js # Entry point for React app │ │ ├── components/ # Additional UI components │ ├── package.json # Frontend dependencies │── README.md # Documentation │── .gitignore # Files to ignore in Git
