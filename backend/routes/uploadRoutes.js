import express from "express";
import multer from "multer";
import {v2 as cloudinary} from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup using memory storage
const storage = multer.memoryStorage(); // telling to store the uploaded files directly to RAM than to the file system(disk)
const upload = multer({ storage }); // upload is used as middleware to handle file uploads
// After upload, the file is available as req.file.buffer

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).send({ msg: "No file uploaded." });
    }

    // Function to handle the stream upload to cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        // Call streamifier to convert file buffer to stream
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    // Call the streamUpload function
    const result = await streamUpload(req.file.buffer);

    // Respond with the uploaded image URL
    return res.send({ imageUrl: result.secure_url });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

export default router;
