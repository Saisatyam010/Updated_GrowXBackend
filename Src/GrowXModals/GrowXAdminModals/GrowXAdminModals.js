const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// Method to generate and set a password reset token
adminSchema.methods.generatePasswordResetToken = function () {
  this.passwordResetToken = 'generate-token-here'; // Replace with your token generation logic
  this.passwordResetExpires = Date.now() + 3600000; // Token expires in 1 hour
};

const AdminModal = mongoose.model('Admin', adminSchema);

module.exports = AdminModal;