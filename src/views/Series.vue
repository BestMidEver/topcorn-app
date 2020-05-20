<template>
    <div>
        <header-bar :title="headerData.title" :to="headerData.to" :goBack="headerData.goBack" :loading="$store.state.loading.pageLoading"/>
        <series-navbar :seasons="tmdbResponse.seasons" :seasonData="tmdbSeasonResponse"/>
        <router-view></router-view>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import tmdbMerge from '@/mixins/tmdbMerge'
import urlGenerate from '@/mixins/urlGenerate'
import lodash from 'lodash'
import HeaderBar from '@/components/HeaderBar.vue'
import SeriesNavbar from '@/components/movie/SeriesNavbar'
 

Vue.use(VueAxios, axios, lodash)
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

function initialState (){
    const tmdbResponse = { results: [], total_pages: 0, total_results: 0 }
    return {
        tmdbResponse0: tmdbResponse,
        tmdbResponse: tmdbResponse,
        tmdbSeasonResponse: {},
        tmdbEpisodeResponse: {},
        axiosRandom: '',
        axiosRandom2: '',
        axiosRandom3: '',
        axiosRandom4: '',
    }
}

export default {
    components: {
        'header-bar': HeaderBar,
        'series-navbar': SeriesNavbar
    },
    mixins: [tmdbMerge, urlGenerate],
    props: {
        type: { validator: value => ['movie', 'series'].includes(value) },
    },
    data() { return initialState() },
    computed: {
        movieSeriesType() { return this.type },
        objInteractions() { return this.$store.state.interactions[this.type + 'Interactions'] },
        obj() { return `${this.type}-${this.$route.params.id}` },
        /* tabObj() { return `${this.$route.params.season}-${this.$route.params.episode}` }, */
        headerData() {
            if(this.$route.name === 'series-profile') return { title: this.tmdbResponse.name, goBack: true }
            let data = { to: this.movieSeriesUrl(this.type, this.$route.params.id) }
            if(this.$route.name === 'series-detail') data.title = `${this.tmdbResponse.name} > More Info`
            else if(this.$route.name.includes('series-cast')) data.title = `${this.tmdbResponse.name} > Actors & Crew`
            else if(this.$route.name === 'series-comment') data.title = `${this.tmdbResponse.name} > Comments`
            else if(this.$route.name.includes('series-moreLikeThis')) data.title = `${this.tmdbResponse.name} > More Like This`
            return data
        },
    },
    watch: {
        objInteractions() { console.log('objInteractions watched'); this.mergeAndStore() },
        obj() {
            Object.assign(this.$data, initialState())
            console.log('obj changed')
            this.getObjData()
            $('.body').scrollTop(0)
        },
        '$route.params.season'() { this.getTmdbSeasonData() },
        '$route.params.episode'() { this.getTmdbEpisodeData() }
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
            this.getTmdbSeriesData()
            this.getTmdbSeasonData()
            this.getTmdbEpisodeData()
            this.getTcData()
        },
        getTmdbSeriesData() {
            this.$store.dispatch('loading/startPageLoading')
            const axiosRandom = this.randomString(20)
            this.axiosRandom = axiosRandom
            axios.get(this.tmdbMovieSeriesUrl(this.type, this.$route.params.id))
            .then(response => {
                if(axiosRandom === this.axiosRandom) {
                    this.tmdbResponse = response.data
                    console.log('tmdb responsed')
                    this.sortTrailers()
                    this.groupCrew()
                }
            }).catch(error => {
                this.$store.dispatch('movieSeriesDataSets/setDataObject2', this.tmdbResponse0)
            }).then(() => {this.$store.dispatch('movieSeriesDataSets/setDataObject2', this.tmdbResponse); this.$store.dispatch('loading/finishPageLoading') })
        },
        getTcData() {
            this.$store.dispatch('loading/startPageLoading2')
            this.$store.dispatch('loading/startResponseWaiting')
            const axiosRandom = this.randomString(20)
            this.axiosRandom2 = axiosRandom
            axios.get(this.movieSeriesDataUrl(this.type, this.$route.params.id, this.$route.name === 'movie-comment' ? this.$route.params.page : 1))
            .then(response => {
                if(axiosRandom === this.axiosRandom2) {
                    this.$store.dispatch('movieSeriesDataSets/setDataObject', response.data.interactionData.original)
                    this.$store.dispatch('comments/setDataObject', response.data.reviews)
                }
            }).catch(error => {
                this.$store.dispatch('movieSeriesDataSets/setDataObject', {})
                this.$store.dispatch('comments/setDataObject', {})
            }).then(() => {
                this.$store.dispatch('loading/finishPageLoading2')
                this.$store.dispatch('loading/finishResponseWaiting')
            })
        },
        sortTrailers() {
            this.tmdbResponse.videos.results = this.tmdbResponse.videos.results.filter(trailer => trailer.site == 'YouTube').sort((a, b) => a.type === 'Trailer' ? -1 : 1)
        },
        groupCrew() {
            this.tmdbResponse.credits.crew = lodash.groupBy(this.tmdbResponse.credits.crew, person => person.id)
            this.tmdbResponse.credits.crew = Object.values(this.tmdbResponse.credits.crew).map(person => { person[0].job = person.map(copy => copy.job); return person[0] })
        },
        mergeAndStore() {
            this.tmdbResponse.recommendations = this.mergeTmdbResponse(this.tmdbResponse.recommendations || this.tmdbResponse0)
            this.tmdbResponse.similar = this.mergeTmdbResponse(this.tmdbResponse.similar || this.tmdbResponse0)
            this.tmdbResponse.collection = this.mergeTmdbResponse(this.tmdbResponse.collection || this.tmdbResponse0)
            console.log('setDataObject2', this.tmdbResponse.title)
            this.$store.dispatch('movieSeriesDataSets/setDataObject2', this.tmdbResponse)
        },
        /* getTabData() {
            if(this.$route.params.season != -1) this.getTmdbSeasonData()
            if(this.$route.params.episode != -1) this.getTmdbEpisodeData()
        }, */
        getTmdbSeasonData() {
            if(this.$route.params.season == -1) return
            console.log('getTmdbSeasonData')
            this.$store.dispatch('loading/startPageLoading3')
            const axiosRandom = this.randomString(20)
            this.axiosRandom3 = axiosRandom
            axios.get(this.tmdbSeasonUrl(this.$route.params.id, this.$route.params.season))
            .then(response => {
                if(axiosRandom === this.axiosRandom3) {
                    this.tmdbSeasonResponse = response.data
                    this.$store.dispatch('movieSeriesDataSets/setDataObject3', response.data)
                }
            }).catch(error => {
                this.$store.dispatch('movieSeriesDataSets/setDataObject3', this.tmdbResponse0)
            }).then(() => { this.$store.dispatch('loading/finishPageLoading3') })
        },
        getTmdbEpisodeData() {
            if(this.$route.params.episode == -1) return
            console.log('getTmdbEpisodeData')
            this.$store.dispatch('loading/startPageLoading4')
            const axiosRandom = this.randomString(20)
            this.axiosRandom4 = axiosRandom
            axios.get(this.tmdbEpisodeVideoUrl(this.$route.params.id, this.$route.params.season, this.$route.params.episode))
            .then(response => {
                if(axiosRandom === this.axiosRandom4) {
                    this.tmdbSeasonResponse.episodes.find(episode => episode.episode_number == this.$route.params.episode).videos = response.data
                    this.$store.dispatch('movieSeriesDataSets/setDataObject3', this.tmdbSeasonResponse)
                }
            }).catch(error => {
            }).then(() => { this.$store.dispatch('loading/finishPageLoading4') })
        }
    }
}
</script>

<style scoped>
</style>
