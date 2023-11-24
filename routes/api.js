import express from "express";
import {
  getAllStudents,
  createStudent,
  editStudent,
  deleteStudent,
  getStudentByNIS,
} from "../controllers/studentController.js";
import {
  getAllTeachers,
  createTeacher,
  editTeacher,
  deleteTeacher,
  getTeacherByNIP,
} from "../controllers/teacherController.js";
import{
  createUser,
  getAllUsers,
  getUserByUsername,
  editUser,
  deleteUser,
  registerUser,
  loginUser,
}from "../controllers/userController.js";

const router = express.Router();

// Akses menggunakan postman (install jika belum ada) atau Thunder Client (Extension VS Code)
// Contoh :
// http://localhost:3002/api/student
// jangan lupa memilih method, contoh jika mau mendapatkan list siswa maka menggunakan method GET

// ROUTES FOR STUDENT
router
  .route("/student")
  .get(getAllStudents) // get all student information
  .post(createStudent) // add new student
  .put(editStudent) // edit existing student
  .delete(deleteStudent); // delete student
router.get("/student/:nis", getStudentByNIS); // get student information by giving NIS as params

// ROUTES FOR TEACHER
router
  .route("/teacher")
  .get(getAllTeachers) // get all teacher information
  .post(createTeacher) // add new teacher
  .put(editTeacher) // edit existing teacher
  .delete(deleteTeacher); // delete teacher
router.get("/teacher/:nip", getTeacherByNIP); // get teacher information by giving NIP as params

// ROUtes FOR USER
router
  .route("/user")
  .get(getAllUsers) // get all user information
  .post(createUser) // add new user
  .put(editUser) // edit existing student
  .delete(deleteUser) // delete user
router.get("/user/:username", getUserByUsername);
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

export default router;
