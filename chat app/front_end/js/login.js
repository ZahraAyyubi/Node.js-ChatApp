'use strict';

$(function() {

    $('input').blur(function (){
        $('#response').text('');
    });

	$("#login-form").submit(function(e) {
        var form = $(this);
        e.preventDefault();
        form.addClass('was-validated');

        //If the validation on the client side is OK, inputs data will be sent to the server
        if (form.get(0).checkValidity())
            $.ajax('/login', {
                type: 'POST',  // http method
                data: form.serialize(),
                success: function (username, status, xhr) {
                    //window.localStorage.setItem("username", username);
                    $('#response').css("color", "green").text('login successfully, redirecting to home page...');
                    setTimeout(()=>{window.location.href = '/chatPage';},1000)

                },
                error: function (jqXhr, textStatus, errorMessage) {
                    form.removeClass('was-validated');
                    $('#response').css("color", "red").text(jqXhr.responseText);
                }
            });
	});
});
