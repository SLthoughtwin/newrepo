const sellerModel = require("./../models/sellerModel");

exports.verifiedByAdmin= async(req, res) => {
  try{
    const id = req.body.id
    const result = await sellerModel.findOne({_id:id});
    if(!result){
      return res.send("invalid user")
    }else{
        const admin = await sellerModel.updateOne({_id:id},{isVerifiedByAdmin:true})
        res.status(200).json({
            messsage : "verifie by admin"
        })
    }
  }catch(err){
   res.status(400).json({
     messsage : "invalid id"
   })
  }
}
  
  