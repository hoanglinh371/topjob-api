'use strict';

const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const AppError = require('../utils/app-error.util');

class AuthService {
  static register = async ({ name, email, password, confirmPassword }) => {
    const newUser = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return {
      status: 'success',
      token,
      metadata: {
        user: newUser,
      },
    };
  };

  static logIn = async (email, password) => {
    if (!email || !password) {
      throw new AppError('Please provide email and password.', 400);
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new AppError('Email or password is incorrect.', 401);
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return {
      status: 'success',
      token,
    };
  };
}

module.exports = AuthService;
