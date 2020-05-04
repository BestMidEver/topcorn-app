import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios)

const state = {
    movies: [],
    series: [],
    people: [],
    users: [],
    //lists: [],
}

const getters = {
}

const mutations = {
    setMovies(state, movies) {
        state.movies = movies
    },
    setSeries(state, series) {
        state.series = series
    },
    setPeople(state, people) {
        state.people = people
    },
    setUsers(state, users) {
        state.users = users
    },
    /* setLists(state, lists) {
        state.lists = lists
    }, */
    clear(state, types) {
        state[types] = []
    }
}

const actions = {
    getData(context) {
        context.dispatch('loading/startPageLoading2', null, { root:true })
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.VUE_APP_API_URL}/recenltyVisiteds`)
            .then(response => {
                context.commit('setMovies', response.data.movies)
                context.commit('setSeries', response.data.series)
                context.commit('setPeople', response.data.people)
                context.commit('setUsers', response.data.users)
                //context.commit('setLists', response.data.lists)
                resolve(response)
            }).catch(error => {
                console.log(error)
                reject(error)
            }).then(() => { context.dispatch('loading/finishPageLoading2', null, { root:true }) })
        })
    },
    clear(context, types) {
        context.dispatch('loading/startResponseWaiting', null, { root:true })
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.VUE_APP_API_URL}/clearRecentlyVisiteds/${types}`)
            .then(response => {
                context.commit('clear', types)
                resolve(response)
            }).catch(error => {
                console.log(error)
                reject(error)
            }).then(() => { context.dispatch('loading/finishResponseWaiting', null, { root:true }) })
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}