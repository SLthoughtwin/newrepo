const {sellerModel} =require('./../models')
const {otpModel} = require("./../models/");
const { refreshTokenVarify } = require('./../services/')
const {
  mailfunction,
  bcryptPasswordMatch,
  createOtp,
  accessToken,
  refreshToken
} = require("../services/");

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
  } 
  catch (error) 
  {
    res.status(400).send(error);
  }
};





exports.sellerLogin = async (req, res) => {
   
  try {
   const sellerPresent = async (req) => {
      
          if(req.body.phone){
              const user1 = await sellerModel.findOne({phone:req.body.phone })
              return user1
          }
          else if(req.body.email){
              const user1 = await sellerModel.findOne({email:req.body.email })
              return user1
          }
      
    }
    const user = await sellerPresent(req)
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
            const userId = result.id
            const accesstoken = await accessToken(userId)
            const refreshtoken = await refreshToken(userId);
            return res.status(200).json({
              success: true,
              accToken: accesstoken,
              refreshtoken:refreshtoken,
              message: "login successfully by email",
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
            message: "you are not Approve by Admin",
          });
        }
      } 
      else if (user.phone)
       {
        const result = await sellerModel.findOne({ phone: req.body.phone });
        if(!result)
        {
          res.status(400).json({
            message: "invalid number ",
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
            const userId = result.id
            const accesstoken = await accessToken(userId)
            const refreshtoken = await refreshToken(userId);
            res.status(200).json({
                success: true,
                accToken: accesstoken,
                refreshtoken: refreshtoken,
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
} 
catch (err) 
{
  res.status(400).json({
    message: "err",
    success: false
  })
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
    return res.send("invalid otp/number");
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



exports.createAccessRefreshToken = async(req,res)=>{
  const refreshVarify = req.body.token;
  const paylod = refreshTokenVarify(refreshVarify)
  console.log("$$$$$$$$#####",paylod);
  if(!paylod){
   return res.status(400).send("invalid user")
  }
  const userId = paylod.aud;
  console.log("=============>",userId);
  if(!userId){
      return res.status(400).json({
          success:false,
          message: "user not authenticated"
      })
  }
  const userToken = await sellerModel.findOne({id:userId})
  if(!userToken){
      return res.status(400).json({
          success:false,
          message: "invalid user"
      })
  }else{
    console.log("=============>",userId)
      const access_Token = await accessToken(userId)
      const refresh_Token =  await refreshToken(userId);
     return res.status(400).json({
       accesstoken:access_Token,
      refrestToken:refresh_Token
    });
  }
}

