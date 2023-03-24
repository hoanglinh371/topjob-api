'use strict';

const express = require('express');

const JobController = require('../controllers/job.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

const jobRouter = express.Router();

jobRouter
  .route('/')
  .get(AuthMiddleware.protect, JobController.httpGetJobs)
  .post(
    AuthMiddleware.protect,
    AuthMiddleware.restrictTo('admin', 'hr'),
    JobController.httpCreateJob
  );

jobRouter
  .route('/:_id')
  .get(JobController.httpGetJob)
  .patch(
    AuthMiddleware.protect,
    AuthMiddleware.restrictTo('admin', 'hr'),
    JobController.httpUpdateJob
  )
  .delete(
    AuthMiddleware.protect,
    AuthMiddleware.restrictTo('admin', 'hr'),
    JobController.httpDeleteJob
  );

module.exports = jobRouter;
