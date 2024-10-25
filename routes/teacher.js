const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { addTeacher, getTeacherById, getAllTeachers, updateTeacher, deleteTeacher } = require('../controllers/teacherController');

router.post('/add', protect(['master', 'principal']), addTeacher);  
router.get('/:id', protect(['master', 'principal', 'teacher']), getTeacherById);  
router.get('/', protect(['master', 'principal']), getAllTeachers);     
router.put('/update/:id', protect(['master', 'principal']), updateTeacher);  
router.delete('/delete/:id', protect(['master', 'principal']), deleteTeacher); 

module.exports = router;
