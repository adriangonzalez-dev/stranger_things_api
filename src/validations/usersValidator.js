const {body, check} = require('express-validator');
const db = require('../database/models');

module.exports = {
    validateRegister:[
        check('username')
            .notEmpty().withMessage('Debe ingresar un nombre de usuario')
            .isLength({min:5,max:12}).withMessage('Debe tener entre 5 y 12 carácteres'),

        check('email')
            .notEmpty().withMessage('Debe ingresar una direccion de mail')
            .isEmail().withMessage('Debe ser un mail valido'),

        check('pass')
            .notEmpty().withMessage('Debe colocar una contraseña')
            .isLength({min: 8,max: 12}).withMessage('La contraseña debe tener entre 8 y 12 carácteres'),

        body('email').custom((value, { req }) => {
            return db.users.findOne({
                where: {
                    email: req.body.email
                }
            })
                .then(user => {
                    if (user) {
                        return Promise.reject("El email ya se encuentra registrado")
                    }
                })

        }).withMessage("Email ya registrado"),

        // verificacion para multer
        body("avatar")
        .custom((value, {req})=>{
            if(!req.file){
                return true
            }else if (req.file.mimetype === "image/png" || req.file.mimetype === "image/jpeg"){
                return true
            }else{
                return false
            }
            
        }).withMessage('Debes seleccionar un archivo de imagen valido'),
        check('terms').notEmpty().withMessage('Debe aceptar los terminos y condiciones')
    ],
    loginValidator:[
        check('email')
                    .notEmpty()
                    .isEmail().withMessage('Debe ingresar un email válido').bail(),
    
        body('pass').custom((value,{req})=>{
            return db.users.findOne({
                where:{
                    email:req.body.email
                }
            })
            .then(user=>{
                if(!bcrypt.compareSync(req.body.pass,user.pass)){
                    return Promise.reject('credenciales invalidas')
                }
        
                return false;
            })
            .catch(error=>{
                return Promise.reject("Email o contraseña incorrecta")
            })
        }).withMessage("Email o contraseña Incorrecta"),
    
        body('pass').notEmpty().withMessage('Ingrese su contraseña').bail()
    ]
    
}