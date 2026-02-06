import { User } from "../models/user.model.js";
import generateTokenAndSaveCookie from "../jwt/authToken.js";
import cloudinary from "cloudinary";
import bcrypt from "bcrypt";
import { Blog } from "../models/blog.model.js";


export const registerUser = async (req, res) => {
  try {
    if (!req.files || !req.files.photo) {
      return res.status(400).json({ message: "User Photo is required" });
    }

    const { photo } = req.files;

    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format",
      });
    }

    const { name, email, phone, education, password, role } = req.body;

    if (!name || !email || !phone || !education || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const upload = await cloudinary.uploader.upload(photo.tempFilePath);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      education,
      password: hashedPassword,
      role,
      photo: {
        public_id: upload.public_id,
        url: upload.secure_url,
      },
    });

    const token = await generateTokenAndSaveCookie(user._id, res);

    return res.status(201).json({
      message: "User registered successfully",
      user,   // ⭐ keep SAME key everywhere
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (user.role !== role) {
      return res.status(400).json({ message: "Role mismatch" });
    }

    const token = await generateTokenAndSaveCookie(user._id, res);

    return res.status(200).json({
      message: "Login successful",
      user,  // ⭐ FULL USER (includes photo)
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const logoutUser=async(req,res)=>{
  try{
     res.clearCookie('jwt');
   return res.status(200).json({message:"Logout successfully"});
  }catch(err){
    console.log(err);
    return res.status(500).json({ message: "Internal Server error" });
  }
}

export const getMyProfile=async(req,res)=>{
    const user=await req.user;
    return res.status(200).json({user});
}

export const getAdmins=async(req,res)=>{
    const allAdmin=await User.find({role:"admin"});
    return res.status(200).json({allAdmin});
}