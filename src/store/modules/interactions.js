import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios)
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

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
    setMovieInteraction(state, data) {
        const movie = data.data ? data.data : data
        console.log('interaction', movie)
        state.movieInteractions = state.movieInteractions.filter(m => m.movie_id !== movie.id)
        const interaction = {
            movie_id: movie.id,
            ban_id: movie ? movie.ban_id : null,
            later_id: movie ? movie.later_id : null,
            rate_code: movie ? movie.rate_code : null
        }
        state.movieInteractions.push(interaction)
    },
    setSeriesInteractions(state, interactions) {
        state.seriesInteractions = interactions
    },
    setSeriesInteraction(state, series) {
        let interaction = state.seriesInteractions.find(m => m.movie_id === series.id)
        const found = interaction ? true : false
        if(!found) interaction = {}
        Vue.set(interaction, 'movie_id', series.id)
        Vue.set(interaction, 'ban_id', series ? series.ban_id : null)
        Vue.set(interaction, 'later_id', series ? series.later_id : null)
        Vue.set(interaction, 'rate_code', series ? series.rate_code : null)
        if(!found) state.seriesInteractions.push(interaction)
    },
}

const actions = {
    pluckMoviesSeries(context) {
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.VUE_APP_API_URL}/pluckId/interactedMoviesSeries`)
            .then(response => {
                context.commit('setMovieInteractions', response.data.movies)
                context.commit('setSeriesInteractions', response.data.series)
                resolve(response)
            }).catch(error => {
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