const state = {
    dataObject: {},
    dataObject2: {},
}

const getters = {
}

const mutations = {
    setDataObject(state, data) { state[`dataObject${data.index}`] = data.data },
}

const actions = {
    setDataObject(context, data) { context.commit('setDataObject', { data: data, index: '' }) },
    setDataObject2(context, data) { context.commit('setDataObject', { data: data, index: 2 }) },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}