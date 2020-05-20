<template>
    <div>
        <more-like-this-section :data="tmdbResponse" :type="type" :isFullScreen="true"/>
    </div>
</template>

<script>
import MoreLikeThisSection from '@/components/movie/MoreLikeThisSection.vue'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import urlGenerate from '@/mixins/urlGenerate'
import tmdbMerge from '@/mixins/tmdbMerge'
 

Vue.use(VueAxios, axios)
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')


export default {
    components: {
        'more-like-this-section': MoreLikeThisSection,
    },
    mixins: [urlGenerate, tmdbMerge],
    props: {
        type: { validator: value => ['movie', 'series'].includes(value) },
    },
    data() {
        const tmdbResponse = { page: 0, results: [], total_pages: 0, total_results: 0 }
        return {
            page: this.$route.params.page,
            axiosRandom: '',
            tmdbResponse0: tmdbResponse,
            tmdbResponse: { recommendations: tmdbResponse, similar: tmdbResponse, collection: this.$store.state.movieSeriesDataSets.dataObject2.collection || tmdbResponse },
        }
    },
    computed: {
        objInteractions() { return this.$store.state.interactions[this.type + 'Interactions'] },
        moreLikeThisType() { return this.$route.name.split('-')[2] },
        collectionData() { return this.$store.state.movieSeriesDataSets.dataObject2.collection },
    },
    watch: {
        objInteractions() { this.merge() },
        '$route.params.page'(val) {
            if(val !== this.tmdbResponse[this.moreLikeThisType].page) this.getReviewPage()
        },
        '$route.name'(val) { this.getReviewPage() },
        collectionData(val) { this.tmdbResponse.collection = val }
    },
    created() {
        this.getReviewPage()
    },
    methods: {
        getReviewPage() {
            if(this.$route.name === 'movie-moreLikeThis-collection') return
            this.$store.dispatch('loading/startPageLoading')
            const axiosRandom = this.randomString(20)
            this.axiosRandom = axiosRandom
            axios.get(this.moreLikeThisDataUrl(this.type, this.moreLikeThisType, this.$route.params.id, this.$route.params.page))
            .then(response => {
                this.tmdbResponse[this.moreLikeThisType] = response.data
                this.merge()
            }).catch(error => {
                this.tmdbResponse[this.moreLikeThisType] = this.tmdbResponse0
            }).then(() => {
                this.$store.dispatch('loading/finishPageLoading')
            })
        },
        merge() {
            this.tmdbResponse.recommendations = this.mergeTmdbResponse(this.tmdbResponse.recommendations || this.tmdbResponse0)
            this.tmdbResponse.similar = this.mergeTmdbResponse(this.tmdbResponse.similar || this.tmdbResponse0)
        },
    }
}
</script>

<style scoped>
</style>
