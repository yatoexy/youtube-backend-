import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOncloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // Delete local file after successful upload
    fs.unlinkSync(localFilePath);

    console.log("✅ Cloudinary upload success:", result.url);
    return result;
  } catch (error) {
    // Delete local file even if upload fails
    fs.unlinkSync(localFilePath);
    console.error("❌ Cloudinary upload error:", error);
    throw new Error("Cloudinary Upload Failed");
  }
};

export { uploadOncloudinary };
