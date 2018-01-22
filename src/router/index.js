import Vue from 'vue'
import Router from 'vue-router'
import Vuefire from 'vuefire'
import firebase from '../service/firebase'

import SigninView from '@/components/SigninView'
import SignupView from '@/components/SignupView'
import ResetPasswordView from '@/components/ResetPasswordView'
import HomeView from '@/components/HomeView'
import DetailView from '@/components/DetailView'
import PostView from '@/components/PostView'

Vue.use(Router, Vuefire)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/signin'
        },
        {
            path: '/signin',
            name: 'signin',
            component: SigninView
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupView
        },
        {
            path: '/reset-password',
            name: 'resetPassword',
            component: ResetPasswordView
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/detail/:id',
            name: 'detail',
            component: DetailView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/post',
            name: 'post',
            component: PostView,
            meta: {
                requiresAuth: true
            }
        }
    ],
    // scroll to top if go to new page
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})

router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth.currentUser
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    // if not signin
    if (requiresAuth && !currentUser) {
        next('signin')
    } else if (!requiresAuth && currentUser) {
        next('home')
    } else {
        next()
    }
})

export default router
