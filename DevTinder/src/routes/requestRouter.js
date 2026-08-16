const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest')


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
        return res.status(400).json({"Message":"Connection Request Already Exists"})
      }

    const connectionRequest = new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status,
    });

    const data  = await connectionRequest.save();
    res.status(201).json({
      message:"Connection Request sent Succesfully",
      data:data
    }).send({"Message":"Connection Request send Succesfully"})



  }
  catch(err){
    res.status(400).send({error:err.message})
  }
  res.send({message:"Connection Request Sent",user:user});
}) 


module.exports = requestRouter;