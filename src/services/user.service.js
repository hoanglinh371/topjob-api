'use strict';

const User = require('../models/user.model');
const ApiFeature = require('../utils/api-feature.util');
const AppError = require('../utils/app-error.util');
const filterObject = require('../helpers/filter-object.helper');

class UserService {
  static getUsers = async (queryString) => {
    const apiFeature = new ApiFeature(User.find(), queryString)
      .filter()
      .sort()
      .paginate();
    const users = await apiFeature.query;

    return {
      status: 'success',
      results: users.length,
      metadata: {
        users,
      },
    };
  };

  static getUserById = async (_id) => {
    const user = await User.findById(_id);
    if (!user) {
      throw new AppError('No user found with this ID.', 404);
    }

    return {
      status: 'success',
      metadata: {
        user,
      },
    };
  };

  static updateUser = async (_id, payload) => {
    if (payload.password || payload.confirmPassword) {
      throw new AppError(
        'This route is not for password updates. Please use /update-password.',
        400
      );
    }

    const filteredBody = filterObject(payload, 'name', 'email');
    const updatedUser = await User.findByIdAndUpdate(_id, filteredBody, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      throw new AppError('No user found with this ID.', 404);
    }

    return {
      status: 'success',
      metadata: {
        user: updatedUser,
      },
    };
  };

  static deleteUser = async (_id) => {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      throw new AppError('No user found with this ID.', 404);
    }

    return {
      status: 'success',
      metadata: null,
    };
  };
}

module.exports = UserService;
