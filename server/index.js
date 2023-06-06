import express from 'express'
import mongoose, { mongo } from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import itemRoutes from './routes/item.js'

const app = express()
dotenv.config()

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
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/item',itemRoutes)

app.use((err,req,res,next)=>{
    const status = err.status || 500
    const message = err.message || "Unknown Error Occured"
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(8800,()=>{
    connect()
    console.log("Connected to server")
})
