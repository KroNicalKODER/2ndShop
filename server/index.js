import express from 'express'
import mongoose, { mongo } from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import itemRoutes from './routes/item.js'
import paymentRoutes from './routes/payment.js'

const app = express()

dotenv.config()
app.use(cors())
const PORT = process.env.PORT || 8800

mongoose.set('strictQuery',true)
const connect = ()=>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Connected to Database")
    }).catch((err)=>{
        throw err
    })
}

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/item',itemRoutes)
app.use('/api/payment',paymentRoutes)

app.use((err,req,res,next)=>{
    const status = err.status || 500
    const message = err.message || "Unknown Error Occured"
    return res.status(status).json({
        success: false,
        status,
        message
    })
})


app.listen(PORT,()=>{
    connect()
    console.log("Connected to server")
})
