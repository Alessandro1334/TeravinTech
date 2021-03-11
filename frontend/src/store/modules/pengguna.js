import axios from 'axios'

export default {
    namespaced: true,
    state: {
        pengguna: [],
    },
    getters: {
        getPengguna: state => state.pengguna
    },
    mutations: {
        SET_PENGGUNA(state, data) {
            state.pengguna = data
        },
    },
    actions: {
        async getAll({ commit }, params) {
            try {
                const response = await axios.get('pengguna', {
                    params
                })
                commit('SET_PENGGUNA', response.data.data.rows)
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
        async create({ dispatch }, data) {
            try {
                const response = await axios.post('pengguna', data)
                dispatch('getAll')
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
        async edit(_, id) {
            try {
                const response = await axios.get(`pengguna/${id}`)
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
                const response = await axios.put(`pengguna/${data.id}`, data, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                dispatch('getAll')
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
        async delete({ dispatch }, id) {
            try {
                const response = await axios.delete(`pengguna/${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                dispatch('getAll')
                return response
            } catch (error) {
                if (error.response.status == 401) {
                    return Promise.reject(error.response.data.error)
                } else {
                    const message = error.response.data.message ? error.response.data.message : error.response.data.status
                    return Promise.reject(message)
                }
            }
        }
    },
}
