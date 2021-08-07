const mongoose = require('mongoose');

// to create connection 
const userSchema = mongoose.Schema({
    fname:{type:String},
    lname:{type:String},
    email:{type:String},
    password:{type:String},
    image:{type:String},
    bio:{type:String},
    confirmed:{type:Boolean, default:false},  
    role:{type:String, default:'user'}, 
})



module.exports = mongoose.model('user', userSchema)