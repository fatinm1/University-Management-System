import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // State for students, instructors, courses, and enrollments
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [enrollment, setEnrollment] = useState({ student_id: "", course_id: "" });

  // State for adding new students, courses, and instructors
  const [newStudent, setNewStudent] = useState({ student_id: "", name: "", credits_earned: "" });
  const [newCourse, setNewCourse] = useState({ course_id: "", course_title: "", instructor_id: "", credits: "" });
  const [newInstructor, setNewInstructor] = useState({ instructor_id: "", name: "", department: "" });

  const [editStudent, setEditStudent] = useState({ student_id: "", name: "", credits_earned: "" });
  const [editInstructor, setEditInstructor] = useState({ instructor_id: "", name: "", department: "" });
  const [editCourse, setEditCourse] = useState({ course_id: "", course_title: "", instructor_id: "", credits: "" });
  const [enrollments, setEnrollments] = useState([]);

  // Fetch all data when the page loads
  useEffect(() => {
    fetchData("students", setStudents);
    fetchData("courses", setCourses);
    fetchData("instructors", setInstructors);
    fetchData("enrollments", setEnrollments); // Fetch enrollments
  }, []);

  // Generic function to fetch data from backend
  const fetchData = (endpoint, setState) => {
    axios.get(`http://127.0.0.1:5000/${endpoint}`)
      .then(response => setState(response.data))
      .catch(error => console.error(`❌ Error fetching ${endpoint}:`, error.message));
  };

  // Generic function to handle input changes
  const handleInputChange = (event, setState) => {
    setState(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  /** ================================
   *   STUDENT FUNCTIONS
   *  ================================ */

  const addStudent = () => {
    if (!newStudent.student_id || !newStudent.name || !newStudent.credits_earned) {
      alert("⚠️ Please fill all fields.");
      return;
    }
    axios.post("http://127.0.0.1:5000/students", newStudent)
      .then(() => {
        fetchData("students", setStudents);
        setNewStudent({ student_id: "", name: "", credits_earned: "" });
        alert("✅ Student added successfully!");
      })
      .catch(error => alert(`❌ Error adding student: ${error.response?.data?.error || error.message}`));
  };

  const deleteStudent = (id) => {
    axios.delete(`http://127.0.0.1:5000/students/${id}`)
      .then(() => {
        fetchData("students", setStudents);
        alert("✅ Student deleted successfully!");
      })
      .catch(error => alert(`❌ Error deleting student: ${error.response?.data?.error || error.message}`));
  };

  const updateStudent = () => {
    if (!editStudent.student_id || !editStudent.name || !editStudent.credits_earned) {
        alert("⚠️ Please fill all fields.");
        return;
    }

    axios.put(`http://127.0.0.1:5000/students/${editStudent.student_id}`, editStudent)
        .then(() => {
            fetchData("students", setStudents);
            setEditStudent({ student_id: "", name: "", credits_earned: "" });
            alert("✅ Student updated successfully!");
        })
        .catch(error => alert(`❌ Error updating student: ${error.response?.data?.error || error.message}`));
};

  /** ================================
   *   COURSE FUNCTIONS
   *  ================================ */

  const addCourse = () => {
  
    const payload = {
      course_id: parseInt(newCourse.course_id, 10),
      course_title: newCourse.course_title,
      instructor_id: parseInt(newCourse.instructor_id, 10),
      credits: parseInt(newCourse.credits, 10),
    };
  
    axios.post("http://127.0.0.1:5000/courses", payload)
      .then(() => {
        fetchData("courses", setCourses);
        setNewCourse({ course_id: "", course_title: "", instructor_id: "", credits: "" });
        alert("✅ Course added successfully!");
      })
      .catch(error => alert(`❌ Error adding course: ${error.response?.data?.error || error.message}`));
  };  

  const deleteCourse = (id) => {
    axios.delete(`http://127.0.0.1:5000/courses/${id}`)
      .then(() => {
        fetchData("courses", setCourses);
        alert("✅ Course deleted successfully!");
      })
      .catch(error => alert(`❌ Error deleting course: ${error.response?.data?.error || error.message}`));
  };

  const updateCourse = () => {
    if (!editCourse.course_id || !editCourse.course_title || !editCourse.instructor_id || !editCourse.credits) {
        alert("⚠️ Please fill all fields.");
        return;
    }

    axios.put(`http://127.0.0.1:5000/courses/${editCourse.course_id}`, editCourse)
        .then(() => {
            fetchData("courses", setCourses);
            setEditCourse({ course_id: "", course_title: "", instructor_id: "", credits: "" });
            alert("✅ Course updated successfully!");
        })
        .catch(error => alert(`❌ Error updating course: ${error.response?.data?.error || error.message}`));
};

  /** ================================
   *   INSTRUCTOR FUNCTIONS
   *  ================================ */

  const addInstructor = () => {
    if (!newInstructor.instructor_id || !newInstructor.name || !newInstructor.department) {
      alert("⚠️ Please fill all fields.");
      return;
    }
    axios.post("http://127.0.0.1:5000/instructors", newInstructor)
      .then(() => {
        fetchData("instructors", setInstructors);
        setNewInstructor({ instructor_id: "", name: "", department: "" });
        alert("✅ Instructor added successfully!");
      })
      .catch(error => alert(`❌ Error adding instructor: ${error.response?.data?.error || error.message}`));
  };

  const deleteInstructor = (id) => {
    axios.delete(`http://127.0.0.1:5000/instructors/${id}`)
      .then(() => {
        fetchData("instructors", setInstructors);
        alert("✅ Instructor deleted successfully!");
      })
      .catch(error => alert(`❌ Error deleting instructor: ${error.response?.data?.error || error.message}`));
  };

  const updateInstructor = () => {
    if (!editInstructor.instructor_id || !editInstructor.name || !editInstructor.department) {
        alert("⚠️ Please fill all fields.");
        return;
    }

    axios.put(`http://127.0.0.1:5000/instructors/${editInstructor.instructor_id}`, editInstructor)
        .then(() => {
            fetchData("instructors", setInstructors);
            setEditInstructor({ instructor_id: "", name: "", department: "" });
            alert("✅ Instructor updated successfully!");
        })
        .catch(error => alert(`❌ Error updating instructor: ${error.response?.data?.error || error.message}`));
};

  /** ================================
   *   ENROLLMENT FUNCTIONS
   *  ================================ */

  const enrollStudent = () => {
    if (!enrollment.student_id || !enrollment.course_id) {
      alert("⚠️ Please select a student and a course.");
      return;
    }
    axios.post("http://127.0.0.1:5000/enroll", enrollment)
      .then(() => {
        alert("✅ Student enrolled successfully!");
        setEnrollment({ student_id: "", course_id: "" });
      })
      .catch(error => alert(`❌ Error enrolling student: ${error.response?.data?.error || error.message}`));
  };

  const dropStudent = () => {
    if (!enrollment.student_id || !enrollment.course_id) {
      alert("⚠️ Please select a student and a course.");
      return;
    }
    axios.delete(`http://127.0.0.1:5000/enroll/${enrollment.student_id}/${enrollment.course_id}`)
      .then(() => {
        alert("✅ Student dropped from course successfully!");
        setEnrollment({ student_id: "", course_id: "" });
      })
      .catch(error => alert(`❌ Error dropping student: ${error.response?.data?.error || error.message}`));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🎓 University Management System</h1>

      {/* ADD STUDENT */}
      <h2>👨‍🎓 Add Student</h2>
      <input type="number" name="student_id" placeholder="ID" onChange={e => handleInputChange(e, setNewStudent)} />
      <input type="text" name="name" placeholder="Name" onChange={e => handleInputChange(e, setNewStudent)} />
      <input type="number" name="credits_earned" placeholder="Credits" onChange={e => handleInputChange(e, setNewStudent)} />
      <button onClick={addStudent}>➕ Add Student</button>

      <h2>✏️ Modify Student</h2>
      <input type="number" name="student_id" placeholder="ID" onChange={e => handleInputChange(e, setEditStudent)} />
      <input type="text" name="name" placeholder="New Name" onChange={e => handleInputChange(e, setEditStudent)} />
      <input type="number" name="credits_earned" placeholder="New Credits" onChange={e => handleInputChange(e, setEditStudent)} />
      <button onClick={updateStudent}>✏️ Update Student</button>

      {/* STUDENT LIST */}
      <h2>👨‍🎓 Students</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            <b>ID:</b> {student.id} - {student.name} ({student.credits} credits)
            <button onClick={() => deleteStudent(student.id)}>Delete</button>
          </li>
        ))}
      </ul>


      {/* ADD COURSE */}
      <h2>📚 Add Course</h2>
      <input type="number" name="course_id" placeholder="Course ID" onChange={e => handleInputChange(e, setNewCourse)} />
      <input type="text" name="course_title" placeholder="Course Title" onChange={e => handleInputChange(e, setNewCourse)} />
      <input type="number" name="instructor_id" placeholder="Instructor ID" onChange={e => handleInputChange(e, setNewCourse)} />
      <input type="number" name="credits" placeholder="Credits" onChange={e => handleInputChange(e, setNewCourse)} />
      <button onClick={addCourse}>➕ Add Course</button>

      <h2>✏️ Modify Course</h2>
      <input type="number" name="course_id" placeholder="Course ID" onChange={e => handleInputChange(e, setEditCourse)} />
      <input type="text" name="course_title" placeholder="New Course Title" onChange={e => handleInputChange(e, setEditCourse)} />
      <input type="number" name="instructor_id" placeholder="New Instructor ID" onChange={e => handleInputChange(e, setEditCourse)} />
      <input type="number" name="credits" placeholder="New Credits" onChange={e => handleInputChange(e, setEditCourse)} />
      <button onClick={updateCourse}>✏️ Update Course</button>

      {/* COURSE LIST */}
      <h2>📚 Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <b>{course.title}</b> ({course.credits} credits)
            <button onClick={() => deleteCourse(course.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* ADD INSTRUCTOR */}
      <h2>👨‍🏫 Add Instructor</h2>
      <input type="number" name="instructor_id" placeholder="Instructor ID" onChange={e => handleInputChange(e, setNewInstructor)} />
      <input type="text" name="name" placeholder="Name" onChange={e => handleInputChange(e, setNewInstructor)} />
      <input type="text" name="department" placeholder="Department" onChange={e => handleInputChange(e, setNewInstructor)} />
      <button onClick={addInstructor}>➕ Add Instructor</button>

      <h2>✏️ Modify Instructor</h2>
      <input type="number" name="instructor_id" placeholder="Instructor ID" onChange={e => handleInputChange(e, setEditInstructor)} />
      <input type="text" name="name" placeholder="Name" onChange={e => handleInputChange(e, setEditInstructor)} />
      <input type="text" name="department" placeholder="New Department" onChange={e => handleInputChange(e, setEditInstructor)} />
      <button onClick={updateInstructor}>✏️ Update Instructor</button>

      {/* INSTRUCTOR LIST */}
      <h2>👨‍🏫 Instructors</h2>
      <ul>
        {instructors.map(instructor => (
          <li key={instructor.id}>
            <b>ID:</b> {instructor.id} - {instructor.name} ({instructor.department})
            <button onClick={() => deleteInstructor(instructor.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* ENROLLMENT */}
      <h2>📖 Enroll Student</h2>
      <select onChange={e => setEnrollment({ ...enrollment, student_id: e.target.value })}>
        <option value="">Select Student</option>
        {students.map(student => <option key={student.id} value={student.id}>{student.name}</option>)}
      </select>

      <select onChange={e => setEnrollment({ ...enrollment, course_id: e.target.value })}>
        <option value="">Select Course</option>
        {courses.map(course => <option key={course.id} value={course.id}>{course.title}</option>)}
      </select>

      <button onClick={enrollStudent}>📚 Enroll</button>
      <button onClick={dropStudent}>❌ Drop</button>
    
    {/* ENROLLMENT RECORDS */}
    <h2>📖 Enrollment Records</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Course ID</th>
            <th>Course Title</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map(enrollment => {
            const student = students.find(s => s.id === enrollment.student_id);
            const course = courses.find(c => c.id === enrollment.course_id);
            
            return (
              <tr key={`${enrollment.student_id}-${enrollment.course_id}`}>
                <td>{enrollment.student_id}</td>
                <td>{student ? student.name : "Unknown"}</td>
                <td>{enrollment.course_id}</td>
                <td>{course ? course.title : "Unknown"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

  );
}

export default App;