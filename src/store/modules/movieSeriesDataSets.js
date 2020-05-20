const state = {
    dataSet: [],
    dataSet2: [],
    dataSet3: [],
    dataObject: {},
    dataObject2: {},
    dataObject3: {},
}

const getters = {
}

const mutations = {
    setDataSet(state, data) { state[`dataSet${data.index}`] = data.data },
    setDataObject(state, data) { state[`dataObject${data.index}`] = data.data },
    setDataObjectProperty(state, data) { state[`dataObject${data.index}`][data.property] = data.data },
}

const actions = {
    setDataSet(context, data) { context.commit('setDataSet', { data: data, index: '' }) },
    setDataSet2(context, data) { context.commit('setDataSet', { data: data, index: 2 }) },
    setDataSet3(context, data) { context.commit('setDataSet', { data: data, index: 3 }) },
    setDataObject(context, data) { context.commit('setDataObject', { data: data, index: '' }) },
    setDataObject2(context, data) { context.commit('setDataObject', { data: data, index: 2 }) },
    setDataObject3(context, data) { context.commit('setDataObject', { data: data, index: 3 }) },
    setDataObjectProperty(context, data) { context.commit('setDataObject', data) },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}