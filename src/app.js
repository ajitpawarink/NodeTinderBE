const express = require('express');
const app = express();
const {connectDB} = require('./config/database');
const {signupValidations} = require('./utils/validations');
const bcrypt = require('bcrypt');

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
    
    try {
        signupValidations(req);
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(req.body.password, 8);

        const userObj = new User({firstName, lastName, emailId, password: passwordHash});
        await userObj.save();
        resp.send('User signed up successfully');
    } catch (validationError) {
        return resp.status(400).send(validationError.message);
    }
    
});

app.post('/login', async (req,resp)=>{
    try{
        const { emailId, password } = req.body;
        const userObj = await User.findOne({emailId:emailId});
        if( !userObj ){
            throw new Error('Invalid Credentials');
        }

        const isPasswordMatch = await bcrypt.compare(password, userObj.password);
        if( isPasswordMatch === false ){
            throw new Error('Invalid Credentials');
        }

        resp.send('Login Successful');

    }catch(err){
        resp.status(500).send('Login Failed ' + err.message);
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

app.patch('/user', async(req,resp)=>{
    try{
        const uid = req.body.userId;
        const user = await User.findByIdAndUpdate(uid, req.body, {new: true,runValidators:true});
        const data = req.body;
        const ALLOWED_UPDATES = ['userId','firstName','lastName','age','gender','photoUrl','about','skills'];
        const isAllowedUpdate = Object.keys(data).every((update)=>{
            return ALLOWED_UPDATES.includes(update);
        });
        if( !isAllowedUpdate ){
            throw new Error('Invalid updates!');
        }
        if(!user){
            return resp.status(404).send('User not found');
        }
        if( data?.skills.length > 10 ){
            throw new Error('Cannot add more than 10 skills');
        }
        resp.json(user);
    } catch (err) {
        resp.status(500).send('Update Failed' + err.message);
    }
});

app.delete('/user', async(req,resp)=>{
    try{
        const uid = req.body.userId
        const user = await User.findByIdAndDelete(uid);
        if(!user){
            return resp.status(404).send('User not found');
        }
        resp.send('User deleted successfully');
    } catch (err) {
        resp.status(500).send('Error fetching user');
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


