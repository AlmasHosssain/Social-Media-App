const validator = require('validator')

let updateUserValidation=(user)=>{
   let error = {}
   let newArray = []
   let chr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

   if (!user.name) {
      error.name = "Please enter your name please"
   } 
   if(!validator.isEmail(user.email)){
      error.email = "Please enter the correct format of email please"
   }
   if (!user.dept) {
      error.dept = "Please enter your dept please"
   }
   if (!user.session) {
      error.session = "Please enter your session please"
   }
   if (!user.phoneNo) {
      error.phoneNo = "Please enter your Phone Number Please"
   }
   if (!user.password) {
      error.password = `Please enter the password please`
   }else if(user.password.length < 3){
      error.password = `Password must be longer then 3 characters`
   }
   let kip = user.password.split('')

   kip.forEach(value1=>{
      chr.forEach(value2=>{
         if (value1==value2) {
            newArray.push(value1)
         }
      })
      return newArray
   })
   if (newArray.length === 0) {
      error.password=`Please enter a character please`
   }
   
   if (user.password !== user.confirmPassword) {
      error.confirmPassword = `Password does not match.`
   }

   return {
      error,
      isValid : Object.keys(error).length === 0
   }
}

module.exports = updateUserValidation