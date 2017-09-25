
require('dotenv').config();
const ENV = process.env.ENV || "development";
console.log('in test.js');
console.log(process.env);
console.log(process.env.TWILIO_AUTH_TOKEN);