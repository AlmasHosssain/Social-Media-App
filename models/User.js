const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

const userSchema = new Schema ({
   name : {
      type : String,
      trim : true,
      required : true
   },
   email : {
      type : String,
      required : true,
      trim : true,
      validate : {
         validator : (email)=>{
            return validator.isEmail(email)
         },
         message : "Please enter the correct format of email please"
      }
   },
   phoneNo : {
      type : Number,
      required : true
   },
   password : {
      type : String,
      required : true,
   },
   posts : [{
      type : Schema.Types.ObjectId,
      ref : 'Post'
   }],
   message : [{
      type : Schema.Types.ObjectId,
      ref : 'Message'
   }]
})

const User = mongoose.model('User',userSchema)
module.exports = User