import { Schema,Types, trusted } from "mongoose";
import mongoose from "mongoose";

const PhotoSchema=new Schema({
    photoURL:{
        type:String,
        required:true,
        unique:true
    },
    photoDescription:String,
    clientName:String,
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin',
        required:true
    }
},
{
    timestamps:true,
})

export default mongoose.model('Photo',PhotoSchema)