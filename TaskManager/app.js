const express = require('express')
const app= express()
const tasks = require('./route/tasks')
const connectDB = require('./config/dbconnect');
const { default: mongoose } = require('mongoose');
const notFound = require('./middleware/notfoundapi');


connectDB();

const port= process.env.PORT || 3000

app.use(express.static('./public'))
app.use(express.json())


app.use('/api/v1/tasks',tasks)
app.use(notFound)
mongoose.connection.once("open",()=>{
    console.log('mongoDB connected sucessfully')
})


app.listen(port,()=>{
    console.log(`server is listening prot number ${port}`)
})
