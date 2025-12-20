const mongoose = require('mongoose');
const MONGO_URI="mongodb+srv://ajpawar321_db_user:ajpawar321_db_pass@cluster0.bbr7tvv.mongodb.net/NodeTinderBE";
const DB_NAME="NodeTinderBE";

const connectDB = async()=>{
    await  mongoose.connect( MONGO_URI );    
};

module.exports = {connectDB};