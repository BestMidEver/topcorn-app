<template>
    <div>
        <user-movie-series-section :data="data" class="mt-1" :type="type" :isFullScreen="true" :filters="filters" :selectedFilters="selectedFilters"/>
    </div>
</template>

<script>
import urlGenerate from '@/mixins/urlGenerate'
import UserMovieSeriesSection from '@/components/user/UserMovieSeriesSection.vue'
import filterSorterDefaultFilters from '@/components/filterSorter/filterSorterDefaultFilters'
import filterSorterBackendAdapter from '@/components/filterSorter/filterSorterBackendAdapter'


export default {
    components: {
        'user-movie-series-section': UserMovieSeriesSection
    },
    mixins: [urlGenerate, filterSorterDefaultFilters, filterSorterBackendAdapter],
    props: {
    },
    data() {
        return {
            axiosRandom: '',
            data: {}
        }
    },
    computed: {
        id() { return this.$route.params.id },
        ownProfile() { return this.$store.state.auth.userId == this.id },
        type() { return this.$route.params.tab },
        requestData() { return { id: this.$route.params.id, type: this.type, ...this.filterRequest } },
        interactionFilterObject2() { this.interactionFilterObject.title = this.ownProfile ? 'Hide' : 'Hide (According to me)'; return this.interactionFilterObject },
        filters: {
            get() {
                return [
                    { type: 'custom-select', effect: 'sort-attribute', request: 'sort', attributes: ['Interaction Date', 'Most Popular', 'Top Rated', 'Newest', 'Alphabetical Order'], items: ['Most Recently Interacted', 'Most Popular', 'Top Rated', 'Newest', 'Alphabetical Order'], default: 'Most Recently Interacted', title: 'Sorting' },
                    { type: 'custom-select', effect: 'filter-attribute', request: 'interaction', attributes: ['All', 'Watch Later', 'All Seen', 'Rate-5', 'Rate-4', 'Rate-3', 'Rate-2', 'Rate-1', 'Hidden'], items: ['All', 'Watch Later', 'Seen', 'Legendary', 'Good', 'Not Sure', 'Bad', 'Garbage', 'Hidden'], default: this.ownProfile ? 'Watch Later' : 'Legendary', title: this.ownProfile ? 'Interaction' : "This User's Interaction", forceShow: true },
                    this.voteAverageFilterObject,
                    this.voteCountFilterObject,
                    this.interactionFilterObject2,
                ]
            },
        },
    },
    watch: {
        $route() { this.getData() }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            this.$store.dispatch('loading/startPageLoading2')
            const axiosRandom = this.randomString(20)
            this.axiosRandom = axiosRandom
            this.$store.dispatch('request/post', { url: this.userInteractionSetUrl(this.$route.params.page), data: this.requestData })
            .then(response => {
                if(axiosRandom === this.axiosRandom) {
                    this.data = response.data
                }
            }).catch(error => {
                this.data = {}
            }).then(() => {
                this.$store.dispatch('loading/finishPageLoading2')
            })
        }
    },
}
</script>

<style scoped>
</style>
