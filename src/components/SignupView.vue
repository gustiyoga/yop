<template>
    <div class="row">
        <div class="col s12">
            <center>
                <h1 class="cyan-text">Sign Up</h1>
            </center>
        </div>
        <div class="col s12 m6 offset-m3 l4 offset-l4">
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
        <div class="col s12 m6 offset-m3 l4 offset-l4">
            <div class="mdl-cell mdl-cell--2-col-tablet"></div>
            <div class="mdl-cell mdl-cell--8-col-tablet">
                <div class="title">
                    <span>Already have an account? You can signin <a href="javascript:;"><router-link :to="{path: '/signin'}">here</router-link></a>. </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import firebase from '../service/firebase'
    import M from './../../static/js/materialize.min.js'
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
            showToast: function (string) {
                M.toast({
                    html: string,
                    displayLength: 5000
                })
            },
            doSignup: function () {
                if (this.password !== this.repassword) {
                    this.showToast('Password does not match')
                } else if (this.email !== '' && this.password !== '') {
                    this.toggleLoadingBar(true)

                    firebase.auth.createUserWithEmailAndPassword(this.email, this.password).then(
                        (user) => {
                            this.showToast('Your account has been created!')
                            // alert(JSON.stringify(user))
                            firebase.auth.currentUser.sendEmailVerification().then(
                                (msg) => {
                                    this.showToast('Email verification has been sent, please check your email!')
                                    this.toggleLoadingBar(false)
                                },
                                (err) => {
                                    this.showToast('Failed to send email verification, ' + err.message)
                                    this.toggleLoadingBar(false)
                                }
                            )
                        },
                        (err) => {
                            this.showToast('Opps. ' + err.message)
                            this.toggleLoadingBar(false)
                        }
                    )
                } else {
                    this.showToast('Please fill form!')
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
