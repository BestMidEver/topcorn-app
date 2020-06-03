<template>
    <div>
        <section-heading v-if="!isFullScreen" :title="capitalizeFirstLetter(types)">
            <router-link :to="personUrl($route.params.id, type)" replace type="text" class="btn-sm btn-block border-0 mr-1 text-secondary" :class="buttonClass"><div class="one-line">Show All</div></router-link>
        </section-heading>
        <filter-sorter v-if="isFullScreen" :filters="filters" :selectedFilters="selectedFilters"/>
        <cards :type="type" :tcAllResults="filteredResults" :loading="$store.state.loading.pageLoading" :boundedTo="[`interactions/set${capitalizeFirstLetter(type)}Interaction`]"
            :expandStatus="isFullScreen ? 'expanded' : 'compressed'" class="mt-2"/>
    </div>
</template>

<script>
import SectionHeading from '@/components/SectionHeading.vue'
import urlGenerate from '@/mixins/urlGenerate'
import Cards from '@/components/Cards.vue'
import compressedCards from '@/mixins/compressedCards'
import FilterSorter from '@/components/filterSorter/FilterSorter.vue'
import filterSorterAdapter from '@/components/filterSorter/filterSorterAdapter'


export default {
    components: {
        'section-heading': SectionHeading,
        'cards': Cards,
        'filter-sorter': FilterSorter
    },
    mixins: [urlGenerate, compressedCards, filterSorterAdapter],
    props: {
        data: Object,
        isFullScreen: Boolean,
        type: String,
    },
    computed: {
        types() { return this.type === 'movie' ? 'movies' : this.type },
        results() { return this.data[this.types] ? this.data[this.types].results : [] },
        dataLength() { return this.filteredResults.length || 0 },
        jobTypes() { return this.data && this.data[this.types] && this.data[this.types].jobTypes.map(type => type.job) || [] },
        filters:{
            get() {
                let filter = [
                    { type: 'custom-select', effect: 'sort-attribute', attributes: ['popularity', 'vote_average', 'date', 'alphabetical'], items: ['Most Popular', 'Top Rated', 'Newest', 'Alphabetical Order'], default: 'Most Popular', title: 'Sorting' },
                    { type: 'custom-select', effect: 'filter-attribute', attribute: 'job', items: ['All', ...this.jobTypes], default: 'All', title: 'Job' },
                    this.voteAverageFilterObject,
                    this.voteCountFilterObject,
                    this.interactionFilterObject,
                    { type: 'custom-multi-select', effect: 'filter-combination', attribute: 'genre_ids', attributes: ['All', ...this.genreIds], items: ['All', ...this.genreNames], default: ['All'], title: 'Genre Combination' }
                ]
                if(this.type === 'series') {
                    filter[0].attributes.unshift('popularity*episode_count'); filter[0].items.unshift('Most Popular & Most Participated'); filter[0].default = 'Most Popular & Most Participated'
                    filter[0].attributes.splice(2, 0, 'episode_count'); filter[0].items.splice(2, 0, 'Most Participated');
                }
                return filter
            },
        },
        genres() { return this.data && this.data[this.types] && this.data[this.types].genres || [] },
        genreIds() { return this.genres && this.genres.map(genre => genre.id) || [] },
        genreNames() { return this.genres && this.genres.map(genre => genre.name) || [] },
    },
    created() {
        if(this.isFullScreen) $('.body').scrollTop(0)
    },
}
</script>

<style scoped>
</style>
