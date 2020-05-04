const state = {
    responseWaiting: false,
    pageLoading: true,
    pageLoading2: true,
    pageLoading3: true,
    pageLoading4: true,
}

const getters = {
}

const mutations = {
    setResponseWaiting(state, responseWaiting) { state.responseWaiting = responseWaiting },
    setPageLoading(state, loading) { state.pageLoading = loading },
    setPageLoading2(state, loading) { state.pageLoading2 = loading },
    setPageLoading3(state, loading) { state.pageLoading3 = loading },
    setPageLoading4(state, loading) { state.pageLoading4 = loading },
}

const actions = {
    startResponseWaiting(context) { context.commit('setResponseWaiting', true) },
    finishResponseWaiting(context) { context.commit('setResponseWaiting', false) },
    startPageLoading(context) { context.commit('setPageLoading', true) },
    finishPageLoading(context) { context.commit('setPageLoading', false) },
    startPageLoading2(context) { context.commit('setPageLoading2', true) },
    finishPageLoading2(context) { context.commit('setPageLoading2', false) },
    startPageLoading3(context) { context.commit('setPageLoading3', true) },
    finishPageLoading3(context) { context.commit('setPageLoading3', false) },
    startPageLoading4(context) { context.commit('setPageLoading4', true) },
    finishPageLoading4(context) { context.commit('setPageLoading4', false) },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}