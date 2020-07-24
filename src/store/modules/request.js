import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '@/router'

Vue.use(VueAxios, axios)
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')


const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
    get(context, url) {
        return new Promise((resolve, reject) => {
            axios.get(url)
            .then(response => {
                resolve(response)
            }).catch(error => {
                if(url.includes(process.env.VUE_APP_TMDB_API_URL) && error.response.status === 404) { router.go(-1); return }
                context.dispatch('auth/checkLoggedIn', { errorsEnabled: false }, { root: true })
                .then()
                .then(() => reject(error))
            })
        })
    },
    post(context, data) {
        return new Promise((resolve, reject) => {
            axios.post(data.url, data.data)
            .then(response => {
                resolve(response)
            }).catch(error => {
                context.dispatch('auth/checkLoggedIn', { errorsEnabled: false }, { root: true })
                .then()
                .then(() => reject(error))
            })
        })
    },
    postWithErrors(context, data) {
        return new Promise((resolve, reject) => {
            axios.post(data.url, data.data)
            .then(response => {
                resolve(response)
            }).catch(error => {
                context.dispatch('auth/checkLoggedIn', { errorsEnabled: true }, { root: true })
                .then()
                .then(() => reject(error))
            })
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}