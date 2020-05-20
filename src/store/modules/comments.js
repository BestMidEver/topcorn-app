import Vue from 'vue'


const state = {
    dataObject: {},
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
            if(index >= 0) Vue.set(state.dataObject.data, index, data)
            else state.dataObject.data.unshift(data)
        } else {
            state.dataObject.data = state.dataObject.data.filter(review => review.id !== data)
        }
    },
}

const actions = {
    setDataObject(context, data) { context.commit('setDataObject', { data: data, index: '' }) },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}