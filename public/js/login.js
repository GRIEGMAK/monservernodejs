$(function() {

    if (typeof localStorage.token != 'undefined') {

        location.replace('/client/products');
    }

    $('#login').on('submit', function(e) {

        e.preventDefault();

        $.ajax({
            type: 'post',
            url: 'https://personal.moneyplace.io/auth/auth.php?method=getAccessToken',
            data: $(this).serialize(),
            dataType: 'json',
            success: function (data) {

                if (data.access_token) {

                    try {
                        //gtag('event', 'click_button', {'event_category': 'login', 'event_label': 'header'}); ym(69943126, 'reachGoal', 'login_click_button_header');
                    }
                    catch (e){}

                    localStorage.setItem('token', data.access_token);
                    localStorage.setItem('expires_in', data.expires_in * 1000 + new Date().getTime());
                    localStorage.setItem('refresh_token', data.refresh_token);
                    localStorage.setItem('user_id', data.user_id);
                    localStorage.setItem('role', data.role);

                    console.log(localStorage.getItem('token'))
                    console.log(localStorage.getItem('expires_in'))
                    console.log(localStorage.getItem('refresh_token'))
                    console.log(localStorage.getItem('user_id'))
                    console.log(localStorage.getItem('role'))

                    try {

                        settings.sendTrackData(true, 'login');
                    }
                    catch (e) {}

                    setTimeout(function() {

                        location.replace('/client/bonus');
                    },800);
                }
                else {

                    settings.responseHandler(false, 'Неверный логин или пароль!');
                }


            },
            error: function(error) {


            }
        });
    });

    if (settings.allGetParams().code) {

        var modal = $('#modal');

        modal.modal('show');

        $('#save-data').unbind().click(function() {
            $.ajax({
                type: 'post',
                url: 'https://auth.moneyplace.io/api-client-v1/users/reset-password?id=' + settings.allGetParams().user_id,
                data: {
                    code: settings.allGetParams().code,
                    new_password: $('input[name="new_password"]', modal).val(),
                    repeat_password: $('input[name="repeat_password"]', modal).val(),
                },
                dataType: 'json',
                success: function (data) {

                    if (data.success) {

                        settings.responseHandler(true, 'Пароль успешно изменен!');

                        modal.modal('hide');
                    }
                    else {

                        if (data.errors.length) {

                            for (var i in data.errors) {

                                settings.responseHandler(false, data.errors[i].message);
                            }
                        }
                        else {

                            settings.responseHandler(false, 'Что-то пошло не так! Обратитесь в чат поддержки.');
                        }

                    }
                },
                error: function(error) {

                    settings.responseHandler(false, error.responseJSON[0].message);
                }
            });
        });
    }

    $('#change-password').click(function(e) {

        e.preventDefault();

        var modal = $('#modal');

        $('.modal-body', modal).html(`
            <div class="form-group">
                <input type="text" class="form-control" value="" name="email" placeholder="Введите Ваш email">
            </div>
        `);

        modal.modal('show');

        $('#save-data').unbind().click(function() {

            $.ajax({
                type: 'post',
                url: 'https://auth.moneyplace.io/api-client-v1/users/send-password-reset-email',
                data: {
                    email: $('input[name="email"]', modal).val()
                },
                dataType: 'json',
                success: function (data) {

                    if (data.success) {

                        settings.responseHandler(true, 'Ссылка на смену пароля выслана на указанную почту!');
                    }
                    else {

                        if (data.errors.email) {

                            settings.responseHandler(false, data.errors.email);
                        }
                        else {

                            settings.responseHandler(false, 'Email не найдет в системе!');
                        }

                    }
                },
                error: function(error) {

                    settings.responseHandler(false, error.responseJSON[0].message);
                }
            });
        });
    });
})