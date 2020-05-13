import Vue from 'vue'


export default {
    data() {
    },
    computed: {
        /* objInteractions() {
            return this.$store.state.interactions[this.movieSeriesType + 'Interactions']
        }, */
    },
    methods: {
        mergeTmdbResponse(data) {
            data.results = data.results.map(movie => {
                const interaction = this.objInteractions.find(interaction => interaction.movie_id === movie.id)
                Vue.set(movie, 'ban_id', interaction ? interaction.ban_id : null)
                Vue.set(movie, 'later_id', interaction ? interaction.later_id : null)
                Vue.set(movie, 'rate_code', interaction ? interaction.rate_code : null)
                return movie
            })
            return data
        }
    }
}