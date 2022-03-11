const sellerModel = require("./../models/sellerModel");
const otpModel = require("./../models/otp");
const {
  mailfunction,
  bcryptPasswordMatch,
  createOtp,
} = require("../services/");
const jwt = require("jsonwebtoken");
const twilio = require("twilio");
const { accountSid, authToken, contact } = require("../config/");

exports.signUPSeller = async (req, res) => {
  try {
    if (req.body.email)
   {
      const result = await sellerModel.create(req.body);
      const link = `http://localhost:8080/seller/${result.resetToken}`;
      mailfunction(req.body.email, link)
        .then((response) => {
          res.status(201).json({
            success: true,
            message: "check your mail to verified :)",
          });
          console.log("check your mail to verified");
        })
        .catch((err) => {
          res.status(400).json({
            success: false,
            message: "mail not send :)",
          });
          console.log(err);
        });
    } 
    else if (req.body.phone) 
    {
      const result = await sellerModel.create(req.body);
      const deleteOtp = await otpModel.findOneAndDelete({phone: req.body.phone})
      const Otp = await createOtp(req, res);
      const setOtp = await otpModel.create({otp: Otp,phone: req.body.phone,});
      res.status(200).json({
          message: "otp send to your number",
        });
     }
    else 
    {
      res.status(400).json({
        message: "email/phone are required",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.sellerLogin = async (req, res) => {
  const user = await sellerModel.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });
  if (!user) 
  {
    this.signUPSeller(req, res);
  } 
  else 
  {
    if (user.email) 
    {
      const result = await sellerModel.findOne({ email: req.body.email });
      if(!result)
      {
        res.status(400).json({
          message: "invalid email"
        })
      }
      else if(result.isVerified === false)
      {
        const link = `http://localhost:8080/seller/${result.resetToken}`;
        mailfunction(req.body.email, link)
        .then((response) => {
          res.status(200).json({message : "mail send to your gamil"});
        })
        .catch((err) => {
          res.status(200).json("mail not send");
        });
      }
      else if (result.isVerifiedByAdmin === true) 
      {
        const db_pass = result.password;
        const user_pass = req.body.password;
        const match = await bcryptPasswordMatch(user_pass, db_pass);
        if (match === true) 
        {
          return res.status(200).json({
            success: true,
            message: "login successfully",
          });
        } 
        else 
        {
          res.status(400).json({
            success: false,
            message: "invalid login details",
          });
        }
      } 
      else 
      {
        res.status(400).json({
          success: false,
          message: "you are not verified by Admin",
        });
      }
    } 
    else if (user.phone)
     {
      const result = await sellerModel.findOne({ phone: req.body.phone });
      if(!result)
      {
        res.status(400).json({
          message: "invalid number",
        })
      }
      else if (result.isVerified === false) 
      {
        const deleteOtp = await otpModel.findOneAndDelete({phone: req.body.phone})
        const Otp = await createOtp(req, res);
        if (!Otp) 
        {
          res.status(400).json({
            message: "invalid number",
          });
        } 
        else 
        {
          const setOtp = await otpModel.create({
            otp: Otp,
            phone: req.body.phone,
          });
          res.status(200).json({
            message: "otp send to your number",
          });
        }
      }
      else if (result.isVerifiedByAdmin === true) 
      {
        const db_pass = result.password;
        const user_pass = req.body.password;
        const match = await bcryptPasswordMatch(user_pass, db_pass);
        if (match === true) 
        {
          res.status(200).json({
            success: true,
            message: "login successfully by otp",
          });
        } 
        else 
        {
          res.status(400).json({
            success: false,
            message: "invalid login details",
          });
        }
      } 
      else 
      {
        res.status(400).json({
          success: false,
          message: "you are not verified by Admin",
        });
      }
    } 
    else 
    {
      res.status(400).json({
        message: "email/phone are required",
        success: false,
      });
    }
  }
};

exports.sellerVarified = async (req, res) => {
  const result = await sellerModel.updateOne(
    { resetToken: req.params.token },
    { isVerified: true, resetToken: "" }
  );
  return res.send("verified :)");
};

exports.verifiedOtp = async (req, res) => {
  const otp = req.body.otp;
  const contact = req.body.phone;

  const result = await otpModel.findOne({ phone: contact });
  if (!result) {
    return res.send("invalid otp");
  } else {
    if (result.otp === otp) {
      const sellerresult = await sellerModel.updateOne(
        { phone: req.body.phone },
        { isVerified: true, resetToken: "" }
      );

      res.status(200).json({
        message: "varified otp",
      });
    } else {
      res.status(400).json({
        message: "invalid user/otp ",
      });
    }
  }
};

