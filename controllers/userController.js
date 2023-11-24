import db from "../config/db.js";
import { sha256 } from "../utilities/converter.js";

// Controller function to get all posts
const getAllUsers = (req, res) => {
  const query =
    "SELECT user_id, username, password, role FROM user WHERE is_deleted = 0";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Failed to retrieve user list from database" });
    } else {
      res.json(results);
    }
  });
};

const loginUser = (req, res) => {
  // Get the ID from the request body
  const { username, password } = req.body;
  const hashedPassword = sha256(password);

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Missing 'username' in the request body" });
  }

  // Construct the SQL query with a WHERE clause to filter by the ID
  const query =
    "SELECT username, role FROM user WHERE username = ? AND password = ?";

  db.query(query, [username, hashedPassword], (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Failed to retrieve user data from database" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "Username or password doesn't match" });
    }

    res.json(results[0]); // Assuming there should be only one post with a given ID
  });
};

const getUserByUsername = (req, res) => {
  // Get the ID from the request body
  const username = req.params.username;

  if (!username) {
    return res
      .status(400)
      .json({ error: "Missing 'username' in the request parameter" });
  }

  // Construct the SQL query with a WHERE clause to filter by the ID
  const query = "SELECT * FROM user WHERE username = ?";

  db.query(query, [username], (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Failed to retrieve user data from database" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(results[0]); // Assuming there should be only one post with a given ID
  });
};

const registerUser = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = sha256(password);

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Both 'username' and 'password' fields are required" });
  }

  // Check if user_id already exists
  const checkQuery = "SELECT COUNT(*) as count FROM user WHERE username = ?";
  db.query(checkQuery, [username], (checkErr, checkResult) => {
    if (checkErr) {
      console.error(checkErr);
      return res
        .status(500)
        .json({ error: "Failed to check username existence" });
    }

    const usernameCount = checkResult[0].count;

    // If user already exists, return an error
    if (usernameCount > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // If username doesn't exist, proceed with the insertion
    const insertQuery = "INSERT INTO user (username, password) VALUES (?, ?)";
    db.query(insertQuery, [username, hashedPassword], (insertErr, result) => {
      if (insertErr) {
        console.error(insertErr);
        return res.status(500).json({ error: "Failed to create a new user" });
      } else {
        res.json({ message: "New user created", username: username });
      }
    });
  });
};

// Controller function to create a new post
const createUser = (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res
      .status(400)
      .json({ error: "Both 'username' and 'password' fields are required" });
  }

  // Check if user_id already exists
  const checkQuery = "SELECT COUNT(*) as count FROM user WHERE username = ?";
  db.query(checkQuery, [username], (checkErr, checkResult) => {
    if (checkErr) {
      console.error(checkErr);
      return res
        .status(500)
        .json({ error: "Failed to check username existence" });
    }

    const usernameCount = checkResult[0].count;

    // If user already exists, return an error
    if (usernameCount > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // If username doesn't exist, proceed with the insertion
    const insertQuery =
      "INSERT INTO user (username, password, role) VALUES (?, ?)";
    db.query(insertQuery, [username, password, role], (insertErr, result) => {
      if (insertErr) {
        console.error(insertErr);
        return res.status(500).json({ error: "Failed to create a new user" });
      } else {
        res.json({ message: "New user created", username: username });
      }
    });
  });
};

const editUser = (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({
      error: "Both 'username', 'password' and 'role' fields are required",
    });
  }

  const query = "UPDATE user SET username = ? WHERE user_id = ?";

  db.query(query, [username, password, role], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to edit user data" });
    }

    if (result.affectedRows === 0) {
      // If no rows were affected, it means the student with the given 'user' doesn't exist
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User data edited successfully" });
  });
};

const deleteUser = (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "'username' field is required" });
  }

  const query = "UPDATE user SET is_deleted = 1 WHERE username = ?";

  db.query(query, [username], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete user" });
    }

    if (result.affectedRows === 0) {
      // If no rows were affected, it means the student with the given 'user' doesn't exist
      return res.status(404).json({ error: "user not found" });
    }

    res.json({ message: "user deleted successfully" });
  });
};

export {
  loginUser,
  registerUser,
  createUser,
  getAllUsers,
  getUserByUsername,
  editUser,
  deleteUser,
  // Export other controller functions
};
