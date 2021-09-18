//for authentication
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
        return res.status(401).redirect('/login');
    }
    try {
        const decoded = jwt.verify(accessToken, tokenKey);
        req.username = decoded.username;


    } catch (err) {
        console.log(err)
        return res.status(401).redirect('/login');//invalid token
    }
    return next();
};

module.exports = {createToken,verifyToken};