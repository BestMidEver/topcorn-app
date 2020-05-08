import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios)

const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
    watchLater(context, data) {
        context.dispatch('loading/startResponseWaiting', null, { root:true })
        const later = data.data.later_id > 0 ? null : 1
        axios.post(`${process.env.VUE_APP_API_URL}/watchLater/${data.type}`, {
            obj_id: data.data.id,
            later: later
        })
        .then(response => {
            data.boundedTo.forEach(boundedTo => {
                data.data.later_id = later
                context.commit(boundedTo, data.data, { root: true })
            })
        }).catch(error => {
        }).then(() => { context.dispatch('loading/finishResponseWaiting', null, { root:true }) })
    },
    ban(context, data) {
        context.dispatch('loading/startResponseWaiting', null, { root:true })
        const ban = data.data.ban_id > 0 ? null : 1
        axios.post(`${process.env.VUE_APP_API_URL}/ban/${data.type}`, {
            obj_id: data.data.id,
            ban: ban
        })
        .then(response => {
            data.boundedTo.forEach(boundedTo => {
                data.data.ban_id = ban
                context.commit(boundedTo, data.data, { root: true })
            })
        }).catch(error => {
        }).then(() => { context.dispatch('loading/finishResponseWaiting', null, { root:true }) })
    },
    vote(context, data) {
        context.dispatch('loading/startResponseWaiting', null, { root:true })
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.VUE_APP_API_URL}/rate/${data.type}`, {
                obj_id: data.data.id,
                rate_code: data.vote
            })
            .then(response => {
                if(data.boundedTo) data.boundedTo.forEach(boundedTo => {
                    data.data.ban_id = ban
                    context.commit(boundedTo, data.data, { root: true })
                })
                resolve(response)
            }).catch(error => {
                reject(error)
            }).then(() => { context.dispatch('loading/finishResponseWaiting', null, { root:true }) })
        })
    },
    getUserReview(context, data) {
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.VUE_APP_API_URL}/getUserReview/${data.type}/${data.data.id}`)
            .then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    sendReview(context, data) {
        context.dispatch('loading/startResponseWaiting', null, { root:true })
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.VUE_APP_API_URL}/sendReview/${data.type}`, {
                obj_id: data.data.id,
                review: data.review
            })
            .then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            }).then(() => { context.dispatch('loading/finishResponseWaiting', null, { root:true }) })
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}