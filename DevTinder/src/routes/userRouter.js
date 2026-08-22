const express = require('express');
const userRouter = express.Router();
const {userAuth} = require('../middlewares/auth'); 
const ConnectionRequestModel = require('../models/connectionRequest');

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Get pending connection requests received by the logged-in user
userRouter.get('/user/connection-requests',userAuth,async(req,res)=>{
    try{
        const loggedInUserId = req.user._id; 
        const pendingRequests = await ConnectionRequestModel.find({
            toUserId: loggedInUserId,
            status: "interested"
        }).populate('fromUserId', USER_SAFE_DATA);

        if(pendingRequests.length === 0){
            return res.status(200).send({message:"No pending connection requests"})
        }

        res.status(200).send({requests: pendingRequests});
    }
    catch(err){
        res.status(400).send({error:err.message});
    }
})


userRouter.get('/user/connections',userAuth,async(req,res)=>{
        try{
                const loggedInUserId = req.user._id.toString();
                const connections = await ConnectionRequestModel.find({
                    $or: [
                        { toUserId: loggedInUserId, status: "accepted" },
                        { fromUserId: loggedInUserId, status: "accepted" }
                    ]
                })
                .populate('fromUserId', USER_SAFE_DATA)
                .populate('toUserId', USER_SAFE_DATA);

                if(connections.length === 0)
                {
                    return res.status(200).send({message:"No Connections"})
                }

                // Each row has both users; return the other person, not yourself
                const data = connections.map((row) => {
                    if (row.fromUserId._id.toString() === loggedInUserId.toString()) {
                        return row.toUserId;
                    }
                    return row.fromUserId;
                });

                res.status(200).send({ Connections: data });
        }
        catch(err){
            res.status(400).send({error:err.message})
        }
})


module.exports = userRouter;
