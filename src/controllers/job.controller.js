'use strict';

const JobService = require('../services/job.service');
const catchAsync = require('../utils/catch-async.util');

class JobController {
  static httpGetJobs = catchAsync(async (req, res, next) => {
    return res.status(200).json(await JobService.getJobs(req.query));
  });

  static httpGetJob = catchAsync(async (req, res, next) => {
    return res.status(200).json(await JobService.getJob(req.params._id));
  });

  static httpCreateJob = catchAsync(async (req, res, next) => {
    return res.status(201).json(await JobService.createJob(req.body, req.file));
  });

  static httpUpdateJob = catchAsync(async (req, res, next) => {
    return res
      .status(200)
      .json(await JobService.updateJob(req.params._id, req.body));
  });

  static httpDeleteJob = catchAsync(async (req, res, next) => {
    return res.status(204).json(await JobService.deleteJob(req.params._id));
  });
}

module.exports = JobController;
