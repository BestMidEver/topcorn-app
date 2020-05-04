import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '../../mixins/urlGenerator'
import lodash from 'lodash'
 

Vue.use(lodash)
Vue.use(VueAxios, axios)
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

Vue.mixin({
    data() {
        const tmdbResponse = { page: 1, results: [], total_pages: 0, total_results: 0 }
        return {
            tmdbResponse0: tmdbResponse,
            tmdbResponse: tmdbResponse,
            axiosRandom: ''
        }
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
            axios.get(this.searchMovieSeriesPersonUrl(this.movieSeriesType, this.$route.params.pathMatch, this.$route.params.page))
            .then(response => {
                if(axiosRandom === this.axiosRandom) this.tmdbResponse = response.data
            }).catch(error => {
                this.tmdbResponse = this.tmdbResponse0
                console.log(error)
            }).then(() => { this.$store.dispatch('loading/finishPageLoading') })
        }
    }
})