// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import firebase from './service/firebase'

Vue.config.productionTip = false

const unsubscribe = firebase.auth.onAuthStateChanged(() => {
    const app = new Vue({
      el: '#app',
      store,
      router,
      template: '<App/>',
      components: { App },
      render: h => h(App)
    })

    unsubscribe()
})

// firebase.auth.onAuthStateChanged(function (user) {
//     if (!app) {
//         console.log('asd')
//         /* eslint-disable no-new */
//         app = new Vue({
//           el: '#app',
//           firebase: {
//               cat: firebase.database.ref('cat').orderByChild('created_at')
//           },
//           router,
//           template: '<App/>',
//           components: { App }
//         })
//     } else {
//         console.log('def')
//         // console.log(app)
//     }
// })

/* eslint-disable no-new */
// app = new Vue({
//   el: '#app',
//   firebase: {
//       cat: firebase.database.ref('cat').orderByChild('created_at')
//   },
//   router,
//   template: '<App/>',
//   components: { App }
// })
