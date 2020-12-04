const User = require('../models/User')
const Message = require('../models/Message')

doMessage = (req, res) => {
   let {
      messageBody
   } = req.body
   let userName = req.user.name
   let message = new Message({
      messageBody,
      userName
   })

   message.save()
      .then((message) => {
         let updatedUser = {
            ...req.user._doc
         }
         updatedUser.message.unshift(message._id)
         User.findByIdAndUpdate(updatedUser._id, {
               $set: updatedUser
            }, {
               new: true
            })
            .then((updateUser) => {
               res.status(201).json({
                  message: "Message add and user update successfully..",
                  updateUser
               })
            })
            .catch((error) => {
               res.status(500).json({
                  message: "Server error occurred..",
                  error
               })
            })
      })
      .catch((error) => {
         res.status(400).json({
            message: "Do message error occurred...",
            error
         })
      })
}

getAllMessages = (req, res) => {
   Message.find()
      .then((messages) => {
         if (messages.length === 0) {
            res.status(200).json({
               message: "No message found here"
            })
         } else {
            res.status(200).json(messages)
         }

      })
      .catch((error) => {
         res.status(400).json({
            message: "All Message error occurred..",
            error
         })
      })
}

deleteMessage = (req, res) => {
   let {
      msgId
   } = req.params
   Message.findByIdAndRemove({
         _id: msgId
      })
      .then((response) => {
         res.status(200).json({
            message: "Message Deleted Successfully",
            response
         })
      })
      .catch((error) => {
         res.status(500).json({
            message: "Server error occurred...",
            error
         })
      })
}

module.exports = {
   doMessage,
   getAllMessages,
   deleteMessage
}