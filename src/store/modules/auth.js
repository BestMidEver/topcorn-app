import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios)

const state = {
    token: localStorage.getItem('access_token') || null,
    userId: localStorage.getItem('userId') || null
}

const getters = {
    loggedIn(state) {
        return state.token !== null
    }
}

const mutations = {
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    },
    setUserId(state, id) {
      state.userId = id
    }
}

const actions = {
    retrieveToken(context, credentials) {
        return new Promise((resolve, reject) => {
            axios.post(process.env.VUE_APP_API_URL + '/login', {
                username: credentials.email,
                password: credentials.password,
            }).then(response => {
                const token = response.data.access_token
                localStorage.setItem('access_token', token)
                context.commit('retrieveToken', token)
                context.dispatch('getSimpleUserData')
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    register(context, data) {
        return new Promise((resolve, reject) => {
            axios.post(process.env.VUE_APP_API_URL + '/register', {
                name: data.name,
                email: data.email,
                email_confirmation: data.emailConfirmation,
                password: data.password,
                password_confirmation: data.passwordConfirmation,
            }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    destroyToken(context) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if(context.getters.loggedIn) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.VUE_APP_API_URL + '/logout')
                .then(response => {
                    localStorage.removeItem('access_token')
                    context.commit('destroyToken')
                    resolve(response)
                }).catch(error => {
                    localStorage.removeItem('access_token')
                    context.commit('destroyToken')
                    reject(error)
                })
            })
        }
    },
    getSimpleUserData(context) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        axios.get(process.env.VUE_APP_API_URL + '/getSimpleUserData')
        .then(response => {
            localStorage.setItem('userId', response.data.id)
            context.commit('setUserId', response.data.id)
            //this.$forceUpdate()
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}