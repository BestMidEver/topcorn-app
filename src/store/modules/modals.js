import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios)
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

const getDefaultState = () => {
    return {
        voteCommentData: {},
        voteCommentDataBoundedTo: [],
        voteCommentDataType: '',
        voteCommentType: '', // vote, vote + comment, comment
    }
}
const state = getDefaultState()

const getters = {
}

const mutations = {
    resetState(state) {
        state.voteCommentData = {}
        state.voteCommentDataBoundedTo = []
        state.voteCommentDataType = ''
        state.voteCommentType = ''
    },
    setVoteCommentData(state, data) { state.voteCommentData = data },
    setVoteCommentDataBoundedTo(state, boundedTo) { state.voteCommentDataBoundedTo = boundedTo },
    setVoteCommentDataType(state, type) { state.voteCommentDataType = type },
    setVoteCommentType(state, type) { state.voteCommentType = type },
}

const actions = {
    resetState ({ commit }) { commit('resetState') },
    openVoteComment(context, data) {console.log(data)
        context.commit('setVoteCommentData', data.data)
        context.commit('setVoteCommentDataBoundedTo', data.boundedTo)
        context.commit('setVoteCommentDataType', data.type)
        context.commit('setVoteCommentType', data.voteCommentType)
        $('#vote-comment-modal').modal('show')
    },
    getUserReview(context) {
        if(!context.state.voteCommentDataType || !context.state.voteCommentData.id) return
        axios.get(`${process.env.VUE_APP_API_URL}/getUserReview/${context.state.voteCommentDataType}/${context.state.voteCommentData.id}/${context.state.voteCommentData.season_number||context.state.voteCommentData.season_number===0?context.state.voteCommentData.season_number:-1}/${context.state.voteCommentData.episode_number||context.state.voteCommentData.episode_number===0?context.state.voteCommentData.episode_number:-1}`)
        .then(response => {
            Vue.set(context.state.voteCommentData, 'review', response.data.review ? response.data.review : '')
        }).catch(error => {
        })
    },
    sendReview(context, review) {
        context.dispatch('loading/startResponseWaiting', null, { root: true })
        axios.post(`${process.env.VUE_APP_API_URL}/sendReview/${context.state.voteCommentDataType}`, {
            obj_id: context.state.voteCommentData.id,
            season_number: context.state.voteCommentData.season_number || context.state.voteCommentData.season_number === 0 ? context.state.voteCommentData.season_number : -1,
            episode_number: context.state.voteCommentData.episode_number || context.state.voteCommentData.episode_number === 0 ? context.state.voteCommentData.episode_number : -1,
            review: review
        })
        .then(response => {
            Vue.set(context.state.voteCommentData, 'review', review)
            context.state.voteCommentDataBoundedTo.forEach(boundedTo => {
                context.commit(boundedTo, response.data, { root: true })
            })
        }).catch(error => {
        }).then(() => { context.dispatch('loading/finishResponseWaiting', null, { root: true }) })
    },
    vote(context, data) {
        context.dispatch('loading/startResponseWaiting', null, { root: true })
        axios.post(`${process.env.VUE_APP_API_URL}/rate/${context.state.voteCommentDataType}`, {
            obj_id: context.state.voteCommentData.id,
            rate_code: data.vote
        })
        .then(response => {
            context.state.voteCommentData.rate_code = data.vote
            context.state.voteCommentDataBoundedTo.forEach(boundedTo => {
                context.commit(boundedTo, { data: context.state.voteCommentData, action: 'vote' }, { root: true })
            })
        }).catch(error => {
        }).then(() => {
            setTimeout(() => {
                if(data.hideModalAfter) $('#vote-comment-modal').modal('hide')
                context.dispatch('loading/finishResponseWaiting', null, { root: true })
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