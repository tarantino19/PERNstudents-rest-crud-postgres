const { Router } = require('express');
const router = Router();
const { getStudents, getStudentById, addStudent, removeStudent, updateStudent } = require('./controller');

router.get('/', getStudents);
router.get('/:id', getStudentById);
router.post('/', addStudent);
router.delete('/:id', removeStudent);
router.patch('/:id', updateStudent);

module.exports = router;
