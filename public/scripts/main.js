$(document).ready(function () {
    
    $('#userTable, #productTable').DataTable({
        columnDefs: [
            {   
                target: "_all",
                className: 'dt-head-center'
            }
        ]
    });
    
    let userModal = new bootstrap.Modal(document.getElementById('userModal'));
    let productModal = new bootstrap.Modal(document.getElementById('productModal'));
    let responseToast = new bootstrap.Toast(document.getElementById('responseToast'));

    function displayToast(message, success = false) {
        $('#responseToast .toast-body').text(message);
        if (success) {
            $('#responseToast').removeClass('bg-danger');
            $('#responseToast').addClass('bg-success');
        } else {
            $('#responseToast').addClass('bg-danger');
            $('#responseToast').removeClass('bg-success');
        }
        responseToast.show();
    }

    $('.add-user').click(function () {
        const $userModal = $('#userModal');
        const $userForm = $userModal.find('#userForm');
        
        $userForm.find("input, textarea").val("");
        $userForm.find("option").attr('selected', false);

        $userModal.find('.modal-title').text('Add User');
        $userForm.attr('action', 'admin/add/user/');
        $userForm.attr('method', 'post');
        userModal.show();
    });

    $('.update-user').click(function () {
        const $userModal = $('#userModal');
        const $userForm = $userModal.find('#userForm');
        $userModal.find('.modal-title').text('Update User');

        const name = $(this).parent().siblings('.user-name').text().trim();
        const email = $(this).parent().siblings('.user-email').text();
        const role = $(this).parent().siblings('.user-role').text();
        $userForm.find('#user-name').val(name);
        $userForm.find('#user-email').val(email);
        $userForm.find('#user-role').find(`option`).attr('selected', false);
        $userForm.find('#user-role').find(`option[value=${role}]`).attr('selected', true);

        $userForm.attr('action', 'admin/update/user/' + $(this).attr('id'));
        $userForm.attr('method', 'put');
        userModal.show();
    });

    $('.delete-user').click(function () {
        $.ajax({
            url: 'admin/delete/user/' + $(this).attr('id'),
            method: 'DELETE',
            dataType: 'json'
        }).done((response) => {
            if (response.success) {
                displayToast('Success. Reloading...', true);
                setTimeout(() => location.reload(), 2000);
            } else {
                displayToast('Failure', false);
            }
        }).fail(() => {
            displayToast('Failure', false);
        });
    });

    $('#userForm').submit(function (e) {
        e.preventDefault();
        userModal.hide();
        $.ajax({
            url: $(this).attr('action'),
            method: $(this).attr('method'),
            dataType: 'json',
            data: $(this).serialize()
        }).done((response) => {
            if (response.success) {
                displayToast('Success. Reloading...', true);
                setTimeout(() => location.reload(), 2000);
            } else {
                displayToast('Failure', false);
            }
        }).fail(() => {
            displayToast('Failure', false);
        });
    });

    $('.add-product').click(function () {
        const $productModal = $('#productModal');
        const $productForm = $productModal.find('#productForm');

        $productForm.find("input, textarea").val("");

        $productModal.find('.modal-title').text('Add product');
        $productForm.attr('action', 'admin/add/product/');
        $productForm.attr('method', 'post');
        productModal.show();
    });

    $('.update-product').click(function () {
        const $productModal = $('#productModal');
        const $productForm = $productModal.find('#productForm');
        $productModal.find('.modal-title').text('Update product');

        const name = $(this).parent().siblings('.product-name').text().trim();
        const details = $(this).parent().siblings('.product-details').text().trim();
        const price = $(this).parent().siblings('.product-price').text();
        
        $productForm.find('#product-name').val(name);
        $productForm.find('#product-details').val(details);
        $productForm.find('#product-price').val(Number(price));

        $productForm.attr('action', 'admin/update/product/' + $(this).attr('id'));
        $productForm.attr('method', 'put');
        productModal.show();
    });

    $('.delete-product').click(function () {
        $.ajax({
            url: 'admin/delete/product/' + $(this).attr('id'),
            method: 'DELETE',
            dataType: 'json'
        }).done((response) => {
            if (response.success) {
                displayToast('Success. Reloading...', true);
                setTimeout(() => location.reload(), 2000);
            } else {
                displayToast('Failure', false);
            }
        }).fail(() => {
            displayToast('Failure', false);
        });
    });

    $('#productForm').submit(function (e) {
        e.preventDefault();
        productModal.hide();
        console.log($(this).serialize());
        $.ajax({
            url: $(this).attr('action'),
            method: $(this).attr('method'),
            dataType: 'json',
            data: $(this).serialize()
        }).done((response) => {
            if (response.success) {
                displayToast('Success. Reloading...', true);
                setTimeout(() => location.reload(), 2000);
            } else {
                displayToast('Failure', false);
            }
        }).fail(() => {
            displayToast('Failure', false);
        });
    });
});