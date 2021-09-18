'use strict';

$(function() {


    $('#register-form').submit(function(e) {

        var form = $(this);
        e.preventDefault();
        form.addClass('was-validated');

        if ($("#password").val() !== $("#Repassword").val()) {
            form.removeClass('was-validated');
            $('#response').css("color", "red").text("Password mismatch");
        }
        //If the validation on the client side is OK, inputs data will be sent to the server
        else if (form.get(0).checkValidity())
            $.ajax('/register', {
                type: 'POST',  // http method
                data: form.serialize(),  // data to submit
                success: function (data, status, xhr) {
                    $('#response').css("color", "green").text('register successfully, redirecting to login page...');
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 1000)
                },
                error: function (jqXhr, textStatus, errorMessage) {
                    form.removeClass('was-validated');
                    $('#response').css("color", "red").text(jqXhr.responseText);
                }
            });


    });

    $('input').blur(function (){
        $('#response').text('');
    });

});