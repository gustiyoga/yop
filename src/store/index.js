import Vue from 'vue'
import Vuex from 'vuex'
import Vuefire from 'vuefire'

import testModule from './modules/test/index'

Vue.use(Vuex, Vuefire)

export const store = new Vuex.Store({
    modules: {
        test: testModule
    }
})
