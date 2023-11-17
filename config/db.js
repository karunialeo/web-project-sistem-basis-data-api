import mysql from "mysql";

const MySQLHost = "localhost";
const MySQLUser = "root";
const MySQLPass = "";
const MySQLDB = "sekolahdiannusantara";

const db = mysql.createConnection({
  host: MySQLHost,
  user: MySQLUser,
  password: MySQLPass,
  database: MySQLDB,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error: " + err.message);
  } else {
    console.log(`Connected to MySQL database ${MySQLDB}`);
  }
});

export default db;
