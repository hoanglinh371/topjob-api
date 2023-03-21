'use strict';

const { default: mongoose } = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company.'],
    },
    logo: String,
    logoBackground: String,
    position: {
      type: String,
      required: [true, 'Please provide job position.'],
    },
    contract: {
      type: String,
      required: [true, 'Please provide job contract.'],
      enum: ['full time', 'part time'],
    },
    location: {
      type: String,
      required: [true, 'Please provide job location.'],
    },
    website: {
      type: String,
      required: [true, 'Please provide company website.'],
    },
    apply: {
      type: String,
      required: [true, 'Please provide apply link.'],
    },
    description: {
      type: String,
      required: [true, 'Please provide job description.'],
    },
    requirements: {
      content: {
        type: String,
        required: [true, 'Job requirement must have content.'],
      },
      items: {
        type: [String],
        required: [true, 'Please provide at least 1 requirement for job.'],
      },
    },
    role: {
      content: {
        type: String,
        required: [true, 'Job role must have content.'],
      },
      items: {
        type: [String],
        required: [true, 'Please provide at least 1 requirement for role.'],
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
