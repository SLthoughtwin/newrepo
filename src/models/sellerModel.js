const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const {crypto_string} = require('../services/')

const userSchema = new mongoose.Schema({

    name:	String,
    lastName:	String,
    profile:	String,
    phone	:String,
    email:	String,
    role:{
      type:String,
      enum:["admin","seller","user"]
    },
    password	:String,
    resetToken:String,
    otp: String,
    resetTime:Date,
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

userSchema.pre('save',async function(next){
    const token = crypto_string();
    this.resetToken =  token;
    this.resetTime =  Date.now()+(10*60000)
    if(this.isModified('password')){
      this.password = await bcrypt.hash(this.password,10)
    }
    next()
})

const User =  mongoose.model('User', userSchema)

module.exports = User;