'use strict';

const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const catchAsync = require('../utils/catch-async.util');
const AppError = require('../utils/app-error.util');

class AuthMiddleware {
  static protect = catchAsync(async (req, res, next) => {
    const { authorization } = req.headers;
    let token;

    if (authorization && authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(
        new AppError('You are not log in! Please log in to get access.', 401)
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }
    if (user.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          'User recently changed password! Please log in again.',
          401
        )
      );
    }
    req.user = user;

    next();
  });

  static restrictTo = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError('You do not have permission to perform ths action.', 403)
        );
      }

      next();
    };
  };
}

module.exports = AuthMiddleware;
