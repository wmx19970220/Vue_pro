import Vuex from 'vuex'
import Vue from 'vue'

import * as shop from '../pages/shoplist/store'
import * as user from '../pages/users/store'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        shop: {
            state: shop.state,
            actions: shop.actions,
            mutations: shop.mutations
        },
        user: {
            state: user.state,
            actions: user.actions,
            mutations: user.mutations
        }
    }
})

export default store