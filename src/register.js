import './register.scss'
import debounce from 'lodash/debounce'
import Vue from 'vue'
import '@babel/runtime/regenerator'

// Am I retarded or does form validation is actually this hard?
// I hate my life anyway
const registerForm = new Vue({
    el: '#register-form',
    data: {
        tel: '',
        telBlur: false,
        telIsTaken: false,
        pwd: '',
        pwdRepeat: '',
        pwdFeedback: ''
    },
    methods: {
        checkIfTelTaken: debounce(async () => {
            const formData = new FormData();
            formData.append('tel', registerForm.tel);
            let res = await fetch('./php/XBS_isIDTaken.php', {
                method: 'POST',
                credentials: 'same-origin',
                body: formData
            })
            res = await res.text()
            if (res === 'Taken')
                registerForm.telIsTaken = true
            else
                registerForm.telIsTaken = false
        }, 200),
        checkPwd(e) {
            if (this.isValidPwd) {
                e.target.classList.remove('is-invalid')
                e.target.classList.add('is-valid')
            }
            else {
                e.target.classList.add('is-invalid')
                e.target.classList.remove('is-valid')
            }
        },
        checkPwdR(e) {
            if (this.pwdMatched) {
                e.target.classList.remove('is-invalid')
                e.target.classList.add('is-valid')
            }
            else {
                e.target.classList.add('is-invalid')
                e.target.classList.remove('is-valid')
            }
        },
        submit(e) {
            e.preventDefault();
            if (!this.allValid)
                return
            const theForm = new FormData(this.$el);
            fetch('./php/XBS_register_action.php', {
                method: 'POST',
                credentials: 'same-origin',
                body: theForm
            })
                .then(res => res.text())
                .then(res => {
                    console.log(theForm.get('tel'))
                    console.log(theForm.get('password'));
                    if (res === "fail") {
                        console.log("Fail");
                        return
                    } else {
                        window.location = "./main.html"
                        return
                    }
                })
        }
    },
    computed: {
        telIsValidFormat() {
            return !!(/\d{10}/.exec(this.tel))
        },
        isValidTel() {
            return !this.telIsTaken && this.telIsValidFormat
        },
        isValidPwd() {
            if (this.pwd.length < 8 || this.pwd.length > 15) {
                this.pwdFeedback = "密碼長度應該介於 8~15"
                return false
            }
            let containInvalid = /([^!@#\$%\^&a-zA-Z0-9])/.exec(this.pwd)
            if (containInvalid !== null) {
                this.pwdFeedback = `密碼有非法文字: "${this.pwd[containInvalid.index]}"`
                return false
            }
            this.pwdFeedback = ''
            return true
        },
        pwdMatched() {
            return this.pwd === this.pwdRepeat
        },
        allValid() {
            // There must be a cleverer way to do this bullshit
            return !this.telIsTaken && this.telIsValidFormat && this.isValidTel && this.isValidPwd && this.pwdMatched
        }
    },
    watch: {
        tel() {
            if (!this.telIsValidFormat)
                return
            this.checkIfTelTaken()
        }
    }
})

