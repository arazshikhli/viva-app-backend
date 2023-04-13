import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import {editAdminValidation,loginValidation} from'./validations/auth.js'
import { validationResult } from 'express-validator';
import AdminModel from './Models/Admin.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';


dotenv.config()
const URL=process.env.MONGODB_URI
console.log(URL)
mongoose.connect(`mongodb+srv://viva:viva123@cluster0.qvys0rj.mongodb.net/viva-app?retryWrites=true&w=majority`)
.then(()=>{
    console.log("DB OK")
})
.catch(()=>{
    console.log('DB Error')
})
const app=express();
app.use(express.json())
const posts=[{name:"araz",surname:"shikhli"},{name:"araz",surname:"shikhli"}]
app.get('/auth/posts',async(req,res)=>{
 res.send({
    message:"Hello world"
 })
})
app.post('/auth/editadmin',editAdminValidation,async (req,res)=>{
try {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
     return res.status(400).json(errors.array())
    }
 
    const password=req.body.password;
    const checkPassword=password[0];
    const firstLetterCapitalize=checkPassword.toUpperCase();

    if(checkPassword!=firstLetterCapitalize){
        res.json({
            message:"Первая буква с большой"
        })
    }
   
    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt);
 
    const doc=new AdminModel({
     email:req.body.email,
     fullName:req.body.fullName,
     avatarUrl:req.body.avatarUrl,
     passwordHash:hash,
    });
 
    const admin=await doc.save()
    const token=jwt.sign({
        _id:admin._id,
    },'secret123',
    {expiresIn:"30d"})

    const {passwordHash,...adminData}=admin._doc
    res.json({
        ...adminData,
        token
    })
    
} catch (error) {
    console.log(error)
    res.json({
       message:"Error" 
    })
}
})
app.post('/auth/login',async (req,res)=>{
    try {
        const admin=await AdminModel.findOne({email:req.body.email});
        if(!admin){
          return  res.status(404).json({
                message:"неверный ящик почты"
            })
        }
        const isValidPass=await bcrypt.compare(req.body.password,admin._doc.passwordHash);
        if (!isValidPass){
            return  res.json({
                message:"неверный пароль"
            }) 
        }
        const token=jwt.sign({
            _id:admin._id,
        },'secret123',
        {expiresIn:"30d"})

        const {passwordHash,...adminData}=admin._doc
        res.json({
            ...adminData,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Не удалось войти в систему"
        })
    }
})

app.listen(4444,(err)=>{
    if(err){
        return console.log(er)
    }
    console.log('Server Ok')
    
})