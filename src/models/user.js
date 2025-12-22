const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String},
    emailId:{type:String,required:true,lowercase:true,trim:true,unique:true},
    password:{type:String},
    age:{type:Number},
    gender:{type:String},
    photoUrl:{type:String,default:'https://www.geographyandyou.com/images/user-profile.png'},
    about:{type:String,default:'No details added'},
    skills:{type:[String]}
},{timestamps:true})

const User = mongoose.model('User',userSchema);

module.exports = User;