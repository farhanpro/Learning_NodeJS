const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');
const { ReturnDocument } = require('mongodb');


const validator = require('validator');
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (corsOptions.origin.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', corsOptions.methods.join(','));
  res.setHeader(
    'Access-Control-Allow-Headers',
    req.headers['access-control-request-headers'] || corsOptions.allowedHeaders.join(',')
  );
  res.setHeader('Access-Control-Max-Age', '0');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

app.use(cors(corsOptions));

// Without this, req.body is undefined for JSON requests from Postman
app.use(express.json());
app.use(cookieParser());


const authRouter =  require("../src/routes/auth");
const profileRouter =  require("./routes/profileRouter");
const requestRouter =  require("./routes/requestRouter");
const userRouter = require("./routes/userRouter");

// Mount at "/" and keep the full path on each router
// (e.g. /profile/edit). Prefix-mounting + repeating /profile
// was registering /profile/profile/edit instead.
app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);


  connectDB()
  .then(() => {
    console.log('Database Connection is Successful')
    app.listen(3000, () => console.log('Server is running on port 3000'));
  })

  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });
