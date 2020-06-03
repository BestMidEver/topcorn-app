export default {
    data() {
        return {
            voteAverageFilterObject: { type: 'custom-select', effect: 'filter-attribute-minimum', attribute: 'vote_average', items: ['All', 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10], default: 'All', title: 'Min Vote Average' },
            voteCountFilterObject: { type: 'custom-select', effect: 'filter-attribute-minimum', attribute: 'vote_count', items: ['All', 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000], default: 'All', title: 'Min Vote Count'},
            interactionFilterObject: { type: 'custom-multi-select', effect: 'filter-interaction', items: ['None', 'Watch Later', 'Already Seen', 'Hidden'], default: ['Hidden'], title: 'Hide' },
        }
    },
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
    methods: {
        filterSort(data) {
            let filterSortData = data
            this.selectedFilters.forEach(filter => {
                filter.calculatedSelected = filter.selected || filter.default
                if(filter.effect === 'sort-attribute') filterSortData = this.sort(filterSortData, filter)
                if(filter.effect === 'filter-attribute') filterSortData = this.filterAttribute(filterSortData, filter)
                if(filter.effect === 'filter-attribute-minimum') filterSortData = this.filterAttributeMinimum(filterSortData, filter)
                if(filter.effect === 'filter-interaction') filterSortData = this.filterInteraction(filterSortData, filter)
                if(filter.effect === 'filter-combination') filterSortData = this.filterCombination(filterSortData, filter)
            })
            return filterSortData
        },
        sort(data, filter) {
            const selectedItemIndex = filter.items.findIndex(item => item === filter.calculatedSelected)
            const selectedAttribute = filter.attributes[selectedItemIndex]
            if(selectedAttribute === 'date') { data.sort((a, b) => (a.release_date || a.first_air_date || '0000-00-00') > (b.release_date || b.first_air_date || '0000-00-00') ? -1 : 1) }
            else if(selectedAttribute === 'alphabetical') { data.sort((a, b) => (a.title || a.name || '') < (b.title || b.name || '') ? -1 : 1) }
            else if(selectedAttribute === 'popularity*episode_count') { data.sort((a, b) => (a.episode_count || 1) * a.popularity > (b.episode_count || 1) * b.popularity ? -1 : 1) }
            else data.sort((a, b) => a[selectedAttribute] > b[selectedAttribute] ? -1 : 1)
            return data
        },
        filterAttribute(data, filter) {
            if(filter.calculatedSelected === 'All') return data
            return data.filter(obj => Array.isArray(obj[filter.attribute]) ? obj[filter.attribute].includes(filter.calculatedSelected) : obj[filter.attribute] === filter.calculatedSelected)
        },
        filterAttributeMinimum(data, filter) {
            if(filter.calculatedSelected === 'All') return data
            return data.filter(obj => obj[filter.attribute] >= filter.calculatedSelected)
        },
        filterInteraction(data, filter) {
            if(filter.calculatedSelected.includes('None')) return data
            return data.filter(obj => {
                const watchLater = filter.calculatedSelected.includes('Watch Later') ? obj.later_id === null : true
                const seen = filter.calculatedSelected.includes('Already Seen') ? !(obj.rate_code > 0) : true
                const ban = filter.calculatedSelected.includes('Hidden') ? obj.ban_id === null : true
                return watchLater && seen && ban
            })
        },
        filterCombination(data, filter) {
            if(filter.calculatedSelected.includes('All')) return data
            if(!Array.isArray(filter.calculatedSelected)) filter.calculatedSelected = [filter.calculatedSelected]
            const selectedAttributes = filter.calculatedSelected.map(selected => filter.attributes[filter.items.findIndex(item => item === selected)])
            return data.filter(obj => {
                return this.isArrContainsSecondArr(obj[filter.attribute], selectedAttributes)
            })
        }
    },
}