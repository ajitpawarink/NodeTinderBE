const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String},
    emailId:{type:String,required:true,lowercase:true,trim:true,unique:true
        ,validate(value){
            if( !validator.isEmail(value) ){
                throw new Error( value + ' is Invalid email format, give a valid email.');
            }   
        }
    },
    password:{type:String,
        required:true,
        validate(value){
            if( validator.isStrongPassword(value) === false ){
                throw new Error('Password must be strong password');
            }
        }
    },
    age:{type:Number},
    gender:{type:String},
    photoUrl:{type:String,default:'https://www.geographyandyou.com/images/user-profile.png',
        validate(value){
            if( !validator.isURL(value) ){
                throw new Error('Invalid URL format for photoUrl');
            }
        }
    },
    about:{type:String,default:'No details added'},
    skills:{type:[String]}
},{timestamps:true})

const User = mongoose.model('User',userSchema);

module.exports = User;