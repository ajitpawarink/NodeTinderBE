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

app.use(express.json());

app.post('/signup', async (req,resp)=>{
    
    const userObj = new User(req.body);

    try {
        await userObj.save();
        resp.send('User signed up successfully');
    } catch (validationError) {
        return resp.status(400).send(validationError.message);
    }
    
});

app.get('/user', async (req,resp)=>{
    try {
        const emailId = req.body.emailId;
        const userObj = await User.findOne({emailId:emailId});
        if( !userObj ){
            return resp.status(404).send('No user found');
        }
        resp.json(userObj);
    } catch (err) {
        resp.status(500).send('Error fetching users');
    }      
});

app.get('/feed', async (req,resp)=>{
    try {
        const allUsers = await User.find({});
        if( allUsers.length === 0 ){
            return resp.status(404).send('No users found');
        }
        resp.json(allUsers);
    } catch (err) {
        resp.status(500).send('Error fetching users');
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


