import { asyncHandler } from "../utils/asyncHandler.js";
import { apierror } from "../utils/apierror.js";

import { User } from "../models/user.model.js"; // Assuming you have a User model defined
import{ uploadOncloudinary } from "../utils/cloudinary.js"; // Assuming you have a utility function for uploading to Cloudinary
import{ ApiResponse } from "../utils/Apiresponse.js"; // Assuming you have a utility for API responses
const registerUser = asyncHandler(async (req, res) => {
 //get user detail from frontend
 // validation - non empty
 // check if user already exists username or email
 //check for image then avatar
 //upload image to cloudinary
 //create user object - create user in database
 //remove response and refresh token field 
 //check for user creation
 //return res
 const { fullName, username, email, password } = req.body;
 console.log("email", email);

 if([ fullName, username, email, password].some(field => field?.trim() === "")) {
     throw new apierror("all fields are required", 400);

 }

const existingUser =  User.findOne({ $or: [{ username }, { email }] });// may be use awit
if (existingUser) {
    throw new apierror("User already exists", 409);

}

// multer gives access us the file object
 const localAvatarpath = req.file?.avatar[0]?.path;// Assuming multer middleware is used to handle file uploads
 const localCoverImagepath = req.file?.coverImage[0]?.path;// Assuming multer middleware is used to handle file uploads


 if(!localAvatarpath ) {
     throw new apierror("Image upload failed", 400);
 }

//upload image to cloudinary
  const avatar = await uploadOncloudinary(localAvatarpath);
  const coverImage = await uploadOncloudinary(localCoverImagepath);
  if(!avatar) {
      throw new apierror("Image upload failed", 400);
  }

 const user = await User.create({
  fullName,
  username: username.toLowerCase(),
  email,
  password,
  avatar: avatar.url, // Assuming the avatar object has a url property
  coverImage: coverImage?.url || "", // Assuming the coverImage object has a url property



})


const createdUser = await User.findById(user._id).select("-password -refreshToken").lean().exec();
if (!createdUser) {
  throw new apierror("User creation failed", 500);
}
return res.status(201).json(new ApiResponse(200, createdUser, "User created successfully", { user: createdUser
  
}));
});











export { registerUser };
