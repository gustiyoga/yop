<template>
    <div>
        <header>
            <div class="navbar-fixed">
                <nav class="cyan">
                    <div class="nav-wrapper">
                        <a href="/" class="brand-logo">Yop</a>
                        <a v-if="isSession()" href="javascript:;" data-target="mobile-drawer" class="sidenav-trigger">
                            <i class="material-icons">menu</i>
                        </a>
                        <ul v-if="isSession()" class="right hide-on-med-and-down">
                            <li><router-link :to="{path: '/home'}">Home</router-link></li>
                            <li><router-link :to="{path: '/post'}">Post a Picture</router-link></li>
                            <li><a @click="doSignout">Sign Out</a></li>
                        </ul>
                    </div>
                    <!-- drawer on mobile -->
                </nav>
            </div>
            <ul class="sidenav" id="mobile-drawer" v-if="isSession()">
                <div class="sidenav-profil">
                    <img class="circle" src="./assets/images/profil.jpg" alt="">
                    <div class="grey-text text-lighten-4">
                        <div class="sidenav-profil__name">
                            username
                        </div>
                        <div class="sidenav-profil__email">
                            <span>email@email.com</span>
                        </div>
                    </div>
                </div>
                <li v-if="isSession()"><a @click="doSignout" class="sidenav-close">Sign Out</a></li>
            </ul>
        </header>
        <main>
            <div class="page-content">
                <router-view></router-view>
                <div v-if="isSession()" class="footer-menu--stabilizer hide-on-large-only"></div>
            </div>
        </main>
        <footer v-if="isSession()" class="footer-menu hide-on-large-only white">
            <footer-nav icon="home" link="/home"></footer-nav>
            <footer-nav icon="mode_edit" link="/post"></footer-nav>
            <footer-nav icon="home" link="/home"></footer-nav>
        </footer>
    </div>
</template>

<script>
    import firebase from './service/firebase'
    import './assets/materialize/materialize.scss'
    import './assets/styles/yop.scss'
    import M from './../static/js/materialize.min.js'
    import footerNavItem from './components/microComponents/FooterNavItem.vue'
    export default {
        name: 'app',
        components: {
            'footerNav': footerNavItem
        },
        methods: {
            doSignout: function () {
                firebase.auth.signOut().then(() => {
                    M.toast({
                        html: 'You are signed out!',
                        displayLength: 5000
                    })
                    this.$router.push('/')
                })
            },
            isSession: function () {
                return firebase.auth.currentUser
            },
            toggleDrawer: function () {
                if (this.isSession()) {
                    let sideNav = document.querySelector('.sidenav')
                    let sideNavInstance = new M.Sidenav(sideNav)
                }
            }
        },
        mounted: function () {
            // drawer action
            this.toggleDrawer()
        },
        updated: function () {
            // drawer action
            this.toggleDrawer()
        }
    }
</script>
<style>
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    /* @import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css'); */
</style>
