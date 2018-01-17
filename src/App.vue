<template>
    <div id="app" class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header class="mdl-layout__header">
            <div class="mdl-layout__header-row">
                <span class="mdl-layout-title">Yop</span>
                <div class="mdl-layout-spacer"></div>
                <nav class="mdl-navigation" v-if="is_session()">
                    <a class="mdl-navigation__link" href="javascript:;" v-on:click="doSignout">Sign Out</a>
                </nav>
            </div>
        </header>
        <div class="mdl-layout__drawer">
            <span class="mdl-layout-title">Menu</span>
            <nav class="mdl-navigation">
                <router-link class="mdl-navigation__link" to="/home" @click.native="hideMenu">Home</router-link>
                <router-link class="mdl-navigation__link" to="/post" @click.native="hideMenu">Post a picture</router-link>
            </nav>
        </div>
        <div class="mdl-layout__drawer-button"
            role="button" aria-expanded="false">
            <i class="material-icons">menu</i>
        </div>
        <main class="mdl-layout__content">
            <div class="page-content">
                <router-view></router-view>
            </div>
        </main>
    </div>
</template>

<script>
    import firebase from './service/firebase'
    // import componentHandler from 'material-design-lite/material.min.js'
    require('material-design-lite')
    export default {
        name: 'app',
        methods: {
            hideMenu: function () {
                document.getElementsByClassName('mdl-layout__drawer')[0].classList.remove('is-visible')
                document.getElementsByClassName('mdl-layout__obfuscator')[0].classList.remove('is-visible')
            },
            doSignout: function () {
                firebase.auth.signOut().then(() => {
                    this.$router.push('/')
                })
            },
            is_session: function () {
                return firebase.auth.currentUser
            }
            // interval: function () {
            //     console.log('interval')
            //     componentHandler.upgradeDom()
            // }
        },
        mounted: function () {
            // this.interval()
            // componentHandler.upgradeAllRegisteredElements()
        }
    }
</script>
<style>
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    @import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css');
</style>
