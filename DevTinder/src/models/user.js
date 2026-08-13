//What a user in our database is going to look like
const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    firstName : {
       
        type:String ,
        lowercase:true,
        required:true,
        unique:true,
        trim:true    
    },
    lastName : {type:String },
    
    emailId : {
        type:String ,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Adderss")
            }
        }
    },

    
    password : {
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword){
                throw new Error ("Invalid Password Enter a Strong PAssword")
            }
        }
        
    },

    age : {type:Number,min:18},
    gender : {type:String,trim:true,validate(value){if(!["male","female","others"].includes(value)){
        throw new Error ("Gender is not valid")
    }}},
    photoUrl:{
        type:String,
        default:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
       
   
    },
    headline:{type:String},
    skills:{type:[String]},
    about:{
        type:String, 
        default:"This is a Default About of the User"}
  
},{timestamps:true});

userSchema.methods.getJWTToken = async function(){
   const user = this;
   const token = await jwt.sign({_id:this._id},'DEV@Tinder$790',{expiresIn:'7d'});
   return token;

}

userSchema.methods.validatePassword = async function(password){
    const user = this;
    const isPasswordValid = await bcrypt.compare(password,user.password);   
    return isPasswordValid;
}


module.exports = mongoose.model('User', userSchema);
