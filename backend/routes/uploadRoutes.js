import express from 'express'
import multer from 'multer'
import cloudinary from 'cloudinary'
import 'dotenv/config'
import { handleImage } from '../controller/handleFile.controller.js'


const router = express.Router()

//cloudinary config with signature validation
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
    // api_proxy: process.env.CLOUDINARY_API_PROXY,
    // signature_algorithm: 'sha256'
})

//multer setup using memoryStorage
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/',upload.single('image'),handleImage)

export default router;
