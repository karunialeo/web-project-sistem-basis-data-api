import db from "../config/db.js";

// Controller function to get all posts
const getAllTeachers = (req, res) => {
  const query = "SELECT * FROM teacher WHERE is_deleted = 0";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Failed to retrieve teacher list from database" });
    } else {
      res.json(results);
    }
  });
};

const getTeacherByNIP = (req, res) => {
  // Get the ID from the request body
  const teacherNIP = req.params.nip;

  if (!teacherNIP) {
    return res
      .status(400)
      .json({ error: "Missing 'nip' in the request parameter" });
  }

  // Construct the SQL query with a WHERE clause to filter by the ID
  const query = "SELECT * FROM teacher WHERE nip = ?";

  db.query(query, [teacherNIP], (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Failed to retrieve teacher data from database" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.json(results[0]); // Assuming there should be only one post with a given ID
  });
};

// Controller function to create a new post
const createTeacher = (req, res) => {
  const { nip, name } = req.body;

  if (!nip || !name) {
    return res
      .status(400)
      .json({ error: "Both 'nip' and 'name' fields are required" });
  }

  const query = "INSERT INTO teacher (nip, name) VALUES (?, ?)";

  db.query(query, [nip, name], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create a new teacher" });
    } else {
      res.json({ message: "New teacher created", teacherNIP: nip });
    }
  });
};

const editTeacher = (req, res) => {
  const { nip, name } = req.body;

  if (!nip || !name) {
    return res
      .status(400)
      .json({ error: "Both 'nip' and 'name' fields are required" });
  }

  const query = "UPDATE teacher SET name = ? WHERE nip = ?";

  db.query(query, [name, nip], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to edit teacher data" });
    }

    if (result.affectedRows === 0) {
      // If no rows were affected, it means the student with the given 'nis' doesn't exist
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.json({ message: "Teacher data edited successfully" });
  });
};

const deleteTeacher = (req, res) => {
  const { nip } = req.body;

  if (!nip) {
    return res.status(400).json({ error: "'nip' field is required" });
  }

  const query = "UPDATE teacher SET is_deleted = 1 WHERE nip = ?";

  db.query(query, [nip], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete teacher" });
    }

    if (result.affectedRows === 0) {
      // If no rows were affected, it means the student with the given 'nis' doesn't exist
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.json({ message: "Teacher deleted successfully" });
  });
};

export {
  createTeacher,
  getAllTeachers,
  getTeacherByNIP,
  editTeacher,
  deleteTeacher,
  // Export other controller functions
};
