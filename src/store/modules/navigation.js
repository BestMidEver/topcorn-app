const state = {
    search: '/search-/movie/1',
    quickVote: '/quick-vote-movies',
    myProfile: `/user/profile/${localStorage.getItem('userId')}`
}

const getters = {
}

const mutations = {
    setSearch(state, to) { state.search = to },
    setQuickVote(state, to) { state.quickVote = to },
    setMyProfile(state, to) { state.myProfile = to },
}

const actions = {
    afterEach(context, to) {
        context.dispatch('modals/resetState', null, { root:true })
        if(to.path.indexOf('/search') === 0) context.commit('setSearch', to.fullPath)
        if(to.path.indexOf('/quick-vote') === 0) context.commit('setQuickVote', to.fullPath)
        if(to.matched[0] && to.matched[0].name === 'user' && to.params.id === localStorage.getItem('userId')) context.commit('setMyProfile', to.fullPath)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}