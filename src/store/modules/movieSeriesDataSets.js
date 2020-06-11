import Vue from 'vue'


const state = {
    dataSet: [],
    dataSet2: [],
    dataSet3: [],
    dataObject: {},
    dataObject2: {},
    dataObject3: {},
    tcDataObject: {},
    tcDataObject2: {},
    tcDataObject3: {},
}

const getters = {
}

const mutations = {
    setDataSet(state, data) { state[`dataSet${data.index}`] = data.data },
    setDataObject(state, data) { state[`dataObject${data.index}`] = data.data },
    setDataObjectProperty(state, data) { state[`dataObject${data.index}`][data.property] = data.data },
    setTcDataObject(state, data) { state[`tcDataObject${data.index}`] = data.data },
    setTcDataObjectInteraction(state, data) {
        const obj = data.data ? data.data : data
        let indexToChange = state.tcDataObject.data.findIndex(o => o.id === obj.id)
        if(indexToChange > -1){
            Vue.set(state.tcDataObject.data[indexToChange], 'rate_code', obj.rate_code)
            Vue.set(state.tcDataObject.data[indexToChange], 'later_id', obj.later_id)
            Vue.set(state.tcDataObject.data[indexToChange], 'ban_id', obj.ban_id)
        }
    },
    setTcDataObjectInteraction2(state, data) {
        const obj = data.data ? data.data : data
        let indexToChange = state.tcDataObject2.data.findIndex(o => o.id === obj.id)
        if(indexToChange > -1){
            Vue.set(state.tcDataObject2.data[indexToChange], 'rate_code', obj.rate_code)
            Vue.set(state.tcDataObject2.data[indexToChange], 'later_id', obj.later_id)
            Vue.set(state.tcDataObject2.data[indexToChange], 'ban_id', obj.ban_id)
        }
    }
}

const actions = {
    setDataSet(context, data) { context.commit('setDataSet', { data: data, index: '' }) },
    setDataSet2(context, data) { context.commit('setDataSet', { data: data, index: 2 }) },
    setDataSet3(context, data) { context.commit('setDataSet', { data: data, index: 3 }) },
    setDataObject(context, data) { context.commit('setDataObject', { data: data, index: '' }) },
    setDataObject2(context, data) { context.commit('setDataObject', { data: data, index: 2 }) },
    setDataObject3(context, data) { context.commit('setDataObject', { data: data, index: 3 }) },
    setDataObjectProperty(context, data) { context.commit('setDataObjectProperty', data) },
    setTcDataObject(context, data) { context.commit('setTcDataObject', { data: data, index: '' }) },
    setTcDataObject2(context, data) { context.commit('setTcDataObject', { data: data, index: 2 }) },
    setTcDataObject3(context, data) { context.commit('setTcDataObject', { data: data, index: 3 }) },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}