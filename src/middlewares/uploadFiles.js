const path = require('path');
const multer = require('multer');

let multerDiskStorage = multer.diskStorage({
    filename: (req, file, cb) => {
        let imageName = 'user-' + Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
})

let filterMimetype = (req,file,cb)=>{
    const filetypes = /jpeg|jpg|png|gif/
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(path.extname(file.originalname))
    if(mimetype && extname){
        return cb(null,true)
    }
    cb('Solo se admiten jpeg,jpg,png o gif')
}

let uploadFiles = multer({
    storage: multerDiskStorage,
    fileFilter: filterMimetype
});

module.exports = uploadFiles;