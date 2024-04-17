import express from "express";
import dotnenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import users from "./models/userSchema.js";
import router from "./routes/router.js";
const app = express();
dotnenv.config();
const PORT = 8000;

connectDB;
app.use(cors());
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
