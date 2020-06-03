<template>
    <div>
        <header-bar :title="headerData.title" :to="headerData.to" :goBack="headerData.goBack" :loading="$store.state.loading.pageLoading"/>
        <series-navbar v-if="!$route.name.includes('moreLikeThis')" :seasons="tmdbResponse.seasons"/>
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
import seriesComputeds from '@/components/movie/seriesComputeds.js'
 

Vue.use(VueAxios, axios, lodash)
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

function initialState (){
    const tmdbResponse = { results: [], total_pages: 0, total_results: 0 }
    return {
        tmdbResponse0: tmdbResponse,
        tmdbResponse: tmdbResponse,
        tmdbSeasonResponse: {},
        tmdbEpisodeResponse: {},
        interactionDataResponse: {},
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
    mixins: [tmdbMerge, urlGenerate, seriesComputeds],
    props: {
        type: { validator: value => ['movie', 'series'].includes(value) },
    },
    data() { return initialState() },
    computed: {
        movieSeriesType() { return this.type },
        objInteractions() { return this.$store.state.interactions[this.type + 'Interactions'] },
        obj() { return `${this.type}-${this.$route.params.id}` },
        headerData() {
            if(this.$route.name === 'series-profile') return { title: this.episodeCode, goBack: true }
            let data = { to: this.movieSeriesUrl(this.type, this.$route.params.id, 'profile' ,this.seasonNumber, this.episodeNumber) }
            if(this.$route.name === 'series-detail') data.title = `${this.episodeCode} > More Info`
            else if(this.$route.name.includes('series-cast')) data.title = `${this.episodeCode} > Actors & Crew`
            else if(this.$route.name === 'series-comment') data.title = `${this.episodeCode} > Comments`
            else if(this.$route.name.includes('series-moreLikeThis')) data.title = `${this.episodeCode} > More Like This`
            return data
        },
        episodeCode() { return this.tabCode ? `${this.tmdbResponse.name} > ${this.tabCode}` : this.tmdbResponse.name },
        interactionData() { return this.isTrue(this.interactionDataResponse) ? this.interactionDataResponse : this.createdInteractionData },
        createdInteractionData() { return { ban_id: null, backdrop_path: this.tmdbResponse.backdrop_path, id: this.tmdbResponse.id, later_id: null, original_name: this.tmdbResponse.original_name, rate_code: null, first_air_date: this.tmdbResponse.first_air_date, name: this.tmdbResponse.name } }
    },
    watch: {
        objInteractions() { console.log('objInteractions watched'); this.mergeAndStore() },
        obj() {
            Object.assign(this.$data, initialState())
            console.log('obj changed')
            this.getObjData()
            $('.body').scrollTop(0)
        },
        '$route.params.season'() { this.getTmdbSeasonData(); this.getTcData() },
        '$route.params.episode'() { this.getTmdbEpisodeData(); this.getTcData() },
        interactionData() { console.log('interactionData watched', this.interactionData.name); this.$store.dispatch('movieSeriesDataSets/setDataObject', this.interactionData) },

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
                    //this.mergeInteractionData()
                    console.log('tmdb responsed')
                    this.sortTrailers()
                    this.groupCrew(this.tmdbResponse.credits.crew)
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
            axios.get(this.movieSeriesDataUrl(this.type, this.$route.params.id, this.seasonNumber, this.episodeNumber))
            .then(response => {
                if(axiosRandom === this.axiosRandom2) {
                    this.interactionDataResponse = response.data.interactionData.original
                    //this.$store.dispatch('movieSeriesDataSets/setDataObject', this.interactionData)
                    this.mergeInteractionData()
                    this.$store.dispatch('comments/setDataObject', response.data.reviews)
                }
            }).catch(error => {
                //this.interactionData = {}
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
        groupCrew(crew) {
            crew = lodash.groupBy(crew, person => person.id)
            crew = Object.values(crew).map(person => { person[0].job = person.map(copy => copy.job); return person[0] })
        },
        mergeAndStore() {
            this.tmdbResponse.recommendations = this.mergeTmdbResponse(this.tmdbResponse.recommendations || this.tmdbResponse0)
            this.tmdbResponse.similar = this.mergeTmdbResponse(this.tmdbResponse.similar || this.tmdbResponse0)
            this.tmdbResponse.collection = this.mergeTmdbResponse(this.tmdbResponse.collection || this.tmdbResponse0)
            console.log('setDataObject2', this.tmdbResponse.title)
            this.$store.dispatch('movieSeriesDataSets/setDataObject2', this.tmdbResponse)
        },
        getTmdbSeasonData() {
            if(this.$route.params.season == -1) { this.$store.dispatch('loading/finishPageLoading3'); return }
            console.log('getTmdbSeasonData')
            this.$store.dispatch('loading/startPageLoading3')
            const axiosRandom = this.randomString(20)
            this.axiosRandom3 = axiosRandom
            axios.get(this.tmdbSeasonUrl(this.$route.params.id, this.$route.params.season))
            .then(response => {
                if(axiosRandom === this.axiosRandom3) {
                    this.tmdbSeasonResponse = response.data
                    this.groupCrew(this.tmdbSeasonResponse.credits.crew)
                    this.tmdbSeasonResponse.episodes.forEach(episode => {
                        this.groupCrew(episode.crew)
                        Vue.set(episode, 'credits', {
                            crew: episode.crew,
                            guest: episode.guest_stars,
                            cast: this.tmdbSeasonResponse.credits.cast
                        })
                    })
                    this.$store.dispatch('movieSeriesDataSets/setDataObject3', response.data)
                    this.mergeInteractionData()
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
                    Vue.set(this.tmdbSeasonResponse.episodes.find(episode => episode.episode_number == this.$route.params.episode), 'videos', response.data)
                    this.$store.dispatch('movieSeriesDataSets/setDataObject3', this.tmdbSeasonResponse)
                    this.mergeInteractionData()
                }
            }).catch(error => {
            }).then(() => { this.$store.dispatch('loading/finishPageLoading4') })
        },
        mergeInteractionData() {
            if(this.detailedType === 'season') {
                Vue.set(this.interactionData, 'name', `${this.tabCode}${this.seasonData.name?' • '+this.seasonData.name:''}`)
                Vue.set(this.interactionData, 'backdrop_path', this.tmdbResponse.backdrop_path)
            }
            if(this.detailedType === 'episode') {
                Vue.set(this.interactionData, 'name', `${this.tabCode}${this.episodeData.name?' • '+this.episodeData.name:''}`)
                Vue.set(this.interactionData, 'still_path', this.episodeData.still_path)
            }
        }
    }
}
</script>

<style scoped>
</style>
