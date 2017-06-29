// require('dotenv').config();
// // const sendNotification = require('../functions/send_notification');
// // console.log('send notification', sendNotification)
// const twilio = require ('twilio');
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken  = process.env.TWILIO_AUTH_TOKEN;
// const twilioNum = process.env.TWILIO_NUM;
// // const playerNum = process.env.PLAYER_NUM;
// const client = twilio(accountSid, authToken);

// const express = require('express');
// module.exports = (knex, passport) => {
//   const router = express.Router();
//   router.post("/:game_id", (req, res) => {
//     console.log('start sending')
//     sendNotification(knex, req.params.game_id, req.session.passport.user, res);
//     client.messages.create({
//       to: `+1${phoneNumbers}`,
//       from: twilioNum,
//       body: 'You have a game today at 12:05 AM'
//     }, (err, message) => {
//       if(err) {
//         console.log(err)
//         res.status(500)
//       } else {
//         console.log(message.sid)
//       }
//     })
//     res.send('message sent');
//   });
//   return router;
// }