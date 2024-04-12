import mongoose from "mongoose";
const DB = "mongodb+srv://jayam010223:jaya@cluster0.lfpxlap.mongodb.net/";
const connectDB = mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((error) => console.log("not connected"));

export default connectDB;
