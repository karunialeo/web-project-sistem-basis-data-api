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

const router = express.Router();

// ROUTES FOR STUDENT
router
  .route("/student")
  .get(getAllStudents)
  .post(createStudent)
  .put(editStudent)
  .delete(deleteStudent);

router.get("/student/:nis", getStudentByNIS);

// ROUTES FOR TEACHER
router
  .route("/teacher")
  .get(getAllTeachers)
  .post(createTeacher)
  .put(editTeacher)
  .delete(deleteTeacher);

router.get("/teacher/:nip", getTeacherByNIP);

export default router;
