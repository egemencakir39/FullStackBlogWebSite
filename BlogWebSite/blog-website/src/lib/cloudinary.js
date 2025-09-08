import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

console.log("Cloudinary config:");
console.log("CLOUDINARY_CLOUD_NAME", process.env.CLOUDINARY_CLOUD_NAME);
console.log("CLOUDINARY_API_KEY", process.env.CLOUDINARY_API_KEY);
console.log("CLOUDINARY_API_SECRET", process.env.CLOUDINARY_API_SECRET ? "OK" : "MISSING");
export default cloudinary;