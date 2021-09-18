//middleware for authentication
const jwt= require('jsonwebtoken');
const tokenKey = process.env.TOKEN_KEY;

const createToken = (user)=>{
    const accessToken= jwt.sign(
        {username: user.username, id: user._id},
        process.env.TOKEN_KEY,
        {expiresIn: '1h'}
    );
    return accessToken;

};

const verifyToken = (req,res,next)=>{
    const accessToken= req.cookies['access-token'];

    if(!accessToken){//user not authenticated
        return res.status(403).redirect('/login');
    }
    try {
        const decoded = jwt.verify(accessToken, tokenKey);
        req.username = decoded.username;


    } catch (err) {
        console.log(accessToken)
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = {createToken,verifyToken};