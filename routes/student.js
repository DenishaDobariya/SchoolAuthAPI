const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { addStudent, getStudentById, getAllStudents, updateStudent, deleteStudent } = require('../controllers/studentController');

router.post('/add', protect(['master', 'principal', 'teacher']), addStudent);  
router.get('/:id', protect(['master', 'principal', 'teacher', 'student']), getStudentById);  
router.get('/', protect(['master', 'principal', 'teacher']), getAllStudents);     
router.put('/update/:id', protect(['master', 'principal', 'teacher']), updateStudent);  
router.delete('/delete/:id', protect(['master', 'principal', 'teacher']), deleteStudent); 

module.exports = router;
