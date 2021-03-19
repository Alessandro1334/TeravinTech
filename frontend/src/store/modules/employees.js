import axios from 'axios'

export default {
    namespaced: true,
    state: {
        employees: []
    },
    getters: {
        getEmployees: state => state.employees
    },
    mutations: {
        SET_EMPLOYEES(state, data) {
            state.employees = data
        }
    },
    actions: {
        async getAll({ commit }, params) {
            try {
                const response = await axios.get('api/employee', {
                    params
                })
                commit('SET_EMPLOYEES', response.data.data)
                return response
            } catch (error) {
                const message = error.response.data.message ? error.response.data.message : error.response.data.status
                return Promise.reject(message)
            }
        },
        async create({ dispatch }, data) {
            try {
                const response = await axios.post('api/employee', data)
                dispatch('getAll')
                return response
            } catch (error) {
                const message = error.response.data.message ? error.response.data.message : error.response.data.status
                return Promise.reject(message)
            }
        },
        async edit(_, id) {
            try {
                const response = await axios.get(`api/employee/${id}`)
                return response
            } catch (error) {
                if (error.response.status == 401) {
                    return Promise.reject(error.response.data.error)
                } else {
                    const message = error.response.data.message ? error.response.data.message : error.response.data.status
                    return Promise.reject(message)
                }
            }
        },
        async update({ dispatch }, data) {
            try {
                const response = await axios.put(`api/employee/${data.id}`, data)
                dispatch('getAll')
                return response
            } catch (error) {
                const message = error.response.data.message ? error.response.data.message : error.response.data.status
                return Promise.reject(message)
            }
        },
        async delete({ dispatch }, data) {
            try {
                const response = await axios.delete(`api/employee/${data.id}`)
                dispatch('getAll')
                return response
            } catch (error) {
                const message = error.response.data.message ? error.response.data.message : error.response.data.status
                return Promise.reject(message)
            }
        }
    },
}
