'use strict';

const nodemailer = require('nodemailer');

class EmailService {
  constructor(options) {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    this.options = options;
  }

  async sendMail() {
    await this.transporter.sendMail({
      from: 'TopJobs <admin@topjobs.com>',
      to: this.options.email,
      subject: this.options.subject,
      text: this.options.message,
    });
  }
}

module.exports = EmailService;
