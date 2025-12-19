const express = require('express');
const app = express();

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
