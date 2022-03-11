const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const {crypto_string} = require('../services/')

const sellerSchema = new mongoose.Schema({

    name:	String,
    lastName:	String,
    profile:	String,
    phone	:String,
    email:	String,
    role:	String,
    password	:String,
    resetToken:	String,
    active:{
      type: Boolean,
      default: false
    }	,
    isVerified:	{
      type: Boolean,
      default: false
    }	,
    isVerifiedByAdmin:	{
      type: Boolean,
      default: false
    }	,
    deActivate:	{
      type: Boolean,
      default: false
    }	,

},{timestamps:true})

sellerSchema.pre('save',async function(next){
    const token = crypto_string();
    this.resetToken = await token;
    if(this.isModified('password')){
      this.password = await bcrypt.hash(this.password,10)
    }
    next()
})

const sellerModel =  mongoose.model('sellerModel', sellerSchema)

module.exports = sellerModel;