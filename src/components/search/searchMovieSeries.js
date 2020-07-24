import Vue from 'vue'
import lodash from 'lodash'
import urlGenerate from '@/mixins/urlGenerate'
import tmdbMerge from '@/mixins/tmdbMerge'
 
Vue.use(lodash)


export default {
    mixins: [urlGenerate, tmdbMerge],
    data() {
        const tmdbResponse = { results: [], total_pages: 0, total_results: 0 }
        return {
            tmdbResponse: tmdbResponse,
            mergedTmdbResponse0: tmdbResponse,
            mergedTmdbResponse: tmdbResponse,
            axiosRandom: '',
        }
    },
    computed: {
        objInteractions() { return this.$store.state.interactions[this.movieSeriesType + 'Interactions'] },
    },
    watch: {
        objInteractions() { this.merge() }
    },
    methods: {
        startdebouncingSearch() {
            this.$store.dispatch('loading/startPageLoading')
            this.debouncingSearch()
        },
        debouncingSearch: lodash.debounce(function() {
            this.search()
        }, process.env.VUE_APP_DEBOUNCE_TIME),
        search() {
            const axiosRandom = this.randomString(20)
            this.axiosRandom = axiosRandom
            this.$store.dispatch('request/get', this.searchMovieSeriesPersonUrl(this.movieSeriesType, this.$route.params.pathMatch, this.$route.params.page))
            .then(response => {
                if(axiosRandom === this.axiosRandom) {
                    this.tmdbResponse = response.data
                    this.merge()
                }
            }).catch(error => {
                this.mergedTmdbResponse = this.mergedTmdbResponse0
            }).then(() => { this.$store.dispatch('loading/finishPageLoading') })
        },
        merge() {
            this.mergedTmdbResponse = this.mergeTmdbResponse(this.tmdbResponse)
        }
    }
}