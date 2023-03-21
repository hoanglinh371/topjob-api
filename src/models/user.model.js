'use strict';

const { default: mongoose } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Please provide your name.'],
    },
    email: {
      type: String,
      require: [true, 'Please provide your email.'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email.'],
    },
    role: {
      type: String,
      enum: ['admin', 'hr', 'user'],
      default: 'user',
    },
    password: {
      type: String,
      require: [true, 'Please provide your password.'],
      select: false,
    },
    confirmPassword: {
      type: String,
      require: [true, 'Please confirm your password.'],
      validate: {
        validator: function (value) {
          return this.password === value;
        },
        message: 'Passwords are not the same.',
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
