<template>
    <div>
        <filter-sorter :filters="filters" :selectedFilters="selectedFilters"/>
        <cards type="person" :tcData="data" :loading="loading" cardType="person-with-age" class="mt-2"/>
    </div>
</template>

<script>
import Cards from '@/components/Cards.vue'
import FilterSorter from '@/components/filterSorter/FilterSorter.vue'
import filterSorterDefaultFilters from '@/components/filterSorter/filterSorterDefaultFilters'
import filterSorterBackendAdapter from '@/components/filterSorter/filterSorterBackendAdapter'
import urlGenerate from '@/mixins/urlGenerate'


export default {
    components: {
        'cards': Cards,
        'filter-sorter': FilterSorter
    },
    mixins: [urlGenerate, filterSorterDefaultFilters, filterSorterBackendAdapter],
    data() {
        return {
            axiosRandom: '',
            data: {},
        }
    },
    computed: {
        loading() { return this.$store.state.loading.pageLoading },
        requestData() { return { type: 'person', ...this.filterRequest } },
        filters: {
            get() {
                return [
                    { type: 'custom-select', effect: 'filter-attribute', request: 'mode', attributes: ['Most Popular', 'Born Today', 'Died Today'], items: ['All (Sorted By Popularity)', 'Born Today', 'Death Anniversary'], default: 'Born Today', title: 'Retrieve', forceShow: true  },
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
            this.$store.dispatch('loading/startPageLoading')
            const axiosRandom = this.randomString(20)
            this.axiosRandom = axiosRandom
            this.$store.dispatch('request/post', { url: this.discoverUrl(this.$route.params.page), data: this.requestData })
            .then(response => {
                if(axiosRandom === this.axiosRandom && this.$route.name === 'discover-person') {
                    this.data = response.data
                }
            }).catch(error => {
                this.data = {}
            }).then(() => {
                if(axiosRandom === this.axiosRandom && this.$route.name === 'discover-person') { this.$store.dispatch('loading/finishPageLoading') }
            })
        },
    }
}
</script>

<style scoped>
</style>
