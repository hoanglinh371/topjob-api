'use strict';

const convertMillisecToSec = (ms) => {
  return ms / 1000;
};

const convertMinToMillisec = (min) => {
  return min * 60 * 1000;
};

const convertHour2Millisec = (hours) => {
  return hours * 60 * 60 * 1000;
};

module.exports = {
  convertMillisecToSec,
  convertMinToMillisec,
  convertHour2Millisec,
};
