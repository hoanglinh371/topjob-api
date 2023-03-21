'use strict';

const express = require('express');
const AuthController = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post('/registration', AuthController.httpRegister);
authRouter.post('/login', AuthController.httpLogIn);

module.exports = authRouter;
