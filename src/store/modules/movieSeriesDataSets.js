const state = {
    dataSet: [],
    dataSet2: [],
    dataSet3: [],
    dataObject: {},
    dataObject2: {},
}

const getters = {
}

const mutations = {
    setDataSet(state, data) { state.dataSet = data },
    setDataSet2(state, data) { state.dataSet2 = data },
    setDataSet3(state, data) { state.dataSet3 = data },
    setDataObject(state, data) { state.dataObject = data },
    setDataObject2(state, data) { state.dataObject2 = data },
}

const actions = {
    setDataSet(context, data) { context.commit('setDataSet', data) },
    setDataSet2(context, data) { context.commit('setDataSet2', data) },
    setDataSet3(context, data) { context.commit('setDataSet3', data) },
    setDataObject(context, data) { context.commit('setDataObject', data) },
    setDataObject2(context, data) { context.commit('setDataObject2', data) },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}