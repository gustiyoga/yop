<template>
    <div class="row">
        <div class="col s12">
            <center>
                <h1 class="cyan-text">Sign Up</h1>
            </center>
        </div>
        <div class="col s12 l6 offset-l3">
            <div class="card card--auth-form">
                <div id="loading-bar" class="progress">
                    <div class="indeterminate cyan"></div>
                </div>
                <div class="card-content cyan-text">
                    <form action="javascript:;">
                        <div class="input-field">
                            <i class="material-icons prefix">mail_outline</i>
                            <input id="email" type="email" class="validate" v-model="email" v-on:keyup.enter="doSignup">
                            <label for="email">Email</label>
                        </div>
                        <div class="input-field">
                            <i class="material-icons prefix">lock_outline</i>
                            <input id="password" type="password" v-model="password" v-on:keyup.enter="doSignup">
                            <label for="password">Password</label>
                        </div>
                        <div class="input-field">
                            <i class="material-icons prefix">lock_outline</i>
                            <input id="repassword" type="password" v-model="repassword" v-on:keyup.enter="doSignup">
                            <label for="repassword">Re-Type Password</label>
                        </div>
                    </form>
                    <button type="submit" class="btn waves-effect waves-light orange darken-1 btn-action" @click="doSignup">
                        Sign In
                    </button>
                </div>
            </div>
        </div>
        <div class="col s12 l6 offset-l3">
            <div class="mdl-cell mdl-cell--2-col-tablet"></div>
            <div class="mdl-cell mdl-cell--8-col-tablet">
                <div class="title">
                    <span>Already have an account? You can signin <a href="javascript:;"><router-link to="/">here</router-link></a>. </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import firebase from '../service/firebase'
export default {
    name: 'signup',
    data: function () {
        return {
            email: '',
            password: '',
            repassword: ''
        }
    },
    methods: {
        toggleLoadingBar: function (stat) {
            if (stat) {
                document.getElementById('loading-bar').style.display = 'block'
            } else {
                document.getElementById('loading-bar').style.display = 'none'
            }
        },
        doSignup: function () {
            if (this.password !== this.repassword) {
                alert('Password does not match!')
            } else if (this.email !== '' && this.password !== '') {
                this.toggleLoadingBar(true)

                firebase.auth.createUserWithEmailAndPassword(this.email, this.password).then(
                    (user) => {
                        // alert('Your account has been created!')
                        alert(JSON.stringify(user))
                        firebase.auth.currentUser.sendEmailVerification().then(
                            (msg) => {
                                alert('Email verification has been sent, please check your email')
                                this.toggleLoadingBar(false)
                            },
                            (err) => {
                                alert('Failed to send email verification, ' + err)
                                this.toggleLoadingBar(false)
                            }
                        )
                    },
                    (err) => {
                        alert('Opps. ' + err.message)
                        this.toggleLoadingBar(false)
                    }
                )
            } else {
                alert('Please fill form!')
            }
        }
    }
}
</script>
<style scoped>    
    .btn-action {
        position: absolute;
        bottom: -18px;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 50%;
        border-radius: 25px;
        text-transform: none;
    }
    .progress {
        display: none;
    }
    .card--auth-form {
        margin-bottom: 30px;
    }
</style>
