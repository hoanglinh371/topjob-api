'use strict';

const express = require('express');
const JobController = require('../controllers/job.controller');

const jobRouter = express.Router();

jobRouter
  .route('/')
  .get(JobController.httpGetJobs)
  .post(JobController.httpCreateJob);

jobRouter
  .route('/:_id')
  .get(JobController.httpGetJob)
  .patch(JobController.httpUpdateJob)
  .delete(JobController.httpDeleteJob);

module.exports = jobRouter;
