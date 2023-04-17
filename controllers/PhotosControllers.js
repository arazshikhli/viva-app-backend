import PhotoModel from '../Models/Photos.js'
export const addPhoto=async(req,res)=>{
    try {
      const doc=new PhotoModel({
        photoURL:req.body.photoURL,
        photoDescription:req.body.photoDescription,
        clientName:req.body.clientName,
        admin:req.adminId,
      });
      const photo=await doc.save();
      res.json(photo)
    } catch (error) {
        console.log('Не удалось загрузить фото')
    }
}
