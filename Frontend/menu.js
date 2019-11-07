function replaceLoginBtn() {
    // replace upright button
    function userLogout(e) {
        e.preventDefault();
        console.log('user log out!');
        // TODO: log user out
    }
    let logout = $('<input>').attr({
        type: 'button',
        value: '登出'
    }).on('click', userLogout);
    $('#login-register').html(logout);

    // display user ID
    function getUserID() {
        // TODO: get Account.userID in database
        return 'RogerRogerRogerRoger';
    }
    $('#display-userID').css({
        'visibility': 'visible'
    }).text(getUserID());
}

function isLogin() {
    // TODO: figure out how to use SSO
    return true;
}

$(() => {
    // $('#Menus>[class$="panel"]').hide();
    if (isLogin())
        replaceLoginBtn();
    // using slide for each category
    $('#Menus').on('click', '.control', (e) => {
        e.preventDefault();
        $(e.target).next().slideToggle('fast');
    })

    // item number
    $('.toCart').on('click', '*', (e) => {
        e.stopPropagation(); // stop bubbling
        let $target = $(e.target);
        let $itemNum;
        let itemNum;
        switch ($target.index()) {
            case 0:
                $itemNum = $target.next();
                itemNum = parseInt($itemNum.text());
                $itemNum.text(itemNum <= 0 ? 0 : itemNum - 1);
                break;
            case 1:
                // NOT-TODO: not gonna let user change number by typing, it's too めんどうだ
                break;
            case 2:
                $itemNum = $target.prev();
                itemNum = parseInt($itemNum.text());
                $itemNum.text(itemNum >= 100 ? 100 : itemNum + 1);
                break;
        }
    });

    // modal window for combo
    $('.combo-panel').on('click', '.combo>*:not(.toCart)', e => { createItemModalWindow(); });

    // modal window for single item
    $('.panel').on('click', 'tr>*:not(.toCart)', e => { createItemModalWindow(); });
})

function createItemModalWindow() {
    let modalWindow = (function () {
        console.log('creating modal window');
        let $window = $(window);
        let $modal = $('<div class="modal"/>');
        let $content = $('<div class="modal-content"/>');
        let $closeBtn = $('<button class="modal-close">關閉</button>').on('click', e => {
            e.preventDefault();
            modalWindow.close();
        });
        $modal.append($content, $closeBtn);

        return {
            center: (e) => {
                console.log(e);
                $modal.css({
                    top: Math.max($window.height() - $modal.outerHeight(), 0) / 2 + $window.scrollTop(),
                    left: Math.max($window.width() - $modal.outerWidth(), 0) / 2 + $window.scrollLeft()
                })
            },
            open: (settings) => {
                $content.empty().append(settings.content);
                console.log();
                $modal.css({
                    width: $('#Menus').width(),
                    height: '50vh',
                }).appendTo('body');
                modalWindow.center();

                $window.on('resize scroll', modalWindow.center);
            },
            close: () => {
                $content.empty();
                $modal.remove();
                $window.off('resize scroll', modalWindow.center);
            }
        };
    })();
    $('.modal').remove();
    modalWindow.open({
        content: "HI",
        height: '300px'
    });
}