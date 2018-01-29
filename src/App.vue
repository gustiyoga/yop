<template>
    <div>
        <header>
            <div class="navbar-fixed">
                <ul id="profil-dropdown" class="dropdown-content">
                    <li><a class="cyan-text">Profile</a></li>
                    <li class="divider"></li>
                    <li><a class="cyan-text" @click="doSignout">Sign Out</a></li>
                </ul>
                <nav class="cyan">
                    <div class="nav-wrapper">
                        <router-link :to="{path: '/'}" class="brand-logo center">Yop</router-link>
                        <!-- <ul v-if="isSession()" class="left hide-on-med-and-down">
                            <li><router-link :to="{path: '/home'}">Home</router-link></li>
                        </ul> -->

                        <!-- show on mobile -->
                        <a v-if="isSession()" href="javascript:;" data-target="mobile-drawer" class="sidenav-trigger">
                            <i class="material-icons">menu</i>
                        </a>

                        <!-- show on desktop -->
                        <ul v-if="isSession()" class="right hide-on-med-and-down">
                            <!-- <li><router-link :to="{path: '/home'}">Home</router-link></li> -->
                            <!-- <li><router-link :to="{path: '/post'}">Post a Picture</router-link></li> -->
                            <li>
                                <a class="nav-profil-dropdown" href="javascript:;" data-target="profil-dropdown">
                                    <img class="image--object-fit circle" src="./assets/images/profil.jpg" alt="">
                                    <span>Username<i class="material-icons right">arrow_drop_down</i></span>
                                </a>
                            </li>
                        </ul>

                        <!-- show on mobile -->
                        <div v-if="isSession()" class="right nav__icon-right">
                            <router-link :to="{path: '/notification'}">
                                <i class="material-icons">notifications_none</i>
                            </router-link>
                        </div>
                        <div v-if="isSession()" class="right nav__icon-right">
                            <router-link :to="{path: '/search'}">
                                <i class="material-icons">search</i>
                            </router-link>
                        </div>
                    </div>
                </nav>
            </div>
            <!-- drawer on mobile -->
            <ul class="sidenav" id="mobile-drawer" v-if="isSession()">
                <div class="sidenav-profil">
                    <img class="circle image--object-fit" src="./assets/images/profil.jpg" alt="">
                    <div class="grey-text text-lighten-4">
                        <div class="sidenav-profil__name">
                            username
                        </div>
                        <div class="sidenav-profil__email">
                            <span>email@email.com</span>
                        </div>
                    </div>
                </div>
                <li><router-link class="sidenav-close" :to="{path: '/post'}">Post</router-link></li>
                <li><a class="sidenav-close" @click="doSignout">Sign Out</a></li>
            </ul>
        </header>
        <main>
            <div class="page-content">
                <transition name="fade">
                    <router-view></router-view>
                </transition>
                <div v-if="isSession()" class="footer-nav--stabilizer hide-on-large-only"></div>
            </div>
        </main>
        <footer v-if="isSession()" class="footer-nav hide-on-large-only white">
            <footer-nav icon="home" link="/home"></footer-nav>
            <footer-nav icon="assignment" link="/crudtest"></footer-nav>
            <footer-nav icon="people" link="/people"></footer-nav>
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
            isSession: function () {
                return firebase.auth.currentUser
            },
            initMaterialize: function () {
                if (this.isSession()) {
                    // drawer action
                    let sideNav = document.querySelector('.sidenav')
                    let sideNavInstance = new M.Sidenav(sideNav)

                    // dropdown
                    let navProfilDropdown = document.querySelector('.nav-profil-dropdown')
                    let navProfilDropdownInstance = new M.Dropdown(navProfilDropdown, {
                        coverTrigger: false
                    })
                }
            },
            doSignout: function () {
                firebase.auth.signOut().then(() => {
                    M.toast({
                        html: 'You are signed out!',
                        displayLength: 5000
                    })
                    this.$router.push('/')
                })
            }
        },
        mounted: function () {
            this.initMaterialize()
        },
        updated: function () {
            this.initMaterialize()
        }
    }
</script>
<style>
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    /* @import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css'); */    
</style>
