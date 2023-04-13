import {body} from 'express-validator'


export const editAdminValidation=[
    body('email',"Неверный формат почты").isEmail(),
    body('password',"Пароль слишком короткий").isLength({min:8}),
    body('fullName',"Имя не менее 5-и символов").isLength({min:5}),
    body('avatarUrl').optional().isURL(),
];

export const loginValidation=[
    body('email',"Неверный формат почты").isEmail(),
    body('password',"Пароль слишком короткий").isLength({min:8}),
]