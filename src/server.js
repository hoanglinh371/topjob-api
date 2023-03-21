'use strict';

const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT: ${process.env.PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err);

  server.close(() => {
    console.log(`Exit Server Express`);
  });
});

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err);

  server.close(() => {
    console.log(`Exit Server Express`);
  });
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log(`Exit Server Express`);
  });
});
