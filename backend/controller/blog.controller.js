import { Blog } from "../models/blog.model.js";
import cloudinary from "cloudinary";
import mongoose from "mongoose";


export const createBlog = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "Blog Image is required" });
        }

        const { blogImage } = req.files;

        const allowedFormats = ["image/jpeg", "image/png", "image/webp"];


        if (!allowedFormats.includes(blogImage.mimetype)) {
            return res.status(400).json({
                message: "Invalid photo format. Only JPG, PNG, WEBP allowed"
            });
        }

        const { category, title, about } = req.body;

        if (!title || !category || !about) {
            return res.status(400).json({ message: "Title, category & About fields are required" });
        }

        const adminName = req?.user?.name;
        const adminPhoto = req?.user?.photo?.url;
        const createdBy = req?.user?._id;

        const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);

        if (!cloudinaryResponse) {
            return res.status(500).json({ message: "Photo upload failed" });
        }


        const blogData = {
            title,
            about,
            category,
            adminName,
            adminPhoto,
            createdBy,
            blogImage: {
                public_id: cloudinaryResponse.public_id,   // ✅ fixed
                url: cloudinaryResponse.secure_url         // ✅ better
            }
        }

        const blog = await Blog.create(blogData);


        return res.status(201).json({
            message: "blog created successfully", blog
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        await Blog.deleteOne();
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getAllBlogs = async (req, res) => {
    const AllBlogs = await Blog.find();
    res.status(200).json({ AllBlogs });
}

export const getSingleBlogs = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyBlogs=async(req,res)=>{
    try{
        const createdBy=req.user._id;
        const myBlogs=await Blog.find({createdBy});
        res.status(200).json({myBlogs});

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server error"});
    }
}

export const updateBlog=async(req,res)=>{
    try{
       const {id}=req.params;
       if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:"Invalid Blog id"});
       }

       const updateBlog=await Blog.findByIdAndUpdate(id,req.body,{new:true});
       if(!updateBlog){
        return res.status(404).json({message:"Blog not found"});
       }

       return res.status(200).json({message:"Blog updated successfully",updateBlog});

    }catch(error){
        return res.status(500).json({message:"Internal server error"});
    }
}

export const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    const userId = req.user._id;

    // already liked ?
    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      blog.likes.pull(userId);   // unlike
    } else {
      blog.likes.push(userId);   // like
    }

    await blog.save();

    res.status(200).json(blog);

  } catch (error) {
    res.status(500).json({ message: "Error liking blog" });
  }
};
