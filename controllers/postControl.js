const postValidator = require('../validators/postValidator')
const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')

createPost = (req, res) => {
   let { body } = req.body
   let validator = postValidator({ body })
   let userId = req.user._id
   let userName = req.user.name

   if (!validator.isValid) {
      res.status(500).json(validator.error)
   } else {
      let post = new Post({
         body, user: userId, userName
      })

      post.save()
         .then((post) => {
            let updateUser = { ...req.user._doc }
            updateUser.posts.unshift(post._id)
            User.findByIdAndUpdate(updateUser._id, { $set: updateUser }, { new: true })
               .then((updatedUser) => {
                  res.status(201).json({
                     message: "Post created successfully.",
                     updatedUser,
                     ...post._doc
                  })
               })
               .catch((error) => {
                  res.status(400).json({
                     message: "Post update error occurred.",
                     error
                  })
               })

         })
         .catch((error) => {
            res.status(400).json({
               message: "Post create error occurred..",
               error
            })
         })
   }
}

getAllPost = (req, res) => {
   Post.find()
      .then((posts) => {
         if (posts.length === 0) {
            res.status(200).json({
               message: "No post found here"
            })
         } else {
            res.status(200).json(posts)
         }

      })
      .catch((error) => {
         res.status(500).json({
            message: "All post error occurred..",
            error
         })
      })
}

getSinglePost = (req, res) => {
   let { postId } = req.params
   Post.findOne({ _id: postId })
      .then((singlePost) => {
         if (!singlePost) {
            res.status(200).json({
               message: "No post found"
            })
         } else {
            res.status(200).json({
               message: "The found post is",
               singlePost
            })
         }
      })
      .catch((error) => {
         res.status(400).json({
            message: "Single post found error occurred",
            error
         })
      })
}

postUpdate = (req, res) => {
   let { postId } = req.params
   Post.findOne({ _id: postId })
      .then((foundPost) => {
         if (JSON.stringify(foundPost.user) == JSON.stringify(req.user._id)) {
            Post.findOneAndUpdate({ _id: foundPost._id }, { $set: req.body }, { new: true })
               .then((updatedPost) => {
                  res.status(200).json({
                     message: "Post updated successfully.",
                     post : updatedPost
                  })
               })
               .catch((error) => {
                  res.status(400).json({
                     message: "Post update error occurred.",
                     error
                  })
               })
         } else {
            res.status(400).json({
               message: "Unauthorized user.You can not update this post"
            })
         }
      })
      .catch((error) => {
         res.status(400).json({
            message: "Post update error occurred.",
            error
         })
      })
}

deletePost = (req, res) => {
   let { postId } = req.params
   Post.findOne({ _id: postId })
      .then((selectedPost) => {
         if (JSON.stringify(selectedPost.user) == JSON.stringify(req.user._id)) {
            Post.findOneAndDelete({ _id: postId })
               .then((deletedPost) => {
                  res.status(200).json({
                     message: "Message deleted successfully..",
                     ...deletedPost._doc
                  })
               })
               .catch((error) => {
                  res.status(400).json({
                     message: "Deletion error occurred.",
                     error
                  })
               })
         } else {
            res.status(400).json({
               message: "You are unauthorized to delete this post."
            })
         }
      })
      .catch((error) => {
         res.status(400).json({
            message: "Post deletion Error Occurred.",
            error
         })
      })

}


doComment = (req, res) => {
   let { postId } = req.params
   Post.findOne({ _id: postId })
      .then((response) => {
         if (response.length === 0) {
            res.status(200).json({
               message: "No post found"
            })
         } else {
            let { commentBody } = req.body
            let commentUserName = req.user.name
            let commentUserId = req.user._id
            let comment = new Comment({
               commentBody,
               userName: commentUserName,
               userId : commentUserId
            })
            comment.save()
               .then((responseComment) => {
                  //console.log(responseComment)
                  let tempPost = { ...response._doc }
                  tempPost.comment.unshift(responseComment)
                  Post.findByIdAndUpdate(tempPost._id, { $set: tempPost }, { new: true })
                     .then((responseAgain) => {
                        res.status(201).json({
                           message: "Comment successfully done",
                           ...response._doc
                        })
                     })
                     .catch((error) => {
                        res.status(400).json({
                           message: "Post update Error Occurred.",
                           error
                        })
                     })
               })
         }
      })
      .catch((error) => {
         res.status(400).json({
            message: "Comment error occurred.",
            error
         })
      })
      .catch((error) => {
         res.status(500).json({
            message: "Server error occurred.",
            error
         })
      })
}

updateComment=(req,res)=>{
   Post.find()
      .then((bigResponse)=>{
         bigResponse.forEach((singleResponse)=>{
            singleResponse.comment.map(returnComment=>{
               let {commentId} = req.params
               let returnId = String (returnComment._id)
                if (returnId === commentId) {
                  Comment.findOneAndUpdate({_id : returnId},{$set : req.body},{new : true})
                       .then((tempResponse)=>{
                          let indexNumber= singleResponse.comment.indexOf(returnComment)
                          singleResponse.comment[indexNumber] = tempResponse
                          Post.findByIdAndUpdate(singleResponse._id,{$set : singleResponse},{new : true})
                          .then(response=>{
                             res.status(201).json({
                               message : "Comment Update Successfully Bro.",
                               response
                             })
                          })
                          .catch((error)=>{
                             res.status(400).json({
                              message : "Comment Update Error Occurred",
                              error
                             })
                          })
                       })
                    .catch((error)=>{
                       res.status(500).json({
                       message : "Server Error Occurred.",
                       error
                     })
                  })
               } 
            })
       })
   })
}


deleteComment = (req, res) => {
   Post.find()
      .then((bigResponse)=>{
         bigResponse.forEach((singleResponse)=>{
            singleResponse.comment.map((deletedComment)=>{
               let {commentId} = req.params
               let deletedCommentId = String (deletedComment._id)
               if (deletedCommentId === commentId) {
                  Comment.findOneAndDelete({_id : deletedCommentId})
                        .then((deletedResponse)=>{
                           let indexNumber = singleResponse.comment.indexOf(deletedComment)
                           singleResponse.comment.splice(indexNumber,1)
                           Post.findByIdAndUpdate(singleResponse._id,{$set : singleResponse},{new : true})
                              .then((response)=>{
                                 res.status(200).json({
                                    message : "Comment Deleted Successfully..",
                                    response
                                 })
                              })
                              .catch((error)=>{
                                 res.status(400).json({
                                    message : "Comment Deletion Error Occurred..",
                                    error
                                 })
                              })
                        })
                        .catch((error)=>{
                           res.status(400).json({
                              message : "Comment Schema Error Occurred..",
                              error
                           })
                        })
               }
            
            })
         })
      })
      .catch((error)=>{
         res.status(500).json({
            message : "Server error occurred.",
            error
         })
      })
}

module.exports = {
   createPost,
   getAllPost,
   getSinglePost,
   deletePost,
   postUpdate,
   doComment,
   updateComment,
   deleteComment
}