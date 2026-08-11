const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth');


requestRouter.post('/sendConnectionRequest',userAuth,async(req,res)=>{
  //Sending a Connection Request 
  const user = req.user;
  console.log("Sending a Connection Request");
  res.send({message:"Connection Request Sent",user:user});
}) 


module.exports = requestRouter;