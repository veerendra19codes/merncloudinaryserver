import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB = process.env.MONGO_URL;

export const connectToDB = () => {
    mongoose.connect(DB, {
        useUnifiedTopology: true,
    }).then(() => console.log("database connected")).catch((err) => console.log("error in connecting db:", err));
}