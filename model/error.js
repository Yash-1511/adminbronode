const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var errSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
      required: [true, 'Lỗi phải có nội dung'],
    },
    typeErr: {
      type: String,
      required: true,
      trim: true,
      enum: {
        values: [
          'CastError',
          '11000',
          'ValidationError',
          'JsonWebTokenError',
          'TokenExpiredError',
        ],
        message: 'Loại lỗi phải là: User, Teacher, Admin',
      },
    },
    isFix: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model('Error', errSchema);
