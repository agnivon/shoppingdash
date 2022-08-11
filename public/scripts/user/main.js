$(document).ready(function() {
    let responseToast = new bootstrap.Toast(document.getElementById('responseToast'));

    function displayToast(message, success = false) {
        let toast = $('#responseToast');
        toast.find('.toast-body').text(message);
        if(success) {
            toast.removeClass('bg-danger');
            toast.addClass('bg-success');
        } else {
            toast.addClass('bg-danger');
            toast.removeClass('bg-success');
        }
        responseToast.show();
    }

    $('#regForm').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: $(this).attr('action'),
            data: $(this).serialize(),
            dataType: 'json',
            method: 'POST'
        }).done((response) => {
            if(response.success) {
                displayToast(response.message, true);
                $(this).find('button[type=submit]').prop('disabled', true);
                setTimeout(() => window.location.href = '/user/login', 2500)
            } else {
                displayToast(response.message, false);
            }
        }).fail(() => {
            displayToast('Registration failed', false);
        })
    })

    $('#loginForm').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: $(this).attr('action'),
            data: $(this).serialize(),
            dataType: 'json',
            method: 'POST'
        }).done((response) => {
            if(response.success) {
                console.log(response)
                displayToast(response.message, true);
                $(this).find('button[type=submit]').prop('disabled', true);
                setTimeout(() => window.location.href = '/shop', 2500)
            } else {
                displayToast(response.message, false);
            }
        }).fail(() => {
            displayToast('Login failed', false);
        })
    })
})