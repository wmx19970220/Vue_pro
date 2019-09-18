import https from '../../utils/https'

const GET_SHOPS = 'GET_SHOPS' //获得数据
const DEL_SHOP_ITEMS = 'DEL_SHOP_ITEMS' //删除数据
const MODIFY_SHOP_ITEMS = 'MODIFY_SHOP_ITEMS' //修改数据

export const state = {
    shops: null
}

export const actions = {
    async getShops({ commit }) {
        const result = await https({
            url: 'http://localhost:3000/shop'
        })

        const action = {
            type: GET_SHOPS,
            data: result.data
        }
        commit(action)
    },
    async delShopItems({ commit }, _id) {
        const result = await https({
            url: 'http://localhost:3000/shop',
            method: 'DELETE',
            params: {
                _id
            }
        })
        const action = {
            type: DEL_SHOP_ITEMS,
            data: result.data
        }
        commit(action)
    },
    async modifyShopItems({ commit }, newData) {
        const result = await https({
            url: 'http://localhost:3000/shop',
            method: 'PUT',
            params: {
                ...newData
            }
        })
        const action = {
            type: MODIFY_SHOP_ITEMS,
            data: result.data
        }
        commit(action)
    }
}

export const mutations = {
    [GET_SHOPS](state, action) {
        state.shops = action.data
    },
    [DEL_SHOP_ITEMS](state, action) {
        state.shops = action.data
    },
    [MODIFY_SHOP_ITEMS](state, action) {
        state.shops = action.data
    }
}