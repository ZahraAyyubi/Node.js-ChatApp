require('dotenv').config();// loads environment variables from the .env file into process.env

const http = require('http');
const express = require('express');
const app = express();
const routes = require('./routes/routes');

const socketio = require('socket.io');

const path = require('path');
const cookieParser = require('cookie-parser');
const moment = require('moment');

// import models
const User = require('./models/user');
const Message = require('./models/message');

//config
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, '/front_end')));
app.use(cookieParser());

//routes
app.use(routes);

const server = http.createServer(app);
const io = socketio(server);


io.on('connection', async (socket) => {

    console.log('New User Logged In with ID '+socket.id);

    /*In this event, with 'username' of  connected client,
      access its document in the database and update the socketId & isOnline fields.*/
    socket.on('newUser',async (username)=>{
        try {

            await User.findOneAndUpdate({'username': username}, {socketId: socket.id, isOnline: true});

            //fetch all online users
            onlineUsers = await User.find({'isOnline': true}).select('username');
            io.emit('showOnlineUsers', onlineUsers);//For all connected clients, an event is emitted to display online users
        }
        catch (err) {
            console.log(err);
        }
    });

    //In this event, the history of all messages between the two users is fetched from the database
    socket.on('showHistory',async(sender,reciever)=>{

        try {
            //fetch sender and reciever doc from db
            const senderDoc = await User.findOne({username: sender});
            const recieverDoc = await User.findOne({username: reciever});

            const messages = await Message.find({
                "sender": {"$in": [senderDoc._id, recieverDoc._id]},
                "reciever": {"$in": [senderDoc._id, recieverDoc._id]}
            }).populate('sender').populate('reciever');

            socket.emit('showHistory', messages);//This event is emitted for the current user, to display previous messages with the selected user
        }
        catch (err) {
            console.log(err);
        }
    });

    /*
    *In this event handler, the sender and receiver and the msg body stored in the database.
    *The receiver's socketId read from the database and emitt 'showMsg' Event to display the message in client side for the sender and receiver of this msg.
     */
    socket.on('sendPrivateMsg',async(sender,reciever,message)=>{

        try {
            const date = moment().format("YYYY-MM-DD");
            const time = moment().format("hh:mm a");

            //fetch sender and reciever doc from db
            const senderDoc = await User.findOne({username: sender});
            const recieverDoc = await User.findOne({username: reciever});

            const msgDoc = await Message.create({
                sender: senderDoc._id,
                reciever: recieverDoc._id,
                body: message,
                date: date,
                time: time
            });
            await msgDoc.populate('sender');
            await msgDoc.populate('reciever');

            socket.emit('showNewMsg', msgDoc);//display msg for sender
            socket.to(recieverDoc.socketId).emit('showNewMsg', msgDoc);//display msg for reciever
        }
        catch (err){
            console.log(err)
        }
    });

    /*
     This event is emitted when a user disconnects, and in its handler, using the socketId,
     information of this user is fetched from db then its isOnline field is updated.
     then Online users re-fetched from the db and emit 'disconnectOneUser' Event to make the necessary changes on the client side
    */
    socket.on('disconnect', async() => {
        try{
            const disconnectedUser = await User.findOneAndUpdate({'socketId':socket.id},{isOnline: false},{new:true});

            io.emit('disconnectOneUser',disconnectedUser.username);

            console.log('disconnected user with ID '+socket.id + ' name: '+ disconnectedUser.username);

        }catch (err){}

    });
});

const {API_PORT}= process.env;
const port = process.env.PORT || API_PORT;

//server listening
server.listen(port,()=>{
    console.log(`server listening on port ${port}`);
    require('./config/database').connectDB();//connect to db
});
