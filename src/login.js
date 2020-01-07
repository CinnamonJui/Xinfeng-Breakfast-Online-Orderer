import './login.scss'
import debounce from 'lodash/debounce'

const theForm = document.getElementById('login-form')
const submitBtn = theForm.querySelector('input[type=submit]')
const msg = theForm.querySelector('#msg-box')
const telFeedback = theForm.querySelector('#tel-feedback')

// prevent patientless users fuck up our server
const debounceSubmit = debounce((function () {
    const tel = theForm.querySelector('#tel')
    const pwd = theForm.querySelector('#password')
    const telFormatValidation = (/\d{10}/s)


    return function () {
        if (!tel.value.trim()) {
            telFeedback.textContent = '不能為空'
            telFeedback.classList.add('d-block')
            return
        } else if (telFormatValidation.exec(tel.value) === null) {
            telFeedback.textContent = '格式不正確。範例：0912345678'
            telFeedback.classList.add('d-block')
            return
        }
        telFeedback.classList.remove('d-block')
        let formBody = new FormData()
        formBody.append('tel', tel.value)
        formBody.append('password', pwd.value)

        fetch('./php/XBS_login_action.php', {
            method: 'POST',
            credentials: 'same-origin',
            body: formBody
        })
            .then(res => res.text())
            .then(res => {
                window.location = res
            })
    }
})(), 250, {
    'leading': true,
    'trailing': false
})

submitBtn.addEventListener('click', e => {
    e.preventDefault()
    e.stopPropagation()
    debounceSubmit()
})

theForm.addEventListener('input', e => {
    telFeedback.classList.remove('d-block')
    msg.classList.add('invisible')
})