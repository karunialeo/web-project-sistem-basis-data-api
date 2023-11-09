import mysql from "mysql";

const MySQLHost = "178.16.139.34";
const MySQLUser = "tiundira";
const MySQLPass = "diannusantara2023";
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
