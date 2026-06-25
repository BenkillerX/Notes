import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken" 
import validator from 'validator'

function createToken(_id, email) {
   return jwt.sign({userId:_id, email}, process.env.SECRET_KEY, {expiresIn:"3d"})
}
export async function createUser(req, res) {
    const {email, password} = req.body;
    if (!email || !password) {
         return res.status(400).json({message:"Previde all Credentials"});
    }  
    try {
        if (!validator.isEmail(email)) {
            throw Error("Enter a valid Email")
        }
        if(!validator.isStrongPassword(password)){
            throw Error("Enter a Strong Password")
        }
        const matchingEmail = await User.findOne({email})
        if (matchingEmail) {
            throw Error("Email Already Exists ")
        }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser  = new User({email, password:hashedPassword})
    await newUser.save()
    const token = createToken(newUser._id, email,)
    res.status(201).json({message:"User created successfully", user:newUser.email, token})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
export async function loginUser(req, res) {
    const {email, password} = req.body
    if (!email || !password) {
         return res.status(400).json({message:"Previde all Credentials"});
    }  
    try {
         if (!validator.isEmail(email)) {
            throw Error("Enter a valid Email")
        }
        if(!validator.isStrongPassword(password)){
            throw Error("Enter a valid Password")
        }
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({message:"User Not Found"})
        }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(401).json({message:"invalid credentials"})
    }
    const token = createToken(user._id)
    
    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email },
      token
    });
    } catch (error) {
        res.json({error:error.message})
    }
}