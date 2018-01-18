<template>
    <div id="app">
        <header>
            <div class="navbar-fixed">
                <nav class="cyan">
                    <div class="nav-wrapper">
                        <a href="/" class="brand-logo">Yop</a>
                        <a href="javascript:;" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                        <ul class="right hide-on-med-and-down">
                            <li><router-link to="/home">Home</router-link></li>
                            <li><router-link to="/post">Post a Picture</router-link></li>
                            <li v-if="isSession()"><a @click="doSignout">Sign Out</a></li>
                        </ul>
                    </div>
                    <!-- drawer on mobile -->
                    <ul class="sidenav" id="mobile-demo">
                        <li><router-link to="/home" class="sidenav-close">Home</router-link></li>
                        <li><router-link to="/post" class="sidenav-close">Post a Picture</router-link></li>
                        <li v-if="isSession()"><a @click="doSignout" class="sidenav-close">Sign Out</a></li>
                    </ul>
                </nav>
            </div>
        </header>
        <main>
            <div class="page-content">
                <router-view></router-view>
            </div>
        </main>
    </div>
</template>

<script>
    import firebase from './service/firebase'
    import './assets/materialize/materialize.scss'
    import './assets/styles/yop.scss'
    import M from './../static/js/materialize.min.js'
    // require('material-design-lite')
    export default {
        name: 'app',
        methods: {
            doSignout: function () {
                firebase.auth.signOut().then(() => {
                    this.$router.push('/')
                })
            },
            isSession: function () {
                return firebase.auth.currentUser
            }
        },
        mounted: function () {
            // drawer action
            let sideNav = document.querySelector('.sidenav')
            let sideNavInstance = new M.Sidenav(sideNav)
        }
    }
</script>
<style>
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    /* @import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css'); */

    body {
        background-color: #fafafa;
        overflow: hidden;
    }
    .sidenav {
        width: 250px;
        padding-top: 20px;
    }
    @media screen and (min-width: 992px){
        .brand-logo {
            margin-left: 15px;
        }
    }
</style>
