import axios from 'axios'

export default {
    namespaced: true,
    state: {
        users: []
    },
    getters: {
        getUsers: state => state.users
    },
    mutations: {
        SET_USERS(state, data) {
            state.users = data
        }
    },
    actions: {
        async getAll({ commit }, params) {
            try {
                const response = await axios.get('api/user', {
                    params
                })
                commit('SET_USERS', response.data.data)
                return response
            } catch (error) {
                const message = error.response.data.message ? error.response.data.message : error.response.data.status
                return Promise.reject(message)
            }
        },
        async create({ dispatch }, data) {
            try {
                const response = await axios.post('api/user', data)
                dispatch('getAll')
                return response
            } catch (error) {
                const message = error.response.data.message ? error.response.data.message : error.response.data.status
                return Promise.reject(message)
            }
        },
    },
}
