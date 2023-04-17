import {body} from 'express-validator'


export const addPhotoValidation=[
    body('photoURL',"Неверный формат почты").isURL(),
    body('photoDescription').optional(),
    body('clientName').optional(),
   
];
