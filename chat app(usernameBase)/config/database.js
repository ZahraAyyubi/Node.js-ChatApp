const mongoose = require('mongoose');
const {MONGO_URI}= process.env;

exports.connectDB=()=>{
    //connecting to database
    mongoose.connect(MONGO_URI)
    .then(()=>{
        console.log('connected to database successfully!');
    }).catch((err)=>{
        console.log('connection failed! exiting ...');
        console.error(err);
        process.exit(1);
    })
}