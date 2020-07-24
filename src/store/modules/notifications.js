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
        context.dispatch('request/get', `${process.env.VUE_APP_API_URL}/notifications`, { root: true })
        .then(response => { context.commit('setNotificationCount', response.data) } )
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}