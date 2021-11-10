const Student = require('../models/Student');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');

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
    if (!req.files) {
      throw new CustomError.BadRequestError('No File Uploaded');
    }
    const studentImage = req.files.image;
    if (!studentImage.mimetype.startsWith('image')) {
      throw new CustomError.BadRequestError('Please Upload Image');
    }
    const maxSize = 1024 * 1024;
    if (pstudentImage.size > maxSize) {
      throw new CustomError.BadRequestError('Please upload image smaller 1MB');
    }
    const imagePath = path.join(
      __dirname,
      '../public/uploads/' + `${studentImage.name}`
    );
    await studentImage.mv(imagePath);
  
    return res
      .status(StatusCodes.OK)
      .json({ image: `/uploads/${studentImage.name}` });
  };

  module.exports = {
    createStudent,
    getAllStudents,
    uploadImage,
  };