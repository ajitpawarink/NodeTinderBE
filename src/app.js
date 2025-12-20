const express = require('express');
const app = express();
const {connectDB} = require('./config/database');

const User = require('./models/user');
/*
const {adminAuth,userAuth} = require('./middlewares/authHandler');
const {errHandle} = require('./middlewares/errHandler');

app.use('/user', userAuth);
app.use('/admin', adminAuth);


app.get('/user', (req,resp,next)=>{
    console.log(req.query)
    console.log(req.params)
    throw new Error('some error happened while fetching user');
    resp.send("get User");
});

app.post('/user', (req,resp)=>{
    console.log(req.query)
    console.log(req.params)
    resp.send("post User")
});

app.get('/admin', (req,resp,next)=>{
    console.log(req.query)
    console.log(req.params)
    resp.send("get admin");
});

app.post('/admin', (req,resp)=>{
    console.log(req.query)
    console.log(req.params)
    resp.send("post admin")
});

app.use('/', errHandle);
*/

app.post('/signup', async (req,resp)=>{
    const userObj = new User({
        firstName:"dista",
        lastName:"mosta",
        emailId:"mosta@mosta.com",
        password:"mosta123"

    });
    try {
        await userObj.validate();
        resp.send('User signed up successfully');
    } catch (validationError) {
        return resp.status(400).send(validationError.message);
    }
    
});

connectDB().then(()=>{
    console.log('Connected to Database successfully');
    app.listen(3000, ()=>{
        console.log('Server is running on port 3000');
    });
}).catch((err)=>{
    console.error('Failed to connect to database', err);
})


