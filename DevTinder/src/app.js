const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');
const { ReturnDocument } = require('mongodb');


const validator = require('validator');
const cookieParser = require('cookie-parser');



// Without this, req.body is undefined for JSON requests from Postman
app.use(express.json());
app.use(cookieParser());


const authRouter =  require("../src/routes/auth");
const profileRouter =  require("./routes/profileRouter");
const requestRouter =  require("./routes/requestRouter");

// Mount at "/" and keep the full path on each router
// (e.g. /profile/edit). Prefix-mounting + repeating /profile
// was registering /profile/profile/edit instead.
app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);


connectDB()
  .then(() => {
    console.log('Database Connection is Successful')
    app.listen(3000, () => console.log('Server is running on port 3000'));
  })

  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });





