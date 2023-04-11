import { Schema,Types } from "mongoose";
import mongoose from "mongoose";

const AdminSchema=new Schema({
    fullName:{
        type:String,
        required:true,
        unique:true
    },
    passwordHash:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    avatarUrl:String
},
{
    timestamps:true,
})

export default mongoose.model('Admin',AdminSchema)