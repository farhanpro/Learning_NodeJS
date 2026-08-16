const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const { validateEditProfileData } = require('../utils/validations');
const bcrypt = require('bcrypt');


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
    if(!validateEditProfileData(req)){res.status(401).send({Message:"Profile Edit Not Allowed for this Fields"})}

    const user = req.user;
    console.log(user);
    Object.keys(req.body).forEach((key)=>(user[key] = req.body[key]))
    await user.save();
    res.status(200).send({message:`${user.firstName} Profile Updated Successfully `,data:user})
  }

    
    catch(err){
    console.log("Error",err);
    res.status(400).send({error:err.message})
  }
})




profileRouter.patch('/profile/forgot-password',userAuth, async(req,res)=>{
  try{
  const {currentPassword,newPassword,confirmPassword} = req.body;
  const user = req.user;  
  const isPasswordValid = await user.validatePassword(currentPassword);
  if(newPassword === confirmPassword )
  {
    
    user.password = await bcrypt.hash(newPassword, 3);;
    await user.save();
    res.cookie("token",null,{
    expires: new Date(Date.now())
  })
    res.status(200).send({message:"Password updated successfully"});
  }
  else if(isPasswordValid)
  {
    res.status(201).send({'Message  Password Check completed: ' :user })
  }
  else if(!isPasswordValid)
  {
    res.status(401).send("Recheck the Password");
  }
  else if(newPassword !== confirmPassword){res.status(401).send({Message:"Recheck the New password and Current Password"})}

  }
  catch(err){
    console.log("Error : ",err)
    res.status(400).json({"Error":err})
  }
} )
module.exports = profileRouter;