import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')


const state = {
    notificationCount: 0
}

const getters = {
}

const mutations = {
    setNotificationCount(state, count) { state.notificationCount = count },
}

const actions = {
    getNotificationCount(context) {
        axios.get(`${process.env.VUE_APP_API_URL}/notifications`).then(response => { context.commit('setNotificationCount', response.data) } )
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}