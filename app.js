import express from "express";
import cors from "cors";
import bodyParser  from "body-parser";
import  {connectToDB } from "./db/connect.js";
import router from "./routes/router.js"

const app = express();
const PORT = process.env.PORT || 4004 ;
// const PORT = 4004;

connectToDB();

// app.use(cors());
const allowedOrigins = [process.env.BACKEND_URL1, process.env.BACKEND_URL2,process.env.BACKEND_URL3]

// Middleware
app.use(cors({
    origin: allowedOrigins, // Update with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add any additional methods your frontend uses
    allowedHeaders: ['Content-Type', 'Authorization'], // Add any additional headers your frontend sends
}));

app.use(express.json());
app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})