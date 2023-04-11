import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import {editAdminValidation} from'./validations/auth.js'
import { validationResult } from 'express-validator';
import AdminModel from './Models/Admin.js';
import bcrypt from 'bcrypt'
mongoose.connect(`${process.env.MONGO_DB_URI}`)
.then(()=>{
    console.log("DB OK")
})
.catch(()=>{
    console.log('DB Error')
})
const app=express();
app.use(express.json())


app.post('/auth/editadmin',editAdminValidation,async (req,res)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json(errors.array())
   }

   const password=req.body.password;
   const salt=await bcrypt.genSalt(10);
   const passwordHash=await bcrypt.hash(password,salt);

   const doc=new AdminModel({
    email:req.body.email,
    fullName:req.body.fullName,
    avatarUrl:req.body.avatarUrl,
    passwordHash,
   });

   const admin=await doc.save()
   res.json(admin)
})

app.listen(4444,(err)=>{
    if(err){
        return console.log(er)
    }
    console.log('Server Ok')
})