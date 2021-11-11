const Student = require('../models/Student');
const { StatusCodes } = require('http-status-codes');
const CustomError=require('../errors/custom-api')

const cloudinary=require('cloudinary').v2
const fs=require('fs')

// Create Student   =>    POST /api/v1/students
const createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.status(StatusCodes.CREATED).json({ student });
};

// Public Route
// Get All Students   =>    GET /api/v1/students

const getAllStudents = async (req, res) => {
  const {sort}=req.query

  let result = Student.find({})

  if(sort){
    const sortList=sort.split(',').join(' ')
    result=result.sort(sortList)
  }else{
    result=result.sort('fName')
  }

  const page=Number(req.query.page) || 1
  const limit=Number(req.query.limit) || 10
  const skip=(page-1)*limit

  result=result.skip(skip).limit(limit)

  const students=await result

  res.status(StatusCodes.OK).json({ students, count: students.length });
};

// Get Single Student   =>    GET /api/v1/students/:id

const getSingleStudent=async(req,res)=>{
  const {id:studentId}=req.params

  const student=await Student.findOne({_id:studentId})

  if(!student){
    throw new CustomError.NotFoundError(`No student with id : ${studentId}`)
  }
  res.status(StatusCodes.OK).json({ student });
}

// Update Student   =>    PATCH /api/v1/students/:id

const updateStudent=async(req,res)=>{
  const {id:studentId}=req.params

  const student=await Student.findOneAndUpdate({_id:studentId},req.body,{
    new:true,
    runValidators:true
  })

  if(!student){
    throw new CustomError.NotFoundError(`No student with id : ${studentId}`)
  }
  res.status(StatusCodes.OK).json({ student });
}

// Delete Student   =>    DELETE /api/v1/students/:id

const deleteStudent=async(req,res)=>{
  const {id:studentId}=req.params

  const student=await Student.findOne({_id:studentId})

  if(!student){
    throw new CustomError.NotFoundError(`No student with id : ${studentId}`)
  }

  student.remave()
  res.status(StatusCodes.OK).json({ msg:'success! student removed'});
}

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
    updateStudent,
    deleteStudent,
    getSingleStudent
  };