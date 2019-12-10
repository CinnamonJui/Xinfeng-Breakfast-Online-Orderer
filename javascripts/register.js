let formNode = document.querySelector('form');

formNode.querySelector('.reg-or-cancel>[type=submit]')
    .addEventListener('click', e => {
        e.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open('POST', './php/XBS_register_action.php');
        function requestDone() {
            if (xhr.status == 200) {
                let success = (xhr.response == 'success');
                document.body.innerHTML
                    = `<h1>註冊${success ? '成功' : '失敗'} 將於3秒內跳轉至其他頁面</h1>`
                window.setTimeout(() => {
                    if (success)
                        window.location = './login.html'
                    else
                        window.location = './register.html'
                }, 3000);
            }
        }
        xhr.onload = requestDone;
        xhr.send(new FormData(formNode));
    }, false);

