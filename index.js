const process = require('process');
require('dotenv').config();
const PORT = process.env.PORT || 3030;

const express = require("express");
const app = express();
const path = require("path")
const methodOverride = require('method-override');
const cors = require("cors")
const cloudinary = require('cloudinary')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cors());
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})


app.listen(PORT, function () {
    console.log(`Servidor abierto en puerto ${PORT}`)
})
