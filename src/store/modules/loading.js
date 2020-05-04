const state = {
    pageLoading: true,
    pageLoading2: true,
    pageLoading3: true,
}

const getters = {
}

const mutations = {
    setPageLoading(state, loading) {
        state.pageLoading = loading
    },
    setPageLoading2(state, loading) {
        state.pageLoading2 = loading
    },
    setPageLoading3(state, loading) {
        state.pageLoading3 = loading
    },
}

const actions = {
    startPageLoading(context) {
        context.commit('setPageLoading', true)
    },
    finishPageLoading(context) {
        context.commit('setPageLoading', false)
    },
    startPageLoading2(context) {
        context.commit('setPageLoading2', true)
    },
    finishPageLoading2(context) {
        context.commit('setPageLoading2', false)
    },
    startPageLoading3(context) {
        context.commit('setPageLoading3', true)
    },
    finishPageLoading3(context) {
        context.commit('setPageLoading3', false)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}