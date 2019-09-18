import https from '../../utils/https'

const GET_USERS = 'GET_USERS'

export const state = {
    users: null
}

export const actions = {
    async getUsers({ commit }) {
        const result = await https({
            url: 'http://localhost:3000/users'
        })
        const action = {
            type: GET_USERS,
            data: result.data
        }
        commit(action)
    },
}

export const mutations = {
    [GET_USERS](state, action) {
        state.users = action.data
    }
}