const express = require('express');
const userRouter = express.Router();
const {userAuth} = require('../middlewares/auth'); 
const ConnectionRequestModel = require('../models/connectionRequest');
const user = require('../models/user');

//Get all the pending connection request for the loggenIn user 

userRouter.get('/user/connection-requests',userAuth,async(req,res)=>{
    try{
        const loggedInUserId = req.user._id; 
        const pendingRequests = await ConnectionRequestModel.find({toUserId:loggedInUserId,status:"interested"})
        if(pendingRequests.length === 0){
            return res.status(200).send({message:"No pending connection requests"})
        }
        else{
            const getFromUser = await user.findById(pendingRequests[1].fromUserId);

            if(!getFromUser){
                return res.status(404).send({message:"User Might have been deleted"})
            }

            res.status(200).send({requests:pendingRequests, fromUser:getFromUser});
        }
    }
    catch(err){
        res.status(400).send({error:err.message});
    }
})



module.exports = userRouter;
