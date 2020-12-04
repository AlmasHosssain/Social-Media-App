const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
   body : {
      type : String,
      required : true, 
   },
   comment :[
      {
         type : Object
      }
   ]
   ,
   // commentId : [
   //    {
   //       type : Schema.Types.ObjectId,
   //       ref : 'Comment'
   //    }
   // ],
   // commentUser : [
   //    {
   //       type : String
   //    }
   // ],
   // commentUserId : [
   //  {
   //    type : Schema.Types.ObjectId,
   //    ref : 'Comment'
   //  }
   // ],
   user: {
      type : Schema.Types.ObjectId,
      ref : 'User'
   },
   userName : {
      type : String
   }
},{timestamps : true})

const Post = mongoose.model('Post',postSchema)
module.exports = Post