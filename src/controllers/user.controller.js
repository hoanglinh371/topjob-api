'use strict';

const catchAsync = require('../utils/catch-async.util');
const UserService = require('../services/user.service');

class UserController {
  static httpGetUsers = catchAsync(async (req, res, next) => {
    return res.status(200).json(await UserService.getUsers(req.query));
  });

  static httpGetUserById = catchAsync(async (req, res, next) => {
    return res.status(200).json(await UserService.getUserById(req.params._id));
  });

  static httpUpdateUser = catchAsync(async (req, res, next) => {
    return res
      .status(200)
      .json(await UserService.updateUser(req.params._id, req.body));
  });

  static httpDeleteUser = catchAsync(async (req, res, next) => {
    return res.status(204).json(await UserService.deleteUser(req.params._id));
  });
}

module.exports = UserController;
