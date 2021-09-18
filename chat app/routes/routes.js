const controllers = require('../controllers/routesController');
const auth = require('../auth/JWTauth');
const express = require('express');
const router = express.Router();

//get register.html file
router.get('/register', controllers.sendRegisterPage);

//register a new user
router.post('/register', controllers.register);

//get login.html file
router.get('/login',controllers.sendLoginPage);

//login
router.post('/login',controllers.login);

//get the chat page with the username of the authenticated user
router.get('/chatPage',auth.verifyToken,controllers.sendChatPage);

module.exports = router;