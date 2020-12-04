const Comment = require('../models/Comment')

doComment=(req,res)=>{
   let {commentBody} = req.body
   let comment = new Comment({
      commentBody,
      user : req.user._id
   })
    comment.save()
           .then((responseComment)=>{
              //console.log(responseComment)
               res.status(200).json({
                     message : "Comment Everything is ok.",
                     responseComment
               })
            })
            .catch((error)=>{
               res.status(400).json({
                   message : "Comment error occurred.",
                   error
               })
            })
}


module.exports = {
   doComment
}