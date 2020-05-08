const state = {
    search: '/search-/movie/1',
}

const getters = {
}

const mutations = {
    setSearch(state, to) { state.search = to },
}

const actions = {
    afterEach(context, to) {
        if(to.path.indexOf('/search') === 0) context.commit('setSearch', to.path)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}