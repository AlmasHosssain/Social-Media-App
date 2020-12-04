const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
   messageBody: {
      type: String
   },
   userName: {
      type: String
   }
   // ,
   // user : {
   //    type : Schema.Types.ObjectId,
   //    ref : 'User'
   // },

}, {
   timestamps: true
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message