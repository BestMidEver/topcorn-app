<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import tmdbMerge from '@/mixins/tmdbMerge'
import urlGenerate from '@/mixins/urlGenerate'
 

Vue.use(VueAxios, axios)
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

function initialState (){
    const tmdbResponse = { results: [], total_pages: 0, total_results: 0 }
    return {
        tmdbResponse0: tmdbResponse,
        tmdbResponse: tmdbResponse,
        axiosRandom: '',
        axiosRandom2: '',
    }
}

export default {
    mixins: [tmdbMerge, urlGenerate],
    props: {
        type: { validator: value => ['movie', 'series'].includes(value) },
    },
    data() { return initialState() },
    computed: {
        movieSeriesType() { return this.type },
        objInteractions() { return this.$store.state.interactions[this.type + 'Interactions'] },
        obj() { return `${this.type}-${this.$route.params.id}` },
    },
    watch: {
        objInteractions() { console.log('interactions changed'); this.mergeAndStore() },
        obj() {
            Object.assign(this.$data, initialState())
            console.log('obj changed')
            this.getObjData()
        },
    },
    beforeCreate() {
        this.$store.dispatch('interactions/pluckMoviesSeries')
    },
    created() {
        console.log('movie.vue created')
        this.getObjData()
    },
    methods: {
        getObjData() {
            this.getTmdbData()
            this.getTcData()
        },
        getTmdbData() {
            this.$store.dispatch('loading/startPageLoading')
            const axiosRandom = this.randomString(20)
            this.axiosRandom = axiosRandom
            axios.get(this.tmdbMovieSeriesUrl(this.type, this.$route.params.id))
            .then(response => {
                if(axiosRandom === this.axiosRandom) {
                    this.tmdbResponse = response.data
                    console.log('tmdb responsed')
                    this.sortTrailers()
                    this.mergeAndStore()
                }
            }).catch(error => {
                this.$store.dispatch('movieSeriesDataSets/setDataObject2', this.tmdbResponse0)
            }).then(() => { this.$store.dispatch('loading/finishPageLoading') })
        },
        getTcData() {
            this.$store.dispatch('loading/startPageLoading2')
            this.$store.dispatch('loading/startResponseWaiting')
            const axiosRandom = this.randomString(20)
            this.axiosRandom2 = axiosRandom
            axios.get(this.movieSeriesDataUrl(this.type, this.$route.params.id))
            .then(response => {
                if(axiosRandom === this.axiosRandom2) {
                    this.$store.dispatch('movieSeriesDataSets/setDataObject', response.data.interactionData.original)
                    this.$store.dispatch('movieSeriesDataSets/setDataSet', response.data.reviews)
                }
            }).catch(error => {
                this.$store.dispatch('movieSeriesDataSets/setDataObject', {})
                this.$store.dispatch('movieSeriesDataSets/setDataSet', [])
            }).then(() => {
                this.$store.dispatch('loading/finishPageLoading2')
                this.$store.dispatch('loading/finishResponseWaiting')
            })
        },
        sortTrailers() {
            this.tmdbResponse.videos.results = this.tmdbResponse.videos.results.filter(trailer => trailer.site == 'YouTube').sort((a, b) => a.type === 'Trailer' ? -1 : 1)
        },
        mergeAndStore() {
            this.tmdbResponse.recommendations = this.mergeTmdbResponse(this.tmdbResponse.recommendations || this.tmdbResponse0)
            this.tmdbResponse.similar = this.mergeTmdbResponse(this.tmdbResponse.similar || this.tmdbResponse0)
            console.log('setDataObject2', this.tmdbResponse.title)
            this.$store.dispatch('movieSeriesDataSets/setDataObject2', this.tmdbResponse)
        },
    }
}
</script>

<style scoped>
</style>
