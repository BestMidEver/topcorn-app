import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios)
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

Vue.mixin({
    data() {
    },
    computed: {
        movieInteractions() { return this.$store.state.interactions[this.movieSeriesType + 'Interactions'] },
        mergedTmdbResponse() {
            const data = {
                //page: this.tmdbResponse.page,
                results: this.tmdbResponse.results.map(movie => {
                    const interaction = this.movieInteractions.find(interaction => interaction.movie_id === movie.id)
                    Vue.set(movie, 'ban_id', interaction ? interaction.ban_id : null)
                    Vue.set(movie, 'later_id', interaction ? interaction.later_id : null)
                    Vue.set(movie, 'rate_code', interaction ? interaction.rate_code : null)
                    //Vue.set(movie, 'rated_id', interaction ? interaction.rated_id : null)
                    return movie
                }),
                total_pages: this.tmdbResponse.total_pages,
                total_results: this.tmdbResponse.total_results
            }
            return data
        }
    },
    watch: {
    }
})