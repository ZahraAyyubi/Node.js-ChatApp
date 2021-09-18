const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    sender:{type: String, ref:'User'},
    reciever:{type: String, ref:'User'},
    body: String,
    date: String,
    time: String
});

module.exports = mongoose.model('Message',messageSchema);