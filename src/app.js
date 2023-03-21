'use strict';

const express = require('express');
const { default: helmet } = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const dotenv = require('dotenv');

const globalErrorHandler = require('./controllers/error.controller');
const AppError = require('./utils/app-error.util');
const jobRouter = require('./routes/job.routes');
const authRouter = require('./routes/auth.routes');

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());

app.use(morgan('dev'));

app.use(compression());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

require('./databases/init.mongodb');

app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/auth', authRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
