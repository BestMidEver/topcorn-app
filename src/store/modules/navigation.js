const state = {
    search: '/search-/movie/1',
    quickVote: '/quick-vote-movies',
    myProfile: '',
    discover: '/discover/movie/1',
}

const getters = {
}

const mutations = {
    setSearch(state, to) { state.search = to },
    setQuickVote(state, to) { state.quickVote = to },
    setMyProfile(state, to) { state.myProfile = to },
    setDiscover(state, to) { state.discover = to },
}

const actions = {
    afterEach(context, to) {
        context.dispatch('modals/resetState', null, { root:true })
        if(to.path.indexOf('/search') === 0) context.commit('setSearch', to.fullPath)
        if(to.path.indexOf('/quick-vote') === 0) context.commit('setQuickVote', to.fullPath)
        if(to.matched[0] && to.matched[0].name === 'user' && to.params.id === localStorage.getItem('userId')) context.commit('setMyProfile', to.fullPath)
        if(to.path.indexOf('/discover') === 0) context.commit('setDiscover', to.fullPath)
    },
    getLastSeenEpisode(context, id) {
        context.dispatch('loading/startResponseWaiting', null, { root:true })
        return new Promise((resolve, reject) => {
            context.dispatch('request/get', `${process.env.VUE_APP_API_URL}/getSeriesCardData/${id}`, { root:true })
            .then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            }).then(() => { context.dispatch('loading/finishResponseWaiting', null, { root:true }) })
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