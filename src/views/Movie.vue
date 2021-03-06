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
import lodash from 'lodash'
import HeaderBar from '@/components/HeaderBar.vue'
 
Vue.use(lodash)


function initialState (){
    const tmdbResponse = { results: [], total_pages: 0, total_results: 0 }
    return {
        tmdbResponse0: tmdbResponse,
        tmdbResponse: tmdbResponse,
        axiosRandom: '',
        axiosRandom2: '',
        axiosRandom3: '',
        interactionDataResponse: {}
    }
}

export default {
    components: {
        'header-bar': HeaderBar,
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
        headerData() {
            if(this.$route.name === 'movie-profile') return { title: this.tmdbResponse.title, goBack: true }
            let data = { to: this.movieSeriesUrl(this.type, this.$route.params.id) }
            if(this.$route.name === 'movie-detail') data.title = `${this.tmdbResponse.title} > More Info`
            else if(this.$route.name.includes('movie-cast')) data.title = `${this.tmdbResponse.title} > Actors & Crew`
            else if(this.$route.name === 'movie-comment') data.title = `${this.tmdbResponse.title} > Comments`
            else if(this.$route.name.includes('movie-moreLikeThis')) data.title = `${this.tmdbResponse.title} > More Like This`
            return data
        },
        interactionData() { return this.isTrue(this.interactionDataResponse) ? this.interactionDataResponse : this.createdInteractionData },
        createdInteractionData() { return { ban_id: null, backdrop_path: this.tmdbResponse.backdrop_path, id: this.tmdbResponse.id, later_id: null, original_title: this.tmdbResponse.original_title, rate_code: null, release_date: this.tmdbResponse.release_date, title: this.tmdbResponse.title } }
    },
    watch: {
        objInteractions() { this.mergeAndStore() },
        obj() {
            Object.assign(this.$data, initialState())
            this.getObjData()
            //$('.body').scrollTop(0)
        },
        interactionData() { this.$store.dispatch('movieSeriesDataSets/setDataObject', this.interactionData) }
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
            this.$store.dispatch('request/get', this.tmdbMovieSeriesUrl(this.type, this.$route.params.id))
            .then(response => {
                if(axiosRandom === this.axiosRandom) {
                    this.tmdbResponse = response.data
                    this.sortTrailers()
                    this.groupCrew()
                    this.appendCollection()
                }
            }).catch(error => {
                this.$store.dispatch('movieSeriesDataSets/setDataObject2', this.tmdbResponse0)
            }).then(() => { this.$store.dispatch('loading/finishPageLoading') })
        },
        appendCollection() {
            this.$store.dispatch('loading/startPageLoading3')
            if(this.isFalse(this.tmdbResponse.belongs_to_collection)) {
                this.$store.dispatch('loading/finishPageLoading3')
                this.tmdbResponse.collection = this.tmdbResponse0
                return this.mergeAndStore()
            }
            const axiosRandom = this.randomString(20)
            this.axiosRandom3 = axiosRandom
            this.$store.dispatch('request/get', this.tmdbCollectionUrl(this.tmdbResponse.belongs_to_collection.id))
            .then(response => {
                if(axiosRandom === this.axiosRandom3) {
                    this.tmdbResponse.collection = { results: response.data.parts, total_pages: 1, total_results: 1, name: response.data.name }
                }
            }).catch(error => {
                this.tmdbResponse.collection = this.tmdbResponse0
            }).then(() => { this.mergeAndStore(); this.$store.dispatch('loading/finishPageLoading3') })
        },
        getTcData() {
            this.$store.dispatch('loading/startPageLoading2')
            this.$store.dispatch('loading/startResponseWaiting')
            const axiosRandom = this.randomString(20)
            this.axiosRandom2 = axiosRandom
            this.$store.dispatch('request/get', this.movieSeriesDataUrl(this.type, this.$route.params.id))
            .then(response => {
                if(axiosRandom === this.axiosRandom2) {
                    this.interactionDataResponse = response.data.interactionData.original
                    //this.$store.dispatch('movieSeriesDataSets/setDataObject', response.data.interactionData.original)
                    this.$store.dispatch('comments/setDataObject', response.data.reviews)
                }
            }).catch(error => {
                //this.$store.dispatch('movieSeriesDataSets/setDataObject', {})
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
            this.$store.dispatch('movieSeriesDataSets/setDataObject2', this.tmdbResponse)
        },
    }
}
</script>

<style scoped>
</style>
