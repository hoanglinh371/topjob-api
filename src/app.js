'use strict';

const express = require('express');
const { default: helmet } = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { rateLimit } = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const globalErrorHandler = require('./controllers/error.controller');
const { convertHour2Millisec } = require('./helpers/convert-time.helper');
const AppError = require('./utils/app-error.util');
const jobRouter = require('./routes/job.routes');
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// const limiter = rateLimit({
//   max: 100,
//   windowMs: convertHour2Millisec(1),
//   message: 'To many requests from this IP, please try again in an hour!',
// });
// app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(mongoSanitize());
app.use(compression());

require('./databases/init.mongodb');

app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
