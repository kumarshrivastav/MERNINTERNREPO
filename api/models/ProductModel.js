import mongoose from "mongoose";
const productSchema=new mongoose.Schema({
    id:{type:Number,required:true},
    title:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    image:{type:String,required:true},
    sold:{type:Boolean,required:true},
    monthOfSale:{type:Number,required:true},
    dateOfSale:{type:String,required:true,get:(dateOfSale)=>new Date(dateOfSale).getMonth()},
    // monthOfSale:{type:Number,required:false,default:dateOfSale,get:(dateOfSale)=>{
    //     return new Date(dateOfSale).getMonth()
    // }}
},{timestamps:true,toJSON:{getters:true}})

const productModel=mongoose.models.products || mongoose.model('products',productSchema)
export default productModel