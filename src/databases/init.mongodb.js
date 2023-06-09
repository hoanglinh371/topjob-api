'use strict';

const { default: mongoose } = require('mongoose');

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });

      mongoose.connect(process.env.MONGO_URI_DEV).then(() => {
        console.log(`DEVELOPMENT::MongoDB Connection Successful!`);
      });
    }
    if (process.env.NODE_ENV === 'production') {
      mongoose.connect(process.env.MONGO_URI_PROD).then(() => {
        console.log(`PRODUCTION::MongoDB Connection Successful!`);
      });
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongoDB = Database.getInstance();

module.exports = instanceMongoDB;
