const express = require('express');
const app = express();
const { adminAuth,userAuth  } = require('./middlewares/auth');



app.use('/user', userAuth);
app.use('/admin', adminAuth);


app.get('/user/:userid', (req,resp,next)=>{
    console.log(req.query)
    console.log(req.params)
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
    resp.send("get User");
});

app.post('/admin', (req,resp)=>{
    console.log(req.query)
    console.log(req.params)
    resp.send("post User")
});


app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});
