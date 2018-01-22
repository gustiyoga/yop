<template>
    <div class="row">
        <div class="col s12">
            <center>
                <h1 class="cyan-text">Sign In</h1>
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
                            <input id="email" type="email" class="validate" v-model="email" v-on:keyup.enter="doSignin">
                            <label for="email">Email</label>
                        </div>
                        <div class="input-field">
                            <i class="material-icons prefix">lock_outline</i>
                            <input id="password" type="password" v-model="password" v-on:keyup.enter="doSignin">
                            <label for="password">Password</label>
                        </div>
                    </form>
                    <button type="submit" class="btn waves-effect waves-light orange darken-1 btn-action" @click="doSignin">
                        Sign In
                    </button>
                </div>
            </div>
        </div>
        <div class="col s12 l6 offset-l3">
            <div class="mdl-cell mdl-cell--2-col-tablet"></div>
            <div class="mdl-cell mdl-cell--8-col-tablet">
                <div class="title">
                    <span>Forgot your password? You can <router-link :to="{path: '/reset-password'}">reset here</router-link>. </span>
                    <span>Or don't have an account? You can <router-link :to="{path: '/signup'}">create one</router-link>. </span>
                </div>
                <!-- <br><br>
                <center>
                    <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent mdl-button--raised" v-on:click="checkAuth">
                        Check Auth
                    </button>
                </center> -->
            </div>
        </div>
    </div>
</template>
<script>
    import firebase from '../service/firebase'
    import M from './../../static/js/materialize.min.js'
    export default {
        name: 'signin',
        data: function () {
            return {
                email: '',
                password: ''
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
            doSignin: function () {
                if (this.email !== '' && this.password !== '') {
                    this.toggleLoadingBar(true)

                    firebase.auth.signInWithEmailAndPassword(this.email, this.password).then(
                        (user) => {
                            if (!user.emailVerified) {
                                M.toast({
                                    html: 'You need to verify your account first!',
                                    displayLength: 5000
                                })
                                firebase.auth.signOut().then(() => {})
                            } else {
                                M.toast({
                                    html: 'Well done! You are now connected!',
                                    displayLength: 5000
                                })
                                this.$router.push('/home')
                            }

                            this.toggleLoadingBar(false)
                        },
                        (err) => {
                            M.toast({
                                html: 'Opps. ' + err.message,
                                displayLength: 5000
                            })
                            this.toggleLoadingBar(false)
                        }
                    )
                } else {
                    M.toast({
                        html: 'Please fill form!',
                        displayLength: 5000
                    })
                    this.toggleLoadingBar(false)
                }
            },
            checkAuth: function () {
                alert(JSON.stringify(firebase.auth.currentUser))
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
