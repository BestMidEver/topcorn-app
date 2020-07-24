import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '@/router'


Vue.use(VueAxios, axios)

const state = {
    token: localStorage.getItem('access_token') || null,
    userId: localStorage.getItem('userId') || null,
    reloadModal: {
        header: '',
        message: '',
    }
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
    },
    setReloadModal(state, type) {
      if(type === 'internet connection') state.reloadModal = { message: 'Please check your internet connection.', header: 'Connection Problem' }
      else if(type === 'server error') state.reloadModal = { message: 'Server error, please try again 15 seconds later.', header: 'Ooops...' }
      else if(type === 'server or internet error') state.reloadModal = { message: 'Server error or no internet connection, please check your internet connection and try again couple seconds later.', header: 'Ooops...' }
    },
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
            //return new Promise((resolve, reject) => {
                axios.post(process.env.VUE_APP_API_URL + '/logout')
                .then(response => {
                    //localStorage.removeItem('access_token')
                    //context.commit('destroyToken')
                    //resolve(response)
                }).catch(error => {
                    //localStorage.removeItem('access_token')
                    //context.commit('destroyToken')
                    //reject(error)
                }).then(() => {
                    localStorage.clear()
                    router.go()
                    //location.reload()
                })
            //})
        } else {
            localStorage.clear()
            //localStorage.removeItem('access_token')
            //context.commit('destroyToken')
            router.go()
            //location.reload()
        }
    },
    getSimpleUserData(context) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        axios.get(process.env.VUE_APP_API_URL + '/getSimpleUserData')
        .then(response => {
            localStorage.setItem('userId', response.data.id)
            context.commit('setUserId', response.data.id)
            router.replace(process.env.VUE_APP_HOME_TO)
            //location.reload()
            //this.$forceUpdate()
        })
    },
    checkLoggedIn(context, options) {
        if(!navigator.onLine) { context.dispatch('waitInternetConnection', 'internet connection'); return }
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        return new Promise((resolve, reject) => {
            axios.get(process.env.VUE_APP_API_URL + '/checkLoggedIn')
            .then(response => {
                if(response.data === 0) {
                    context.dispatch('destroyToken')
                    resolve(response)
                } else if(/* response.data === 1 &&  */!options.errorsEnabled) { context.dispatch('waitInternetConnection', 'server error'); return }//setTimeout(() => { router.go() }, 2000)
                else resolve(response)
            }).catch(error => {
                context.dispatch('waitInternetConnection', 'server or internet error'); return
            })
        })
    },
    waitInternetConnection(context, type) {
        context.commit('setReloadModal', type)
        $('#waiting-internet-connection').modal('show')
        setTimeout(() => { router.go() }, 15000)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}