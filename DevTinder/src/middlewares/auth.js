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
        debugger;
        const { token } = req.cookies || {};

        if (!token) {
            return res.status(401).send({ error: 'Please login first' });
        }

        const decodedMessage = await jwt.verify(token, 'DEV@Tinder$790');
        const { _id } = decodedMessage;
        const user = await User.findById(_id);

        if (!user) {
            return res.status(401).send({ error: 'Unauthorized Access' });
        }

        req.user = user;
        next();
    }
    catch(err){
        res.status(401).send({ error: 'Unauthorized Access' });
    }
}


module.exports = { adminAuth, userAuth };