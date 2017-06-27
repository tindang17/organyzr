// require('dotenv').config();

// const twilio = require ('twilio');
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken  = process.env.TWILIO_AUTH_TOKEN;
// const twilioNum = process.env.TWILIO_NUM;
// const playerNum = process.env.PLAYER_NUM;
// const client = twilio(accountSid, authToken);

// const express = require('express');
// module.exports = () => {
//   const router = express.Router();
//   router.post("/message", (req, res) => {
//     console.log('start sending')
//     client.messages.create({
//       to: playerNum,
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