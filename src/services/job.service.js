'use strict';

const Job = require('../models/job.model');
const AppError = require('../utils/app-error.util');
const ApiFeature = require('../utils/api-feature.util');

class JobService {
  static getJobs = async (queryString) => {
    const apiFeature = new ApiFeature(Job.find(), queryString)
      .filter()
      .sort()
      .paginate();
    const jobs = await apiFeature.query;

    return {
      status: 'success',
      results: jobs.length,
      metadata: {
        jobs,
      },
    };
  };

  static getJob = async (_id) => {
    const job = await Job.findById(_id);
    if (!job) {
      throw new AppError('No job found with this ID.', 404);
    }

    return {
      status: 'success',
      metadata: {
        job,
      },
    };
  };

  static createJob = async (data) => {
    const newJob = await Job.create(data);

    return {
      status: 'success',
      metadata: {
        job: newJob,
      },
    };
  };

  static updateJob = async (_id, updatedData) => {
    const updatedJob = await Job.findByIdAndUpdate(_id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!updatedJob) {
      throw new AppError('No job found with this ID.', 404);
    }

    return {
      status: 'success',
      metadata: {
        job: updatedJob,
      },
    };
  };

  static deleteJob = async (_id) => {
    const job = await Job.findByIdAndDelete(_id);
    if (!job) {
      throw new AppError('No job found with this ID.', 404);
    }

    return {
      status: 'success',
      metadata: null,
    };
  };
}

module.exports = JobService;
