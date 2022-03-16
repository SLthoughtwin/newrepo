require('dotenv').config()
const { connection } = require('../config/dbconnection')
const port = process.env.PORT
const mailEmail = process.env.EMAIL
const mailPassword = process.env.PASSWORD
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const contact = process.env.TWILIO_CONTACT
const asscesstoken = process.env.ACCESS_TOKEN
const refreshtoken = process.env.REFRESH_TOKEN
const admin = process.env.ADMIN
const seller = process.env.SELLER
module.exports = {
    port,
    mailEmail,
    mailPassword,
    connection,
    accountSid,
    authToken,
    contact,
    asscesstoken,
    refreshtoken,
    admin,
    seller
}