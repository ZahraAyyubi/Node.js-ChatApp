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
- The JWT token is created as soon as you log in and is valid for one hour to load the chat page, and after one hour for reloading chat page, you must login again.
- When a user logins, his/her status and socketId are updated in the users collection. The user can see and chat with other online users.
- By clicking on each user, previous messages between them is fetched from the database and displayed.
- When a user sends a message to another user, if the message reciever is chatting with this sender, the message is displayed for both,
  but if reciever is chatting with another user, it is marked next to its name.
- When the user tab is closed, the user status in her/his document is updated and removed from the list of online users.

# Screenshots

- register and login page
![Capture](https://user-images.githubusercontent.com/45013674/133921966-5b803e77-a314-48cf-9eb5-6268cd40790e.PNG)
![image](https://user-images.githubusercontent.com/45013674/133922002-65131bce-2e9f-4108-aab2-ee91653211b0.png)
![image](https://user-images.githubusercontent.com/45013674/133922039-4fd1a313-6b2d-4367-a46a-4aae473310d3.png)
![image](https://user-images.githubusercontent.com/45013674/133922123-2f6dba96-f2c6-4a22-a9ab-d67359cc274e.png)
![image](https://user-images.githubusercontent.com/45013674/133922156-f43feb9a-9f5e-4f93-96ac-3a0b9f24d295.png)
![image](https://user-images.githubusercontent.com/45013674/133922194-32d8cf1a-cdfa-46d3-9d45-78eae8fbbcd2.png)

- chat page
![image](https://user-images.githubusercontent.com/45013674/133922316-0a0e1f8b-162b-40da-b43a-b505f77d9a8c.png)
![image](https://user-images.githubusercontent.com/45013674/133922410-494f2a26-9bef-4d2e-9171-5575149e79f7.png)
![image](https://user-images.githubusercontent.com/45013674/133922433-ce97c337-a7ad-4ce2-a084-0556dc07be1e.png)
