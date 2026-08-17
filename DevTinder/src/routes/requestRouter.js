const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');
const User = require('../models/user');


requestRouter.post('/request/send/:status/:toUserId',userAuth,async(req,res)=>{
  debugger;
  try{ 
    
    const fromUserId = req.user._id;
    const toUserId =  req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored","interested"];

    if(!allowedStatus.includes(status)){
      return res
      .status(400)
      .json({"Message" : "Invalid Status Type"})
    }

    
    const existingConnectionRequest = await ConnectionRequestModel.findOne({$or:[{fromUserId,toUserId},{fromUserId:toUserId,toUserId:fromUserId}]});

    if(existingConnectionRequest)
      {
        return res.status(400).json({message:req.user.firstName + " has already sent a connection request to " + toUserId})
      }

      const toUser = await User.findOne({_id:toUserId});
      if(!toUser){
        return res.status(404).json({"Message":"User Not Found"})
      }
      // if(toUserId.toString() === fromUserId.toString()){
      //   return res.status(400).json({"Message":"You cannot send connection request to yourself"})
      // }
      

    const connectionRequest = new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status,
    });

    const data  = await connectionRequest.save();
    res.status(201).json({
      message:"Connection Request sent Succesfully",
      data:data
    }).json({message:req.user.firstName + " is " + status + " to connect with " + toUser.firstName})



  }
  catch(err){
    res.status(400).send({error:err.message})
  }
  res.send({message:"Connection Request Sent",user:toUser  });
}) 


module.exports = requestRouter;