const express = require('express');
const router = express.Router();

const {createStudent,getAllStudents,uploadImage}=require('../controllers/studentControllers')

router.route('/')
    .post(createStudent)
    .get(getAllStudents)

router.route('/uploadImage')
    .post(uploadImage)

module.exports=router