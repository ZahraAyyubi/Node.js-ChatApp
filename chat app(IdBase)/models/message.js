const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const messageSchema = new Schema({
    sender: {type: Schema.Types.ObjectId, ref:'User'},
    reciever: {type: Schema.Types.ObjectId, ref:'User'},
    body: String,
    date: String,
    time: String,
});

module.exports = mongoose.model('Message',messageSchema);