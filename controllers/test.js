const nodemailer = require('nodemailer')

testEmail=(req,res)=>{
   let {email} = req.body
   nodemailer.createTestAccount((err,account)=>{
      const htmlEmail = `
         <b>Click Here to change your password : </b>
          <a>http://localhost:3000/changePassword</a>
      `
      let transporter = nodemailer.createTransport({
         host: "smtp.gmail.com",
         port: 587,
         secure: false, 
         auth: {
           user: 'almashossain121@gmail.com',
           pass: '*********'
         },
       });

       let mailOptions = {
         from: 'passworedchange@gmail.com',
         to: email,
         subject: "Update or Change Password",
         text : "To update or change the password click here",
         html : htmlEmail
       }

       transporter.sendMail(mailOptions,(err,info)=>{
          if (err) {
             return console.log(err)
          }else{
             console.log('Message Sent Successfully!')
          }
       })
   })
}


module.exports = {
   testEmail
}
