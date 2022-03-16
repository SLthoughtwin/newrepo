const  jwt  = require("jsonwebtoken");
const {User} = require("./../models/");
const {admin} = require('./../config/')

const {accessToken} = require("../services/");

exports.adminLogin = async(req, res) => {
 debugger
  try {
    const user = await User.findOne({email:req.body.email })
     if(!user){
       req.body.role = admin;
       const createAdmin = await User.create(req.body)
       const userId = createAdmin.id
      const accesstoken = await accessToken(userId)
       return res.status(200).json({
         message : "signUP successfully",
         success : true
       })
     }
     else{
      const foundAdmin = await User.findOne({email:req.body.email})
      const userId = foundAdmin.id
      const accesstoken = await accessToken(userId)
      return res.status(200).json({
        message : "login successfully",
        success : true,
        accesstoken:accesstoken
      })
      
     }
  }catch(error){
    console.log(error)
    return res.status(400).json({
      message: error.message,
      success: false
    })
  }
}

exports.verifiedByAdmin= async(req, res) => {
  try{
    const id = req.body.id
    const result = await User.findOne({_id:id});
    if(!result){
      return res.send("invalid user")
    }else{
        const admin = await User.updateOne({_id:id},{isVerifiedByAdmin:true})
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