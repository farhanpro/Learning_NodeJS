const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

// Without this, req.body is undefined for JSON requests from Postman
app.use(express.json());

app.post('/signup', async (req, res) => {
  try {
    // If this is missing, Postman body is wrong OR server wasn't restarted
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({
        error:
          'Request body is empty. In Postman: Body → raw → JSON, and set Content-Type: application/json',
        receivedBody: req.body,
      });
    }

    const { firstName, lastName, emailId, password, age, gender } = req.body;

    const user = new User({
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
    });
    await user.save().then((res)=>{
        res.status(201).send({ message: 'User created successfully', user });

    })
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

connectDB()
  .then(() => {
    console.log('Database Connection is Successful')
    app.listen(3000, () => console.log('Server is running on port 3000'));
  })

  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });





