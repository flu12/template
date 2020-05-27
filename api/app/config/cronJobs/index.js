const recurrentCheck = require('../../services/recurrentCheck');

/**
 * Generates a CRON scheduler structure
 * CRON scheduler structure
 * ┌────────────── second (optional)
 * │ ┌──────────── minute
 * │ │ ┌────────── hour
 * │ │ │ ┌──────── day of month
 * │ │ │ │ ┌────── month
 * │ │ │ │ │ ┌──── day of week
 * │ │ │ │ │ │
 * │ │ │ │ │ │
 * * * * * * *
 *
 * For '*\/number' the task will run every number of units
 * eq: *\/3 * * * * * will run every 3 seconds
 *
 * @param {Object} interval
 * @param {boolean} isFixedTime - if true run at a precise time eq: 11:00 PM and not every X time
 * */
const getCronInterval = (interval = {}, isFixedTime) => {
  const seconds = interval.seconds ? `${isFixedTime ? '' : '*/'}${interval.seconds}` : '*';
  const minutes = interval.minutes ? `${isFixedTime ? '' : '*/'}${interval.minutes}` : '*';
  const hour = interval.hours ? `${isFixedTime ? '' : '*/'}${interval.hours}` : '*';
  const dayOfMonth = interval.dayOfMonth ? `${interval.dayOfMonth}` : '*';
  const month = interval.month ? `${interval.month}` : '*';
  const dayOfWeek = interval.dayOfWeek ? `${interval.dayOfWeek}` : '*';

  /*
   CRON scheduler structure
   # ┌────────────── second (optional)
   # │ ┌──────────── minute
   # │ │ ┌────────── hour
   # │ │ │ ┌──────── day of month
   # │ │ │ │ ┌────── month
   # │ │ │ │ │ ┌──── day of week
   # │ │ │ │ │ │
   # │ │ │ │ │ │
   # * * * * * *
  * */
  return `${seconds} ${minutes} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
};

const task = (app)  => {
  const { interval, task } = recurrentCheck(app);

  return {
    interval: getCronInterval(interval, true),
    task: task,
  };
};


module.exports = [
 task,
];
