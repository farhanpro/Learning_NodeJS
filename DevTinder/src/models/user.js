//What a user in our database is going to look like
const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

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
        unique:true},
    
    password : {
        type:String,
        required:true
        
    },

    age : {type:Number,min:18},
    gender : {type:String,trim:true,validate(value){if(!["male","female","others"].includes(value)){
        throw new Error ("Gender is not valid")
    }}},
    photoUrl:{
        type:String,
        default:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
    },
    headline:{type:String},
    skills:{type:[String]},
    about:{
        type:String, 
        default:"This is a Default About of the User"}
  
},{timestamps:true});


module.exports = mongoose.model('User', userSchema);
