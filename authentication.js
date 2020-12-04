const passport = require('passport')
module.exports = (req,res,next)=>{
   passport.authenticate('jwt',(err,user,info)=>{
      if (err) {
         return next(err)
      }
      if (!user) {
         res.status(400).json({
            message : "You are not a authenticate user."
         })
      }
      req.user = user
      return next()
   })(req,res,next)
}