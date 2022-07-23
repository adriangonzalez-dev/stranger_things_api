const express = require("express");
const router= express.Router();

//middlewares
const uploadFiles = require('../middlewares/uploadFiles')

//Controllers
const {register,login} = require('../controllers/userController');

//Validators
const {registerValidator,loginValidator} = require('../validations/usersValidator')

//routes
router.post('/register',registerValidator,uploadFiles.single('avatar'),register);
router.post('/login',loginValidator,login);

module.exports = router