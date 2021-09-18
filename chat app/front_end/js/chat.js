$(document).ready(function() {

    $('title').text(currentUser);//Set the title to the current username
    $('#chatInfo').text(`Dear \'${currentUser}\' , Please select a user and start your private chat`);

    var anotherUserInChat;//Another user that the current user is chatting with him

    const socket = io();

    socket.on('connect', () => {
        /*When the user enters the chat page(connection is established),
         this event is emitted to update the connected user information(is-online , socketId) db
         */
        socket.emit('newUser', currentUser);
    });

    socket.on('showOnlineUsers', (onlineUsers) => {
        showOnlineUsers(onlineUsers);// show online users in html file
    });

    socket.on('showHistory', (messages) => {
        showHistory(messages); //Show all previous messages between the current user and the another user in private chat
    });

    socket.on('showNewMsg', (message) => {

        if (message.sender === currentUser)
            displayMsgForSender(message);
        else {
            /* If the Reciever of the message is currently chatting with the sender of the message, msg dispaly
                Otherwise, the number of new messages sent by this sender is marked for reciever
             */
            if (anotherUserInChat === message.sender)
                displayMsgForReciever(message);
            else {
                const unreadMark = $(`button[value|=${message.sender}]`).find('#unreadMark');
                const numOfUnreads = parseInt($(unreadMark).text()) + 1;
                $(unreadMark).text(numOfUnreads);
                $(unreadMark).removeClass('d-none');
            }
        }
        $(".chat-box").scrollTop($(".chat-box")[0].scrollHeight);//Scroll the page to display the latest messages

    });


    socket.on('disconnectOneUser', (username, onlineUsers) => {

        // if a user is currently chatting with this disconnected user, her/him chat info will be updated
        if (anotherUserInChat === username) {
            $('#chatInfo').text('Unfortunately  '+anotherUserInChat + ' left! ');
            $('.chat-box').html('');
            $('#typing-area').addClass('d-none');
            anotherUserInChat = '';
        }
        showOnlineUsers(onlineUsers);// display currently online users
    });

    //display online users
    const showOnlineUsers = (onlineUsers) => {
        $('#users-list').html('');

        for (const user of onlineUsers) {
            if (user.username !== currentUser)//Show all online users except the current user
                $('#users-list').append(
                    `<button class='btn list-group-item list-group-item-action list-group-item-light rounded-0 user-item'  value='${user.username}' >
                    
                        <div class='d-flex align-items-center justify-content-between mb-1'>
                            <h6 class='mb-0' >${user.username}</h6>
                            <span id="unreadMark" class="d-none bg-dark rounded-circle text-light text-align px-2">0</span>
                        </div>
                    
                     </button>`
                );

        }
        $(".user-item").click(function () {
            anotherUserInChat = $(this).attr("value");//set username of another user in private chat with current user

            //Reset the number of unread messages
            const unreadMark = $(this).find('#unreadMark');
            $(unreadMark).text(0);
            $(unreadMark).addClass('d-none');

            $('#typing-area').removeClass('d-none');//display typing area
            socket.emit('showHistory', currentUser, anotherUserInChat);// emit this event for fetch all previous messages from db
        });
    };


    const displayMsgForSender = (message) => {
        $('.chat-box').append(
            <!-- Sender Message-->
            `<div class="media-body w-50 mr-auto mb-4">
                <p class="small text-muted mb-0">You</p>
                <div class="bg-light rounded py-2 px-3 mb-0">
                    <p class="text-small mb-0 text-muted ">${message.body}</p>
                </div>
                <p class="small text-muted">${message.time} | ${message.date}</p>
            </div>`
        );
    };

    const  displayMsgForReciever = (message) => {
        $('.chat-box').append(
            <!-- Reciever Message-->
            `<div class="media-body w-50 ml-auto mb-4">
                <p class="small text-muted text-right mb-0">${message.sender}</p>
                <div class="bg-primary rounded py-2 px-3 mb-0">
                   <p class="text-small mb-0 text-white">${message.body}</p>
                </div>
                <p class="small text-muted text-right">${message.time} | ${message.date}</p>
            </div>`
        );
    };


    // display previous messages between the current user and the another user in private chat
    const showHistory = (messages) => {

        $('.chat-box').html('');
        $('#chatInfo').text(currentUser + '   =>   ' + anotherUserInChat);

        for (const message of messages) {
            if (message.sender === currentUser)
                displayMsgForSender(message);
            else
                displayMsgForReciever(message);
        }
        $(".chat-box").scrollTop($(".chat-box")[0].scrollHeight); //Scroll the page to display the latest messages
    };


    $('#typing-area').submit(function (e) {
        e.preventDefault();
        const message = $('#message').val();
        socket.emit('sendPrivateMsg', currentUser, anotherUserInChat, message);
        $('#message').val('');
    });


});
