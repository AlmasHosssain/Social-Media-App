
let postValidator=(post)=>{
   let error = {}
   if (!post.body) {
      error.body = `At first say somethings what's in your mind`
   }

   return {
      error,
      isValid : Object.keys(error).length === 0
   }
}
module.exports = postValidator