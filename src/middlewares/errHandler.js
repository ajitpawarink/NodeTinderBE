const errHandle = ( err, req, resp, next )=>{
    console.log('checking if error is there');

    if(err){
        console.error(err);
        resp.status(500).send('some error happened');
    }
}

 module.exports = { errHandle };