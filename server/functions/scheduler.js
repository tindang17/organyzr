var CronJob = require('cron').CronJob;
const moment = require('moment');
const notificationsWorker = require('./notificationWorker')
const schedulerFactory = function() {
  return {
    start: function() {
      console.log('beginning of scheduler')
      new CronJob('* * * * * *', function() {
        console.log('Running Send Notifications Worker for ' +
          moment().format());
        notificationsWorker.run();
      }, null, true, '');
    },
  };
};
console.log('schedule factory', schedulerFactory)
module.exports = schedulerFactory();