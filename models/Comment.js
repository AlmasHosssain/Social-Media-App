const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
   commentBody : {
     type : String
   },
   userName : {
      type : String
   },
   userId : {
      type : Schema.Types.ObjectId,
      ref : 'User'
   }
})

const Comment = mongoose.model('Comment',commentSchema)
module.exports = Comment