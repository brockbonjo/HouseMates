const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = cloudinaryStorage({
    cloudinary,
    folder: 'housemates',
    allowedFormats: ["jpg", "jpeg", "png"],
    transformation: [{height: 500}]
});

const parser = multer({storage});

module.exports = parser;