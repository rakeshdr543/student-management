const express = require('express');
const router = express.Router();

const {createStudent,getAllStudents,uploadImage, getSingleStudent, updateStudent, deleteStudent}=require('../controllers/studentControllers')

router.route('/')
    .post(createStudent)
    .get(getAllStudents)

router.route('/:id')
    .get(getSingleStudent)
    .patch(updateStudent)
    .delete(deleteStudent)

router.route('/uploadImage')
    .post(uploadImage)

module.exports=router