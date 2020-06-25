<template>
    <div>
        <filter-sorter :filters="filters" :selectedFilters="selectedFilters" @filterChanged="filterChanged" @filtersReset="filtersReset"/>
        <cards :type="type" :tcData="data" :boundedTo="['movieSeriesDataSets/setTcDataObjectInteraction']" :loading="loading" cardType="movie-series-recommendation" class="mt-2"/>
    </div>
</template>

<script>
import Cards from '@/components/Cards.vue'
import FilterSorter from '@/components/filterSorter/FilterSorter.vue'
import filterSorterDefaultFilters from '@/components/filterSorter/filterSorterDefaultFilters'
import filterSorterBackendAdapter from '@/components/filterSorter/filterSorterBackendAdapter'
import codeToText from '@/mixins/codeToText'
import DiscoverMovieSeries from './DiscoverMovieSeries'


export default {
    components: {
        'cards': Cards,
        'filter-sorter': FilterSorter
    },
    mixins: [filterSorterDefaultFilters, filterSorterBackendAdapter, codeToText, DiscoverMovieSeries],
    props: {
        type: String,
    },
    data() {
        const basedOnMyTasteSortObject = { type: 'custom-select', effect: 'sort-attribute', request: 'sort', attributes: ['Match Score', 'Top Rated', 'Most Popular', 'Newest', 'Highest Budget', 'Highest Revenue'], items: ['Highest Matching Score', 'Top Rated', 'Most Popular', 'Newest', 'Highest Budget', 'Highest Revenue'], default: 'Highest Matching Score', title: 'Sorting' }
        const popularTasteSortObject = { type: 'custom-select', effect: 'sort-attribute', request: 'sort', attributes: ['Top Rated', 'Most Popular', 'Newest', 'Highest Budget', 'Highest Revenue'], items: ['Top Rated', 'Most Popular', 'Newest', 'Highest Budget', 'Highest Revenue'], default: 'Most Popular', title: 'Sorting' }
        return {
            basedOnMyTasteSortObject: basedOnMyTasteSortObject,
            popularTasteSortObject: popularTasteSortObject,
            sortObject: this.$route.query.Retrieve === 'All' ? popularTasteSortObject : basedOnMyTasteSortObject,
        }
    },
    computed: {
        filters: {
            get() {
                return [
                    this.sortObject,
                    { type: 'custom-select', effect: 'filter-attribute', request: 'retrieve', attributes: ['All', 'Recommendations', 'Legendaries'], items: ['All', 'Recommendations', 'Legendary Recommendations'], default: 'Recommendations', title: 'Retrieve', forceShow: true  },
                    ...this.matchRateObject,
                    this.voteAverageFilterObject,
                    this.voteCountFilterObject2,
                    { type: 'custom-multi-select', effect: 'filter-combination', request: 'genre_combination', attributes: ['All', ...this.movieGenreCodes], items: ['All', ...this.movieGenreNames], default: ['All'], title: 'Genre Combination' },
                    this.releaseDateMinFilterObject,
                    this.releaseDateMaxFilterObject,
                    { type: 'custom-multi-select', effect: 'filter-attribute', request: 'original_languages', attributes: ['All', ...this.languageCodes], items: ['All', ...this.languageNames], default: ['All'], title: 'Original Language' },
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
}
</script>

<style scoped>
</style>
