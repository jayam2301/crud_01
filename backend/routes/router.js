import express from "express";
import users from "../models/userSchema.js";
const router = express.Router();
// router.get("/", (req, res) => {
//   console.log("connect");
// });

router.post("/register", async (req, res) => {
  // console.log(req.body);
  const { name, email, age, work, add, desc, mobile } = req.body;

  if (!name || !email || !age || !work || !add || !desc || !mobile) {
    res.status(422).json("Please fill the data");
  }
  try {
    const preuser = await users.findOne({ email: email });
    console.log(preuser);
    if (preuser) {
      res.status(422).json("This user is already exist!");
    } else {
      const adduser = new users({
        name,
        email,
        age,
        work,
        add,
        desc,
        mobile,
      });
      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }
  } catch (error) {
    res.status(422).json(error);
  }
});
//get user
router.get("/getdata", async (req, res) => {
  try {
    const userdata = await users.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(422).json(error);
  }
});
//get individual user

router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const userIndividual = await users.findById({ _id: id });
    console.log(userIndividual);
    res.status(201).json(userIndividual);
  } catch (error) {
    res.status(422).json(error);
  }
});
//update user data
router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateduser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updateduser);
    res.status(201).json(updateduser);
  } catch (error) {
    res.status(422).json(error);
  }
});

//delete user
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteuser = await users.findByIdAndDelete({ _id: id });
    console.log(deleteuser);
    res.status(201).json(deleteuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

export default router;
