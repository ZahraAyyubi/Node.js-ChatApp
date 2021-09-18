const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    sender: String,
    reciever: String,
    body: String,
    date: String,
    time: String
});

module.exports = mongoose.model('Message',messageSchema);