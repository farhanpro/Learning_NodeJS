const validator = require('validator');

const validateSignUpData = (req)=>{

    const {firstName, lastName, emailId, password,age,headling,skills} = req.body;

    if(!firstName || !lastName){
        throw new Error("First Name and Last Name are required")
    }
    else if(!emailId || !validator.isEmail(emailId)){
        throw new Error("Invalid Email Address")
    }
    else if(!password || !validator.isStrongPassword(password)){
        throw new Error("Invalid Password Enter a Strong Password")
    }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = [
        'firstName',
        'lastName',
        'emailId',
        'photoUrl',
        'gender',
        'age',
        'about',
        'skills',
    ];

    const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedEditFields.includes(field)
    );

    return isEditAllowed;
};
module.exports = {validateSignUpData,validateEditProfileData}