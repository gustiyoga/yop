<template>
    <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--12-col">
            <center>
                <h1 class="headline">Reset Password</h1>
            </center>
            <div class="mdl-grid">
                <div class="mdl-cell mdl-cell--2-col-tablet"></div>
                <div class="mdl-cell mdl-cell--8-col-tablet">
                    <div id="loading-bar" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
                    <div class="mdl-card mdl-shadow--2dp">
                        <form action="javascript:;">
                            <div class="mdl-grid margin-min">
                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col">
                                    <input class="mdl-textfield__input" type="text" id="email3" v-model="email" v-on:keyup.enter="doResetPassword">
                                    <label class="mdl-textfield__label" for="email">Email</label>
                                </div>
                            </div>
                        </form>
                        <button type="submit" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent mdl-button--raised btn-action" v-on:click="doResetPassword">
                            Reset Password
                        </button>
                    </div>
                </div>
            </div>
            <div class="mdl-grid">
                <div class="mdl-cell mdl-cell--2-col-tablet"></div>
                <div class="mdl-cell mdl-cell--8-col-tablet">
                    <div class="title">
                        <span>Already have an account? You can signin <a href="javascript:;"><router-link to="/">here</router-link></a>. </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import firebase from '../service/firebase'
export default {
    name: 'resetPassword',
    data: function () {
        return {
            email: ''
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
        doResetPassword: function () {
            if (this.email !== '') {
                this.toggleLoadingBar(true)

                firebase.auth.sendPasswordResetEmail(this.email).then(
                    (msg) => {
                        alert('Reset link has been sent to your email address, please check your inbox!')
                        console.log(JSON.stringify(msg))
                        this.toggleLoadingBar(false)
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
