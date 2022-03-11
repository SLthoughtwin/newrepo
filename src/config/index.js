require('dotenv').config()
const { connection } = require('../config/dbconnection')
const port = process.env.PORT
const mailEmail = process.env.EMAIL
const mailPassword = process.env.PASSWORD
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const contact = process.env.TWILIO_CONTACT
module.exports = {
    port,
    mailEmail,
    mailPassword,
    connection,
    accountSid,
    authToken,
    contact
}