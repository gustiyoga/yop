<template>
    <div class="row">
        <div class="col s12">
            <center>
                <h1 class="cyan-text">Reset Password</h1>
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
                            <input id="email" type="email" class="validate" v-model="email" v-on:keyup.enter="doResetPassword">
                            <label for="email">Email</label>
                        </div>
                    </form>
                    <button type="submit" class="btn waves-effect waves-light orange darken-1 btn-action" @click="doResetPassword">
                        Reset Password
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
    .helper-text {
        margin-left: 3rem;
    }
    .progress {
        display: none;
    }
    .card--auth-form {
        margin-bottom: 30px;
    }
</style>
