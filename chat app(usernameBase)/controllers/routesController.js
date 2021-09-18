const fs = require('fs');
const path = require('path');

// import user models
const User = require('../models/user');

const bcrypt= require('bcryptjs');
const auth = require('../auth/JWTauth');

// Send register page
const sendRegisterPage = (req, res)=>{
    res.sendFile(path.join(__dirname,"../front_end/register.html"));
};

//register a new user
const register = async (req,res)=>{

    try{
        //get the user input
        const {username,password}= req.body;

        //validate user input
        if (!(username && password)) {
            return res.status(400).send("All input is required");
        }

        //validate if the user exist in our db
        const existUser= await User.findOne({username});
        if(existUser)
            return res.status(409).send('User already Exist. Please Login.');

        //encrypt the user password
        encryptedPassword= await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: encryptedPassword
        });
        res.status(201).send();
    }catch (err){
        console.log(err)
    }
};


// Send login page
const sendLoginPage = (req, res)=>{
    res.sendFile(path.join(__dirname,"../front_end/login.html"));
};

// login
const login = async (req,res)=>{
    try{
        //get the user input
        const {username,password} = req.body;

        //validate user input
        if (!(username && password)) {
            return res.status(400).send("All input is required")
        }

        //validate if the user exist in our db
        const user= await User.findOne({username});

        //compare the password entered with the password stored in the database
        if(user && await bcrypt.compare(password, user.password)){//if user exist and info was ok

            //create token
            const accessToken = auth.createToken(user);

            //store token in cookie
            res.cookie('access-token',accessToken,{maxAge:60*60*1000/*in sec =>1h*/, httpOnly:true});

            res.status(200).send();

        }else{
            res.status(400).send("Incorrect password or username. Try again.");
        }
    }catch (err){
        console.log(err)
    }

};

// Send chat page
const sendChatPage = (req,res)=>{
    fs.readFile(path.join(__dirname,"../front_end/chatPage.html"), function (err, data) {
        if(err)
            console.log(err)
        else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(
                data +
                `
                    <!-- Add the username of the authenticated user to the html file -->
                    <script type="text/javascript"> const currentUser = '${req.username}';</script>
                    <script src="js/chat.js"></script>
                </body>
            </html>`
            );
        }
    });
}

module.exports = {
    sendRegisterPage,
    register,
    sendLoginPage,
    login,
    sendChatPage
}