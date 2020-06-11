import Vue from 'vue'


const state = {
    dataObject: {},
    dataObject2: {},
}

const getters = {
}

const mutations = {
    setDataObject(state, data) { state[`dataObject${data.index}`] = data.data },
    setReview(state, data) {
        if(data.action === 'vote') {
            let found = state.dataObject.data.find(obj => (obj.movie_series_id === data.data.id && obj.is_mine == 1))
            found.rate = data.data.rate_code
        } else if(typeof data === 'object') {
            let index = state.dataObject.data.findIndex(obj => obj.id === data.id)
            if(index >= 0) {
                if(state.dataObject.data[index].obj_name) data.obj_name = state.dataObject.data[index].obj_name
                Vue.set(state.dataObject.data, index, data)
            }else state.dataObject.data.unshift(data)
        } else {
            state.dataObject.data = state.dataObject.data.filter(review => review.id !== data)
        }
    },
    setReview2(state, data) {
        if(data.action === 'vote') {
            let found = state.dataObject2.data.find(obj => (obj.movie_series_id === data.data.id && obj.is_mine == 1))
            found.rate = data.data.rate_code
        } else if(typeof data === 'object') {
            let index = state.dataObject2.data.findIndex(obj => obj.id === data.id)
            if(index >= 0) Vue.set(state.dataObject2.data, index, data)
            else state.dataObject2.data.unshift(data)
        } else {
            state.dataObject2.data = state.dataObject2.data.filter(review => review.id !== data)
        }
    },
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