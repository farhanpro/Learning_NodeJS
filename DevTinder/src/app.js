const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');
const { ReturnDocument } = require('mongodb');
const { validateSignUpData } = require('./utils/validations');
const bcrypt = require('bcrypt');
const validator = require('validator');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {userAuth} = require('./middlewares/auth');

// Without this, req.body is undefined for JSON requests from Postman
app.use(express.json());
app.use(cookieParser());

app.post('/signup', async (req, res) => {
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
app.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !validator.isEmail(emailId)) {
      throw new Error('Email is not valid');
    }
    if (!password || !validator.isStrongPassword(password)) {
      throw new Error('Password is not valid');
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error('User Not Found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //Create JWT token
      const token = await jwt.sign({_id:user._id},'DEV@Tinder$790',{expiresIn:'7d'});
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

app.post('/profile',userAuth ,async(req,res)=>{
  try{
      const user = req.user;
      res.status(200).send({message:"Profile Page",loggedInUser:user})
      
    }
  catch(err){
      res.status(400).send({error:err.message})
  }


})

app.post('/sendConnectionRequest',userAuth,async(req,res)=>{
  //Sending a Connection Request 
  const user = req.user;
  console.log("Sending a Connection Request");
  res.send({message:"Connection Request Sent"});
}) 

connectDB()
  .then(() => {
    console.log('Database Connection is Successful')
    app.listen(3000, () => console.log('Server is running on port 3000'));
  })

  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });





