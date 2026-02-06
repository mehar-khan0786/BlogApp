import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import createBlog from './routes/blog.routes.js';
import fileUpload from 'express-fileupload';
import cloudinary from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(cookieParser());
const MONGO_URL=process.env.MONGO_URI;

function connectDB() {
    try {
        console.log(process.env.MONGO_URI);
        mongoose.connect(MONGO_URL);
        console.log("DB connected successfully");
    } catch (err) {
        console.log("Error in DB connection", err);
    }
}
connectDB();

app.use(express.json());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/',
}))

app.use(cors({
    origin: true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
})
);



console.log("Frontend URL:", process.env.FRONTEND_URL);


app.get('/', (req, res) => {
    res.send("hlo");
})

app.use("/api/user", userRoutes);
app.use("/api/blogs", createBlog);

//cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_SECRET_KEY,
})


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})