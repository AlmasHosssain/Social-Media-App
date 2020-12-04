const User = require('../models/User')
const registerValidator = require('../validators/registerValidator')
const logInValidator = require('../validators/logInValidation')
const updateUserValidation = require('../validators/updateUserValidation')
const passwordChangeValidation = require('../validators/passwordChangeValidation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

registration = (req,res) =>{
   let {name,email,dept,session,phoneNo,password,confirmPassword} = req.body
   let valid = registerValidator({name,email,dept,session,phoneNo,password,confirmPassword})
   if (!valid.isValid) {
      res.status(400).json(valid.error)
   }else{
      User.findOne({email})
          .then((user)=>{
             if (user) {
                res.status(400).json({
                   message : "Email already exist,please enter a new email"
                })
             }else{
                bcrypt.hash(req.body.password,12,(err,hash)=>{
                   if (err) {
                      res.status(400).json({
                         message : "Password hash error occurred.",
                         error : err
                      })
                   }else{
                     let user = new User({
                        name : req.body.name,
                        email : req.body.email,
                        dept : req.body.dept,
                        session : req.body.session,
                        phoneNo : req.body.phoneNo,
                        password : hash,
                        posts : [],
                        message : []
                     })

                     user.save()
                        .then((user)=>{
                           res.status(201).json({
                              message : "User saved Successfully..",
                              user
                           })
                        })
                        .catch((error)=>{
                           res.status(500).json({
                              message : "User saved error occurred.",
                              error
                           })
                        })
                   }
                })
             }
          })
          .catch((error)=>{
             res.status(500).json({
                message : "Server Error Occurred",
                error
             })
          })
   }
}

logIn =(req,res)=>{
   let {email,password}= req.body
   let valid = logInValidator({email,password})
   if (!valid.isValid) {
      res.status(400).json(valid.error)
   }else{
      User.findOne({email})
         .then((user)=>{
            if (!user) {
               res.status(400).json({
                  message: "User not found.",
               })
            }else{
               bcrypt.compare(password,user.password,(err,result)=>{
                  if (err) {
                     return res.status(400).json({
                        message : "Password compare error occurred.",
                        error : err
                     })
                  }else if(!result){
                     return res.status(400).json({
                        message : "Password does not matched"
                     })
                  }else if (result) {
                     let token = jwt.sign({
                        _id : user._id,name : user.name,email : user.email,
                        dept : user.dept,session : user.session, phoneNo : user.phoneNo,
                        posts : user.posts,message : user.message
                     },'OWN_SECRET',{expiresIn : '3h'})
                     res.status(201).json({
                        message : "Login successfully" ,
                        token : `Bearer ${token}`
                     })
                  } 
               })
            }
         })
         .catch((error)=>{
            res.status(400).json({
               message : "Login error",
               error
            })
         })
   }
}

getAllUser=(req,res)=>{
   User.find()
      .then((response)=>{
         res.status(200).json(response)
      })
      .catch((error)=>{
         res.status(500).json({
            message : "Get all user error",
            error
         })
      })
}

getSingleUser=(req,res)=>{
   let {userId} = req.params
   User.findOne({_id : userId})
      .then((user)=>{
         if (!user) {
            res.status(200).json({
               message : "No user found"
            })
         }else{
            res.status(200).json({
               message: "Single Transaction find successfully.",
               user
            })
         }
      })
      .catch((error)=>{
         res.status(500).json({
            message : "Get single user error",
            error
         })
      })
}

updateUser=(req,res)=>{
   let {userId} = req.params
   let {name,email,dept,session,phoneNo,password,confirmPassword} = req.body
   let valid = updateUserValidation({name,email,dept,session,phoneNo,password,confirmPassword})
   if (!valid.isValid) {
      res.status(400).json(valid.error)
   }else{
      bcrypt.hash(password,12,(err,hash)=>{
         if(err){
            res.status(400).json({
               message : "Update password hash error occurred",
               error : err
            })
         } 
         else {
            let copy = { ...req.body, password : hash}
            User.findOneAndUpdate({_id : userId},{$set : copy},{new : true})
                  .then((user)=>{
                     console.log(user)
                     res.status(200).json({
                       message : "Update user successfully.",
                       user
                      })
                 })
                  .catch((error)=>{
                     res.status(500).json({
                        message : "Single user update error",
                        error
                     })
                  })
            } 
      })
      
   }
   
}

changeUserPassword =(req,res)=>{
   let {email,password,confirmPassword} = req.body

   let valid = passwordChangeValidation({email,password,confirmPassword})
   if (!valid.isValid) {
      res.status(400).json(valid.error)
   }else{
     User.findOne({email})
         .then((user)=>{
            if (!user) {
               res.status(200).json({
                  message : "No user found"
               })
            }else{
               bcrypt.hash(password,12,(err,hash)=>{
                  if (err) {
                     res.status(400).json({
                        message : "Password change hash error occurred..",
                        error : err
                     })
                  }else{
                     let changePassword = {
                        password : hash
                     }
                     User.findOneAndUpdate({_id : user._id},{$set : changePassword},{new : true})
                        .then((user)=>{
                           res.status(200).json({
                              message : "Password Change Successfully.",
                              user
                           })
                        })
                        .catch((error)=>{
                           res.status(400).json({
                              message : "Password Change Error Occurred.",
                              error
                           })
                        })
                   }
               })
            }
          })
          .catch((error)=>{
            res.status(400).json({
               message : "Password Change Error Occurred.",
               error
            })
         })
   }  
}

deleteUser=(req,res)=>{
   let {userId} = req.params
   User.deleteOne({_id : userId})
      .then((response)=>{
         res.status(200).json({
            message : "User deleted Successfully..",
            response
         })
      })
      .catch((error)=>{
         res.status(500).json({
            message : "Server Error Occurred.",
            error
         })
      })
}

module.exports = {
   registration,
   logIn,
   getAllUser,
   getSingleUser,
   updateUser,
   changeUserPassword,
   deleteUser
}
