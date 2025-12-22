const validator = require('validator');
const signupValidations = (req) => {

    if( !req.body.firstName || typeof req.body.firstName !== 'string' || req.body.firstName.length < 3 ){
        throw new Error('Valid firstName is required. Minimum 3 characters.');
    }

    if( !req.body.emailId || typeof req.body.emailId !== 'string' ){
        throw new Error('Valid emailId is required');
    }
    if( !req.body.password || typeof req.body.password !== 'string' ){
        throw new Error('Valid password is required');
    }
    if( req.body.password && !validator.isStrongPassword(req.body.password) ){
        throw new Error('Password must be strong password');
    }

    return true;
}

module.exports = {
    signupValidations
}