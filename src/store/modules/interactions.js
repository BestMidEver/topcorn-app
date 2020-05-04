import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios)

const state = {
    movieInteractions: [],
    seriesInteractions: [],
}

const getters = {
}

const mutations = {
    setMovieInteractions(state, interactions) {
        state.movieInteractions = interactions
    },
    setSeriesInteractions(state, interactions) {
        state.seriesInteractions = interactions
    },
}

const actions = {
    pluckMoviesSeries(context) {
        return new Promise((resolve, reject) => {
            axios.get(process.env.VUE_APP_API_URL + '/pluckId/interactedMoviesSeries')
            .then(response => {
                context.commit('setMovieInteractions', response.data.movies)
                context.commit('setSeriesInteractions', response.data.series)
                resolve(response)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
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