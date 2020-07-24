<template>
    <div>
        <cards :type="type" :tmdbData="tmdbResponse" :loading="$store.state.loading.pageLoading3" class="mt-2"/>
    </div>
</template>

<script>
import Vue from 'vue'
import lodash from 'lodash'
import Cards from '@/components/Cards.vue'
import urlGenerate from '@/mixins/urlGenerate'

Vue.use(lodash)


export default {
    mixins: [urlGenerate],
    components: {
        'cards': Cards,
    },
    data() {
        const tmdbResponse = { page: 1, results: [], total_pages: 0, total_results: 0 }
        return {
            type: 'person',
            tmdbResponse0: tmdbResponse,
            tmdbResponse: tmdbResponse,
            axiosRandom: ''
        } 
    },
    watch: {
        $route() { this.startdebouncingSearch() }
    },
    beforeMount() {
        this.startdebouncingSearch()
    },
    methods: {
        startdebouncingSearch() {
            this.$store.dispatch('loading/startPageLoading3')
            this.debouncingSearch()
        },
        debouncingSearch: lodash.debounce(function() {
            this.search()
        }, process.env.VUE_APP_DEBOUNCE_TIME),
        search() {
            const axiosRandom = this.randomString(20)
            this.axiosRandom = axiosRandom
            this.$store.dispatch('request/get', this.searchMovieSeriesPersonUrl(this.type, this.$route.params.pathMatch, this.$route.params.page))
            .then(response => {
                if(axiosRandom === this.axiosRandom) this.tmdbResponse = response.data
            }).catch(error => {
                this.tmdbResponse = this.tmdbResponse0
            }).then(() => { this.$store.dispatch('loading/finishPageLoading3') })
        }
    },
}
</script>

<style scoped>
</style>
