const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: [true, 'Please provide first name'],
      trim: true,
      maxlength: [100, 'Name can not be more than 100 characters'],
    },
    lName: {
        type: String,
        required: [true, 'Please provide last name'],
        trim: true,
        maxlength: [100, 'Name can not be more than 100 characters'],
      },
      dateOfBirth: {
        type: Date,
        required:[true, 'Please provide date of birth'],
        trim: true,
    },
    percentage: {
      type: Number,
      required: [true, 'Please provide percentage']
    },
    profilePicture: {
      type: String,
      default: '/uploads/example.jpeg',
    }
})

module.exports = mongoose.model('Student', StudentSchema);