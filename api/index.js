import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import cors from 'cors'
import dotenv from 'dotenv'
import transactionRouter from "./routes/Transaction.route.js"
import ConnectDB from "./services/db.js"
const app=express()
const __dirname=path.resolve()
const corsOption={
    credentials:true,origin:['http://localhost:5173']
}
dotenv.config()
ConnectDB()
app.use(cookieParser())
app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// routers
app.use("/api/transaction",transactionRouter)
app.use(express.static(path.join(__dirname,'/client/dist')))
app.get('*',(req,res)=>{
    return res.sendFile(__dirname,'client','dist','index.html')
})
const server=app.listen(8000,()=>{
    console.log(`Server Started at http://localhost:${server.address().port}`)
})
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500
    const message=err.message || "Internal Server Error"
    return res.status(statusCode).send({success:false,statusCode,message})
})
