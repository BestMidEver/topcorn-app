const state = {
    search: '/search-/movie/1',
    quickVote: '/quick-vote-movies',
}

const getters = {
}

const mutations = {
    setSearch(state, to) { state.search = to },
    setQuickVote(state, to) { state.quickVote = to },
}

const actions = {
    afterEach(context, to) {
        context.dispatch('modals/resetState', null, { root:true })
        if(to.path.indexOf('/search') === 0) context.commit('setSearch', to.path)
        if(to.path.indexOf('/quick-vote') === 0) context.commit('setQuickVote', to.path)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}