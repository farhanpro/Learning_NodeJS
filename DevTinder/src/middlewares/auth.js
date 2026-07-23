const adminAuth =(req,res,next)=>{
    debugger;
    console.log("Admin Authentication Middleware");
    const token = 'X-Admin-Token';
    const isAdminAuthorised = token === 'X-Admin-Token';
    if(!isAdminAuthorised){
        res.status(401).send({error: 'Unauthorized access'});

    }
    else{
        next();
    }
}

const userAuth = (req,res,next)=>{
    console.log('User Authentication MiddleWare');
    const token = 'X-User-Token';
    const isAuthUser = token === 'X-User-Token';
    if(!isAuthUser){
        res.status(401).send({error:'Unauthorized Access'});
    }
    else{
        next();
    }
}


module.exports = { adminAuth, userAuth };