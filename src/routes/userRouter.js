const express = require("express");
const router= express.Router();

//middlewares
const uploadFiles = require('../middlewares/uploadFiles')

//Controllers
const {register} = require('../controllers/userController');

//routes
router.post('/register',uploadFiles.single('avatar'),register)

module.exports = router