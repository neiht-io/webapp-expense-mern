const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const color = require('colors');
const dotenv = require('dotenv')
const connectDb = require("./config/connectDb")

// config dot env file
dotenv.config()

//database call
connectDb()

//rest object 
const app= express()
//middlewares 
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//routes

// app.get('/',(req,res)=>{
//     res.send("<h1>hello from server </h1>")
// })

//user routes
app.use('/api/v1/users',require('./routes/userRoutes'))

//transection routers

app.use("/api/v1/transections",require("./routes/transectionRoutes"))

//static fille
app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',function(req,rest){
    rest.sendFile(path.join(__dirname,'./client/build/index.html'));
})


//port

const PORT = 8080 || process.env.PORT


//listend server 

app.listen(PORT,()=>{
    console.log('server running on port '+ PORT)
})
