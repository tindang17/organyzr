// var CronJob = require('cron').CronJob;
// const moment = require('moment');
// const sendNotification = require('./send_notification')
// const schedulerFactory = function() {
//   return {
//     start: function(knex) {
//       console.log('beginning of scheduler')
//       new CronJob('* * * * * *', function() {
//         console.log('Running Send Notifications Worker for ' +
//           moment().format());
//           knex('games_users').join('games', 'games_users.game_id', '=', 'games.id').select('games.id', 'games.date')
//           .then((games) => {
//             // console.log(games)
//             // console.log(games[0].date, games[0].time, games[0].id)
//             for(let game of games) {
//               console.log('game day', moment(game.date).calendar())
//               console.log(moment().add(1, 'days').calendar());
//             }
//           })
//       }, null, true, '');
//     },
//   };
// };
// module.exports = schedulerFactory();