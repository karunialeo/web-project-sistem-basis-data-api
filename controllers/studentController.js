import db from "../config/db.js";

// Controller function to get all posts
const getAllStudents = (req, res) => {
  const query = "SELECT nis, name FROM student WHERE is_deleted = 0";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Failed to retrieve student list from database" });
    } else {
      res.json(results);
    }
  });
};

const getStudentByNIS = (req, res) => {
  // Get the ID from the request body
  const studentNIS = req.params.nis;

  if (!studentNIS) {
    return res
      .status(400)
      .json({ error: "Missing 'nis' in the request parameter" });
  }

  // Construct the SQL query with a WHERE clause to filter by the ID
  const query = "SELECT * FROM student WHERE nis = ?";

  db.query(query, [studentNIS], (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Failed to retrieve student data from database" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(results[0]); // Assuming there should be only one post with a given ID
  });
};

// Controller function to create a new post
const createStudent = (req, res) => {
  const { nis, name } = req.body;

  if (!nis || !name) {
    return res
      .status(400)
      .json({ error: "Both 'nis' and 'name' fields are required" });
  }

  // Check if nis already exists
  const checkQuery = "SELECT COUNT(*) as count FROM student WHERE nis = ?";
  db.query(checkQuery, [nis], (checkErr, checkResult) => {
    if (checkErr) {
      console.error(checkErr);
      return res.status(500).json({ error: "Failed to check nis existence" });
    }

    const nisCount = checkResult[0].count;

    // If nis already exists, return an error
    if (nisCount > 0) {
      return res.status(400).json({ error: "NIS already exists" });
    }

    // If nis doesn't exist, proceed with the insertion
    const insertQuery = "INSERT INTO student (nis, name) VALUES (?, ?)";
    db.query(insertQuery, [nis, name], (insertErr, result) => {
      if (insertErr) {
        console.error(insertErr);
        return res
          .status(500)
          .json({ error: "Failed to create a new student" });
      } else {
        res.json({ message: "New student created", studentNIS: nis });
      }
    });
  });
};

const editStudent = (req, res) => {
  const { nis, name } = req.body;

  if (!nis || !name) {
    return res
      .status(400)
      .json({ error: "Both 'nis' and 'name' fields are required" });
  }

  const query = "UPDATE student SET name = ? WHERE nis = ?";

  db.query(query, [name, nis], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to edit student data" });
    }

    if (result.affectedRows === 0) {
      // If no rows were affected, it means the student with the given 'nis' doesn't exist
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Student data edited successfully" });
  });
};

const deleteStudent = (req, res) => {
  const { nis } = req.body;

  if (!nis) {
    return res.status(400).json({ error: "'nis' field is required" });
  }

  const query = "UPDATE student SET is_deleted = 1 WHERE nis = ?";

  db.query(query, [nis], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete student" });
    }

    if (result.affectedRows === 0) {
      // If no rows were affected, it means the student with the given 'nis' doesn't exist
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  });
};

export {
  createStudent,
  getAllStudents,
  getStudentByNIS,
  editStudent,
  deleteStudent,
  // Export other controller functions
};
