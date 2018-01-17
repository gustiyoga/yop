<template>
    <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--12-col">
            <center>
                <h1 class="headline">Sign In</h1>
            </center>
            <div class="mdl-grid">
                <div class="mdl-cell mdl-cell--2-col-tablet"></div>
                <div class="mdl-cell mdl-cell--8-col-tablet">
                    <div id="loading-bar" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
                    <div class="mdl-card mdl-shadow--2dp">
                        <form action="javascript:;">
                            <div class="mdl-grid margin-min">
                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col">
                                    <input class="mdl-textfield__input" type="email" id="email" v-model="email" v-on:keyup.enter="doSignin">
                                    <label class="mdl-textfield__label" for="email">Email</label>
                                </div>
                            </div>
                            <div class="mdl-grid margin-min">
                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col">
                                    <input class="mdl-textfield__input" type="password" id="password" v-model="password" v-on:keyup.enter="doSignin">
                                    <label class="mdl-textfield__label" for="password">Password</label>
                                </div>
                            </div>
                        </form>
                        <button type="submit" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent mdl-button--raised btn-action" v-on:click="doSignin">
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
            <div class="mdl-grid">
                <div class="mdl-cell mdl-cell--2-col-tablet"></div>
                <div class="mdl-cell mdl-cell--8-col-tablet">
                    <div class="title">
                        <span>Forgot your password? You can <a href="javascript:;"><router-link to="/reset-password">reset here</router-link></a>. </span>
                        <span>Or don't have an account? You can <a href="javascript:;"><router-link to="/signup">create one</router-link></a>. </span>
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
    </div>
</template>
<script>
import firebase from '../service/firebase'
export default {
    name: 'signin',
    data: function () {
        return {
            'email': '',
            'password': ''
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
                            alert('You need to verify your account first!')
                            firebase.auth.signOut().then(() => {})
                        } else {
                            // alert(JSON.stringify(user))
                            // alert('Well done! You are now connected!')

                            this.$router.push('/home')
                        }

                        this.toggleLoadingBar(false)
                    },
                    (err) => {
                        alert('Opps. ' + err.message)
                        this.toggleLoadingBar(false)
                    }
                )
            } else {
                alert('Please fill form!')
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
    #loading-bar {
        display: none;
    }
    .mdl-card {
        padding: 20px 10px 30px 10px;
        min-height: inherit;
        overflow: visible;
        width: 100%;
    }
    .mdl-textfield {
        margin: -10px 0;
    }
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
</style>
