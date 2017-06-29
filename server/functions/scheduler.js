var CronJob = require('cron').CronJob;
const moment = require('moment');
const sendNotification = require('./send_notification')
const schedulerFactory = function() {
  return {
    start: function(knex) {
      console.log('beginning of scheduler')
      new CronJob('00 27 19 * * *', function() {
        console.log('Running Send Notifications Worker for ' +
          moment().format());
          knex('games_users').select('game_id').returning('game_id')
          .then((game_id) => {
            for(let id of game_id) {
              console.log('show the game id ', id.game_id)
              sendNotification(knex, id.game_id)
            }
          })
      }, null, true, '');
    },
  };
};
module.exports = schedulerFactory();