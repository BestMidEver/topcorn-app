<template>
    <div>
        <header-bar :title="headerData.title" :to="headerData.to" :goBack="headerData.goBack" :loading="$store.state.loading.pageLoading"/>
        <router-view></router-view>
    </div>
</template>

<script>
import Vue from 'vue'
import tmdbMerge from '@/mixins/tmdbMerge'
import urlGenerate from '@/mixins/urlGenerate'
import HeaderBar from '@/components/HeaderBar.vue'
import lodash from 'lodash'
import codeToText from '@/mixins/codeToText'

Vue.use(lodash)


export default {
    components: {
        'header-bar': HeaderBar,
    },
    mixins: [tmdbMerge, urlGenerate, codeToText],
    data() {
        return {
            axiosRandom: '',
            axiosRandom2: '',
            tmdbResponse: {},
        }
    },
    computed: {
        objInteractions() { return this.$store.state.interactions.movieInteractions },
        headerData() {
            if(this.$route.name === 'person-profile') return { title: this.tmdbResponse.name, goBack: true }
            let data = { to: this.personUrl(this.$route.params.id) }
            if(this.$route.name === 'person-detail') data.title = `${this.tmdbResponse.name} > More Info`
            else if(this.$route.name === 'person-movie') data.title = `${this.tmdbResponse.name} > Movies`
            else if(this.$route.name === 'person-series') data.title = `${this.tmdbResponse.name} > Series`
            else if(this.$route.name === 'person-series') data.title = `${this.tmdbResponse.name} > Series`
            else if(this.$route.name === 'person-image') data.title = `${this.tmdbResponse.name} > Images`
            else if(this.$route.name === 'person-comment') data.title = `${this.tmdbResponse.name} > Comments`
            return data
        }
    },
    watch: {
        '$route.params.id'() { this.getObjData() },
        objInteractions() { this.mergeAndStore() },
    },
    beforeCreate() {
        this.$store.dispatch('interactions/pluckMoviesSeries')
    },
    created() {
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
            this.$store.dispatch('request/get', this.tmdbPersonUrl(this.$route.params.id))
            .then(response => {
                if(axiosRandom === this.axiosRandom) {
                    this.tmdbResponse = response.data
                    this.groupJobs()
                    this.sortObjs()
                    this.mergeAndStore()
                }
            }).catch(error => {
            }).then(() => { this.$store.dispatch('loading/finishPageLoading') })
        },
        getTcData() {
            this.$store.dispatch('loading/startPageLoading2')
            this.$store.dispatch('loading/startResponseWaiting')
            const axiosRandom = this.randomString(20)
            this.axiosRandom2 = axiosRandom
            this.$store.dispatch('request/get', this.personDataUrl(this.$route.params.id))
            .then(response => {
                if(axiosRandom === this.axiosRandom2) {
                    this.$store.dispatch('comments/setDataObject', response.data.reviews)
                }
            }).catch(error => {
                this.$store.dispatch('comments/setDataObject', {})
            }).then(() => {
                this.$store.dispatch('loading/finishPageLoading2')
                this.$store.dispatch('loading/finishResponseWaiting')
            })
        },
        groupJobs() {
            this.tmdbResponse.movies = this.group(this.tmdbResponse.movie_credits)
            this.tmdbResponse.series = this.group(this.tmdbResponse.tv_credits)
            this.jobTypes();
        },
        group(data) {
            let returnObj = {}
            returnObj.results = [...data.cast.map(obj => { obj.job = 'Actor'; return obj }), ...data.crew]
            returnObj.jobTypes = lodash.groupBy(returnObj.results, obj => obj.job)
            returnObj.jobTypes = Object.entries(returnObj.jobTypes).map(type => { return { job: type[0], count: type[1].length } })
            returnObj.genres = returnObj.results.map(obj => obj.genre_ids).reduce((a, c) => [...new Set([...a, ...c])], [])
            returnObj.genres = returnObj.genres.map(genre => { return { name: this.codeToGenre(genre), id: genre } })
            returnObj.results = lodash.groupBy(returnObj.results, obj => obj.id)
            returnObj.results = Object.values(returnObj.results).map(obj => { obj[0].job = obj.map(copy => copy.job); return obj[0] })
            return returnObj
        },
        jobTypes() {
            this.tmdbResponse.jobTypes = [...this.tmdbResponse.movies.jobTypes, ...this.tmdbResponse.series.jobTypes]
            this.tmdbResponse.jobTypes = lodash.groupBy(this.tmdbResponse.jobTypes, type => type.job)
            this.tmdbResponse.jobTypes = Object.entries(this.tmdbResponse.jobTypes).map(type => { return { job: type[0], count: type[1].reduce((a, c) => a + c.count, 0) } })
            this.tmdbResponse.jobTypes.sort((a, b) => a.count > b.count ? -1 : 1)
        },
        sortObjs() {
            this.tmdbResponse.movies.results.sort((a, b) => a.popularity > b.popularity ? -1 : 1)
            this.tmdbResponse.movies.jobTypes.sort((a, b) => a.count > b.count ? -1 : 1)
            this.tmdbResponse.movies.genres.sort((a, b) => a.name < b.name ? -1 : 1)
            this.tmdbResponse.series.results.sort((a, b) => a.episode_count > b.episode_count ? -1 : 1)
            this.tmdbResponse.series.jobTypes.sort((a, b) => a.count > b.count ? -1 : 1)
            this.tmdbResponse.series.genres.sort((a, b) => a.name < b.name ? -1 : 1)
        },
        mergeAndStore() {
            this.tmdbResponse.movies = this.mergeTmdbResponse(this.tmdbResponse.movies, this.$store.state.interactions.movieInteractions)
            this.tmdbResponse.series = this.mergeTmdbResponse(this.tmdbResponse.series, this.$store.state.interactions.seriesInteractions)
            this.$store.dispatch('movieSeriesDataSets/setDataObject', this.tmdbResponse)
            this.$store.dispatch('movieSeriesDataSets/setDataObject2', { id: this.tmdbResponse.id, name: this.tmdbResponse.name })
        },
    }
}
</script>

<style scoped>
</style>
