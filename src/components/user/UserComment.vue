<template>
    <div>
        <filter-sorter :filters="filters" :selectedFilters="selectedFilters"/>
        <review-section :data="data" :loading="$store.state.loading.pageLoading2" type="user" :boundedTo="['comments/setReview']" :isFullScreen="true"/>
    </div>
</template>

<script>
import ReviewSection from '@/components/ReviewSection.vue'
import urlGenerate from '@/mixins/urlGenerate'
import FilterSorter from '@/components/filterSorter/FilterSorter.vue'
import filterSorterDefaultFilters from '@/components/filterSorter/filterSorterDefaultFilters'
import filterSorterBackendAdapter from '@/components/filterSorter/filterSorterBackendAdapter'


export default {
    components: {
        'review-section': ReviewSection,
        'filter-sorter': FilterSorter,
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
        filters: {
            get() {
                return [
                    { type: 'custom-select', effect: 'sort-attribute', request: 'sort',items: ['Top Rated', 'Newest'], default: 'Newest', title: 'Sorting' },
                    { type: 'custom-select', effect: 'filter-attribute', request: 'mode', attributes: [1, 3, 4], items: ['Movie', 'Series', 'Person'], default: 'Movie', title: 'Wrote for', forceShow: true },
                ]
            },
        },
        requestData() { return { id: this.$route.params.id, type: 'comment', ...this.filterRequest } },
    },
    watch: {
        $route() { this.getData() }
    },
    created() {
        this.getData()
        //if(this.isFullScreen) $('.body').scrollTop(0)
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
