import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });
  
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });
  
    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
  
    res.json({ token });
  });
  

export default router;
