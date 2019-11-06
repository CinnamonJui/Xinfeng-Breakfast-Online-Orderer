function isLogin(isLogged) {
    // replace upright button
    if (isLogged) {
        let logout = document.createElement('input');
        logout.type = 'button';
        logout.value = '登出';
        logout.addEventListener('click', userLogout, false);
        function userLogout() {
            // TODO:
        }
        $('#login-register').html(logout);
        function getUserID() {
            // TODO: get Account.userID in database
            return 'RogerRogerRogerRoger';
        }
        $('#display-userID').css({
            'visibility': 'visible'
        }).text(getUserID());

        return true;
    }
    // remain the same
    return false;
}

$(() => {
    // $('#Menus>[class$="panel"]').hide();
    isLogin(false);
    $('#Menus').on('click', '.control', (e) => {
        e.preventDefault();
        $(e.target).next().slideToggle('fast').css();
    })
})

