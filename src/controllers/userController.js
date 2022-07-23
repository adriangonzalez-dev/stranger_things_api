const fs = require("fs");
const path = require("path");
const process = require('process');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
let cloudinary = require('cloudinary');

module.exports = {
    register: async (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){

            let defaultAvatar = "https://res.cloudinary.com/ecommerce-tea/image/upload/v1658409640/defaultAvatar_o0pfsw.png"
            let imageUser = ''
            let imagePublicId = ''
            let tempUrl = ''

            if (req.file) {
                tempUrl = await cloudinary.v2.uploader.upload(req.file.path)
                imageUser = tempUrl.secure_url
                imagePublicId = tempUrl.public_id
                fs.unlinkSync(req.file.path)
            } else {
                imageUser = defaultAvatar
                imagePublicId = ''
            }

            db.users.create({
                username: req.body.username,
                email: req.body.email,
                pass: bcrypt.hashSync(req.body.pass, 10),
                avatar: imageUser,
                avatar_public_id: imagePublicId,
                rol: 0
            })
            .then((user) => {
                res.status(201).json({
                    status: 201,
                    message: "Usuario creado",
                    data: {
                        id:user.id,
                        username:user.username,
                        email:user.email
                    },
                })
            })
            .catch((error) => {
                res.status(502).json({
                    status: 502,
                    message: 'El servidor no responde, intente más tarde',
                })
            })
    
        }else{
            res.status(400).json({
                status: 400,
                message: 'Hubo un problema al crear el usuario',
                errors: errors.mapped()
            })
        }
    
    },
    login:(req,res)=>{
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.users.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then((user) => {
                const token = jwt.sign({
                    name: user.name,
                    id: user.id
                }, process.env.SECRET)

                res.header("auth-token", token).status(200).json({
                    user: {
                        username:user.username,
                        id: user.id,
                        rol: user.rol,
                        avatar: user.avatar,
                        email: user.email,
                    },

                    data: { token }
                })
            })

        } else {
            res.status(400).json({
                status: 400,
                errors: errors.mapped()
            })
        }
    }
    
}