const state = {
    voteComment: {},
}

const getters = {
}

const mutations = {
    setVoteComment(state, data) { state.voteComment = data },
}

const actions = {
    openVoteComment(context, data) { context.commit('setVoteComment', data) },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}