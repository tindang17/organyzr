require('dotenv').config();

const twilio = require ('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN;
const twilioNum = process.env.TWILIO_NUM;
const client     = twilio(accountSid, authToken);

const router     = express.Router();

router.post("/message", (req, res) => {
  
});