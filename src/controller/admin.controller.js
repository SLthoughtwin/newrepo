const  jwt  = require("jsonwebtoken");
const {sellerModel} = require("./../models/");

const {accessToken} = require("../services/");

exports.adminLogin = async(req, res) => {

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
     const user = await sellerPresent(req);

     if(!user){
      //  req.body.role = "admin";
       const createAdmin = await sellerModel.create(req.body)
       res.status(200).json({
         message : "signUP successfully",
         success : true
       })
     }
     else{
      const foundAdmin = await sellerModel.findOne({phone:req.body.phone})
      const userId = foundAdmin.id
      const accesstoken = await accessToken(userId)
      res.status(200).json({
        message : "login successfully",
        success : true,
        accesstoken : accesstoken
      })
      
     }
  }catch(error){
    res.status(400).json({
      message: error,
      success: false
    })
  }
}



exports.verifiedByAdmin= async(req, res) => {
  try{
    const id = req.body.id
    const result = await sellerModel.findOne({_id:id});
    if(!result){
      return res.send("invalid user")
    }else{
        const admin = await sellerModel.updateOne({_id:id},{isVerifiedByAdmin:true})
        res.status(200).json({
        messsage : "approve by admin"
        })
    }
  }catch(err){
   res.status(400).json({
     messsage : "invalid id"
   })
  }
}  