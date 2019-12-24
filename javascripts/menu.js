function replaceLoginBtn(username) {
    // replace upright button
    console.log("Mynameis:"+username);
    function userLogout(e) {
        e.preventDefault();
        xhr = new XMLHttpRequest();
        xhr.open('GET', './php/XBS_validate_login.php?logout=true');
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.withCredentials = true;
        xhr.send();
        location.reload();
    }
    let logout = $('<input>').attr({
        type: 'button',
        value: '登出'
    }).on('click', userLogout);
    $('#login-register').html(logout);

    $('#display-userID').css({
        'visibility': 'visible'
    }).text(username);
}

function isLogin() {
    return new Promise((resolve, reject) => {
        xhr = new XMLHttpRequest();
        xhr.open('GET', './php/XBS_validate_login.php');
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.withCredentials = true;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                xhr.responseText ? resolve(xhr.responseText) : reject('Not login');
            }
        };
        xhr.send();
        setTimeout(() => {
            reject('Server not respond')
        }, 8000);
    })
}
// DOM Content loaded listener
function generateMenu() {
    xhr = new XMLHttpRequest();
    xhr.open('POST', './php/XBS_menu.php');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.withCredentials = true;

    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                $('#Menus').html(xhr.responseText);
                return resolve('Successfully fetch menu');
            }
        };
        xhr.send();
        setTimeout(() => reject('Server not respond'), 8000);
    });
}
$(() => {
    isLogin().then(id => replaceLoginBtn(id), err => { console.log('Refuse')})
        .then(() => generateMenu())
        .then(() => {
            // add event listener
            // $('#Menus>[class$="panel"]').hide();
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
                let itemPrice;
                cart = JSON.parse(localStorage.getItem('cart')) || {};
                itemName = $target.closest('tr, .combo').find('> .title').text();
                itemPrice = $target.closest('tr, .combo').find('> .price').text();
                console.log(itemPrice);
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
                if (cart[itemName] === "0,0")
                    delete cart[itemName];
                cart[itemName] = $itemNum.text() + "," + itemPrice * $itemNum.text();
                localStorage.setItem('cart', JSON.stringify(cart));
            });


            // modal window for combo
            $('.combo-panel').on('click', '.combo>*:not(.toCart)', e => {
                createItemModalWindow(e, 'combo');
            });

            // modal window for single item
            $('.panel').on('click', 'tr>*:not(.toCart)', e => { createItemModalWindow(e, 'item'); });
        });
})

function createItemModalWindow(e, directory) {
    modalWindow.close();
    const itemName = $(e.target).closest('.combo, tr').children('.title').text();
    // TODO: get image
    let img = document.createElement('img');
    img.src = `./images/${directory}/${itemName}.jpg`
    img.onload = e => {
        img.width = Math.min(document.body.clientWidth, img.width);
        modalWindow.open({
            content: img,
            height: '300px'
        });
        modalWindow.center();
    }

}

// Singleton pattern for modalWindow
let modalWindow = (function () {
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
            $modal.css({
                top: Math.max(window.innerHeight - $modal.outerHeight(), 0) / 2 + $window.scrollTop(),
                left: Math.max(window.innerWidth - $modal.innerWidth(), 0) / 2 + $window.scrollLeft(),
            })
        },
        open: (settings) => {
            $content.empty().append(settings.content);
            $modal.css({
                maxWidth: document.body.clientWidth,
                height: '50vh',
            }).appendTo('body');

            $window.on('resize scroll', modalWindow.center);
        },
        close: () => {
            $content.empty();
            $modal.detach();
            $window.off('resize scroll', modalWindow.center);
        }
    };
})();
