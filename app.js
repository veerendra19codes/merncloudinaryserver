import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser  from "body-parser";
import  {connectToDB } from "./db/connect.js";
import router from "./routes/router.js"

// import multer from "multer";
// import cloudinary from "./helper/cloudinaryconfig.js";
// import {User} from "./models/users.models.js"

const app = express();
const PORT = 4004;

connectToDB();

// app.use(cors());

// Middleware
app.use(cors({
    origin: process.env.BACKEND_URL, // Update with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add any additional methods your frontend uses
    allowedHeaders: ['Content-Type', 'Authorization'], // Add any additional headers your frontend sends
}));

app.use(express.json());
app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// // img storage path
// const imgConfig = multer.diskStorage({
//     destination:(req, file, callback) => {
//         callback(null, "./uploads")
//     },
//     filename:(req, file, callback) => {
//         callback(null, `image-${Date.now()}.${file.originalname}`)
//     }
// });

// // img filter to check if user sent image or something else like pdf, word or smthn
// const isImage = (req, file, callback) => {
//     if(file.mimetype.startsWith("image")) {
//         callback(null, true)
//     }
//     else {
//         callback(new Error("only image is allowed"))
//     }
// }

// const upload = multer({
//     storage:imgConfig,
//     fileFilter:isImage,
// })


// app.post('/register', async (req, res) => {
//     console.log('Received request body:', req.body);
//     const { name } = req.body;
//     console.log("name:", name);

//     try {
//         const date = moment(new Date()).format("YYYY-MM-DD");

//         const newUser = new User({ 
//             name,
//             img: "test",
//             date,
//          });
//         await newUser.save();
//         res.status(200).json({ success: 'User registered successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Error registering user' });
//     }
// });

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})