const adminAuth = (req,resp, next)=>{
    console.log('running admin auth middleware');
    const token = 'xyz';
    if(token === 'xyz'){
        next();
    }else{
        resp.status(403).send("Forbidden Not authorized to Access Admin Resource");
    }
}

const userAuth = (req,resp, next)=>{
    console.log('running user auth middleware');
    const token = 'xyz';
    if(token === 'xyz'){
        next();
    }else{
        resp.status(403).send("Forbidden Not authorized to Access user Resource");
    }
}

module.exports = {adminAuth, userAuth};