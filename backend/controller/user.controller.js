import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../middleware/token.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({ name, email, password });
    await user.save();

    //payload
    const payload = { user: { _id: user.id, role: user.role } };
    //token
    const token = generateToken(payload);

    return res.status(200).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    let isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    //payload
    const payload = { user: { _id: user.id, role: user.role } };
    //token
    const token = generateToken(payload);

    return res.status(200).json({
      message: "User login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//get user profile access private
export const getProfile = async (req,res) => {

    try {
        res.json(req.user)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Server error'});        
    }
}

