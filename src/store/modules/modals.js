import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios)
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

const state = {
    voteCommentData: {},
    voteCommentDataBoundedTo: [],
    voteCommentDataType: ''
}

const getters = {
}

const mutations = {
    reset(state) {
        state.voteCommentData = {}
        state.voteCommentDataBoundedTo = []
        state.voteCommentDataType = ''
    },
    setVoteCommentData(state, data) { state.voteCommentData = data },
    setVoteCommentDataBoundedTo(state, boundedTo) { state.voteCommentDataBoundedTo = boundedTo },
    setVoteCommentDataType(state, type) { state.voteCommentDataType = type },
}

const actions = {
    openVoteComment(context, data) {
        context.commit('setVoteCommentData', data.data)
        context.commit('setVoteCommentDataBoundedTo', data.boundedTo)
        context.commit('setVoteCommentDataType', data.type)
        $('#vote-comment-modal').modal('show')
    },
    getUserReview(context) {
        axios.get(`${process.env.VUE_APP_API_URL}/getUserReview/${context.state.voteCommentDataType}/${context.state.voteCommentData.id}`)
        .then(response => {
            Vue.set(context.state.voteCommentData, 'review', response.data.review ? response.data.review : '')
        }).catch(error => {
        })
    },
    sendReview(context, review) {
        context.dispatch('loading/startResponseWaiting', null, { root:true })
        axios.post(`${process.env.VUE_APP_API_URL}/sendReview/${context.state.voteCommentDataType}`, {
            obj_id: context.state.voteCommentData.id,
            review: review
        })
        .then(response => {
            Vue.set(context.state.voteCommentData, 'review', review)
        }).catch(error => {
        }).then(() => { context.dispatch('loading/finishResponseWaiting', null, { root:true }) })
    },
    vote(context, data) {
        context.dispatch('loading/startResponseWaiting', null, { root:true })
        axios.post(`${process.env.VUE_APP_API_URL}/rate/${context.state.voteCommentDataType}`, {
            obj_id: context.state.voteCommentData.id,
            rate_code: data.vote
        })
        .then(response => {
            context.state.voteCommentData.rate_code = data.vote
            context.state.voteCommentDataBoundedTo.forEach(boundedTo => {
                context.commit(boundedTo, context.state.voteCommentData, { root: true })
            })
        }).catch(error => {
        }).then(() => {
            setTimeout(() => {
                if(data.hideModalAfter) $('#vote-comment-modal').modal('hide')
                context.dispatch('loading/finishResponseWaiting', null, { root:true })
            }, data.hideModalAfter ? process.env.VUE_APP_DEMONSTRATION_TIME : 0)
        })
    },
    openShareModal(context, data) {

    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}