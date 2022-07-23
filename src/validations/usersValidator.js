const {body, check} = require('express-validator');
const db = require('../database/models');
const bcrypt = require('bcryptjs')

module.exports = {
    registerValidator:[
        check('username')
            .notEmpty().withMessage('Debe ingresar un nombre de usuario')
            .isLength({min:5,max:12}).withMessage('Debe tener entre 5 y 12 carácteres'),

        body('username').custom((value)=>{
            return db.User.findOne({
                username:value
            })
            .then(user=>{
                if(user !== null){
                    if(user.username === value){
                        return Promise.reject('El nombre de usuario ya se encuentra registrado')
                    }
                    return true
                }
                return true
            })
            .catch(err=>{
                return Promise.reject('El nombre de usuario ya se encuentra registrado')
            })
        }).withMessage('El nombre de usuario ya se encuentra registrado'),

        check('email')
            .notEmpty().withMessage('Debe ingresar una direccion de mail')
            .isEmail().withMessage('Debe ser un mail valido'),

        check('pass')
            .notEmpty().withMessage('Debe colocar una contraseña')
            .isLength({min: 8,max: 12}).withMessage('La contraseña debe tener entre 8 y 12 carácteres'),

        body('email').custom((value, { req }) => {
            return db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
                .then(user => {
                    if (user) {
                        return Promise.reject("El email ya se encuentra registrado")
                    }
                })

        }).withMessage("El email ya se encuentra registrado"),

    ],
    loginValidator:[
        check('email')
                    .notEmpty()
                    .isEmail().withMessage('Debe ingresar un email válido').bail(),

        body('pass').custom((value,{req})=>{
            return db.User.findOne({
                where:{
                    email:req.body.email
                }
            })
            .then(user=>{
                if(user !== null){
                    if(!bcrypt.compareSync(req.body.pass,user.pass)){
                        return Promise.reject('credenciales invalidas')
                    }else{
                        return true;
                    }
                } else {
                    return Promise.reject('credenciales invalidas')
                }
            })
            .catch(error=>{
                return Promise.reject("Email o contraseña incorrecta")
            })
        }).withMessage("Email o contraseña Incorrecta"),
        body('pass').notEmpty().withMessage('Ingrese su contraseña').bail()
    ]
}