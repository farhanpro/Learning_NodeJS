const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const { validateEditProfileData } = require('../utils/validations');

profileRouter.post('/profile',userAuth ,async(req,res)=>{
  try{
      const user = req.user;
      res.status(200).send({message:"Profile Page",loggedInUser:user})
      
    }
  catch(err){
      res.status(400).send({error:err.message})
  }
})

profileRouter.patch('/profile/edit',userAuth,async(req,res)=>{
  
  try{
  debugger; 
    if(!validateEditProfileData(req)){
        res.status(401).send({Message:"Profile Edit Not Allowed for this Fields"})
    }
    const user = req.user;
    console.log(user);
  }
  catch(err){
    console.log("Error",err);
  }
})

module.exports = profileRouter;