import streamifier from 'streamifier'
import cloudinary from 'cloudinary'

export const handleImage = async (req,res) => {
    
    try {
        if(!req.file){
            return res.status(400).json({message: "No image uploaded"})
        }
        // Function to handle the stream upload to Cloudinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const timestamp = Math.round(Date.now() / 1000);
                const params = {
                    timestamp: timestamp,
                    folder: 'uploads'
                };
                
                const signature = cloudinary.utils.api_sign_request(
                    params, 
                    process.env.CLOUDINARY_API_SECRET
                );

                const stream = cloudinary.uploader.upload_stream(
                    {
                        ...params,
                        signature: signature
                    },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                
                streamifier.createReadStream(fileBuffer).pipe(stream);
            });
        }
        const result = await streamUpload(req.file.buffer)
        res.json({imageUrl:result.secure_url})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server Error" });        
    }
}