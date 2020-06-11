export default {
    computed: {
        selectedFilters() {
            const query = this.$route.query
            let filters = JSON.parse(JSON.stringify(this.filters))
            filters.forEach(filter => {
                filter.selected = query[filter.title]
            })
            return filters
        },
        filteredResults() { return this.filterSort(this.results) },
    },
    data() {
        return {
            voteAverageFilterObject: { type: 'custom-select', effect: 'filter-attribute-minimum', attribute: 'vote_average', items: ['All', 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10], default: 'All', title: 'Min Vote Average', request: 'vote_average' },
            voteCountFilterObject: { type: 'custom-select', effect: 'filter-attribute-minimum', attribute: 'vote_count', items: ['All', 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000], default: 'All', title: 'Min Vote Count', request: 'vote_count' },
            interactionFilterObject: { type: 'custom-multi-select', effect: 'filter-interaction', items: ['None', 'Watch Later', 'Already Seen', 'Hidden'], default: ['Hidden'], title: 'Hide', request: 'hide' },
        }
    },
}