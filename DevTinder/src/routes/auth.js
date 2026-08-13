const express = require('express');
const authRoutes = express.Router();
const { validateSignUpData } = require('../utils/validations');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const validator = require('validator');


authRoutes.post('/signup', async (req, res) => {
try {
  validateSignUpData(req);


  
    // If this is missing, Postman body is wrong OR server wasn't restarted
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({
        error:
          'Request body is empty. In Postman: Body → raw → JSON, and set Content-Type: application/json',
        receivedBody: req.body,
      });
    }

    const { firstName, lastName, emailId, age, gender,about,password } = req.body;
    
    const passwordHash = await bcrypt.hash(password, 3);
    console.log("Password Hashed",passwordHash)
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      about
    });
    // Don't use .then((res) => ...) — it shadows Express `res`
    const savedUser = await user.save();
    res.status(201).send({ message: 'User created successfully', user: savedUser });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Prefer POST for login (body with credentials). GET also works in Postman.
authRoutes.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !validator.isEmail(emailId)) {
      throw new Error('Email is not valid');
    }
    if (!password) {
      throw new Error('Password is not valid');
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error('User Not Found');
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
      const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //Create JWT token
      //const token = await jwt.sign({_id:user._id},'DEV@Tinder$790',{expiresIn:'7d'});
      const token = await user.getJWTToken();
      console.log("JWT Token",token);
    // Cookie must be set on SUCCESS — before res.send()
    // (Previously this was inside the failed-password branch, so Postman never got a cookie on login)
    res.cookie('token', token, {httpOnly: true, // not readable by JS in browser; still visible in Postman Cookies / Headers// maxAge: 24 * 60 * 60 * 1000, // optional: 1 day  
    })}

    if (!isPasswordValid) {
      throw new Error('Password is not valid');
    }



    res.status(200).send({ message: 'Login Successfull', user });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

authRoutes.post('/logout',async(req,res)=>{
  res.cookie("token",null,{
    expires: new Date(Date.now())
  })
  res.status(200).send({Message: "User Logged out"})
})

module.exports = authRoutes;
