const { uploadToCloudinary } = require("../utils/cloudinaryService");

class UploadsController {
    uploadLocal = async (req, res) => {
        try {            
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: 'No file uploaded'
                });
            }

            console.log(
                req.file
            );
            

            // Construct public URL
            const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.path.replace('uploads/', '')}`;

            res.status(200).json({
                success: true,
                message: 'File uploaded successfully',
                data: {
                    filename: req.file.filename,
                    originalname: req.file.originalname,
                    size: req.file.size,
                    path: req.file.path,
                    url: fileUrl,
                    mimetype: req.file.mimetype
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'File upload failed',
                error: error.message
            });
        }
    }

    uploadCloud = async (req, res) => {
        const file = req.file;

        if(!file) {
            return res.status(400).json({ state: "failed", message: "You must select a file as image" })        
        }
    
        const path = await uploadToCloudinary(file);

        return res.status(200).json({state: 'success', message: 'Your image was uploaded successfully', path});
    }
}

module.exports = new UploadsController();