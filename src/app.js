const express = require('express');
const app = express();

app.get('/user/:userid', (req,resp,next)=>{
    console.log(req.query)
    console.log(req.params)
    next();
},(req,resp)=>{
    console.log("second callback")
    resp.send("get User");
});

app.post('/user', (req,resp)=>{
    resp.send("post User")
});

app.use('/test', (req,resp)=>{
    resp.send("heelo test")
});

app.use('/hello', (req,resp)=>{
    resp.send("heelo world")
});

app.use((req,resp)=>{
    resp.send("heelo dash")
});


app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});
