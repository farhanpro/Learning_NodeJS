const jwt = require('jsonwebtoken');
const User = require('../models/user');


const adminAuth =(req,res,next)=>{
    debugger;
    console.log("Admin Authentication Middleware");
    const token = 'X-Admin-Token';
    const isAdminAuthorised = token === 'X-Admin-Token';
    if(!isAdminAuthorised){ res.status(401).send({error: 'Unauthorized access'})}
    else{
        next();
    }
}

const userAuth = async (req,res,next)=>{


    try{
        //This is used to Read the  token from the request 
    //validate the token
    //Find the user
    const cookies = req.cookies;
    const {token} = cookies;
    const decodedMessage = await jwt.verify(token,'DEV@Tinder$790');
    //Validate the token 
    //Find the user
    const {_id} = decodedMessage;
    const user =  await User.findById({_id});

    if(!user){
        res.status(401).send({error:'Unauthorized Access'});
    }

    if(!token){
        res.status(401).send({error:'Unauthorized Access'});
    }

    req.user = user;
    next();
    


    console.log('User Authentication MiddleWare');
    
    const isAuthUser = token === 'X-User-Token';
    if(!isAuthUser){
        res.status(401).send({error:'Unauthorized Access'});
    }
    else{
        next();
    }
    }
    catch(err){
        res.status(401).send({error:'Unauthorized Access'});
    }
    
}


module.exports = { adminAuth, userAuth };