require('dotenv').config()
require("./utils/db")
const express=require("express")
const app=express()
const authRouter=require("./router/auth-router")
const courseRouter=require("./router/course.router")
const helmet=require("helmet")

const cors=require('cors')



app.use(cors())
app.use(express.json())
app.use(helmet())
app.use('/',authRouter)
app.use('/',courseRouter)



app.get('/', (req, res) => {
    res.send('Hello Express app!')
  });
  
  app.listen(5000, () => {
    console.log('server started');
  });

