const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth');

profileRouter.post('/profile',userAuth ,async(req,res)=>{
  try{
      const user = req.user;
      res.status(200).send({message:"Profile Page",loggedInUser:user})
      
    }
  catch(err){
      res.status(400).send({error:err.message})
  }
})

module.exports = profileRouter;