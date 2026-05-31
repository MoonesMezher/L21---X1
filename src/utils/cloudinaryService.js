const fs = require('fs')
require("dotenv").config()
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: '',
});

const uploadToCloudinary = async (file) => {
    try {
        const filePath = __dirname+`/tmp/${file.originalname}`; // or any other temporary file path
        fs.writeFileSync(filePath, file.buffer);
        const result = await cloudinary.v2.uploader.upload(filePath, {
            resource_type: 'auto', // optional, but recommended
        });
        fs.unlinkSync(filePath);
        console.log(result.secure_url);
        
        return result.secure_url;
    } catch (err) {
        console.error(err);
        return null;
    }
}

module.exports = {
    uploadToCloudinary
} 