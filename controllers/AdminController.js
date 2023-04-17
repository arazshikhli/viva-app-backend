import {} from '../validations/auth.js';
import bcrypt from 'bcrypt'
import AdminModel from '../Models/Admin.js';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
export const editAdmin=async(req,res)=>{
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
}

export const loginAdmin=async(req,res)=>{
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
}

export const getMe=async(req,res)=>{
    try {
        const admin=await AdminModel.findById(req.userId);
        if(!admin){
            return res.status(404).json({
                message:"Пользователь не найден"
            })
        }
        const {passwordHash,...adminData}=admin._doc
        res.json({
            ...adminData,
        })
    } catch (error) {
        console.log(error)
    }
}