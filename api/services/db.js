import mongoos from "mongoose";
const ConnectDB=async()=>{
    try {
        const conn=await mongoos.connect(process.env.MONGODB_CONNECTION_STRING,{bufferCommands:false})
        console.log(`MongoDB Connected at ${conn.connection.host} Successfully`)
    } catch (error) {
        console.log(`Error Occured at ${error}`)
    }
}

export default ConnectDB;