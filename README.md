# Private Chat Application with register/login page , using JWT for authentication, Socket.io for chat and mongodb as database

# Features of this app 
- Register and login with username and password
- Real-time chat between two private users
- Ability to view online users
- Ability to start chatting with online users
- Ability to view previous messages

# It should be noted that two different versions (idBased and usernameBased) have different db models for message and have slight differences but are functionally the same
ZahraAyyubi
# Usage Guide
- open the link http://localhost:3000/register.html to access the register interface
- open the link http://localhost:3000/login.html to access the login interface
- open the link http://localhost:3000/chatPage.html to access the chat interface
- close tab when you have to exit the chat 

# Functionality 
- After registering, you will be directed to the login page for enter the chat page.
- The JWT token is created as soon as you log in and is valid for one hour to load the chat page, and after one hour to reloading chat page, you must login again.
- When a user logins, his/her status and socketId are updated in the users collection. The user can see and chat with other online users.
- By clicking on each user, previous messages between them is fetched from the database and displayed.
- When a user sends a message to another user, if the message reciever is chatting with this sender, the message is displayed for both,
  but if reciever is chatting with another user, it is marked next to its name.
- When the user tab is closed, the user status in her/his document is updated and removed from the list of online users.




