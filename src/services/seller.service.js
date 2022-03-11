const nodemailer = require("nodemailer");
const twilio = require('twilio');
const { mailEmail, mailPassword } = require("../config");
const crypto = require('crypto');
const bcrypt = require('bcrypt')
const { accountSid, authToken, contact } = require("../config/");
require('../config')

exports.mailfunction  = (email,link)=>{
     
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user : mailEmail,
        pass : mailPassword,
      }
    });

    const mailOption = {
      from : mailEmail,
      to : email,
      subject : 'testing and testing',
      text : link
    }
    
   return transporter.sendMail(mailOption)
 
},

exports.bcryptPassword = async(password)=>{
  const pass = await bcrypt.hash(password,10)
  return pass;
},

exports.bcryptPasswordMatch = async(user_pass,db_pass)=>{
  const matchpass = await bcrypt.compare(user_pass,db_pass)
  return matchpass;
},

exports.crypto_string = ()=>{
  return  crypto.createHash('sha256')
  .update('this is  node!')
  .digest('hex');
}



exports.createOtp = async(req,res)=>{
  const phone = req.body.phone
  if (phone.length === 13 && phone.substring(0,3) === "+91") {
  const client =  new twilio(accountSid, authToken);
        let Otp = Math.floor(Math.random() * 1000000 + 1);
       await  client.messages
          .create({
            body: `hello your verification code is : ${Otp} and will expires in 10 min`,
            to: "+919302807262",
            from: contact,
          })
      return Otp
    }else{
     return "please try this formate +919454754844"
   }

}










exports.accessTokenVarify =  (req, res, next) => {
    // const token = req.headers.authorization;
    const token = req.params.token
    if (!token) {
      return res.status(400).json({
        message: "A token is required for authentication",
        status: 400,
        success: false,
      });
    } else {
      // const authHeader = req.headers.authorization;
      // const bearerToken = authHeader.split(" ");
      // const token = bearerToken[1];
      jwt.verify(
        token,process.env.ACCESS_TOKEN,
        (error, payload) => {
          if (error) {
            res.status(400).json({
              message: "invalid token",
              status: 400,
              success: false,
            });
          } else {
            next();
          }
        }
      );
    }
  },

  exports.refreshTokenVarify = (refreshVarify) => {
    const token = refreshVarify;
    if (!token) {
      return {message: "A token is required for authentication"}
     }
     else {
      const token = refreshVarify;
      const paylod = jwt.verify(token, process.env.REFRESH_TOKEN, (error, payload) => 
      {
          if(payload){
           return payload;
          }else{
            return {message: error}
          }
      });

      return paylod
    }
  },

  exports.accessToken = (userId)=>{
    const userid = userId
    return new Promise ((resolve,reject)=> {
        const options = {
            expiresIn: "1h",
            issuer: 'sourabh@gmail.com',
            audience: userid
        };
      const paylod = {};
        jwt.sign(paylod, process.env.ACCESS_TOKEN,  options,(err, token) => {
            if (err) {
                reject({message: 'Invalid operation!'});
            } else {
                resolve(token);
            }
        })
    });
},

exports.refreshToken =(userId)=>{
  const userid = userId
  return new Promise ((resolve,reject)=> {
      const options = {
          expiresIn: "1d",
          issuer: 'sourabh@gmail.com',
          audience: userid
      };
      const paylod = {};
      jwt.sign(paylod, process.env.REFRESH_TOKEN,  options,(err, token) => {
          if (err) {
              reject({message: 'Invalid operation!'});
          } else {
              resolve(token);
          }
      })
  });
}
