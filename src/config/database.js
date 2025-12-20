const mongoose = require('mongoose');
const MONGO_URI="mongodb+srv://ajpawar321_db_user:ajpawar321_db_pass@cluster0.bbr7tvv.mongodb.net/?appName=Cluster0/NodeTinderDB";
const DB_NAME="NodeTinderDB";

const connectDB = async()=>{
    await  mongoose.connect( MONGO_URI );    
};

module.exports = {connectDB};