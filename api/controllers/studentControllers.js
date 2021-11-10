const Student = require('../models/Student');
const { StatusCodes } = require('http-status-codes');
const cloudinary=require('cloudinary').v2
const fs=require('fs')

// Create Student   =>    POST /api/v1/students
const createStudent = async (req, res) => {
  req.body.user = req.user.userId;
  const Student = await Student.create(req.body);
  res.status(StatusCodes.CREATED).json({ student });
};

// Public Route
// Get All Students   =>    GET /api/v1/students

const getAllStudents = async (req, res) => {
  const Students = await Student.find({});
  res.status(StatusCodes.OK).json({ Students, count: Students.length });
};

const uploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
        use_filename:true,
        folder:'file-upload'
    }
)
fs.unlinkSync(req.files.image.tempFilePath)
return res.status(StatusCodes.OK).json({image:{src:result.secure_url}})
};

  module.exports = {
    createStudent,
    getAllStudents,
    uploadImage,
  };