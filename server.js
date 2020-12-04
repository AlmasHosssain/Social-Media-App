const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoute = require('./routers/userRoute')
const postRoute = require('./routers/postRoute')
const commentRoute = require('./routers/commentRoute')
const messageRoute = require('./routers/messageRoute')
const testRoute = require('./routers/testRoute')
const passport = require('passport')

const app = express()

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
app.use(passport.initialize())
require('./passport')(passport)

const PORT = 4000 || process.env.PORT

app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/posts/comment',commentRoute)
app.use('/api/user/messages',messageRoute)
app.use('/api/test',testRoute)

app.get('/',(req,res)=>{
   res.status(200).json({
      message : "I am also on bro"
   })
})

app.listen(PORT,()=>{
   console.log(`Database is ready to run on the port ${PORT}`)
   mongoose.connect('mongodb://localhost/OwnBlog',
   ({useNewUrlParser : true}),
   ()=>{
      console.log(`Database create and connect successfully..`)
   }
   )
})
