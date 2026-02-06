import mongoose from 'mongoose';


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    blogImage: {
        public_id: {
            type: String,
            require: true,
        },
        url: {
            type: String,
            require: true,
        }
    },
    category: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true,
        minlength: [100, "Should contain at least 200 characters"]
    },
    adminName: {
        type: String,
        required: true,
    },
    adminPhoto: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

});

export const Blog = mongoose.model('Blog', blogSchema);