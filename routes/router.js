import express from "express";
import multer from "multer";
import cloudinary from "../helper/cloudinaryconfig.js";
import { User } from "../models/users.models.js";
import bodyParser from "body-parser";
import moment from "moment";
import fs from "fs";

const router = express.Router();

// img storage path
const imgConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`);
    },
});

// img filter to check if user sent image or something else like pdf, word, or something
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback(new Error("only image is allowed"));
    }
};

const upload = multer({
    storage: imgConfig,
    fileFilter: isImage,
});

router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/register", upload.single("photo"), async (req, res) => {
    // Upload on cloudinary
    const { name } = req.body;
    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    // console.log("file name:", req.file.filename);
    fs.unlinkSync(`${req.file.path}`);

    // console.log("uploadResult:", uploadResult);

    try {
        const date = moment(new Date()).format("YYYY-MM-DD");

        const newUser = new User({
            name,
            img: uploadResult.secure_url,
            imgId: uploadResult.public_id,
            date,
        });


        await newUser.save();
        res.status(200).json({ success: "User saved to db successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error in adding user to db" });
    }
});

//get all Users
router.get("/getData", async(req,res) => {
    try{
        const users = await User.find();
        if( users.length == 0) {
            res.status(200).json({users:"no users"})
        }
        // console.log("users in route:", users);
        res.status(200).json(users);
    }catch(err) {
         res.status(400).json({ error: "Error in getting users from db" });
    }
})

router.delete("/deleteUser/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const userToDelete = await User.findById(userId);
        // console.log("userToDelete:", userToDelete);

        const imgId = userToDelete.imgId;
        // console.log("imgId To delete:", imgId);

        await cloudinary.uploader.destroy(imgId);
        await User.findByIdAndDelete(userId);
        res.status(200).json({ success: "User deleted successfully" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Error deleting user" });
    }
});

export default router;
