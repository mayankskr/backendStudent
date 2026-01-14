// Import
import { v2 as cloudinary } from "cloudinary"; // Used to store, optimize, transform, and deliver images and videos efficiently through the cloud.
import fs from "fs";

// Configuring Cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

// Uploading file
const uploadOnCloudinary = async(localFilePath)=>{ // The parameter here stores the path of the local file
    try {
        if(!localFilePath) return null // If no path is passed then exit
        // Upload the file on cloudinary -> The function will contain the local file path and resource type
        const response = cloudinary.uploader.upload(localFilePath, {resource_type: auto})
        console.log("File is uploaded on cloudinary "+ (await response).url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // Remove the loally saved temporary file if the operation fails
        return null
    }
}