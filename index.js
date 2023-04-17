import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import {addPhotoValidation} from'./validations/photo.js';
import { editAdminValidation } from './validations/auth.js';
import { validationResult } from 'express-validator';
import AdminModel from './Models/Admin.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import checkAuth from './utils/checkAuth.js';
import cors from 'cors'
import {adminController,photoController} from './controllers/index.js';

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
app.use(express.json());
app.use(cors())
const posts=[{name:"araz",surname:"shikhli"},{name:"araz",surname:"shikhli"}]
app.get('/auth/posts',async(req,res)=>{
 res.send({
    message:"Hello world"
 })
})
app.post('/auth/editadmin',editAdminValidation,adminController.editAdmin)
app.post('/auth/login',adminController.loginAdmin);
app.get('/auth/me',adminController.getMe)
app.post('/photos/add',addPhotoValidation, photoController.addPhoto)
// app.get('/photos/:id',PhotosControllers.getOne);
// app.get('/photos',PhotosControllers.getAll);
// app.delete('/photos/:id',PhotosControllers.remove)

app.listen(4444,(err)=>{
    if(err){
        return console.log(er)
    }
    console.log('Server Ok')
    
})