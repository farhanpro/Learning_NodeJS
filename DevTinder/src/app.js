const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');
const { ReturnDocument } = require('mongodb');

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
    // Don't use .then((res) => ...) — it shadows Express `res`
    const savedUser = await user.save();
    res.status(201).send({ message: 'User created successfully', user: savedUser });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Find user by email (GET: prefer query, also accept JSON body)
// Postman: GET http://localhost:3000/users?emailId=hetaljsohi@gmail.com
// app.get('/users', async (req, res) => {
//   try {
//     const userEmailId = req.query.emailId || req.body?.emailId;

//     if (!userEmailId) {
//       return res.status(400).send({
//         error: 'emailId is required. Use query: /users?emailId=you@example.com',
//       });
//     }

//     // Don't name the result `res` — that overwrites Express response and breaks send()
//     const user = await User.findOne({ emailId: userEmailId });

//     if (!user) {
//       return res.status(404).send({
//         error: 'User not found',
//         emailId: userEmailId,
//       });
//     }

//     res.status(200).send({ message: 'User Fetched Successfully', user });
//   } catch (err) {
//     res.status(400).send({ error: err.message });
//   }
// });

app.get('/users',async (req,res)=>{
    try{
        const usersEmail = req.body?.emailId ;
        const users = await User.find({emailId:usersEmail});
        if(user.length === 0){

            res.status(404).send('User not found')
        }
        else{
            res.status(201).send(users)
        }
    }
    catch(err){
        res.status(401).send(err);
    }
})
app.get('/feed',async (req,res)=>{
  debugger;
  
    try{
        
        const users = await User.find({});
        if(users.length === 0){

            res.status(404).send('User not found')
        }
        else{
            res.status(201).send(users)
        }
    }
    catch(err){
        res.status(401).send(err);
    }
})

// Delete user by MongoDB _id
// Postman: DELETE http://localhost:3000/users
// Body → raw → JSON: { "userId": "67abc..." }
// (use the document's _id from /feed or signup response — not email)
app.delete('/users', async (req, res) => {
  try {
    debugger;
    const userId = req.body?.userId || req.query.userId;

    if (!userId) {
      return res.status(400).send({
        error:
          'userId is required. Body → raw → JSON: { "userId": "<MongoDB _id>" }',
        receivedBody: req.body,
      });
    }

    // findByIdAndDelete returns null when no document matches — that is NOT success
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).send({
        error: 'User not found. Nothing was deleted.',
        userId,
      });
    }

    res.status(200).send({
      message: 'User deleted successfully',
      user: deletedUser,
    });
  } catch (err) {
    // Invalid ObjectId (wrong format) lands here
    res.status(400).send({ error: err.message });
  }
});

app.patch('/users',async(req,res)=>{
  const data = req.body;

  try{

  const ALLOWEDUPDATES = ["photoUrl","about","gender","age","_id","skills"];
  const isUpdateAllowed = Object.keys(data).every((k)=>ALLOWEDUPDATES.includes(k));
  
  if(!isUpdateAllowed){throw new Error  ("Update Not Allowed")}

   let updatedUsr =  await User.findByIdAndUpdate({_id:data._id},data,{returnDocument:"before",runValidators:true});
   console.log(updatedUsr)
    res.status(201).send('User Updated Successfully',updatedUsr)
    
  }
  catch(err){
    res.status(400).send({error:err.message})
  }
})
connectDB()
  .then(() => {
    console.log('Database Connection is Successful')
    app.listen(3000, () => console.log('Server is running on port 3000'));
  })

  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });





