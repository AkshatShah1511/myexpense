const express = require("express");
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const registerUser= asyncHandler (async(req,res)=>{
    const {username,email,password} = req.body
    if (!username||!email||!password){
        res.status(400)
        throw new Error("Give all the fields");
    }
    const useravailable = await User.findOne({email})
    if (useravailable){
        res.status(200)
        throw new Error("User Already registred");
    }
    const hashpassword = await bcrypt.hash(password,10)
    const user = await User.create({username,email,password:hashpassword});
    console.log(`user created ${user}`);
    if (user){
        res.status(201).json({_id : user.id, email: user.email});
    }else{
        res.status(400)
        throw new Error("Some error");
    }
    // res.send("registered succesfully");
})
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    if (!email||!password){
        res.status(400)
        throw new Error("Give all the fields");
    }
    const user = await User.findOne({email})
    if(user && await(bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user : {
                username : user.username,
                email: user.email,
                id : user.id
            },
        },
        process.env.ACCESS_TOKEN_STRING,
        {expiresIn :"15m"}
        );
        res.json({accessToken})
    }
    else{
        res.status(400);
        throw new Error("Password Doesnt Match",user.password,password);
    }
})
module.exports= {registerUser,loginUser}
