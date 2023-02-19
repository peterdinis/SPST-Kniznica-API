import cloudinary from "cloudinary";

const cloudinaryConfig = cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.STORAGE_API_SECRET,
});

export default cloudinaryConfig;
