import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    console.clear();
    console.log("🔄 Fetching students from backend...");

    axios.get("http://127.0.0.1:5000/students", { withCredentials: true })
      .then(response => {
        console.log("✅ Fetched students:", response.data);
        setStudents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("❌ Error fetching students:", error.message);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // ✅ Debugging Log
  console.log("🔍 Rendered Students State:", students);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>🎓 Student List</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {loading ? (
        <p>Loading students...</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {students.length > 0 ? (
            students.map((student, index) => (
              <li key={index} style={{ fontSize: "18px", marginBottom: "5px" }}>
                {student.name} ({student.credits} credits)
              </li>
            ))
          ) : (
            <p>No students found.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default App;